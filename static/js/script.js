$(document).ready(() => {
  updateView()
  $('#btnRemove').click(removeCheckedTasks)
  $('#btnClear').click(removeAllTasks)
  $('#btnAdd').click(postNewTodo)
  $('#inAdd').keypress(event => {
    if(event.which === 13) {
      event.preventDefault() // prvent blinking
      postNewTodo()
    }
  })
})

function postNewTodo (event) {
  let task = {
    title: $('#inAdd').val(),
    status: 'ToDo',
    timeSubmissions: [],
    totalTime: 0,
  }
  let result = validateTodo(task)
  if (!result.valid) {
    return window.alert(result.error)
  }
  ajax.createTask(task, data => {
    updateView()
  })
}

function updateExistingTask (id, status) {
  ajax.modifyTask(id, {status: status}, data => {
    updateView()
  })
}

function timerStart (id) {
  ajax.modifyTask(id, {timerStart: Date.now()}, data => {
    updateView()
  })
}

function timerStop (id) {
  ajax.modifyTask(id, {timerStop: Date.now()}, data => {
    updateView()
  })

  createTimeSubmission(id)
}

function createTimeSubmission(id) {
  ajax.findTasks(tasks => {
    let task = tasks.filter(function(task) {
      return task._id === id;
    })

    let startTime = task[0].timerStart
    let stopTime = task[0].timerStop

    let currentTotalTime = stopTime - startTime
    let oldTotalTime = task[0].totalTime
    let newTotalTime = oldTotalTime += currentTotalTime

    let allTimeSubmissions = task[0].timeSubmissions
    allTimeSubmissions.push({ timeStamp : new Date(), totalMilliseconds : currentTotalTime })

    ajax.modifyTask(id, {totalTime: newTotalTime}, data => {
      updateView()
    })

    ajax.modifyTask(id, {timeSubmissions: allTimeSubmissions}, data => {
      updateView()
    })
  })
}

function convertToTime(milliseconds) {
  let seconds = (milliseconds / 1000) % 60 ;
  let minutes = ((milliseconds / (1000*60)) % 60);
  let hours   = ((milliseconds / (1000*60*60)) % 24);
  if (hours >= 1) {
    return Math.floor(hours) + ':' + pad(Math.floor(minutes)) + ':' + pad(Math.floor(seconds))
  } else {
    return pad(Math.floor(minutes)) + ':' + pad(Math.floor(seconds))
  }

  function pad(num) {
    return num > 10 ? num : '0' + num
  }
}

function removeTask (id) {
  ajax.removeTasks([id], data => {
    updateView()
  })
}

function removeCheckedTasks () {
  let checkedItems = $('input[type="checkbox"]:checkbox:checked')
  let arr = []
  for (let i = 0; i < checkedItems.length; i++) {
    arr.push(checkedItems[i].id)
  }
  ajax.removeTasks(arr, data => {
    updateView()
  })
}

function removeAllTasks () {
  ajax.removeTasks(['ALL'], data => {
    updateView()
  })
}

function updateView () {
  $('.task-form').trigger('reset')
  $('#inAdd').focus()
  $('#taskList').html('')
  ajax.findTasks(tasks => {
    $('.task-count').empty().hide().append(tasks.length).fadeIn(600)
    html = tasks
      .filter(task => {
        return task.status !== 'Archived'
      })
      .map(task => {
        return `
          <li class="list-group-item">
            <select name="select" id="selector" onchange="updateExistingTask('${task._id}', value)">
              <option value="ToDo" ${task.status === 'ToDo' ? 'selected' : ''}>ToDo</option>
              <option value="Doing" ${task.status === 'Doing' ? 'selected' : ''}>Doing</option>
              <option value="Done" ${task.status === 'Done' ? 'selected' : ''}>Done</option>
            </select>
            <label>
            <input type="checkbox" name="checkRemove" id='${task._id}' />
            <b>${task.title}</b>
            </label>
            <span class="pull-right">
            <span id="totalTime">${task.totalTime > 0 ? convertToTime(task.totalTime) : ''}</span>
            <span id="timeDate">${task.startDate ? task.startTime.slice(0, 10) : ''}</span>
            <span id="timeHour">${task.startDate ? task.startTime.slice(11, 16) : ''}</span>
            <button id="startButton" onclick="timerStart('${task._id}')">Start</button>
            <button id="stopButton" onclick="timerStop('${task._id}')">Stop</button>
              <button onclick="removeTask('${task._id}')">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
            </span>
          </li>
        `
      })
    $('#taskList').html(html)
  })
}
