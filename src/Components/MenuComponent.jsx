import React, { useEffect } from 'react'
import { deleteName, deleteId } from '../Context/inputSlice'
import { deleteCurrentWeather, deleteDayforecast, deleteWeekforecast } from '../Context/weatherSlice'
import { setforecastCityId } from '../Context/dispatchSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import rubbishIcon from '../assets/rubbishIcon.png'
import favoriteIcon from '../assets/favoriteIcon.png'
import savedIcon from '../assets/saved.png'
import './ComponentsStyles/MenuComponent.css'
function MenuComponent(props) {
    const [isClicked, setIsClicked] = useState(false)
    let coordsArray = JSON.parse(localStorage.getItem('coords'))
    let namesArray = JSON.parse(localStorage.getItem('names'))
    const dispatch = useDispatch()
    const handleDeleteClick = (e)=>{
        e.preventDefault()
        dispatch(deleteName(props.index))
        dispatch(deleteId(props.index))
        dispatch(deleteCurrentWeather(props.index))
        dispatch(deleteDayforecast(props.index))
        dispatch(deleteWeekforecast(props.index))
        dispatch(setforecastCityId(props.id))
    }
    useEffect(()=>{
        if(coordsArray.some(e=>e.lat === props.location.lat))
        {
           setIsClicked(true)  
        }
    },[])
    const handleAddClick = (e) => 
    {
        e.preventDefault()
        setIsClicked(isClicked=>!isClicked)
    }
    useEffect(()=>{
        if(isClicked){
            if(!coordsArray.some(e=>e.lat === props.location.lat))
            {
                if(coordsArray.length<=4)
                {
                    coordsArray.push(props.location)
                    namesArray.push(props.name)
                    localStorage.setItem('coords', JSON.stringify(coordsArray))
                    localStorage.setItem('names', JSON.stringify(namesArray))
                }      
            }
        }
        if(!isClicked){
            if(coordsArray.some(e=>e.lat === props.location.lat))
            {
                let newArrayCoords = coordsArray.filter((e,i)=>{return e.lat !== props.location.lat})
                let newArrayNames = namesArray.filter((e,i)=>{return e !== props.name})
                localStorage.setItem('coords', JSON.stringify(newArrayCoords))
                localStorage.setItem('names', JSON.stringify(newArrayNames))   
            }
        }
    },[isClicked])
  return (
    props.show&&<div className="menu__content">
        <div className="delete__container" onClick={e=>handleDeleteClick(e)}>
            <img src={rubbishIcon} alt="" className="delete__icon" />
            <span className="delete__span">Delete</span>
        </div>
        <div className="favorite__container" onClick={e=>handleAddClick(e)}>
            <img src={isClicked?savedIcon:favoriteIcon} alt="" className="favorite__icon" />
            <span className="favorite__span">Favorite</span>
        </div>
    </div>
  )
}

export default MenuComponent