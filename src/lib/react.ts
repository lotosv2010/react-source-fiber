import {ELEMENT_TEXT} from './constants';

function createElement(type: any, config: any, ...children: Array<any>) {
  console.log(type, config, children);
  Reflect.deleteProperty(config, '__self');
  Reflect.deleteProperty(config, '__source');
  return {
    type,
    props: {
      ...config, // 兼容处理
      children: children.map(child => {
        return typeof child === 'object' ? child : {
          type: ELEMENT_TEXT,
          props: {
            text: child,
            children: []
          }
        }
      })
    }
  }
}

const React = {
  createElement
}

export {
  createElement
}

export default React