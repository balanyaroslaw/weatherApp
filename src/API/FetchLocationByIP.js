import axios from 'axios'
import {  useEffect } from 'react'
import {setLocation} from '../Context/inputSlice';
import { useDispatch } from 'react-redux';
import {setCityName} from '../Context/inputSlice'
const FetchLocationByIP = ()=>{
    const dispatch = useDispatch()
    const IP_API_KEY = 'bdc_184e9fab01914348a8af862bb01dbbfc';
    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('coords')).length===0)
        {
            const fetchData = async()=>{
                const ip = await axios.get(`https://api.ipify.org?format=json`)
                await axios.get(`https://api-bdc.net/data/ip-geolocation?ip=${ip}&localityLanguage=uk&key=${IP_API_KEY}`)
                .then(response=>{
                    dispatch(setLocation({lat: response.data.location.latitude, lon: response.data.location.longitude }))
                    dispatch(setCityName(response.data.location.city))
                });
            }
            fetchData()
        }
    },[dispatch])
}
export {FetchLocationByIP}