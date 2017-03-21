const Repository = require('../src/repository')
const expect = require('chai').expect
const fs = require('fs')
const path = require('path')

let repo
describe('Repository', function () {
  before(function (done) {
    repo = new Repository()
    let data = [
      {
        _id: 1,
        title: 'Eat',
        status: 'Done'
      },
      {
        _id: 2,
        title: 'Sleep',
        status: 'Todo'
      },
      {
        _id: 3,
        title: 'Play',
        status: 'Doing'
      },
      {
        _id: 4,
        title: 'Play',
        status: 'Archived'
      }
    ]
    fs.writeFile(path.join(__dirname, '../src/tasks.dat'), JSON.stringify(data), (err) => {
      if (err) console.log('- failed to initialize data:' + err)
      console.log('- Initialized data')
      done()
    })
  })

  describe('#findTask', function () {
    it('should find all the tasks', function (done) {
      repo.findTasks((data) => {
        console.log('- after findTask:', data)
        expect(data).have.length.at.least(2)
        done()
      })
    })
  })

  describe('#addTask', function () {
    it('should add a task', function (done) {
      repo.addTask({
        title: 'Test',
        status: 'Doing'
      }, () => {
        repo.findTasks((data) => {
          console.log('- after addTask:', data)
          expect(data).lengthOf(5)
          expect(data[4].title).to.equal('Test')
          expect(data[4].status).to.equal('Doing')
          expect(data[4]).to.have.property('_id')
          done()
        })
      })
    })
  })

  // describe('#deleteTask', function () {
  //   it('should delete a task', function (done) {
  //     repo.deleteTask('foobar', () => {
  //       repo.findTasks((data) => {
  //         console.log('- after deleteTask:', data.toString())
  //         expect(JSON.parse(data.toString())).lengthOf(3)
  //         expect(data.toString()).not.to.include('foobar')
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // describe('#deleteSelectedTasks', function () {
  //   it('should delete all selected tasks', function (done) {
  //     repo.deleteSelectedTasks(['Sleep', 'Eat'], () => {
  //       repo.findTasks((data) => {
  //         console.log('- after deleteSelectedTasks:')
  //         expect(JSON.parse(data.toString())).lengthOf(1)
  //         expect(data.toString()).not.to.include('Eat').not.to.include('Sleep')
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // describe('#deleteAllTasks', function () {
  //   it('should delete all tasks', function (done) {
  //     repo.deleteAllTasks(() => {
  //       repo.findTasks((data) => {
  //         console.log('- after deleteAllTasks:')
  //         expect(JSON.parse(data.toString())).lengthOf(0)
  //         done()
  //       })
  //     })
  //   })
  // })
})
