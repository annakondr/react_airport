import React from 'react';

function Time(props) {
  const date =  new Date(props.time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return (
    <td>{`${hours}:${minutes < 10 ? '0'+ minutes : minutes}`}</td>
  );
}

export default Time;
