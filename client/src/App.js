import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Literature from "./pages/Literature";
import './App.css';

function App() {
  return (
    <Router>
      <div id = "content">
        <Header />
        <Nav />
        <Main>
        <hr />
          <Switch>
            <Route exact path = "/home" component = {Home} />
            <Route exact path = "/literature" component = {Literature} />
            <Redirect from = "/" to = "/home" />
          </Switch>
        </Main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
