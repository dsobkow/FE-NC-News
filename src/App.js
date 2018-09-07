import React, { Component } from 'react';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import Articles from './components/Articles';
import Article from './components/Article';
import CurrentUser from './components/CurrentUser';
import User from './components/User';
const logo = require('./logo.png')

class App extends Component {
  state = {
    loggedIn: 'jessjelly'
  }
  render() {
    return (
      <div className="App">
        <img className='nc_logo' src={logo} alt='northcoders logo' />
        <CurrentUser user={this.state.loggedIn} />
        <h1 className='app_name'>NORTHCODERS NEWS</h1>
        <div className='topics'>
          <p className='browse'> Browse by topics:</p>
          <NavLink className='topic' to='/topics/football'>Football</NavLink>{' || '}
          <NavLink className='topic' to='/topics/coding'>Coding</NavLink>{' || '}
          <NavLink className='topic' to='/topics/cooking'>Cooking</NavLink>{' || '}
          <NavLink className='topic' to='/articles'>All</NavLink>
          <Switch>
            <Route exact path='/' component={Articles} />
            <Route exact path='/articles' component={Articles} />
            <Route path='/topics/:topic' render={({ match }) => <Articles user={this.state.loggedIn} match={match} />} />
            <Route exact path='/articles/:article_id' render={({ match }) => <Article user={this.state.loggedIn} match={match} />} />
            <Route path='/users/:username' render={({ match }) => <User match={match}/>}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
