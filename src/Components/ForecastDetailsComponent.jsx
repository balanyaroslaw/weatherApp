import React from 'react'
import './ComponentsStyles/dailyForecastComponent.css'
function ForecastDetailsComponent(props) {
    const stateElement = (data, index)=>
    {
        return(
          <div className="hourlyforecast__data" key= {data.dt+index}>
            <div className="hourlyforecast__temp__container">
              <span className="hourlyforecast__temp">
                {Math.round(data.main.temp)}°C
              </span>
            </div>
              <div className="hourlyforecast__state">
                <img src={
                  data.weather[0].main==="Snow"?require('../assets/snowy.png')
                  :data.weather[0].main==="Rain"?require('../assets/rainy.png')
                  :data.weather[0].main==="Mist"?require('../assets/foggy.png')
                  :data.weather[0].main==="Clouds"&&parseInt(data.clouds.all)>60?require('../assets/cloudy.png')
                  :data.weather[0].main==="Drizzle"?require('../assets/drizzle.png')
                  :data.weather[0].main==="Clouds"&&parseInt(data.clouds.all)<=60?require('../assets/partlyCloudy.png')
                  :data.weather[0].main==="Thunderstorm"?require('../assets/thunderstorm.png')
                  :data.weather[0].main==="Clear"?require('../assets/sunny.png'):null} alt="" key= {data.weather[0].id+data.dt} className="daily state__icon" />
              </div>
            <div className="hourlyforecast__time__container">
              <span className='hourlyforecast__time'>
                {data.dt_txt.substring(10,16)}
              </span>
            </div>
        </div>
        )
    }
    const renderStates = () => 
    {
        if (props.index === 0) {
          return props.forecast.list.slice(0, window.DATA_PER_DAY).map((data, index) => stateElement(data, index));
        } else {
          return props.forecast.list
            .filter((data) => data.dt_txt.substring(0, 10) === props.day)
            .map((data, index) => stateElement(data, index));
        }
      };
  return (
    <div className="maindata__container">
            <div className="data__container">
                <div className="data__content">
                    <span className='data'>Wind</span>
                    <span className='value data'>{props.data.wind.speed} km/h</span>
                </div>
                <div className="data__content">
                    <span className='data'>Humidity</span>
                    <span className='value data'>{props.data.main.humidity} %</span>
                </div>
                <div className="data__content">
                    <span className='data'>Visibility</span>
                    <span className='value data'>{props.data.visibility} m</span>
                </div>
                 </div>
                 <div className="hourlyforecast__container">
                    {renderStates()}
                 </div>         
        </div>
  )
}

export default ForecastDetailsComponent