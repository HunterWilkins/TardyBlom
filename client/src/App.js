import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import {GlobalContextProvider} from "./utils/GlobalContext";
import Main from "./components/Main";
import './App.css';
import Frontpage from "./pages/Frontpage/index.js";
import Article from "./pages/Article";
import ArticleList from "./pages/ArticleList";
import Dropdown from "./components/Dropdown";
import { useEffect, useState } from "react";

function App() {
  const [mobileWidth, setMobileWidth] = useState(window.innerWidth < 585);
  const [darkMode, setDarkMode] = useState(true);
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

  function handlePostScroll() {

  }

  return (
    <div id = "content" className = {darkMode ? "dark-mode" : "light-mode"}>
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
              <Route exact path = "/genres/:genre" component = {ArticleList}/>
              <Redirect from = "/" to = "/home" />
            </Switch>
            <hr />
            <Footer />
        </Main>
        
        </GlobalContextProvider>
    </Router>
   
    </div>
  );
}

export default App;
