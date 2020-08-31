import React from 'react'
import { Switch } from 'react-router-dom'
import DreamContext from './DreamContext'
import PrivateRoute from './components/Utils/PrivateRoute'
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import NewEntry from './components/NewEntry'

class App extends React.Component {
  state = {
    dreams: []
  }
  setDreams = (dreams) => {
    this.setState({
      dreams: dreams.filter(dream => !dream.archived),
    });
  };

  addDream = (dream) => {
    this.setState({
      dreams: [...this.state.dreams, dream],
    });
  };

  changeDream = (newDream) => {
    let filteredDreams = this.state.dreams.filter(dream => dream.id !== newDream.id)
    this.setDreams(filteredDreams)
    this.addDream(newDream)
  }
  
  render(){
    const contextValue = {
      dreams: this.state.dreams,
      setDreams: this.setDreams,
      addDream: this.addDream,
      changeDream: this.changeDream
    };

    
    return (
      <main className='App'>
        <DreamContext.Provider value={contextValue}>
          <Switch>
            <PublicOnlyRoute exact path="/" component={LandingPage}/>
            <PublicOnlyRoute path="/login" component={Login}/>
            <PublicOnlyRoute path="/register" component={Register} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/new-entry" component={NewEntry} />
          </Switch>
        </DreamContext.Provider>
      </main>
    )
  }
}

export default App;