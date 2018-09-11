import React, { Component } from 'react';
import * as api from '../api';
import propTypes from 'prop-types';

class AddComment extends Component {
    state = {
        comment_body: '',
        comment_added: false
    }
    render() {
        return <div className='add_comment'>
            <label>Add a comment: </label>
            <textarea wrap='soft' onChange={this.handleInput} value={this.state.comment_body} className='comment_input' /><br />
            {this.state.comment_added ? <div className='comment_added' >Your comment has been added</div> : null}
            <div className='button_div'><button onClick={this.addComment} className='submit_comment'>Submit</button></div>
        </div>
    }

    handleInput = (event) => {
        this.setState({
            comment_body: event.target.value
        })
    }

    addComment = () => {
        if (this.state.comment_body !== '') {
            api.getUserData(this.props.user)
                .then(user => {
                    const newComment = {
                        body: this.state.comment_body,
                        created_by: user._id,
                        belongs_to: this.props.articleId
                    }
                    return api.addNewComment(this.props.articleId, newComment)
                })
                .then((comment) => {
                    this.setState({
                        comment_added: true,
                        comment_body: ''
                    })
                    setTimeout(() => {
                        this.setState({
                            comment_added: false
                        })
                    }, 3000)
                    this.props.saveNewComment(comment)
                })
        }
    }
}

AddComment.propTypes = {
    saveNewComment: propTypes.func,
    user: propTypes.string,
    articleId: propTypes.string
}

export default AddComment;
