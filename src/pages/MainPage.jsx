import React from 'react'
import InputComponent from '../Components/InputComponent.jsx';
import { WeatherCreateComponent } from '../Components/WeatherCreateComponent.jsx';
function MainPage() {
  return (
    <div className="main__container">
        <div className="input__main__container">
            <InputComponent/>
        </div>
        <div className="weather__main__container">
            <WeatherCreateComponent/>
        </div>
    </div>
  )
}

export default MainPage