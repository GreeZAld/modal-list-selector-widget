import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import SelectWindow from './component/SelectWindow';
import SelectedItems from './component/SelectedItems';
import './App.css';

function App() {

  const [items, setItems] = useState();
  const [isShown, setIsShown] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setItems(() => {
      let values = [];
      for(let i=0; i<1000;i++) {
        values.push("Item"+(i+1));
      }
      return values;
    })
  }, [])


  const toggleModal = () => {
    setIsShown(!isShown);
  }

  const cancelHandler = () => {
    toggleModal();
    setSelectedItems([]);
  }


  const selectItem = (e) => {
    // let i = e.target.innerHTML;
    setSelectedItems(selectedItems.concat(e.target.innerHTML));
    console.log(selectedItems);
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <Button variant="contained" color="primary" onClick={toggleModal}>Change</Button>
      <SelectWindow items={items} selected={selectedItems} open={isShown} handleClose={cancelHandler} handleSelect={selectItem}/>
      <SelectedItems items={selectedItems} />
    </div>
  );
}

export default App;
