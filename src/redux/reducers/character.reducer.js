import { combineReducers } from 'redux';



const userCharacters = (state = [{}], action) => {
  switch (action.type) {
    case 'SET_USER_CHARACTERS':
      return action.payload;
    default:
      return state;
  }
}

const starter = (state = [{}], action) => {
  switch (action.type) {
    case 'SET_STARTER':
      return action.payload;
    default:
      return state;
  }
}

const basicAttacks = (state = [], action) => {
  if (action.type === 'SET_BASIC_ATTACKS') {
    return action.payload
  }
  return state;
}


const levelEnemy = (state = [{}], action) => {
  if (action.type === 'SET_LEVEL_ENEMY') {
    return action.payload
  }
  return state;
}

const allCharacters = (state = [{}], action) => {
  switch (action.type) {
    case 'SET_ALL_CHARACTERS':
      return action.payload;
    default:
      return state;
  }
}





export default combineReducers({
  userCharacters,
  basicAttacks,
  levelEnemy,
  starter,
  allCharacters,
});
