import {Route, Switch } from "react-router-dom";
//My UI
import LoginUI from "./components/login";
import HandleRole from "./auth/handleRole";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HandleRole} />
        <Route exact path="/login" component={LoginUI} />
        <Route
          path="*"
          component={() => {
            return (
              <h1 style={{ margin: "100px", textAlign: "center" }}>
                404 <br />
                No such page
              </h1>
            );
          }}
        />
      </Switch>
    </div>
  );
}
