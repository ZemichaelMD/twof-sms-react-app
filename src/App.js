import {Route, Switch } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
//My UI
import LoginUI from "./components/login";
import HandleRole from "./auth/handleRole";

const queryClient = new QueryClient()

export default function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
</>
  );
}
