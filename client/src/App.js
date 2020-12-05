import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = "/home" component = {Home} />
        <Route exact path = "/test" component = {Test} />
        <Redirect from = "/" to = "/home" />
      </Switch>
    </Router>
  );
}

export default App;
