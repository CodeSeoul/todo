const Repository = require('../src/repository')
const expect = require('chai').expect
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/test'

let repo
describe('Repository', function () {
  before(function (done) {
    repo = new Repository()
    let data = [
      {
        title: 'Eat',
        status: 'Done'
      },
      {
        title: 'Sleep',
        status: 'ToDo'
      },
      {
        title: 'Play',
        status: 'Doing'
      },
      {
        title: 'Play',
        status: 'Archived'
      }
    ]

    // Use connect method to connect to the server
    MongoClient.connect(url, (err, db) => {
      expect(err).to.be.equal(null)
      console.log('Connected successfully to server')
      db.collection('tasks').drop((err, result) => {
        expect(err).to.be.equal(null)
        console.log('Data cleaned')
        db.collection('tasks').insertMany(data, (err, result) => {
          expect(err).to.be.equal(null)
          console.log('data Initialized')
          expect(result.result.n).to.be.equal(4)
          db.close()
        })
      })
    })
    done()
  })

  describe('#findTask', function () {
    it('should find all the tasks', function (done) {
      repo.findTasks((data) => {
        console.log('- after findTask:', data)
        expect(data).have.length.at.least(4)
        done()
      })
    })
  })

  describe('#addTask', function () {
    it('should add a task', function (done) {
      repo.addTask(({title: 'Go to the mart', status: 'ToDo'}), (data) => {
        console.log('- after addTask:', data.status)
        expect(data.title).to.equal('Go to the mart')
        expect(data.status).to.equal('ToDo')
        expect(data).to.have.property('_id')
        done()
      })
    })
  })

  describe('#deleteTask', function () {
    it('should delete a task', function (done) {
      done()
    })
  })

  describe('#deleteSelectedTasks', function () {
    it('should delete all selected tasks', function (done) {
      done()
    })
  })

  describe('#deleteAllTasks', function () {
    it('should delete all tasks', function (done) {
      done()
    })
  })

  // after(function (done) {
  //   MongoClient.connect(url, (err, db) => {
  //     expect(err).to.be.equal(null)
  //     console.log('Cleaning up')
  //     db.collection('tasks').drop((err, result) => {
  //       expect(err).to.be.equal(null)
  //       console.log("Data cleaned");
  //       console.log(result)
  //       db.close()
  //     })
  //   })
  //   done()
  // })
})
