const Repository = require('../src/Repository')
const expect = require('chai').expect
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/test'

describe('Repository', function () {
  let repo
  let testId
  let testIdArr

  before(function (done) {
    repo = new Repository(url)
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
      db.collection('tasks').insertMany(data, (err, result) => {
        expect(err).to.be.equal(null)
        console.log('data Initialized')
        expect(result.result.n).to.be.equal(4)
        db.close()
        done()
      })
    })
  })

  describe('#findTask', function () {
    it('should find all the tasks', function (done) {
      repo.findTasks(tasks => {
        console.log('- after findTask:', tasks)
        testIdArr = [tasks[0]._id, tasks[1]._id]
        expect(tasks).to.have.lengthOf(4)
        done()
      })
    })
  })

  describe('#addTask', function () {
    it('should add a task', function (done) {
      repo.addTask(({title: 'Go to the mart', status: 'ToDo'}), (id) => {
        console.log('- _id:', id)
        expect(id).to.not.be.equal(null)
        testId = id
        repo.findTasks(tasks => {
          console.log('- after addTask => findTask:', tasks)
          expect(tasks).to.have.lengthOf(5)
          done()
        })
      })
    })
  })

  describe('#modifyTask', function () {
    it('should modify the status of a task', function (done) {
      repo.modifyTask(testId, {status: 'Done'}, _ => {
        MongoClient.connect(url, (err, db) => {
          expect(err).to.be.equal(null)
          db.collection('tasks').findOne(testId, (err, task) => {
            expect(err).to.be.equal(null)
            expect(task.status).to.be.equal('Done')
            db.close()
            done()
          })
        })
      })
    })
    it('should modify the start date of a task', function (done) {
      let testStartDate = new Date()
      repo.modifyTask(testId, {startDate: testStartDate}, _ => {
        MongoClient.connect(url, (err, db) => {
          expect(err).to.be.equal(null)
          db.collection('tasks').findOne(testId, (err, task) => {
            expect(err).to.be.equal(null)
            expect(task.startDate).to.be.eql(testStartDate)
            db.close()
            done()
          })
        })
      })
    })
  })

  describe('#deleteTask', function () {
    it('should delete a task', function (done) {
      repo.deleteTask(testId, _ => {
        repo.findTasks(tasks => {
          console.log('- after deleteTask => findTask:', tasks)
          expect(tasks).to.have.lengthOf(4)
          done()
        })
      })
    })
  })

  describe('#deleteSelectedTasks', function () {
    it('should delete all selected tasks', function (done) {
      repo.deleteSelectedTasks(testIdArr, _ => {
        repo.findTasks(tasks => {
          console.log('- after deleteSelectedTasks => findTasks: ', tasks)
          expect(tasks).to.have.lengthOf(2)
          done()
        })
      })
    })
  })

  describe('#deleteAllTasks', function () {
    it('should delete all tasks', function (done) {
      repo.deleteAllTasks(_ => {
        repo.findTasks(tasks => {
          console.log('- after deleteSelectedTasks => findTasks: ', tasks)
          expect(tasks).to.have.lengthOf(0)
          done()
        })
      })
    })
  })

  after(function (done) {
    MongoClient.connect(url, (err, db) => {
      expect(err).to.be.equal(null)
      console.log('Cleaning up')
      db.collection('tasks').drop((err, result) => {
        if (err) console.error('error :', err)
        expect(err).to.be.equal(null)
        console.log('Data cleaned')
        console.log(result)
        db.close()
        done()
      })
    })
  })
})
