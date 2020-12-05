import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import {GlobalContextProvider} from "./utils/GlobalContext";
import Main from "./components/Main";
import './App.css';
import Frontpage from "./pages/Frontpage/index.js";

function App() {
  return (
    <Router>
      <div id = "content">
      <GlobalContextProvider>

        <Header />
        <Nav />
        <Main>
            <hr />
            <Switch>
              <Route exact path = "/:medium" component = {Frontpage} />
              
              <Redirect from = "/" to = "/" />
            </Switch>
        </Main>
        <Footer />
        </GlobalContextProvider>
      </div>
    </Router>
  );
}

export default App;
