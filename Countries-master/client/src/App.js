import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from './components/home/Home';
import Create from './components/create/Create';
import Detail from './components/detail/Detail'
import Landing from './components/landing/Landing'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= "/" component = {Landing}/>
        <Route path= "/home" component = {Home}/>
        <Route path= "/activities" component= {Create}/>
        <Route path= "/countries/:id" component= {Detail}/>
      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
