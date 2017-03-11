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

  addTask (task) {
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
          }
        })
      }
    })
  }

  deleteTask () {
    console.log('deleteTask')
  }
}

module.exports = Repository
