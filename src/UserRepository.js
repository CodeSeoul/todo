const MongoClient = require('mongodb').MongoClient
// const ObjectID = require('mongodb').ObjectID

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
}

module.exports = UserRepository
