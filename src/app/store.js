import { configureStore } from '@reduxjs/toolkit'
import locationReducer from '../Context/inputSlice'
import transferReducer from '../Context/dispatchSlice'
import weatherReducer from '../Context/weatherSlice'
export const store = configureStore({
  reducer: {
    location: locationReducer,
    transfer: transferReducer,
    weather: weatherReducer
  },
})