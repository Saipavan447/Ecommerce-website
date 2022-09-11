import {formatDistanceToNow} from 'date-fns'

import './index.css'

const ReviewItem = props => {
  const {reviewDetails} = props
  const {id, name, review, isLiked, initialClassName, date} = reviewDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'like-button'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{review}</p>
        </div>
      </div>
      <div className="buttons-container-review">
        <div className="like-container-review">
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLike}
          >
            <img src={likeImageUrl} alt="like" className="like-image" />
            Like
          </button>
        </div>
        <button
          className="delete-button"
          type="button"
          onClick={onDeleteComment}
          testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default ReviewItem
