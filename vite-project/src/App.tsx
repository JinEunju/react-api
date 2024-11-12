import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "./List";
import Detail from "./Detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <List />} />
        <Route exact path="/post/:id" render={() => <Detail />} />
      </Switch>
    </Router>
  );
}

export default App;
