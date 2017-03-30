const FileAccessor = require('../src/FileAccessor')
const expect = require('chai').expect

let fileAccessor

describe('FileAccessor', function () {
  before(function (done) {
    fileAccessor = new FileAccessor('tests.dat')
    done()
  })

  describe('#save&load', function () {
    it('should save obj to file and load obj from file', function (done) {
      const objToSave = [{name: 'A'}, {name: 'B'}, {name: 'C'}]
      console.log('objToSave:', objToSave)
      fileAccessor.saveObjToFile(objToSave, _ => {
        fileAccessor.loadObjFromFile(objSaved => {
          console.log('objSaved:', objSaved)
          expect(objSaved).to.be.deep.equal(objToSave)
          done()
        })
      })
    })
  })
})
