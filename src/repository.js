const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/test'

class Repository {
  findTasks (callback) {
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect.', err)
      db.collection('tasks').find({}).toArray((err, tasks) => {
        if (err) return console.error('Failed to find tasks.', err)
        callback(tasks)
      })
    })
  }

  addTask (task, callback) {
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('tasks').insertOne(task, (err, result) => {
        if (err) return console.error('Failed to add task.', err)
        callback(task)
      })
    })
  }

  deleteTask (id, callback) {
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('tasks').deleteOne({_id: new ObjectID(id)}, (err, result) => {
        if (err) return console.error('Failed to add task.', err)
        callback(result)
      })
    })
  }

  deleteSelectedTasks (arr, callback) {

  }

  deleteAllTasks (callback) {

  }
}

module.exports = Repository
