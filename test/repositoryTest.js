const Repository = require('../src/repository')
const expect = require('chai').expect
const fs = require('fs')
const path = require('path')

let repo
describe('Repository', function () {
  before(function (done) {
    repo = new Repository()
    let data = '["Eat","Sleep","Play"]'
    fs.writeFile(path.join(__dirname, '../src/tasks.dat'), data, (err) => {
      if (err) console.log('- failed to initialize data:' + err)
      console.log('- Initialized data')
      done()
    })
  })

  describe('#findTask', function () {
    it('should find all the tasks', function (done) {
      repo.findTasks((data) => {
        console.log('- after findTask:', data.toString())
        expect(JSON.parse(data.toString())).have.length.at.least(2)
        done()
      })
    })
  })

  describe('#addTask', function () {
    it('should add a task', function (done) {
      repo.addTask('foobar', () => {
        repo.findTasks((data) => {
          console.log('- after addTask:', data.toString())
          expect(JSON.parse(data.toString())).lengthOf(4)
          expect(data.toString()).to.include('foobar')
          done()
        })
      })
    })
  })

  describe('#deleteTask', function () {
    it('should delete a task', function (done) {
      repo.deleteTask('foobar', () => {
        repo.findTasks((data) => {
          console.log('- after deleteTask:', data.toString())
          expect(JSON.parse(data.toString())).lengthOf(3)
          expect(data.toString()).not.to.include('foobar')
          done()
        })
      })
    })
  })

  describe('#deleteSelectedTasks', function () {
    it('should delete all selected tasks', function (done) {
      repo.deleteSelectedTasks(['Sleep', 'Eat'], () => {
        repo.findTasks((data) => {
          console.log('- after deleteSelectedTasks:')
          expect(JSON.parse(data.toString())).lengthOf(1)
          expect(data.toString()).not.to.include('Eat').not.to.include('Sleep')
          done()
        })
      })
    })
  })

  describe('#deleteAllTasks', function () {
    it('should delete all tasks', function (done) {
      repo.deleteAllTasks(() => {
        repo.findTasks((data) => {
          console.log('- after deleteAllTasks:')
          expect(JSON.parse(data.toString())).lengthOf(0)
          done()
        })
      })
    })
  })
})
