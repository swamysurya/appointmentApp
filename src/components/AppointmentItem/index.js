import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, dateOfAppointment, isStared} = appointmentDetails
  const starImageUrl =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const staredImageUrl =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const staredImage = isStared ? staredImageUrl : starImageUrl

  const starChange = () => {
    toggleStar(id)
  }
  const appDate = format(
    new Date(dateOfAppointment[0], dateOfAppointment[1], dateOfAppointment[2]),
    'dd MMMM yyyy, EEEE',
  )
  return (
    <li className="liElement">
      <div className="titleStar">
        <p className="titleName">{title}</p>
        <button
          className="starBtn"
          type="button"
          data-testid="star"
          onClick={starChange}
        >
          <img className="starImage" src={staredImage} alt="star" />
        </button>
      </div>
      <p className="dateOfAppointmentPara">Date: {appDate}</p>
    </li>
  )
}

export default AppointmentItem
