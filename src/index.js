import React, { render, Component } from './react';

// TODO：JSX
const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hi Fiber</p>
  </div>
);

const jsx2 = (
  <div>
    <div>Hello Vue</div>
    <p>Hi Fiber</p>
    <div>Hello Node</div>
  </div>
);

const root = document.getElementById('root');

// console.log(jsx);
// render(jsx, root);

// TODO：类组件
class Greating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "张三"
    }
  }
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <p>hahahaha</p>
        <p>{this.state.name}</p>
        <p><button onClick={() => this.setState({ name: "李四" })}>button</button></p>
      </div>
    )
  }
}

render(<Greating title="奥利给" />, root);

// TODO：函数组件
function FnComponent(props) {
  return <div>{props.title} FnComponent</div>
}

// render(<FnComponent title="Hello" />, root);


// TODO：组合
// render(<div>
//   <h4>title</h4>
//   <Greating title="奥利给" />
//   <FnComponent title="Hello" />
// </div>, root);

// TODO：更新节点
// render(jsx, root);

// setTimeout(() => {
//   render(jsx2, root);
// }, 2000);