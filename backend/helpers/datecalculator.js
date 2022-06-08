

function dateParser(date){
    const newDateArr = date.split('-') // [2022,06,07T23]
    let year = newDateArr[0]
    let month = newDateArr[1]
    let day = newDateArr[2].slice(2)
    console.log(year, "year")
    console.log(month, "month")
    console.log(day, "day")
    return {"createdAt": [year, month, day]}
}


module.exports = {
    dateParser
}
