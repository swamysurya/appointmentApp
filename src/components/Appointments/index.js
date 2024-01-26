// Write your code here
import {format} from 'date-fns'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const allAppointmentsList = []
class Appointments extends Component {
  state = {
    appointmentList: allAppointmentsList,
    titleInputValue: '',
    appointmentDate: [],
    dateForInput: '',
    staredFilter: false,
  }

  onChangeToggle = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  starredAppointments = () => {
    this.setState(prevState => ({staredFilter: !prevState.staredFilter}))
  }

  onChangeInputTitle = event => {
    this.setState({titleInputValue: event.target.value})
  }

  onChangeDateValue = event => {
    const dat = event.target.value
    console.log(event.target.value)
    const dateParts = dat.split('-')
    const year = parseInt(dateParts[0])
    const month = parseInt(dateParts[1]) - 1
    const day = parseInt(dateParts[2])
    const valueForDateInput = format(new Date(year, month, day), 'yyyy-MM-dd')
    console.log(valueForDateInput)
    this.setState({
      dateForInput: valueForDateInput,
    })
    this.setState({appointmentDate: [year, month, day]})
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInputValue, dateForInput, appointmentDate} = this.state
    console.log(dateForInput)
    if (titleInputValue !== '' && dateForInput !== '') {
      const newAppointment = {
        id: uuidv4(),
        title: titleInputValue,
        dateOfAppointment: appointmentDate,
        isStared: false,
      }
      console.log(newAppointment)
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        titleInputValue: '',
        dateForInput: '',
      }))
    }
  }

  render() {
    const {
      titleInputValue,
      appointmentList,
      staredFilter,
      appointmentDate,
      dateForInput,
    } = this.state
    const filterdList = staredFilter
      ? appointmentList.filter(eachAppointment => eachAppointment.isStared)
      : appointmentList

    const imageUrl =
      'https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png'

    const staredBtnColor = staredFilter ? 'btnColotChange' : ''

    return (
      <div className="appointmentsContainer">
        <div className="appointmentCard">
          <div className="formCard">
            <div>
              <h1>Add Appointments</h1>
              <form className="forms">
                <label htmlFor="Title">Title</label>
                <input
                  className="titleInput"
                  id="Title"
                  type="text"
                  placeholder="Title"
                  value={titleInputValue}
                  onChange={this.onChangeInputTitle}
                />
                <label htmlFor="dateId">Date</label>
                <input
                  className="dateInput"
                  id="dateId"
                  type="date"
                  value={dateForInput}
                  onChange={this.onChangeDateValue}
                />
                <button
                  className="addBtn"
                  value={appointmentDate}
                  type="submit"
                  onClick={this.addAppointment}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="imageContainer">
              <img src={imageUrl} alt="appointments" className="imageSize" />
            </div>
          </div>
          <hr />
          <div className="listedBtnContainer">
            <h1 className="appHead">Appointments</h1>
            <button
              className={`staredBtn ${staredBtnColor}`}
              type="button"
              onClick={this.starredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="listView">
            {filterdList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                toggleStar={this.onChangeToggle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
