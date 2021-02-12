import React from 'react';
import SelectedItems from './SelectedItems';

function SelectWindow(props) {
    if (props.open === false) {
        return null;
    }

    return (
        <div className="modal-background">
            <div className="modal">
                <h3>Hello modal</h3>
                <div className="items-list">
                    {props.items.map(item => {
                        return <div className="single-item" onClick={props.handleSelect}>{item}</div>
                    })}
                </div>
                <button>Change</button>
                <button onClick={props.handleClose}>Cancel</button>
                <SelectedItems items={props.selected} />
            </div>
        </div>
    )
}

export default SelectWindow;
