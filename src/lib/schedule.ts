import { ELEMENT_TEXT, PLACEMENT, TAG_HOST, TAG_ROOT, TAG_TEXT } from "./constants";
import {setProps} from './utils';

/**
 * 从根节点开始渲染和调度
 * 两个阶段
 *  diff阶段(render阶段)：对比新旧的虚拟DOM，进行增量更新或创建 ，这个阶段可能比较花时间，所以我们要对任务进行拆分，拆分的维度虚拟DOM，此阶段可以暂停
 *  commit阶段：进行DOM更新创建的阶段，此阶段不能暂停，一气呵成
 * @param rootFiber 
 */
let nextUnitOfWork: any = null; // 下一个工作单元
let workInProgressRoot: any = null; // RootFiber 应用的根
export function scheduleRoot(rootFiber: any) {
  workInProgressRoot = rootFiber;
  nextUnitOfWork = rootFiber;
}

/**
 * 循环执行工作
 */
function workLoop(deadline: any) {
  let shouldYield = false; // 是否要让出时间片或者说控制权
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 执行完一个任务
    shouldYield = deadline.timeRemaining() < 1; // 没有时间的话就要让出控制权
  }
  if(!nextUnitOfWork && workInProgressRoot) { // 如果时间片到期后还有任务没完成，就需要请求浏览器再次调度
    console.log('render阶段结束')
    commitRoot();
  }
  // 不管有没有任务，都请求再次调度，每帧都要执行一次workLoop
  (window as any).requestIdleCallback(workLoop, { timeout: 500 });
}

function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect;
  while(currentFiber) {
    console.log(currentFiber.type)
    commitWork(currentFiber);
    currentFiber = currentFiber.nextEffect;
  }
  workInProgressRoot = null;
}

function commitWork(currentFiber: any) {
  if(!currentFiber) return;
  const returnFiber = currentFiber.return;
  const returnDOM = returnFiber.stateNode;
  if(currentFiber.effectTag === PLACEMENT) {
    returnDOM.appendChild(currentFiber.stateNode);
  }
  currentFiber.effectTag = null;
}

function performUnitOfWork(currentFiber: any) {debugger
  beginWork(currentFiber);
  if(currentFiber.child) {
    return currentFiber.child;
  }
  
  while(currentFiber) {
    completeUnitOfWork(currentFiber); // 没有儿子就让自己完成
    // 查找弟弟
    if(currentFiber.sibling) { // 看有没有弟弟
       return currentFiber.sibling; // 有弟弟返回弟弟
    }
    // 没有弟弟找叔叔
    currentFiber = currentFiber.return; // 先找到父节点，让父亲完成
  }
}

/**
 * 在完成的时候收集有副作用的fiber，然后组成effect list
 * @param currentFiber 
 */
function completeUnitOfWork(currentFiber: any) { // 第一个完成的A1(TEXT)
  const returnFiber = currentFiber.return; // A1
  if(returnFiber) {
    /// todo：1.这段是把自己儿子的链(effect)挂到父节点上
    if(!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect;
    }
    if(currentFiber.lastEffect) {
      if(returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
      }
      returnFiber.lastEffect = currentFiber.lastEffect;
    }
    /// todo：2.这段是把自己的链(effect)挂到父节点上
    const effectTag = currentFiber.effectTag;
    if(effectTag) { // 自己有副作用
      //!!! todo 每一个fiber有两个属性
      // firstEffect指向第一个有副作用的子fiber
      // lastEffect指向最后一个有副作用的子fiber
      // 中间的用nextEffect做成一个单链表
      // 例如： firstEffect = 大儿子，大儿子.nextEffect=二儿子，二儿子.nextEffect=三儿子，lastEffect=三儿子
      if(returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber;
      } else {
        returnFiber.firstEffect = currentFiber;
      }
      // returnFiber.firstEffect = currentFiber;
      returnFiber.lastEffect = currentFiber;
    }
  }
}

/**
 * beginWork 创建fiber(开始收下线的钱)
 * completeUnitOfWork 收集effect(把下线的钱收完了)
 * todo
 *  1.创建真实的DOM元素
 * @param currentFiber 
 */
function beginWork(currentFiber: any) {
  if(currentFiber.tag === TAG_ROOT) { // 根节点
    updateHostRoot(currentFiber);
  } else if (currentFiber.tag === TAG_TEXT) { // 文本节点
    updateHostText(currentFiber);
  } else if (currentFiber.tag === TAG_HOST) { // 原生节点
    updateHost(currentFiber)
  }
}

function updateHost(currentFiber: any) {
  if(!currentFiber.stateNode) { // 没有创建 DOM 节点
    currentFiber.stateNode = createDOM(currentFiber);
  }
  const newChildren = currentFiber.props.children;
  reconcileChildren(currentFiber, newChildren);
}

function updateHostText(currentFiber: any) {
  if(!currentFiber.stateNode) { // 没有创建 DOM 节点
    currentFiber.stateNode = createDOM(currentFiber);
  }
}

function createDOM(currentFiber: any) {
  if(currentFiber.tag === TAG_TEXT) { // 文本节点
    return document.createTextNode(currentFiber.props.text);
  } else if (currentFiber.tag === TAG_HOST) { // 原生节点
    const stateNode =  document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props);
    return stateNode;
  }
}

function updateDOM(updateDOM: any, oldProps: any, props: any) {
  setProps(updateDOM, oldProps, props);
}

/**
 * 更新根节点
 * @param updateHostRoot 
 */
function updateHostRoot(currentFiber: any) {
  // 1.先处理自己，如果是一个原生节点，创建真实DOM
  // 2.创建子Fiber
  const newChildren = currentFiber.props.children; // [element]
  reconcileChildren(currentFiber, newChildren);
}

/**
 * 协调子节点
 * @param currentFiber 当前的Fiber
 * @param newChildren  新的儿子
 */
function reconcileChildren(currentFiber: any, newChildren: any) {
  let newChildrenIndex = 0; // 新子节点的索引
  let prevSibling: any; // 上一个新的子Fiber
  while(newChildrenIndex < newChildren.length) {
    let newChild = newChildren[newChildrenIndex];
    let tag;
    if(newChild.type === ELEMENT_TEXT || typeof newChild === 'string') {
      tag = TAG_TEXT; // 文本节点
    } else if (typeof newChild.type === 'string') {
      tag = TAG_HOST; // 原生DOM节点
    }
    const newFiber = {
      tag,
      type: newChild.type,
      props: newChild.props,
      stateNode: null,
      return: currentFiber, // 父Fiber
      effectTag: PLACEMENT, // 副作用标识 render 要收集副作用，添加、删除、更新
      nextEffect: null, // todo：effect list也是一个单链表，effect list的顺序和完成顺序是一样的，但是节点可以少
    }
    //!!! 最小的儿子没有弟弟
    if(newFiber) {
      if(newChildrenIndex === 0) { // 如果当前索引为0，说明是第一个儿子
        currentFiber.child = newFiber;
      } else { // 不是第一个儿子
        prevSibling.sibling = newFiber; // 第一个儿子的 sibling指向第二个儿子
      }
      prevSibling = newFiber;
    }
    newChildrenIndex++;
  }
}

// React 告诉浏览器，现在有任务请你在空闲的时候执行
// todo:优先级的概念，expirationTime
(window as any).requestIdleCallback(workLoop, { timeout: 500 });