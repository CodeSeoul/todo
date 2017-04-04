const ajax = {
  createTask: function (task, callback) {
    this.callAjax('POST', '/tasks', task, data => {
      callback(data)
    })
  },
  updateExistingTask: function (idStatusArr, callback) {
    this.callAjax('POST', '/tasks', idStatusArr, data => {
      callback(data)
    })
  },
  updateStartTime: function (id, callback) {
    this.callAjax('PUT', '/tasks', id, data => {
      callback(data)
    })
  },
  findTasks: function (callback) {
    this.callAjax('GET', '/tasks', null, data => {
      callback(data)
    })
  },
  removeTasks: function (ids, callback) {
    this.callAjax('DELETE', '/tasks', ids, data => {
      callback(data)
    })
  },
  callAjax: function (method, path, data, callback) {
    console.log(`Calling Ajax... ${method} ${path}`)
    let settings = {
      url: path,
      method: method,
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json'
    }
    if (data) {
      settings.data = JSON.stringify(data)
      console.log(settings.data)
    }
    $.ajax(settings).done(data => {
      console.log('response data:', data)
      callback(data)
    })
  }
}

function validateTodo (task) {
  if (task.title.length < 1) {
    return {
      valid: false,
      error: `Todo shouldn't be blank`
    }
  }
  if (task.title.length > 70) {
    return {
      valid: false,
      error: `Todo should be less than 70 characters, yours is ${task.title.length}.`
    }
  }
  return {
    valid: true
  }
}
