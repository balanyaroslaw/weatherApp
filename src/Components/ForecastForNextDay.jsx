import React from 'react'
import { useState } from 'react'
import findMaxAndMinForecast from '../utilities/findMaxAndMinForecast'
import upLetter from '../utilities/upLetter'
import './ComponentsStyles/weekForecast.css'
import './ComponentsStyles/dailyForecastComponent.css'
import ForecastDetailsComponent from './ForecastDetailsComponent'
function ForecastForNextDay(props) {
    const [isActiveDay, setIsActiveDay] = useState(false)
    const [dayDate, setDayDate] = useState("")
    const handleToogleClick = (e, date)=>
    {
        e.preventDefault()
        setIsActiveDay(isActiveDay=>!isActiveDay)
        setDayDate(date.substring(0,10))
    }
  return (
    <div className='forecast__main__container' key={props.forecast.city.id+props.data.dt} >
        <div className='nextday_forecast__container' onClick={e=>handleToogleClick(e, props.data.dt_txt)}>
        <div className="forecast__data__container">
            <div className="forecast__day__date">
              <span className="forecast__date">
                {new Date(props.data.dt_txt).toDateString().substring(0,10)}
              </span>
            </div>
            <div className="forecast__weather__description">
              <span className="forecast__description">
                {upLetter(props.data.weather[0].description)}
              </span>
            </div>
        </div>
        <div className="forecast__weather_state__container">
            <div className="forecast__weather__state">
              <img src={
                 props.data.weather[0].main==="Snow"?require('../assets/snowy.png')
                 :props.data.weather[0].main==="Rain"?require('../assets/rainy.png')
                 :props.data.weather[0].main==="Mist"?require('../assets/foggy.png')
                 :props.data.weather[0].main==="Clouds"&&parseInt(props.data.clouds.all)>60?require('../assets/cloudy.png')
                 :props.data.weather[0].main==="Drizzle"?require('../assets/drizzle.png')
                 :props.data.weather[0].main==="Clouds"&&parseInt(props.data.clouds.all)<=60?require('../assets/partlyCloudy.png')
                 :props.data.weather[0].main==="Thunderstorm"?require('../assets/thunderstorm.png')
                 :props.data.weather[0].main==="Clear"?require('../assets/sunny.png'):null} alt="" className="state__icon" />
            </div>
            <div className="forecast__day__state">
              <div className="forecast__max__temp">
                <span className="forecast__max">{props.forecast.list[props.index].dt!==undefined?Math.round(findMaxAndMinForecast(props.forecast.list, props.index).temp_max):null}°C</span>
              </div>
              <div className="forecast__min__temp">
                <span className="forecast__min">{props.forecast.list[props.index].dt!==undefined?Math.round(findMaxAndMinForecast(props.forecast.list, props.index).temp_min):null}°C</span>
              </div>
            </div>
        </div>
    </div>
    {isActiveDay&&<ForecastDetailsComponent data={props.data} index={props.index} forecast={props.forecast} day={dayDate}/>}
    <hr/>
    </div>
  )
}
export default ForecastForNextDay