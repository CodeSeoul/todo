const FileAccessor = require('./FileAccessor')
const fileAccessor = new FileAccessor('tasks.dat')

class Repository {
  findTasks (callback) {
    console.log('findTasks')
    fileAccessor.loadObjFromFile(tasks => {
      callback(tasks)
    })
  }

  addTask (task, callback) {
    console.log('addTask')
    fileAccessor.loadObjFromFile(tasks => {
      task._id = tasks.length === 0 ? 1 : tasks[tasks.length - 1]._id + 1
      tasks.push(task)
      fileAccessor.saveObjToFile(tasks, _ => {
        if (callback) callback()
      })
    })
  }

  deleteTask (id, callback) {
    console.log('deleteTask')
    fileAccessor.loadObjFromFile(tasks => {
      tasks = tasks.filter((task) => {
        return task._id !== id
      })
      fileAccessor.saveObjToFile(tasks, _ => {
        if (callback) callback()
      })
    })
  }

  deleteSelectedTasks (arr, callback) {
    console.log('deleteSelectedTasks')
    fileAccessor.loadObjFromFile(tasks => {
      tasks = tasks.filter((task) => {
        return arr.indexOf(task._id) === -1
      })
      fileAccessor.saveObjToFile(tasks, _ => {
        if (callback) callback()
      })
    })
  }

  deleteAllTasks (callback) {
    console.log('deleteAllTasks')
    fileAccessor.saveObjToFile([], _ => {
      if (callback) callback()
    })
  }
}

module.exports = Repository
