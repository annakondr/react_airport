import React from 'react';
import Airlines from './Airlines';
import Time from './Time';

function RowFlight(props) {
  return (
      <tr>
        <td className='terminal'>
          <p className={props.flightData.term === 'A' ? 'green' : 'blue'}>
            {props.flightData.term}
          </p>
        </td>
        {props.display === 'departure' ? <td>{props.flightData.gateNo}</td> : null}
        <Time time={props.flightData.timeDepExpectCalc ?
          props.flightData.timeDepExpectCalc : props.flightData.timeToStand}/>
        <td>{props.flightData['airportToID.city_en'] ?
          props.flightData['airportToID.city_en'] : props.flightData['airportFromID.city_en'] }</td>
        <Airlines list={props.flightData.codeShareData}/>
        <td>{props.flightData.status}</td>
      </tr>
  );
}

export default RowFlight;
