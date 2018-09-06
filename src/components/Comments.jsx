import React, { Component } from 'react';
import * as api from '../api';
import moment from 'moment';
import Votes from './Votes';
import { isEqual } from 'lodash';

class Comments extends Component {
    state = {
        comments: []
    }
    render() {
        return <div className='comments'>
            {this.state.comments.sort((a, b) => {return moment.utc(b.created_at).diff(moment.utc(a.created_at))}).map((comment, index) => {
                return <div key={'c' + index} className='comment'>
                    <div className='user'>
                    <img className='comment_avatar' src={comment.created_by.avatar_url} onError={(e) => { e.target.src = 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png' }} alt='avatar' />
                    <div>posted by <strong>{comment.created_by.username}</strong> {moment(comment.created_at).fromNow()}</div>
                </div><p>{comment.body}</p>
                <Votes comments={comment}/>
                </div>
            })}
        </div>

    }

    componentDidMount = () => {
        this.fetchComments()
    }

    componentDidUpdate = (prevProps) => {
        if (!isEqual(this.props.newComment, prevProps.newComment)) {
            this.setState({
                comments: [
                    ...this.state.comments,
                    this.props.newComment
                ]
            })
        }
    }

    fetchComments = () => {
        const article_id = this.props.articleId;
        api.fetchCommentsForArticle(article_id)
            .then(comments => {
                this.setState({ 
                    comments })
            })
            .catch(console.log)
    }
}

export default Comments;