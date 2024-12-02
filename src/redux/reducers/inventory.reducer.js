import { combineReducers } from 'redux';


const consumables = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONSUMABLE_ITEMS':
        return action.payload;
      default:
        return state;
    }
  }

  const held = (state = [], action) => {
    switch (action.type) {
      case 'SET_HELD_ITEMS':
        return action.payload;
      default:
        return state;
    }
  }

  const allItems = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_ITEMS':
        return action.payload;
      default:
        return state;
    }
  }

  const inventory = (state = [{}], action) => {
    switch (action.type) {
      case 'SET_USERS_INVENTORY':
        return action.payload;
      default:
        return state;
    }
  }

  const usersConsumableItems = (state = [], action) => {
    switch (action.type) {
      case 'SET_USERS_CONSUMABLE':
        return action.payload;
      default:
        return state;
    }
  }

  const usersHeldItems = (state = [], action) => {
    switch (action.type) {
      case 'SET_USERS_HELD':
        return action.payload;
      default:
        return state;
    }
  }



export default combineReducers({
  consumables,
  held,
  allItems,
  inventory,
  usersConsumableItems,
  usersHeldItems,

  });
  