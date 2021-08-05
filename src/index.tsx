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

const element2 = createElement('div', {style, id: 'A1-new'}, 'A1-new',
  createElement('div', {style, id: 'B1-new'}, 'B1-new', 
    createElement('div', {style, id: 'C1-new'}, 'C1-new'),
    createElement('div', {style, id: 'C2-new'}, 'C2-new')
  ),
  createElement('div', {style, id: 'B2-new'}, 'B2-new'),
  createElement('div', {style, id: 'B3-new'}, 'B3-new'),
)
const btn = document.querySelector('#render1')
btn?.addEventListener('click', () => {
  ReactDOM.render(element2, document.querySelector('#root'));
})