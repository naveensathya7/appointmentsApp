// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {markStar, id, title, isStarred, date} = appointmentDetails

  const onStar = () => {
    markStar(id)
  }
  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-item">
      <div className="topline">
        <p>{title}</p>
        <button
          data-testid="star"
          onClick={onStar}
          className="star"
          type="button"
        >
          <img alt="star" src={starImageUrl} />
        </button>
      </div>
      <p className="date">Date:{date}</p>
    </li>
  )
}
export default AppointmentItem
