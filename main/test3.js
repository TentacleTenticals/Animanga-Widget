import {El} from '../base/classes/m.js';

export const testing = () => {
  console.log('DEFAULT!!!');
  El.Div({
    path: document.body,
    text: 'LOL!!!'
  });
}
