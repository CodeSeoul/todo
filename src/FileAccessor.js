const fs = require('fs')
const path = require('path')

class FileAccessor {
  constructor (fileName) {
    this.filePath = path.join(__dirname, fileName)
  }

  /**
   * covert object to string and then save it to the file
   */
  saveObjToFile (obj, callback) {
    let string = JSON.stringify(obj)
    fs.writeFile(this.filePath, string, 'utf8', (err) => {
      if (err) {
        return console.error('Failed to save.', err)
      }
      callback()
    })
  }

  /**
   * load string from file and then convert it to an object
   */
  loadObjFromFile (callback) {
    fs.readFile(this.filePath, 'utf8', (err, string) => {
      if (err) {
        return console.error('Failed to load.', err)
      }
      let obj = JSON.parse(string)
      callback(obj)
    })
  }
}

module.exports = FileAccessor
