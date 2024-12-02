import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


  function* fetchInventory() {
    try {
      const usersInventoryResponse = yield axios.get(`/api/inventory/user/inventory`);
      const usersHeldResponse = yield axios.get(`/api/inventory/user/held`);
      const usersConsumableResponse = yield axios.get(`/api/inventory/user/consumable`);
      const consumableResponse = yield axios.get(`/api/inventory/consumable`);
      const heldResponse = yield axios.get(`/api/inventory/held`);
      const rewardResponse = yield axios.get(`/api/user/rewards`);
      const allItemsResponse = yield axios.get(`/api/inventory/all/items`);
      const allRewardsResponse = yield axios.get(`/api/user/all/rewards`);
      yield put({
        type: 'SET_ALL_REWARDS',
        payload: allRewardsResponse.data
      });
      yield put({
        type: 'SET_ALL_ITEMS',
        payload: allItemsResponse.data
      });
      yield put({
        type: 'SET_USER_REWARDS',
        payload: rewardResponse.data
      });
      yield put({
        type: 'SET_CONSUMABLE_ITEMS',
        payload: consumableResponse.data
      });
      yield put({
        type: 'SET_HELD_ITEMS',
        payload: heldResponse.data
      });
      yield put({
        type: 'SET_USERS_INVENTORY',
        payload: usersInventoryResponse.data
      });
      yield put({
        type: 'SET_USERS_HELD',
        payload: usersHeldResponse.data
      });
      yield put({
        type: 'SET_USERS_CONSUMABLE',
        payload: usersConsumableResponse.data
      });
    } catch (error) {
      console.log('fetchInventory error:', error);
    }
  }

  function* buyItem(action) {
    // console.log('action.payload', action.payload);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/buy/item`,
        data: action.payload
      })
      yield put({
        type: 'FETCH_USER',
      })
    } catch (error) {
      console.log('Unable to put item into server', error);
    }
  }

  function* sellItem(action) {
    // console.log('action.payload', action.payload);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/sell/item/${action.payload.itemId}`,
        data: action.payload
      })
      yield put({
        type: 'SAGA_FETCH_IVENTORY',
      })
      yield put({
        type: 'FETCH_USER',
      })
    } catch (error) {
      console.log('Unable to sell item from server', error);
    }
  }

  function* useItem(action) {
    // console.log('action.payload', action.payload);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/use/item/${action.payload.itemId}`
      })
      yield put({
        type: 'SAGA_FETCH_IVENTORY',
      })
    } catch (error) {
      console.log('Unable to use item server', error);
    }
  }

  function* equipItem(action) {
    // console.log('action.payload', action.payload);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/equip/item`,
        data: action.payload
      })
      yield put({
        type: 'SAGA_FETCH_IVENTORY',
      })
      yield put({
        type: 'SAGA_FETCH_CHARACTERS',
      })
    } catch (error) {
      console.log('Unable to equip item to server', error);
    }
  }

  function* removeItem(action) {
    // console.log('action.payload', action.payload);
    try {
      const response = yield axios({
        method: 'PUT',
        url: `/api/inventory/remove/item`,
        data: action.payload
      })
      yield put({
        type: 'SAGA_FETCH_IVENTORY',
      })
      yield put({
        type: 'SAGA_FETCH_CHARACTERS',
      })
    } catch (error) {
      console.log('Unable to equip item to server', error);
    }
  }



  function* inventorySaga() {
    yield takeLatest('SAGA_FETCH_IVENTORY', fetchInventory);
    yield takeLatest('SAGA_BUY_ITEM', buyItem);
    yield takeLatest('SAGA_SELL_ITEM', sellItem);
    yield takeLatest('SAGA_USE_ITEM', useItem);
    yield takeLatest('SAGA_EQUIP_ITEM', equipItem);
    yield takeLatest('SAGA_REMOVE_ITEM', removeItem);
  }
  
  export default inventorySaga;