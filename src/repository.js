const fs = require('fs')
const path = require('path')

class Repository {
  findTasks (callback) {
    console.log('findTasks')
    fs.readFile(path.join(__dirname, 'tasks.dat'), (err, data) => {
      if (err) {
        console.log(err)
      } else {
        callback(JSON.parse(data))
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
        console.log('### task:', task)
        console.log('### task type:', typeof task)
        if (taskArray.length === 0) {
          task._id = 1
        } else {
          task._id = taskArray[taskArray.length - 1]._id + 1
        }
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

  deleteTask (id, callback) {
    console.log('deleteTask')
    fs.readFile(path.join(__dirname, 'tasks.dat'), (err, data) => {
      if (err) {
        console.log('error reading')
      } else {
        let taskArray = JSON.parse(data)
        taskArray = taskArray.filter((task) => {
          return task._id !== id
        })
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
        console.log('Task before ', taskArray)

        taskArray = taskArray.filter(task => {
          return arr.indexOf(task._id) === -1
        })

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
