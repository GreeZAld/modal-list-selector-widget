import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import SelectWindow from './component/SelectWindow';
import SelectedItems from './component/SelectedItems';
import './App.css';

function App() {

  const [items, setItems] = useState([]);                   //the whole items list
  const [isShown, setIsShown] = useState(false);            //status of the modal window
  const [searchResult, setSearchResult] = useState();       //list of items displayed in the scroll inside the modal
  const [displayedItems, setDisplayedItems] = useState([]); //items displayed on the main page
  const [selectedItems, setSelectedItems] = useState([]);   //items displayed at the bottom of modal, not final, because can be cancelled


  //effect hook acting like componentDidMount, filling the initial state with full list of items and getting displayed ones from localStorage
  useEffect(() => {
    setItems(localStorage.getItem('all') ? JSON.parse(localStorage.getItem('all')) : () => {
      let values = [];
      for (let i = 0; i < 1000; i++) {
        values.push({ id: i + 1, value: "Item" + (i + 1), isChecked: false });
      }
      return values;
    });
    setDisplayedItems(JSON.parse(localStorage.getItem('displayed')) || []);
  }, [])


  //switching the modal state (open/closed)
  const toggleModal = () => {
    setIsShown(!isShown);
    setSearchResult(items);
    setSelectedItems(displayedItems);
  }

  //handles the "Cancel" button in the modal click, doesn't change displayed items, closes the modal
  const cancelHandler = () => {
    toggleModal();
    setSelectedItems([]);
  }

  //handles the "Save" button in the modal click, update displayed items, closes the modal
  const saveHandler = () => {
    setDisplayedItems(selectedItems);
    toggleModal();
    localStorage.setItem('displayed', JSON.stringify(selectedItems));
    localStorage.setItem('all', JSON.stringify(items));
  }

  //handles cross-sign click on the items of the main page, updates data in localStorage
  const deleteDisplayedHandler = (e) => {
    let displayed = Array.from(items);
    displayed.forEach(item => {
      if (item.id.toString() === e.target.id)
        item.isChecked = false;
    })
    setItems(displayed);
    setDisplayedItems(displayed.filter(item => item.isChecked === true));

    localStorage.setItem('displayed', JSON.stringify(displayed.filter(item => item.isChecked === true)));
    localStorage.setItem('all', JSON.stringify(items));
  }

  //handles cross-sign click on the items at the modal window
  const deleteSelectedHandler = (e) => {
    let selected = Array.from(items);
    selected.forEach(item => {
      if (item.id.toString() === e.target.id)
        item.isChecked = false;
    })
    setItems(selected);
    setSelectedItems(selected.filter(item => item.isChecked === true));

  }

  //handles checking/unchecking the box in the items list of modal, updates preview of selected items in the modal
  const selectItem = (e) => {
    let checked = Array.from(items);
    checked.forEach(item => {
      if (item.value === e.target.value) {
        item.isChecked = e.target.checked;
      }
    })
    setItems(checked);
    setSelectedItems(checked.filter(item => item.isChecked === true));
  }

  //working through the typing of text, finds items containing this value, not case-sensitive
  const inputHandler = (e) => {
    if (e.target.value.length > 0) {
      setSearchResult(searchResult.filter(item => item.value.toLowerCase().includes(e.target.value.toLowerCase())))
    }
    else {
      setSearchResult(items);
    }
  }

  //managing the selection of range via dropdown
  const filterSelectHandler = (e) => {
    let filtered = Array.from(searchResult);
    if (e.target.value === "null") {
      setSearchResult(items);
    }
    else {
      setSearchResult(filtered.filter(item => item.id > e.target.value));
    }
  }

  //handling click of the "Reset" button in the modal
  //returns the listed items to the initial state before any filters or search applied
  const resetHandler = () => {
    setSearchResult(items);
    document.getElementsByClassName('search-field')[0].value = '';
    document.getElementsByClassName('range-select')[0].value = 'null';
  }

  return (
    <div className="App">
      <SelectedItems items={displayedItems} handleDelete={deleteDisplayedHandler} />
      <Button
        className="main-change-button"
        variant="contained" color="primary"
        onClick={toggleModal}>
        Change
      </Button>
      <SelectWindow
        items={searchResult}
        selected={selectedItems}
        open={isShown}
        handleClose={cancelHandler}
        handleChange={saveHandler}
        handleCheck={selectItem}
        handleInput={inputHandler}
        handleDelete={deleteSelectedHandler}
        handleFilterSelect={filterSelectHandler}
        handleReset={resetHandler}
      />
    </div>
  );
}

export default App;
