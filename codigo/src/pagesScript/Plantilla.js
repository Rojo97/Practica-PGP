import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Content from '../components/Content';

const e = React.createElement;
class Plantilla extends Component {
  render() {
    return e(
      <div>
        <Header />
        <Sidebar />
        <Content />
      </div>
    );
  }
}

const domContainer = document.querySelector('#plantilla');
ReactDOM.render(e(Plantilla), domContainer);