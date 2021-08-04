import {createElement} from './lib/react';
import ReactDOM from './lib/react-dom';
// import {createElement} from 'react';
// import ReactDOM from 'react-dom';

const style = {border: '3px solid red', margin: '5px'}
// const element = (
//   <div id="A1" style={style}>A1
//     <div id="B1" style={style}>B1
//       <div id="C1" style={style}>C1</div>
//       <div id="C2" style={style}>C2</div>
//     </div>
//     <div id="B1" style={style}>B2</div>
//   </div>
// );
const element = createElement('div', {style, id: 'A1'}, 'A1',
  createElement('div', {style, id: 'B1'}, 'B1', 
    createElement('div', {style, id: 'C1'}, 'C1'),
    createElement('div', {style, id: 'C2'}, 'C2')
  ),
  createElement('div', {style, id: 'B2'}, 'B2'),
)
console.log(element)
ReactDOM.render(element, document.querySelector('#root'));
