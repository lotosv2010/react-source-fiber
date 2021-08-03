import React from './lib/react'
// import {createElement} from 'react';
import ReactDOM from 'react-dom';

const element = (
  <div id="A1">A1
    <div id="B1">B1
      <div id="C1">C1</div>
      <div id="C2">C2</div>
    </div>
    <div id="B1">B2</div>
  </div>
);
console.log(element)
// const element = createElement('div', {id: 'A1'}, 'A1',
//   createElement('div', {id: 'B1'}, 'B1'),
//   createElement('div', {id: 'C1'}, 'C1'),
//   createElement('div', {id: 'C2'}, 'C2'),
//   createElement('div', {id: 'B2'}, 'B2')
// )

ReactDOM.render(element, document.querySelector('#root'));
