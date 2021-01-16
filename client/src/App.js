import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import {GlobalContextProvider} from "./utils/GlobalContext";
import Main from "./components/Main";
import './App.css';
import Frontpage from "./pages/Frontpage/index.js";
import Article from "./pages/Article";
import Dropdown from "./components/Dropdown";

function App() {
  return (
    <>
    <Router>
      <GlobalContextProvider>

        <Header />
        <Nav />
       
        <Main> 
            <hr style = {{borderColor: "var(--comp-color-2)"}}/>

            <Switch>
              <Route exact path = "/home" component = {Frontpage} />
              <Route exact path = "/article/:title" component = {Article} />
              <Redirect from = "/" to = "/home" />
            </Switch>
            <hr />
            <Footer />
        </Main>
        
        </GlobalContextProvider>
    </Router>
   
    </>
  );
}

export default App;
