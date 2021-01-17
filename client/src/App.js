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
import { useEffect, useState } from "react";

function App() {
  const [mobileWidth, setMobileWidth] = useState(window.innerWidth < 585);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  function handleResize() {
    if (window.innerWidth < 585 && !mobileWidth) {
      setMobileWidth(true);
    }
    else if (window.innerWidth >= 585 && mobileWidth) {
      setMobileWidth(false);
    }
  }

  return (
    <>
    <Router>
      <GlobalContextProvider>

        <Header mobileWidth = {mobileWidth}/>
        {
          mobileWidth ? 
          <Nav />
          :
          ""
        }
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
