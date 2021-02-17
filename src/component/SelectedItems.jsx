import React from 'react';

function SelectedItems(props) {
  return (
    <div>
      <h3>Selected Items:</h3>
      <div className="selected-items-wrapper">
        {props.items.map(item => {
          return (
            <div className="single-selected-item">
              {item.value}
              <span id={item.id} className="item-cross-icon" onClick={props.handleDelete}></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SelectedItems;
