const secondsToDate = (seconds)=>
{
    let date = new Date(seconds*1000)
    let result  = date.toISOString()
        .substring(0,10)
        .replace(/-/g, '.')
        .split('.')
        .reverse()
        .join('.')
    return result
}
export default secondsToDate