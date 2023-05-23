// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isFilterActive: false}

  filterStarred = () => {
    this.setState(prevState => ({isFilterActive: !prevState.isFilterActive}))
  }

  getFilteredAppointments = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  markStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachContact => {
        if (id === eachContact.id) {
          return {...eachContact, isStarred: !eachContact.isStarred}
        }
        return eachContact
      }),
    }))
  }

  onTitleChange = event => {
    event.preventDefault()
    if (event.target.value !== '') {
      this.setState({title: event.target.value})
    }
  }

  onDateChange = event => {
    event.preventDefault()
    if (event.target.value !== '') {
      this.setState({date: event.target.value})
    }
  }

  addAppointment = () => {
    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

      const newAppointment = {
        id: v4(),
        title,
        date: formattedDate,
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        name: '',
        date: '',
      }))
    }
  }

  render() {
    const filteredList = this.getFilteredAppointments()
    const {title, date, appointmentsList} = this.state
    return (
      <div className="bg-container">
        <div className="appointment-container">
          <div className="details">
            <div className="appointment">
              <h1>Add Appointment</h1>
              <label className="label" htmlFor="appointment-title">
                TITLE
              </label>
              <br />
              <input
                onChange={this.onTitleChange}
                placeholder="Title"
                id="appointment-title"
                className="title"
                type="text"
              />
              <br />
              <label className="label" htmlFor="appointment-date">
                DATE
              </label>
              <br />
              <input
                onChange={this.onDateChange}
                id="appointment-date"
                className="title"
                type="date"
              />
              <br />
              <button
                onClick={this.addAppointment}
                className="add-button"
                type="button"
              >
                Add
              </button>
            </div>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="appointments">
            <div>
              <h1>Appointments</h1>
              <button type="button" onClick={this.filterStarred}>
                Starred
              </button>
              <ul className="lists">
                {filteredList.map(eachAppointment => (
                  <AppointmentItem
                    key={eachAppointment.id}
                    appointmentDetails={eachAppointment}
                    markStar={this.markStar}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
