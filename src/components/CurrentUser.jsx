import React, { Component } from 'react';
import * as api from '../api';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';

class CurrentUser extends Component {
    state = {
        user: {}
    }
    render() {
        return <div className='current_user'>
            Logged in as: <NavLink className='link' to={`/users/${this.state.user.username}`}><strong>{this.state.user.username}</strong></NavLink><img className='current_user_avatar' src={this.state.user.avatar_url} onError={(e) => { e.target.src = 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png' }} alt='avatar' />
        </div>
    }
    componentDidMount() {
        api.getUserData(this.props.user)
            .then(user => {
                this.setState({ user })
            })
    }
}

CurrentUser.propTypes = {
    user: propTypes.string
}

export default CurrentUser;