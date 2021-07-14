import AdminContainer from "./components/admin-container";
import NavBar from "./nav";
import { withRouter, Route, Switch } from 'react-router-dom'
import LoginUI from "./components/auth/login";
import ProtectedRoute from './components/auth/ProtectedRoute'

export default function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path='/login' component={LoginUI} />

        <ProtectedRoute exact path='/Admin' component={AdminContainer}/>

        <Route path='*' component={() => { return <h1 style={{ margin: '100px', textAlign: 'center' }}>404 <br />No such page</h1> }} />
      </Switch>
    </div>
  );
}


