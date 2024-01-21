import React from 'react'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux';
import { getWeekforecast } from '../Context/weatherSlice'
import { setforecastCityName, getforecasteCityId, setforecastCityId } from '../Context/dispatchSlice';
import { getCityId } from '../Context/inputSlice'
import forecastIcon from '../assets/forecastIcon.png'
import ForecastForNextDay from './ForecastForNextDay';
function ForecastComponent(props) {
    const weatherWeekforecast = useSelector(getWeekforecast);
    const cityId = useSelector(getforecasteCityId);
    const citiesId = useSelector(getCityId);
    const dispatch = useDispatch()
    const handleButtonClick = (e)=>{
        e.preventDefault()
        dispatch(setforecastCityName(props.city+" "))
        dispatch(setforecastCityId(props.id+" "))
    }
    const ForecastForWeek = (forecast,index)=>{
        return(
            citiesId[index]===cityId&&
            forecast.list.filter((_, dataIndex)=>dataIndex%window.DATA_PER_DAY===0)
            .map((data, index)=>{
                return(
                <ForecastForNextDay key={forecast.city.id+data.dt} forecast={forecast} index={index} data={data} />
                )
            })
        )
    }
  return (
    citiesId.includes(cityId)&&
    <div className="weekforecast__container">
        <div className="weekforecast__menu" onClick={e=>handleButtonClick(e)}>
            <img src={forecastIcon} alt="" className="forecast__icon" />
            <span className='currentforecast__button'>Current weather</span>
        </div>
        {
            weatherWeekforecast.map((forecast, index)=>{
                return(
                    citiesId[index]===cityId&&ForecastForWeek(forecast, index)
                )
            })
        }
    </div>
    
  )
}

export default ForecastComponent