import React from 'react';

function SelectedItems(props) {
    return (
        <div>
        {props.items.map(item => {
          return <div>{item}</div>
        })}
      </div>
    )
}

export default SelectedItems;
