function createTaskByAjax (task, callback) {
  callAjax('POST', '/tasks', task, data => {
    callback(data)
  })
}

function findTasksByAjax (callback) {
  callAjax('GET', '/tasks', null, data => {
    callback(data)
  })
}

function deleteTasksByAjax (ids, callback) {
  callAjax('DELETE', '/tasks', ids, data => {
    callback(data)
  })
}

function callAjax (method, path, data, callback) {
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
