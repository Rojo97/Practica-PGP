import React, { Component } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Content from '../components/Content';

class Plantilla extends Component {
  render() {
    return (
      <div class="hold-transition skin-purple sidebar-mini">
        <Header />
        <Sidebar />
        <Content />
      </div>
    );
  }
}

export default Plantilla;