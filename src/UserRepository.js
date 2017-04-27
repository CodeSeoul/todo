const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

class UserRepository {
  constructor (url) {
    this.url = url || 'mongodb://localhost:27017/todo'
  }
  findUsers (callback) {
    console.log('Find Users')
    MongoClient.connect(this.url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('users').find({}).toArray((err, users) => {
        if (err) return console.error('Failed to find users', err)
        console.log(users)
        callback(users)
      })
    })
  }

  findUsers (id, callback) {
    console.log('Find User')
    MongoClient.connect(this.url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('users').findOne({_id: new ObjectID(id)}, ((err, user) => {
        if (err) return console.error('Failed to find user', err)
        console.log(user)
        callback(user)
      })
    })
  }

  deleteUser (id, callback) {
    console.log('Delete User')
    MongoClient.connect(this.url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('users').deleteOne({_id: new ObjectID(id)}, (err, result) => {
        if (err) return console.error('Failed to delete user', err)
        callback()
      })
    })
  }

  addUser (user, callback) {
    console.log('Add User')
    MongoClient.connect(this.url, (err, db) => {
      if (err) return console.error('Failed to connect', err)
      db.collection('users').insertOne(user, (err, result) => {
        if (err) return console.error('Failed to add user', err)
        callback(result.ops[0]._id)
      })
    })
  }
}

module.exports = UserRepository
