const fs = require('fs')
const path = require('path')

class Repository {
  findTasks (callback) {
    console.log('findTasks')
    fs.readFile(path.join(__dirname, 'tasks.dat'), (err, data) => {
      if (err) {
        console.log(err)
      } else {
        callback(data)
      }
    })
  }

  addTask (task, callback) {
    console.log('addTask')

    fs.readFile(path.join(__dirname, 'tasks.dat'), (err, data) => {
      if (err) {
        console.log('error reading')
      } else {
        let taskArray = JSON.parse(data)
        taskArray.push(task)
        console.log(taskArray)
        fs.writeFile(path.join(__dirname, 'tasks.dat'), JSON.stringify(taskArray), (err) => {
          if (err) {
            console.log('error writing')
          } else {
            console.log('successfully written')
            if (callback) callback()
          }
        })
      }
    })
  }

  deleteTask (taskToDelete, callback) {
    console.log('deleteTask')
    fs.readFile(path.join(__dirname, 'tasks.dat'), (err, data) => {
      if (err) {
        console.log('error reading')
      } else {
        let taskArray = JSON.parse(data)
        // console.log('Task before ',taskArray)
        let index = taskArray.indexOf(taskToDelete)
        console.log('index ' + index)
        taskArray.splice(index, 1)
        console.log('task after ', taskArray)
        fs.writeFile(path.join(__dirname, 'tasks.dat'), JSON.stringify(taskArray), (err) => {
          if (err) {
            console.log('error writing')
          } else {
            console.log('successfully written')
            if (callback) callback()
          }
        })
      }
    })
  }

  deleteSelectedTasks (arr, callback) {
    console.log('deleteSelectedTasks')
    fs.readFile(path.join(__dirname, 'tasks.dat'), (err, data) => {
      if (err) {
        console.log('error reading')
      } else {
        let taskArray = JSON.parse(data)
        // console.log('Task before ',taskArray
        for (let i = 0; i < arr.length; i++) {
          let index = taskArray.indexOf(arr[i])
          taskArray.splice(index, 1)
          console.log('index ' + index)
          console.log('task after ', taskArray)
        }
        fs.writeFile(path.join(__dirname, 'tasks.dat'), JSON.stringify(taskArray), (err) => {
          if (err) {
            console.log('error writing')
          } else {
            console.log('successfully written')
            if (callback) callback()
          }
        })
      }
    })
  }

  deleteAllTasks (callback) {
    console.log('deleteAllTasks')
    fs.readFile(path.join(__dirname, 'tasks.dat'), (err, data) => {
      if (err) {
        console.log('error reading')
      } else {
        fs.writeFile(path.join(__dirname, 'tasks.dat'), JSON.stringify([]), (err) => {
          if (err) {
            console.log('error writing')
          } else {
            console.log('successfully written')
            if (callback) callback()
          }
        })
      }
    })
  }
}

module.exports = Repository
