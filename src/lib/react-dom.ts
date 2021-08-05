import { scheduleRoot } from './schedule';
import { TAG_ROOT } from "./constants"

function render(element: any, container: any) {
  const rootFiber = {
    tag: TAG_ROOT, // 每一个fiber会有一个tag标识此元素的类型
    stateNode: container, // 一般情况下如果这个元素是一个原生节点的话，stateNode指向一个真实DOM元素
    // props.children 是一个数组，里面放的是 React元素即虚拟DOM，后面会根据每个虚拟DOM创建对应的Fiber
    props: {children: [element]}, // 这个fiber的属性对象children属性，里面放的是要渲染的元素
  }
  scheduleRoot(rootFiber);
}

const ReactDOM = {
  render
}

export {
  render
}

export default ReactDOM
