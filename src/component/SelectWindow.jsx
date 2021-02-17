import React from 'react';
import Button from '@material-ui/core/Button';
import SelectedItems from './SelectedItems';

function SelectWindow(props) {

    if (props.open === false) {
        return null;
    }


    return (
        <div className="modal-background">
            <div className="modal">
                <h3>Hello modal</h3>
                <div className="modal-controls">
                    <input className="search-field" placeholder="Search" onChange={props.handleInput} />
                    <select className="range-select" onChange={props.handleFilterSelect}>
                        <option value="null">No filter</option>
                        <option value="10">{`>10`}</option>
                        <option value="100">{`>100`}</option>
                        <option value="200">{`>200`}</option>
                        <option value="300">{`>300`}</option>
                        <option value="400">{`>400`}</option>
                        <option value="500">{`>500`}</option>
                        <option value="600">{`>600`}</option>
                        <option value="700">{`>700`}</option>
                        <option value="800">{`>800`}</option>
                        <option value="900">{`>900`}</option>
                    </select>
                    <Button color="primary" variant="contained" onClick={props.handleReset}>Reset</Button>
                </div>
                <div className="items-list">
                    {
                        props.items.map(item => {
                            return <div key={item.id} className="single-item"><input className="item-checkbox" id={item.id} onChange={props.handleCheck} type="checkbox" checked={item.isChecked} value={item.value} disabled={props.selected.length < 3 ? false : !item.isChecked} />{item.value}</div>
                        })
                    }
                </div>
                <SelectedItems items={props.selected} handleDelete={props.handleDelete} />
                <div className="modal-actions">
                    <Button color="primary" variant="contained" onClick={props.handleChange}>Save</Button>
                    <Button color="secondary" variant="contained" onClick={props.handleClose}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default SelectWindow;
