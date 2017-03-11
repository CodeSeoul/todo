const Repository = require('../src/repository')

describe('repository', function () {
  describe('#addTask()', function () {
    it('test', function () {
      let repo = new Repository()
      repo.addTask('foobar')
    })
  })
})
