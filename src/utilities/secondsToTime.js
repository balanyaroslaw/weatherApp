const secondsToTime = (seconds) =>
{
    let date = new Date(seconds * 1000)
    let time = date.toString().substring(16,21)
    return time
}
export default secondsToTime