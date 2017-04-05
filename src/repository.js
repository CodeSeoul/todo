const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/todo'

class Repository {
  findTasks (callback) {
    console.log('findTasks')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect.', err)
      db.collection('tasks').find({}).toArray((err, tasks) => {
        if (err) return console.error('Failed to find tasks.', err)
        callback(tasks)
      })
    })
  }

  addTask (task, callback) {
    console.log('addTask')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('tasks').insertOne(task, (err, result) => {
        if (err) return console.error('Failed to add task.', err)
        callback(result.ops[0]._id)
      })
    })
  }

  updateExistingTask (idStatusArr, callback) {
    console.log('updateExistingTask')
    var id = idStatusArr[0]
    var newStatus = idStatusArr[1]
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('tasks').update({_id: new ObjectID(id)}, {$set: {'status': newStatus}}, (err, result) => {
        if (err) return console.error('Failed to add task.', err)
        callback()
      })
    })
  }

  updateStartTime (id, callback) {
    console.log('updateStartTime')
    console.log(id)
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('tasks').update({_id: new ObjectID(id)}, {$set: {'startDate': new Date()}}, (err, result) => {
        if (err) return console.error('Failed to update startDate.', err)
        callback()
      })
    })
  }

  deleteTask (id, callback) {
    console.log('deleteTask')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('tasks').deleteOne({_id: new ObjectID(id)}, (err, result) => {
        if (err) return console.error('Failed to delete task.', err)
        callback()
      })
    })
  }

  deleteSelectedTasks (arr, callback) {
    console.log('deleteSelectedTasks')
    arr = arr.map(function (id) {
      return new ObjectID(id)
    })
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('tasks').remove({_id: {$in: arr}}, (err, result) => {
        if (err) return console.error('Failed delete selected tasks.', err)
        callback()
      })
    })
  }

  deleteAllTasks (callback) {
    console.log('deleteAllTasks')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('tasks').remove({}, (err, result) => {
        if (err) return console.error('Failed delete selected tasks.', err)
        callback()
      })
    })
  }
}

module.exports = Repository
