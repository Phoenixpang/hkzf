import React from 'react'
import { BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom'
import Home from './pages/Home'
import City from './pages/City'
import Map from './pages/Map'
import NoMatch from './pages/NoMatch' 

class App extends React.Component{
  render(){
    return(
      <Router>
        <div>
          
         <Switch>
           <Redirect exact from="/" to="/home"/>
           <Route path="/home" component={Home}/>
           <Route path="/city" component={City}/>
           <Route path="/map" component={Map}/>
           <Route path="/noMatch" component={NoMatch}/>
         </Switch>
        </div>
      </Router>
      
    )
  }
}

export default App