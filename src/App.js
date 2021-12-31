import * as React from 'react';
import {BrowserRouter,Route, Routes, NavLink} from 'react-router-dom';
import './App.css';
import Home from './components/Home.js';
import Create from './components/customer/Create.js'
import Edit from './components/customer/Edit.js'

class App extends React.Component{
  render()
  {
    return(
  
      <BrowserRouter>
        <div>
            <nav>
              <NavLink className = 'navBarLink' to= "/" > Existing Accounts</NavLink>
              <NavLink className = 'navBarLink' to= "/create" >Open Account</NavLink>
              <a href= "https://www.lntinfotech.com/news-events/" target="_blank"> News</a>

            </nav>
            <Routes>
              <Route path={'/'} element = { <Home/>} />
              <Route path={"/create"} element = { <Create/>} />
              <Route path= {"/edit/:id"} element = {<Edit/>} />          
            </Routes>
        </div>
      </BrowserRouter>
    
    )
  }
}

export default App;
