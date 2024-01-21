import axios from 'axios'
import { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTransfer, setTransfer, getTemporaryCityName} from '../Context/dispatchSlice'
import {getLocation} from '../Context/inputSlice'
import {setCurrentWeather, setWeekforecast, setDayforecast } from '../Context/weatherSlice'
import { FetchLocationByIP } from '../API/FetchLocationByIP'
import { setCityId, getCityId, setCityName } from '../Context/inputSlice'
export const FetchWeather = () => {
    const dispatch = useDispatch();
    const WEATHER_API_KEY = '40cac1ca1e1813826561e074c45d31f7';
    const HOURLY_FORECAST_API_KEY = '145e7f19a98644d4bc8143948240701';
    const transfer = useSelector(getTransfer);
    const location = useSelector(getLocation);
    const citiesId = useSelector(getCityId)
    const cityName = useSelector(getTemporaryCityName)
    const [isFinished, setIsFinished] = useState(true)
    const [isGlobalUnique, setIsGlobalUnique] = useState(true)
    FetchLocationByIP()
    useEffect(()=>{
        dispatch(setTransfer(true));
    },[])
    useEffect(()=>{
        const fetchData = async (location, check)=>{
            let isLocalUnique = true
            try {
                if(location.lat && location.lon && transfer)
                    {
                        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric`)
                        .then(response=>{
                            if(!citiesId.includes(response.data.id))
                            {
                                dispatch(setCurrentWeather(response.data))
                                dispatch(setCityId(response.data.id))
                                if(check)
                                {
                                    setIsGlobalUnique(true)
                                }
                                isLocalUnique = true
                            }
                            else
                            {
                                if(check)
                                {
                                    setIsGlobalUnique(false)
                                }
                                isLocalUnique = false
                            }
                        });
                        await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&cnt=40&appid=${WEATHER_API_KEY}&units=metric`)
                        .then(response=>{
                            if(isLocalUnique)
                            {
                                dispatch(setWeekforecast(response.data))
                                dispatch(setTransfer(false));
                            }
                        });
                        await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${HOURLY_FORECAST_API_KEY}&q=${location.lat},${location.lon}&days=2&aqi=no&alerts=no`)
                        .then(response=>{
                            if(response.data.location.country){
                                if(isLocalUnique)
                                {
                                    dispatch(setDayforecast(response.data))
                                    dispatch(setTransfer(false));
                                }
                            }
                        });
                        dispatch(setTransfer(false));
                        if(check){
                            setIsFinished(isFinished=>!isFinished)
                        }
                    }
            }
            catch (error) 
            {
                console.log(error)
            }
        }
        if(JSON.parse(localStorage.getItem('coords')).length!==0 && !location.lat)
        {
            JSON.parse(localStorage.getItem('coords')).map(location=>{
                fetchData(location, false)
            })
        }
        fetchData(location, true)
    },[location, transfer])
    useEffect(()=>{
        if(cityName){
            if(isGlobalUnique){
                dispatch(setCityName(cityName))
            }
        }
    },[isFinished])
    useEffect(()=>{
        {
            if(JSON.parse(localStorage.getItem('coords')).length!==0){
                JSON.parse(localStorage.getItem('names')).map((name, index)=>{
                    dispatch(setCityName(name))
                })
            }
        }
    },[])
}


































/*const forecast_API_KEY = '10TME8JpkafgeDlzx8XozLdoFJXh4nWB';*/