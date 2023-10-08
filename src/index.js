import React from 'react';
import ReactDOM from 'react-dom';
import Tetris from './components/Tetris';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(<Tetris />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
/*
import { lang_tetris as lang_obj } from './lang';
const buttons = [];
const langs = ['tr', 'en'];
for (let i = 0; i < 2; i++) {
    buttons.push(document.createElement('button'));
    buttons[i].setAttribute('lang-name', langs[i]);
    buttons[i].onclick = event => {
        let lang = event.target.getAttribute('lang-name');
        try { localStorage.setItem('lang', lang); } catch (e) { }
        for (const element of document.querySelectorAll('[lang-tag]')) {
            let value = lang_obj[lang][element.getAttribute('lang-tag')]
            if (element.placeholder) element.placeholder = value;
            else element.textContent = value;
        }
    };
    buttons[i].innerText = langs[i];
    buttons[i].style.zIndex = 3;
    buttons[i].style.bottom = 0;
    buttons[i].style.position = 'fixed';
    buttons[i].style.left = 70 * i + 'px';
    document.body.appendChild(buttons[i]);
}
*/