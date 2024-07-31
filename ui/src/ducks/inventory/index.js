import axios from 'axios'
import { openSuccess } from '../alerts'
import { createAction, handleActions } from 'redux-actions'


//Inventory actions
const actions = {
  INVENTORY_GET_ALL: 'inventory/get_all',
  INVENTORY_GET_ALL_PENDING: 'inventory/get_all_pending',
  INVENTORY_SAVE: 'inventory/save',
  INVENTORY_DELETE: 'inventory/delete',
  INVENTORY_UPDATE: 'inventory/update',
  INVENTORY_REFRESH: 'inventory/refresh'
}

//Default
let defaultState = {
  all: [],
  fetched: false,
}

//Gets all inventory
const findInventory = createAction(actions.INVENTORY_GET_ALL, () =>
  (dispatch, getState, config) => axios
    .get(`${config.restAPIUrl}/inventory`)
    .then((suc) => dispatch(refreshInventory(suc.data)))
)

//Adds new inventory
const saveInventory = createAction(actions.INVENTORY_SAVE, (inventory) =>
  (dispatch, getState, config) => axios
    .post(`${config.restAPIUrl}/inventory`, inventory)
    .then((suc) => {
      const invs = []
      getState().inventory.all.forEach(
        inv => {
        //Pushes every item that doesn't have same id
          if (inv.id !== suc.data.id) {
            invs.push(inv)
          }
        }
      )
      //Sends to get sorted and dispatched
      invs.push(suc.data)
      dispatch(refreshInventory(invs))
    })
)

const deleteInventory = createAction(actions.INVENTORY_DELETE, (ids) =>
  (dispatch, getState, config) => axios
    .delete(`${config.restAPIUrl}/inventory`, { data: ids })
    .then((suc) => {
      const invs = []
      getState().inventory.all.forEach(inv => {
        //Pushes every item that does not have an id in the ids we're looking for
        if (!ids.includes(inv.id)) {
          invs.push(inv)
        }
      })
      dispatch(refreshInventory(invs))
    })
)

const updateInventory = createAction(actions.INVENTORY_UPDATE, (inventory, ids) =>
  //Calls update
  (dispatch, getState, config) => axios
    .put(`${config.restAPIUrl}/inventory`, ids, inventory)
    .then((suc) => dispatch(refreshInventory(suc.data)))
)

const refreshInventory = createAction(actions.INVENTORY_REFRESH, (payload) =>
  (dispatch, getState, config) => {
    //Sorts inventory
    dispatch(openSuccess('success'))
    return payload.sort((inventoryA, inventoryB) =>
      inventoryA.name < inventoryB.name ? -1 : inventoryA.name > inventoryB.name ? 1 : 0)
  }
)

export default handleActions({
  [actions.INVENTORY_GET_ALL_PENDING]: (state) => ({
    ...state,
    //Sets state to false
    fetched: false
  }),
  [actions.INVENTORY_REFRESH]: (state, action) => ({
    ...state,
    //Sets state to true(will be for all methods since all call refresh)
    all: action.payload,
    fetched: true,
  })
}, defaultState)

export { defaultState, findInventory, saveInventory, deleteInventory, updateInventory, refreshInventory }