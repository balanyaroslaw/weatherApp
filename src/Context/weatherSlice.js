import { createSlice } from '@reduxjs/toolkit'
const MAX_LENGTH = 4;
export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherCurrentData:[],
    weatherWeekforecast:[],
    weatherDayforecast:[]
  },
  reducers:{
    setCurrentWeather:
    {
        reducer(state, action)
        {
            if(state.weatherCurrentData.length <= MAX_LENGTH)
            {
                state.weatherCurrentData.unshift(action.payload.currentWeather)
            }
            return state
        },
        prepare(currentWeather)
        {
            return(
            {
                payload:
                {
                  currentWeather
                }
            })
        }
      },
      setWeekforecast:{
        reducer(state, action)
        {
          if(state.weatherWeekforecast.length <= MAX_LENGTH)
          {
            state.weatherWeekforecast.unshift(action.payload.weekforecastData)
          }
        },
        prepare(weekforecastData)
        {
          return{
              payload:
              {
                weekforecastData
              }
            }
        }
      },
      setDayforecast:{
        reducer(state, action)
        {
          if(state.weatherDayforecast.length <= MAX_LENGTH)
          {
            state.weatherDayforecast.unshift(action.payload.dayforecastData)
          }
        },
        prepare(dayforecastData)
        {
          return{
              payload:
              {
                dayforecastData
              }
            }
        }
      },
      deleteCurrentWeather:{
        reducer(state, action)
        {
            state.weatherCurrentData = state.weatherCurrentData.filter((_, index)=>index!==action.payload.indexItem)
            return state
        },
        prepare(indexItem)
        {
          return{
              payload:
              {
                indexItem
              }
            }
        }
      },
      deleteWeekforecast:{
        reducer(state, action)
        {
            state.weatherWeekforecast = state.weatherWeekforecast.filter((_, index)=>index!==action.payload.indexItem)
            return state
        },
        prepare(indexItem)
        {
          return{
              payload:
              {
                indexItem
              }
            }
        }
      },
      deleteDayforecast:{
        reducer(state, action)
        {
            state.weatherDayforecast = state.weatherDayforecast.filter((_, index)=>index!==action.payload.indexItem)
            return state
        },
        prepare(indexItem)
        {
          return{
              payload:
              {
                indexItem
              }
            }
        }
      },
    }
})
export const getWeather = (state) => state.weather.weatherCurrentData
export const getWeekforecast = (state) => state.weather.weatherWeekforecast
export const getDayforecast = (state) => state.weather.weatherDayforecast
export const { setCurrentWeather } = weatherSlice.actions
export const { setWeekforecast } = weatherSlice.actions
export const { setDayforecast } = weatherSlice.actions
export const {deleteCurrentWeather} = weatherSlice.actions
export const {deleteWeekforecast} = weatherSlice.actions
export const {deleteDayforecast} = weatherSlice.actions
export default weatherSlice.reducer