import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './pagesScript/Login';
import Plantilla from './pagesScript/Plantilla';

const AppContext = React.createContext({ 
    user:'',
    xaccesstoken:'',
    setToken: () =>{} 
});
export const ContextProvider = AppContext.Provider;
export const ContextConsumer = AppContext.Consumer;
class App extends Component {    

    setToken = token =>{
        this.setState({xaccesstoken: token})
    }

    constructor(props){
        super(props);
        this.state={
            user:'',
            xaccesstoken:'',
            setToken: this.setToken 
        }
    }

    render() {
        return (
            <ContextProvider value={this.state}>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route component={Plantilla} />
            </Switch>
            </ContextProvider>
        );
    }
}

export default App;
