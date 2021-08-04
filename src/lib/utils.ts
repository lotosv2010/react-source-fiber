export function setProps(dom: any, oldProps: any, newProps: any) {
  for (const key in oldProps) {
    
  }
  for (const key in newProps) {
    if(key !== 'children') {
      setProp(dom, key, newProps[key]);
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
    dom.setAttribute(key, value);
  }
}