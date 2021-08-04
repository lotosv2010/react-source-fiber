export function setProps(dom: any, oldProps: any, newProps: any) {
  for (const key in oldProps) {
    if(key !== 'children') {
      if(newProps.hasOwnProperty(key)) { // 老有新有，更新
        setProp(dom, key, newProps[key]);
      } else{ // 老有新无，删除
        dom.removeAttribute(key);
      }
    }
  }
  for (const key in newProps) {
    if(key !== 'children') {
      if(!oldProps.hasOwnProperty(key)) { // 老无新有，添加
        setProp(dom, key, newProps[key]);
      }
    }
  }
}

function setProp(dom: any, key: string, value: any) {
  if(/^on/.test(key)) {
    dom[key.toLowerCase()] = value;
  } else if(key === 'style') {
    for (const styleName in value) {
      dom.style[styleName] = value[styleName];
    }
  } else {
    console.log('setAttribute', dom)
    dom.setAttribute && dom?.setAttribute(key, value);
  }
}