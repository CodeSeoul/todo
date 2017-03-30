const fs = require('fs')
const path = require('path')

class FileAccessor {
  constructor (fileName) {
    this.filePath = path.join(__dirname, fileName)
  }

  /**
   * covert data to string and then save to file
   */
  saveObjToFile (obj, callback) {
    let data = JSON.stringify(obj)
    fs.writeFile(this.filePath, data, 'utf8', (err) => {
      if (err) {
        return console.error('Failed to save.', err)
      }
      callback()
    })
  }

  /**
   * load string from file and then convert to object
   */
  loadObjFromFile (callback) {
    fs.readFile(this.filePath, 'utf8', (err, data) => {
      if (err) {
        return console.error('Failed to load.', err)
      }
      let obj = JSON.parse(data)
      callback(obj)
    })
  }
}

module.exports = FileAccessor
