const findMaxAndMinForecast = (dayForecast, indexForecast)=>{
    const temp = {
        "temp_max":0,
        "temp_min":0
    }
    let tempForDay = [];
    dayForecast.map((data, index)=>
    {
        if(index<8*(indexForecast+1)&&index>=indexForecast*8)
        {
            tempForDay.push(data.main.temp)
        }
    })
    temp.temp_max = Math.max(...tempForDay);
    temp.temp_min = Math.min(...tempForDay);
    return temp;
}
export default findMaxAndMinForecast;