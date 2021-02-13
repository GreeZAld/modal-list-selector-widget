import React from 'react';

function SelectedItems(props) {
    return (
        <div className="selected-items-wrapper">
        {props.items.map(item => {
          return <div key={item} className="single-selected-item">{item}</div>
        })}
      </div>
    )
}

export default SelectedItems;
