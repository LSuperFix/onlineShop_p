import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  totalPrice: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if(findItem) {
        findItem.count ++
      } else {
        state.items.push({...action.payload, count: 1})
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
    },
    plusItem: (state, action) => {
      const findItem = state.items.find(item => item.id === action.payload)
      if(findItem) {
        findItem.count ++
      }
    },
    mimusItem: (state, action) => {
      const findItem = state.items.find(item => item.id === action.payload)
      if(findItem.count > 0) {
        findItem.count --
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clerItems: (state) => {
      state.items = []
      state.totalPrice = 0
    }
  }
})

export const selectorCartItem = id => state => state.cart.items.find(obj => obj.id === id)

export default cartSlice.reducer

export const {addItem, removeItem, clerItems, plusItem, mimusItem} = cartSlice.actions