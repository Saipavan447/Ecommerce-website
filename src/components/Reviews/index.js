import {Component} from 'react'
import {v4} from 'uuid'

import ReviewItem from '../ReviewItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Reviews extends Component {
  state = {
    nameInput: '',
    reviewInput: '',
    reviewsList: [],
  }

  deleteReview = reviewId => {
    const {reviewsList} = this.state

    this.setState({
      reviewsList: reviewsList.filter(review => review.id !== reviewId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      reviewsList: prevState.reviewsList.map(eachReview => {
        if (id === eachReview.id) {
          return {...eachReview, isLiked: !eachReview.isLiked}
        }
        return eachReview
      }),
    }))
  }

  renderReviewsList = () => {
    const {reviewsList} = this.state

    return reviewsList.map(eachReview => (
      <ReviewItem
        key={eachReview.id}
        reviewDetails={eachReview}
        toggleIsLiked={this.toggleIsLiked}
        deleteReview={this.deleteReview}
      />
    ))
  }

  onAddReview = event => {
    event.preventDefault()
    const {nameInput, reviewInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newReview = {
      id: v4(),
      name: nameInput,
      review: reviewInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      reviewsList: [...prevState.reviewsList, newReview],
      nameInput: '',
      reviewInput: '',
    }))
  }

  onChangeReviewInput = event => {
    this.setState({
      reviewInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  render() {
    const {nameInput, reviewInput, reviewsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Reviews</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddReview}>
              <p className="form-description">Review Product</p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                value={reviewInput}
                onChange={this.onChangeReviewInput}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Review
              </button>
            </form>
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{reviewsList.length}</span>
            Reviews
          </p>
          <ul className="comments-list">{this.renderReviewsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Reviews
