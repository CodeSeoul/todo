const ajax = {
  createTask: function (task, callback) {
    this.callAjax('POST', '/tasks', task, data => {
      callback(data)
    })
  },
  findTasks: function (callback) {
    this.callAjax('GET', '/tasks', null, data => {
      callback(data)
    })
  },
  modifyTask: function (id, task, callback) {
    this.callAjax('PUT', `/tasks/${id}`, task, data => {
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

let timer

function incrementSeconds(state) {
  let sec = 1;

  $('#seconds').html('00:00')

  if (state === 'on') {
    timer = setInterval(function(){
      $('#seconds').html(pad(sec % 60))
      $("#minutes").html(pad(parseInt(sec/60)) + ':')
      sec++
    }, 1000)
  } else {
    // location.reload()
    clearInterval(timer)
  }
}

function convertTimeFormat(milliseconds) {
  let seconds = (milliseconds / 1000) % 60 ;
  let minutes = ((milliseconds / (1000*60)) % 60);
  let hours   = ((milliseconds / (1000*60*60)) % 24);
  if (hours >= 1) {
    return Math.floor(hours) + ':' + pad(Math.floor(minutes)) + ':' + pad(Math.floor(seconds))
  } else {
    return pad(Math.floor(minutes)) + ':' + pad(Math.floor(seconds))
  }
}

function pad(num) {
  return num > 10 ? num : '0' + num
}
