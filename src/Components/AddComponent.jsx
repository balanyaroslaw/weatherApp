import React from 'react'
import './ComponentsStyles/AddComponent.css'
import {setTransfer} from '../Context/dispatchSlice'
import {useDispatch, useSelector} from 'react-redux'
import AddButton from '../assets/AddButton.png'
function AddComponent(props) {
  const dispatch = useDispatch()
    const handleClick = (e)=>{
        e.preventDefault();
          if(props.city)
          {
            dispatch(setTransfer(true))
          }
    }
  return (
    <div className="add__container" onClick={e=>handleClick(e)} >
      <img src={AddButton} alt="" className='add__button' />
    </div>
  )
}

export default AddComponent