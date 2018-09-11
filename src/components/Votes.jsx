import React, { Component } from 'react';
import * as api from '../api';
import propTypes from 'prop-types';

class Votes extends Component {
    state = {
        direction: '',
        voteChange: 0
    }
    render() {
        const section = this.props.section;
        return <div className={`${section}_votes`}>
            {this.state.voteChange === 0 ? <div className={`${section}_voting`}>
                <div className={`${section}_vote_arrow`} id={`${section}_up`}><i onClick={() => this.voteOnArticle('up')} className='fas fa-arrow-circle-up'></i></div>
                <p className={`${section}_vote`}>{this.props.obj.votes + this.state.voteChange}</p>
                <div className={`${section}_vote_arrow`} id={`${section}_down`}><i onClick={() => this.voteOnArticle('down')} className='fas fa-arrow-circle-down'></i></div>
            </div> : <div className={`${section}_voting`}><div className={`${section}_voted_desc`}>Votes</div><p className='voted'>{this.props.obj.votes + this.state.voteChange}</p><button className={`${section}_undo_button`} onClick={this.resetVote}>Undo</button></div>}
        </div>
    }

    voteOnArticle = (direction) => {
        api.voteOnArticle(this.props.obj._id, direction, this.props.section)
        this.setState({
            voteChange: direction === 'up' ? 1 : direction === 'down' ? -1 : 0,
            direction
        })
    }
    resetVote = () => {
        if (this.state.direction === 'up') api.voteOnArticle(this.props.obj._id, 'down', this.props.section);
        else if (this.state.direction === 'down') api.voteOnArticle(this.props.obj._id, 'up', this.props.section);
        this.setState({
            direction: '',
            voteChange: 0
        })
    }
}

Votes.propTypes = {
    obj: propTypes.object,
    section: propTypes.string
}

export default Votes;