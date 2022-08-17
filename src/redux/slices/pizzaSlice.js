import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
//import axios from "axios"

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (data) => {
  /*const {category, orderBy, order, search, currentPage} = params
    const {data} = await axios.get(`https://629b5375656cea05fc374b90.mockapi.io/items?${category}&orderBy=${orderBy}&order=${order}&${search}&page=${currentPage}&limit=4`)
  console.log(data)*/
  return data
})

const initialState = {
  items: [],
  status: ''
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    }
  },
  extraReducers: {
    [fetchPizza.pending]: (state) => {//идет отправка запроса
      state.status = 'loading'
      state.items = []
    },
    [fetchPizza.fulfilled]: (state, action) => {//запрос пришел
      state.status = 'success'
      state.items = action.payload
    },
    [fetchPizza.rejected]: (state) => {//ошибка запроса
      state.status = 'error'
      state.items = []
    }
  }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer