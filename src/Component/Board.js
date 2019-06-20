import React, { Component } from 'react';
import TableFlights from './TableFlights';
import './Board.css'

class Board extends Component {
  departure;

  constructor(props) {
    super(props);
    this.state = {
      display: 'departure',
      flightData: [],
      table: [],
      date: null,
      dateForTable: [],
      yesterdayToDisplay: '',
      todayToDisplay: '',
      tomorrowToDisplay: '',
    };
    this.changeDisplay = this.changeDisplay.bind(this);
    this.filterFlights = this.filterFlights.bind(this);
  }

  componentDidMount() {
    this.getDate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.date !== prevState.date) {
      this.loadApi(`https://api.iev.aero/api/flights/${this.state.date}`)
        .then(data => {
          this.setState(state => ({
            flightData: data,
            table: data.departure,
          }));
        })
    }
  }

  getDate(num = 0) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate() + num;
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    this.setState({
      date: `${currentDay}-${currentMonth}-${currentYear}`,
      dateForTable: [currentYear, currentMonth, currentDay],
    }, () => this.state);
  }

  loadApi(url) {
    return fetch(url)
      .then(resolve => resolve.json())
      .then(data => data.body)

  }

  changeDisplay(valueButton) {
    this.setState({
      display: valueButton.target.value,
      table: this.state.flightData[valueButton.target.value]
    }, () => this.state.table);

  }

  filterFlights(date) {
    return new Date(date).getDate();
  }

  render() {

    return (
      <>
        <div className='display'>
          <button onClick={this.changeDisplay} value='departure'
                  className={this.state.display === 'departure' ?
                    'active dep' : 'inactive dep'}>Departures</button>
          <button onClick={this.changeDisplay} value='arrival'
                    className={this.state.display === 'arrival' ?
                      'active arr' : 'inactive arr'}>Arrivals</button>
        </div>
        <div className='calendar'>
        </div>
        <div className='dayToDisplay'>
          <button onClick={this.getDate.bind(this, -1)}>
            Yesterday
          </button>
          <button onClick={this.getDate.bind(this, 0)} className='active'>
            Today
          </button>
          <button onClick={this.getDate.bind(this, 1)}>
            Tomorrow
          </button>
        </div>
        <TableFlights display={this.state.display} listOfFlights={this.state.table.filter(item =>
          item.timeDepExpectCalc ? (
            this.filterFlights(item.timeDepExpectCalc) === this.filterFlights(this.state.dateForTable)
          ) : (
            this.filterFlights(item.timeToStand) === this.filterFlights(this.state.dateForTable)
          )
        )}
        />
      </>
    );
  }
}

export default Board;
