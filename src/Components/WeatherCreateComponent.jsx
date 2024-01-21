import React from 'react'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import { FetchWeather } from '../API/FetchWeather'
import { getWeather} from '../Context/weatherSlice'
import { getCityName, getCityId } from '../Context/inputSlice'
import { getforecasteCityId} from '../Context/dispatchSlice'
import { useState, useEffect} from 'react'
import ForecastComponent from './ForecastCreateComponent'
import { WeatherComponent } from './WeatherComponent.jsx'
import "./ComponentsStyles/WeatherComponent.css"
export const WeatherCreateComponent = () => {
    FetchWeather()
    const currentWeatherFromState = useSelector(getWeather);
    const cityId = useSelector(getforecasteCityId);
    const citiesNames = useSelector(getCityName);
    const citiesId = useSelector(getCityId);
    const [currentWeatherData, setcurrentWeatherData] = useState([])
    useEffect(()=>
    {
        if(currentWeatherFromState.length > 0)
        {
            setcurrentWeatherData(currentWeatherFromState)
        }
    },[currentWeatherFromState])
    if(currentWeatherFromState.length>0)
    {
        return(
            currentWeatherData.map((currentWeather, index)=>
            {
                return (                                 
                    citiesId[index]!==cityId?
                    <WeatherComponent key = {currentWeather.id} index={index} currentWeather={currentWeather}/>:
                    <ForecastComponent key = {currentWeather.id} city={citiesNames[index]} id={citiesId[index]}/>
                )
            }
        )
        )
    }
    else{
        return(
            <span className="loader"> </span>
        )
    }
}