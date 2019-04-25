import React, { Component } from 'react';
import Board from './board/';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div className='app'>
              <h1>Ideas NotePad</h1>
              <Board />
            </div>
        );
    }
}
