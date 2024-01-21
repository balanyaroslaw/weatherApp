import React from 'react'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import { getCityName, getCityId } from '../Context/inputSlice'
import { setforecastCityName, setforecastCityId} from '../Context/dispatchSlice'
import { useDispatch } from 'react-redux'
import { useState} from 'react'
import secondsToDate from '../utilities/secondsToDate'
import secondsToTime from '../utilities/secondsToTime'
import upLetter from '../utilities/upLetter'
import findMaxAndMinTemp from '../utilities/findMaxAndMinTemp'
import forecastIcon from '../assets/forecastIcon.png'
import menuBar from '../assets/menuBar.png'
import MenuComponent from './MenuComponent.jsx'
import { getWeekforecast, getDayforecast } from '../Context/weatherSlice'
import LineChart from './ChartComponent'
import weatherConditions from '../assets/conditions'
import "./ComponentsStyles/WeatherComponent.css"
export const WeatherComponent = (props) => {
    const citiesNames = useSelector(getCityName);
    const citiesId = useSelector(getCityId);
    const weekforecast = useSelector(getWeekforecast);
    const dayForecast = useSelector(getDayforecast);
    const [isShowed, setIsShowed] = useState(false);
    const dispatch = useDispatch()
    const handleButtonClick = (e, city, id) =>
    {
        e.preventDefault()
        dispatch(setforecastCityName(city))
        dispatch(setforecastCityId(id))
    }
    const handleMenuClick = (e)=>{
        e.preventDefault()
        setIsShowed(isShowed=>!isShowed)
    }
    const dataForecast = (index, currentTime)=>
    {
        const hours = []
        const temperature = []
        const condition = []
        let currentDayTime = ''
        try {
        if(dayForecast.length>0)
        { 
            if(dayForecast[index].forecast.forecastday.length>0)
            {
                currentDayTime = dayForecast[index].location.localtime.substring(10,16)
                dayForecast[index].forecast.forecastday[0].hour.map((data, index)=>
                { 
                     if(parseInt(currentTime.substring(0,3))<window.HOURS&&index<window.HOURS)
                     {
                        hours.push(data.time.substring(10,16))
                        temperature.push(data.temp_c)
                        condition.push(data.condition.code)
                     }
                     else
                     {
                        if(index>=parseInt(currentTime.substring(0,3))&&index<=window.HOURS*2&&parseInt(currentTime.substring(0,3))>=window.HOURS)
                        {
                            hours.push(data.time.substring(10,16))
                            temperature.push(data.temp_c)
                            condition.push(data.condition.code)
                            
                        }
                     }
                }) 
                dayForecast[index].forecast.forecastday[1].hour.map((data, index)=>
                { 
                    if(parseInt(currentTime.substring(0,3))>=window.HOURS)
                     {
                        if(index<parseInt(currentTime.substring(0,3))-window.HOURS)
                        {
                            hours.push(data.time.substring(10,16))
                            temperature.push(data.temp_c)
                            condition.push(data.condition.code)
                        }
                     }
                })
            } 
        } 
        } catch (error) {
            //console.log(error)
        }
        return {hours, temperature, condition, currentDayTime}
    }
    return (                                 
        <div className="weather__container" key={props.currentWeather.id}>
            <div className="weather__data__container" key={props.currentWeather.id}>
            <div className="header__container">
                <div className="header__content">
                    <div className="header__city">
                        <span className="city">{citiesNames[props.index]}</span>
                    </div>
                    <div className="header__day">
                        <div className="day__today">
                            <span className="today">Today</span>
                        </div>
                        <div className="day__date">
                            <span className="date">{secondsToDate(props.currentWeather.dt)}</span>
                        </div>
                    </div>
                </div>
                <div className="header__menu">
                    <div className="header__time">
                        <span className="time">{dataForecast(props.index, secondsToTime(props.currentWeather.dt)).currentDayTime}</span>
                        <div className="menu__bar" onClick={e=>handleMenuClick(e)}>
                            <img src={menuBar} alt="" className="menu__icon" />
                        </div>
                    </div>
                    <div className="menu__forecast" onClick={e=>(handleButtonClick(e, citiesNames[props.index], citiesId[props.index]))}>
                        <img src={forecastIcon} alt="" className="forecast__icon" />
                        <span className="forecast">Forecast for 5 days</span>
                    </div>
                </div>
            </div>
            <div className="current_weather__container">
                <div className="current__temp">
                    <div className="current__valid__temp">
                        <span className="valid__temp">{Math.round(props.currentWeather.main.temp)}°C</span>
                    </div>
                    <div className="current__feel__temp">
                        <span className="feel__temp">Feels like {Math.round(props.currentWeather.main.feels_like)}°C</span>
                    </div>
                </div>
                <div className="day__temp">
                    <div className="max__temp">
                        <span className="max">
                            Day {weekforecast[props.index]!==undefined?Math.round(findMaxAndMinTemp(weekforecast, props.index).temp_max):null}°C 
                        </span>
                        <img src={require('../assets/arrowTemp.png')} alt="" className="max__icon" />
                    </div>
                    <div className="min__temp">
                        <span className="min">
                            Night {weekforecast[props.index]!==undefined?Math.round(findMaxAndMinTemp(weekforecast, props.index).temp_min):null}°C 
                        </span>
                        <img src={require('../assets/arrowTemp.png')} alt="" className="min__icon" />
                    </div>
                </div>
                <div className="weather__state">
                    <img src={
                    props.currentWeather.weather[0].main==="Snow"?require('../assets/snowy.png')
                    :props.currentWeather.weather[0].main==="Rain"?require('../assets/rainy.png')
                    :props.currentWeather.weather[0].main==="Mist"?require('../assets/foggy.png')
                    :props.currentWeather.weather[0].main==="Clouds"&&parseInt(props.currentWeather.clouds.all)>60?require('../assets/cloudy.png')
                    :props.currentWeather.weather[0].main==="Drizzle"?require('../assets/drizzle.png')
                    :props.currentWeather.weather[0].main==="Clouds"&&parseInt(props.currentWeather.clouds.all)<=60?require('../assets/partlyCloudy.png')
                    :props.currentWeather.weather[0].main==="Thunderstorm"?require('../assets/thunderstorm.png')
                    :props.currentWeather.weather[0].main==="Clear"?require('../assets/sunny.png'):null} alt="" className="state__icon" />
                    <div className="weather__description">
                        <span className="description">{upLetter(props.currentWeather.weather[0].description)}</span>
                    </div>
                </div>
            </div>
            <div className="forecast__container">
                {dayForecast.length>0&&
                <LineChart chartData={{
                    labels: dataForecast(props.index, secondsToTime(props.currentWeather.dt)).hours,
                    datasets: [
                      {
                        data:dataForecast(props.index, secondsToTime(props.currentWeather.dt)).temperature,
                        datalabels: {
                            align: 'top',
                            anchor: 'end'
                          },
                        borderColor: "white",
                        pointStyle: false,
                        display: false,
                        borderWidth: 2,
                        fill: 'start',
                        backgroundColor: 'rgba(212, 212, 212, 0.3)'
                      }
                    ]
                }}
                maxData = {
                   Math.max(...dataForecast(props.index, secondsToTime(props.currentWeather.dt)).temperature)+10
                }
                minData = {
                    Math.min(...dataForecast(props.index, secondsToTime(props.currentWeather.dt)).temperature)-10
                 }
                key={props.currentWeather.id} className="chart__container" />
                }
                <div className="forecast__condition">
                    {dataForecast(props.index, secondsToTime(props.currentWeather.dt)).condition.map((condition, index)=>{
                        return(
                            <img 
                            src={
                                weatherConditions.clouds.includes(condition)?require('../assets/cloudy.png')
                                :weatherConditions.partlyCloudy.includes(condition)?require('../assets/partlyCloudy.png')
                                :weatherConditions.clear.includes(condition)?require('../assets/sunny.png')
                                :weatherConditions.rain.includes(condition)?require('../assets/rainy.png')
                                :weatherConditions.fog.includes(condition)?require('../assets/foggy.png')
                                :weatherConditions.storm.includes(condition)?require('../assets/thunderstorm.png')
                                :weatherConditions.snow.includes(condition)?require('../assets/snowy.png')
                                :weatherConditions.drizzle.includes(condition)?require('../assets/drizzle.png'):null
                            }
                            className='condition__img' key={props.currentWeather.dt+index}></img>
                        )
                    })}
                </div>
            </div>
        </div>
        {isShowed&&
            <div className="menu__container">
                <MenuComponent index={props.index} show={isShowed} key={props.currentWeather.id} location={props.currentWeather.coord} name={citiesNames[props.index]}/>
            </div>}
        </div>
    )
}