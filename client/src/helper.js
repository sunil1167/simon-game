export const pickRandomItem = (arr) => {
    let randomNum = Math.floor(Math.random() * arr.length)
    return arr[randomNum]
}