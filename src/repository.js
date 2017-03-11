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

  addTask () {
    console.log('addTask')
  }

  deleteTask () {
    console.log('deleteTask')
  }
}

module.exports = Repository
