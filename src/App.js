import React, { Component } from 'react';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import Articles from './components/Articles';
import Article from './components/Article';
//import User from './components/User';
const logo = require('./logo.png')

class App extends Component {
  state = {
    loggedIn: 'jessjelly'
  }
  render() {
    return (
      <div className="App">
        <img className='nc_logo' src={logo} alt='northcoders logo' />
        <h1>NORTHCODERS NEWS</h1>
        <div className='topics'>
          <p className='browse'> Browse by topics:</p>
          <NavLink className='topic' to='/topics/football'>Football</NavLink>{' || '}
          <NavLink className='topic' to='/topics/coding'>Coding</NavLink>{' || '}
          <NavLink className='topic' to='/topics/cooking'>Cooking</NavLink>
          <Switch>
          <Route exact path='/' component={Articles} />
          <Route exact path='/articles' component={Articles}/>
          <Route path='/topics/:topic' render={({ match }) => <Articles user={this.state.loggedIn}
          match={match}/>}/>
          <Route path='/articles/:article_id' component={Article}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
