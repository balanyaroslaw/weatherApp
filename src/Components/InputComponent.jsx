import React from 'react'
import axios from 'axios';
import './ComponentsStyles/InputComponent.css';
import { useState, useEffect} from 'react';
import {setLocation} from '../Context/inputSlice';
import {useDispatch, useSelector} from 'react-redux'
import { getTransfer, setTemporaryCityName } from '../Context/dispatchSlice'
import AddComponent from './AddComponent.jsx';
function InputComponent() {
    const [cities, setCities] = useState({});
    const [cityInputName, setCityInputName] = useState('');
    const [menuShow, setMenuShow] = useState(false)
    const transfer = useSelector(getTransfer);
    const CITIES_API_KEY = "9b1c4a1e309f49deb4c7ebcc27e02135";
    const dispatch = useDispatch()
    useEffect(()=>
    {
        const fetchData = async()=>
        {
          await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${cityInputName}&lang=uk&type=city&count=3&format=json&apiKey=${CITIES_API_KEY}`)
          .then((response)=>{setCities(response)})
        }
        if(cityInputName.length >= 1)
        {
          fetchData()
        } 
    },[cityInputName])
    const handleClick = (e, city) =>
     {
      e.preventDefault();
      setMenuShow(false)
      setCityInputName(city.city)
      dispatch(setLocation({lat:city.lat, lon:city.lon}))
    }
    const handleInput = (e)=>
    {
      setCityInputName(e.target.value);
      if(e.target.value)
      {
        setMenuShow(true)
      }
      else
      {
        setMenuShow(false)
      }
    }
    useEffect(()=>
    {
      if(transfer && cityInputName)
      {
          dispatch(setTemporaryCityName(cityInputName))
      }
      setCityInputName("")
    },[transfer])
  return (
    <div className="input__container">
      <div className= {!menuShow?"input__content__container":"input__content__container__deployed"}>
        <input type="text" className="input__field" placeholder="Enter city" onChange={e=>{handleInput(e)}} value={cityInputName} />
        <div className='input__select__container'>
          {
            cities.data!==undefined&&menuShow?cities.data.results.map((city)=>{
              return <div onClick={e=>handleClick(e, city)} key={city.place_id} value={city.place_id} className='select__items'>
                  <span className = 'select__items__content'>
                    {city.state}-{city.city}
                  </span>
                </div>
            }):null
          }
        </div>
      </div>
      <AddComponent city={cityInputName} />
    </div>
  )
}

export default InputComponent