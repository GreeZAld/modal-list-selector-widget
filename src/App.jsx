import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import SelectWindow from './component/SelectWindow';
import SelectedItems from './component/SelectedItems';
import './App.css';

function App() {

  const [items, setItems] = useState();
  const [isShown, setIsShown] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const [displayedItems, setDisplayedItems] = useState([]);
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
    setSearchResult(items)
  }

  const cancelHandler = () => {
    toggleModal();
    setSelectedItems([]);
  }

  const changeHandler = () => {
    setDisplayedItems(selectedItems);
    toggleModal();
  }

  const selectItem = (e) => {
    setSelectedItems(selectedItems.concat(e.target.innerHTML));
  }

  const inputHandler = (e) => {
    if(e.target.value.length > 0 ) {
      setSearchResult(items.filter(item => item.includes(e.target.value)))
    }
    else {
      setSearchResult(items);
    }
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <Button variant="contained" color="primary" onClick={toggleModal}>Change</Button>
      <SelectWindow items={searchResult} selected={selectedItems} open={isShown} handleClose={cancelHandler} handleChange={changeHandler} handleSelect={selectItem} handleInput={inputHandler} />
      <SelectedItems items={displayedItems} />
    </div>
  );
}

export default App;
