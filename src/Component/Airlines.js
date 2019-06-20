import React, {Fragment} from 'react';

function Airlines(props) {
  return (
    <Fragment>
      <td>
        {props.list.map(item => <span>{item.airline.en.name}<br/></span>)}
      </td>
      <td>
        {props.list.map(item => <span>{item.codeShare}<br/></span>)}
      </td>
    </Fragment>

      );
      }

      export default Airlines;
