import React from 'react';
import RowFlight from './RowFlight';
import './TableFlights.css'

function TableFlights(props) {
  return (
    <table className='schedule'>
      <thead>
      <tr>
        <th>Terminal</th>
        {props.display === 'departure' ? <th>Gate</th> : null}
        <th>Local time</th>
        <th>Destination</th>
        <th>Airline</th>
        <th>Flight</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      {props.listOfFlights.sort((a, b) => (a.timeDepExpectCalc || a.timeToStand) < (b.timeDepExpectCalc || b.timeToStand))
        .map(item => <RowFlight key={item.ID} flightData={item} display={props.display}/>)}
      </tbody>
    </table>
  );
}

export default TableFlights;

