import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/login";
import NavBarContainer from "./components/nav-bar-container";


function App() {
  return (

    <Router>
      <div>
      This is a test
      </div>
      <Switch>
        <Route path='/' exact component = {NavBarContainer}/>
        <Route path='/login' exact component = {Login}/>
      </Switch>
    </Router>
  );
}

export default App;
