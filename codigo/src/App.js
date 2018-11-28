import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import Content from './components/Content';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Content />
      </div>
    );
  }
}

export default App;