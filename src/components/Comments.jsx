import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import Votes from './Votes';

class Comments extends Component {
    state = {
        deleted_comments: []
    }
    render() {
        return <div className='comments'>
           {this.props.comments ? <div>{this.props.comments.sort((a, b) => { return moment.utc(b.created_at).diff(moment.utc(a.created_at)) }).map((comment, index) => {
                return <div key={'c' + index}>{!this.state.deleted_comments.includes(comment._id) ? <div className='comment'>
                    <div className='user'>
                        <img className='comment_avatar' src={comment.created_by.avatar_url} onError={(e) => { e.target.src = 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png' }} alt='avatar' />
                        <div>posted by <strong>{comment.created_by.username}</strong> {moment(comment.created_at).fromNow()}</div>
                    </div><p>{comment.body}</p>
                    {this.props.user === comment.created_by.username ? <button className='delete_button' onClick={() => { this.deleteComment(comment._id) }} >Delete comment</button> : null}
                    <Votes obj={comment} section='comments' />
                </div> : null}</div>
            })}</div> : <h3>This article has no comments yet</h3>}
        </div>

    }

    deleteComment = (commentId) => {
        api.deleteComment(commentId)
            .then(data => {
                this.setState({
                    deleted_comments: [
                        ...this.state.deleted_comments,
                        data.data.comment_deleted._id
                    ]
                })
            })
    }
}

export default Comments;