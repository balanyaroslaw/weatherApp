const upLetter = (string) =>
{
    let firstLetter = string[0].toUpperCase();
    let letters = string.substring(1, string.length)
    let result = firstLetter+ letters;
    return result
}
export default upLetter