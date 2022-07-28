// Your code here

const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        field: [],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = (array) => {
    let listofRecords = []
    array.forEach(element => {
        listofRecords.push(createEmployeeRecord(element))
    });
    return listofRecords
}

const createTimeInEvent = (recordObj, datestring) => {
    let datestringArr = datestring.split(" ")
    let timeinObj = {
        type: 'TimeIn',
        date: datestringArr[0],
        hour: parseInt(datestringArr[1]),
    }
    console.log(timeinObj)
    recordObj.timeInEvents.push(timeinObj)
    return recordObj
}

// createTimeInEvent(createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]), "2014-02-28 1400")

const createTimeOutEvent = (recordObj, datestring) => {
    let datestringArr = datestring.split(" ")
    let timeinObj = {
        type: 'TimeOut',
        date: datestringArr[0],
        hour: parseInt(datestringArr[1]),
    }
    console.log(timeinObj)
    recordObj.timeOutEvents.push(timeinObj)
    return recordObj
}

const hoursWorkedOnDate = (object, datestring) => {
    let timediff;
    for (let i = 0; i < object.timeInEvents.length; i++) {
        if (object.timeInEvents[i].date === datestring) {
            timediff = (object.timeOutEvents[i].hour - object.timeInEvents[i].hour) / 100
        }
    }
    return timediff
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log(cRecord)
// hoursWorkedOnDate(cRecord, "0044-03-15")

const wagesEarnedOnDate = (object, datestring) => {
    let hours = hoursWorkedOnDate(object, datestring) * object.payPerHour
    return hours
}

const allWagesFor = (object) => {
    let listofdates = []
    let totalwages = 0
    object.timeInEvents.map((timeobj) => {
        listofdates.push(timeobj.date)
    })
    listofdates.map((date) => {
        totalwages += wagesEarnedOnDate(object, date)
    })
    return totalwages
}

const calculatePayroll = (array) => {
    let totalPayroll = 0
    array.map((worker) => {
        totalPayroll += allWagesFor(worker)
    })
    return totalPayroll
}

/////////////////////////////////

// let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
// let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

// let sTimeData = [
//     ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
//     ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
// ]

// let rTimeData = [
//     ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
//     ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
// ]

// sTimeData.forEach(function (d) {
//     let [dIn, dOut] = d
//     sRecord = createTimeInEvent(sRecord, dIn)
//     sRecord = createTimeOutEvent(sRecord, dOut)
// })

// rTimeData.forEach(function (d, i) {
//     let [dIn, dOut] = d
//     rRecord = createTimeInEvent(rRecord, dIn)
//     rRecord = createTimeOutEvent(rRecord, dOut)
// })

// let employees = [sRecord, rRecord]
// let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)
// console.log(grandTotalOwed, typeof grandTotalOwed)
// console.log(calculatePayroll(employees), typeof calculatePayroll(employees))