import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import SelectedItems from './SelectedItems';

function SelectWindow(props) {
    const ref1 = useRef();

    if (props.open === false) {
        return null;
    }


    return (
        <div className="modal-background">
            <div className="modal">
                <h3>Hello modal</h3>
                <div className="items-list">
                    {
                        props.items.map(item => {
                            return <div key={item} className="single-item" onClick={props.handleSelect}>{item}</div>
                        })
                    }
                </div>
                <input ref={ref1} placeholder="Search" onChange={props.handleInput} />
                <SelectedItems items={props.selected} />
                <div className="modal-actions">
                    <Button color="primary" variant="contained" onClick={props.handleChange}>Change</Button>
                    <Button color="secondary" variant="contained" onClick={props.handleClose}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default SelectWindow;
