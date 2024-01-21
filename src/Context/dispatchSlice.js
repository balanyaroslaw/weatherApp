import { createSlice } from '@reduxjs/toolkit'

export const transferSlice = createSlice({
  name: 'transfer',
  initialState: {
    transferData: false,
    temporaryCityName:"",
    forecastCity: "",
    forecastCityId:"",
  },
  reducers:{
      setTransfer:{
        reducer(state, action){
          state.transferData = action.payload.transferState
          return state
        },
        prepare(transferState){
          return{
              payload:{
                transferState
              }
          }
      }
      },
      setforecastCityName:{
        reducer(state, action){
          state.forecastCity = action.payload.forecastCityState
          return state
        },
        prepare(forecastCityState){
          return{
            payload:{
              forecastCityState
            }
          }
        }
      },
      setTemporaryCityName:{
        reducer(state, action){
          state.temporaryCityName = action.payload.temporary
          return state
        },
        prepare(temporary){
          return{
            payload:{
              temporary
            }
          }
        }
      },
      setforecastCityId:{
        reducer(state, action){
          state.forecastCityId = action.payload.forecastCityStateId
          return state
        },
        prepare(forecastCityStateId){
          return{
            payload:{
              forecastCityStateId
            }
          }
        }
      },
    }
})
export const getTransfer = (state) => state.transfer.transferData
export const getforecasteCityName = (state) => state.transfer.forecastCity
export const getforecasteCityId = (state) => state.transfer.forecastCityId
export const getTemporaryCityName = (state) => state.transfer.temporaryCityName
export const {setTransfer} = transferSlice.actions
export const {setforecastCityName} = transferSlice.actions
export const {setforecastCityId} = transferSlice.actions
export const {setTemporaryCityName} = transferSlice.actions
export default transferSlice.reducer