import { createSlice } from '@reduxjs/toolkit'
const MAX_LENGTH = 4;
export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    locationData:{},
    name:[],
    id:[],
    error:""
  },
  reducers:{
      setLocation:{
        reducer(state, action){
            state.locationData = action.payload.locationCoord
            return state
        },
        prepare(locationCoord){
            return{
                payload:{
                    locationCoord,
                }
            }
        }
      },
      setCityName:{
        reducer(state, action){
            if(state.name.length <= MAX_LENGTH){
                state.name.unshift(action.payload.cityName)
            }
            else{
                state.error = "It is not possible to add more cities"
            }
            return state
        },
        prepare(cityName){
            return{
                payload:{
                  cityName
                }
            }
        }
      },
      setCityId:{
        reducer(state, action){
          if(state.id.length <= MAX_LENGTH){
              state.id.unshift(action.payload.cityId)
          }
          else{
              state.error = "It is not possible to add more cities"
          }
          return state
      },
      prepare(cityId){
          return{
              payload:{
                cityId
              }
          }
      }
      },
      deleteName:{
        reducer(state, action){
            state.name = state.name.filter((_,index)=>index!==action.payload.itemIndex)
            return state
        },
        prepare(itemIndex){
            return{
                payload:{
                    itemIndex
                }
            }
        }
      },
      deleteId:{
        reducer(state, action){
            state.id = state.id.filter((_,index)=>index!==action.payload.itemIndex)
            return state
        },
        prepare(itemIndex){
            return{
                payload:{
                    itemIndex
                }
            }
        }
      },
    }
})
export const getLocation = (state) => state.location.locationData
export const getCityName = (state) => state.location.name
export const getCityId =   (state) => state.location.id
export const getError = (state) => state.location.error
export const { setCityName } = locationSlice.actions
export const { setLocation } = locationSlice.actions
export const { setCityId } = locationSlice.actions
export const {deleteName} = locationSlice.actions
export const {deleteId}= locationSlice.actions
export default locationSlice.reducer