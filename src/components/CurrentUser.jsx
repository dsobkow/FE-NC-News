import React, { Component } from 'react';
import * as api from '../api';

class CurrentUser extends Component {
    state = {
        user: {}
    }
    render() {
        return <div className='current_user'>
            Logged in as: <strong>{this.state.user.username}</strong><img className='current_user_avatar' src={this.state.user.avatar_url} onError={(e) => { e.target.src = 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png' }} alt='avatar' />
        </div>
    }
    componentDidMount() {
        api.getUserData(this.props.user)
            .then(user => {
                this.setState({ user })
            })
    }

}

export default CurrentUser;