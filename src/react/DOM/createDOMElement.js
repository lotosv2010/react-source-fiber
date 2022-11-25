import updateNodeElement from './updateNodeElement';

export default function createDOMElement(virtualDOM) {
  let newElement = null;
  if(virtualDOM.type === 'text') {
    // 创建文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 创建元素节点
    newElement = document.createElement(virtualDOM.type);
    // 更新元素属性
    updateNodeElement(newElement, virtualDOM);
  }
  return newElement;
}