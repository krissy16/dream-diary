import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import NewEntry from './components/NewEntry'

class App extends React.Component {
  render(){
    return (
      <main className='App'>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/new-entry" component={NewEntry} />
        </Switch>
      </main>
    )
  }
}

export default App;