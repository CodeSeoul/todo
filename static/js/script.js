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

function createTimeSubmission(id, currentTotalTime) {
  ajax.findTasks(tasks => {
    let task = tasks.filter(function(task) {
      return task._id === id;
    })

    let oldTotalTime = task[0].totalTime
    let newTotalTime = oldTotalTime += currentTotalTime

    ajax.modifyTask(id, {totalTime: newTotalTime}, data => {
      updateView()
    })

    let allTimeSubmissions = task[0].timeSubmissions
    allTimeSubmissions.push({ timeStamp : new Date(), totalMilliseconds : currentTotalTime })

    ajax.modifyTask(id, {timeSubmissions: allTimeSubmissions}, data => {
      updateView()
    })
  })
}

function timerStart(id) {
  console.log('.btnStart Array:', $('.btnStart'))
  // let keys = Object.keys($('.btnStart'))
  // console.log(keys);
  $('.btnStart').hide()
  currentTime.startTime = Date.now()
  incrementSeconds('on')
  updateView()
}

function timerStop(id) {
  currentTime.stopTime = Date.now()
  totalTime = currentTime.stopTime - currentTime.startTime

  incrementSeconds('off')
  createTimeSubmission(id, totalTime)
}

let currentTime = {
  startTime: 0,
  stopTime: 0,
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
            <span id="totalTime">${task.totalTime > 0 ? convertTimeFormat(task.totalTime) : ''}</span>
            <label>
            <input type="checkbox" name="checkRemove" id='${task._id}' />
            <b>${task.title}</b>
            </label>
            <span class="pull-right">
            <div id="buttonContainer">
            <div id="timeClock"><span id="hours"></span><span id="minutes"></span><span id="seconds"></span></div>
            <button class="btnStart btn btn-success" onclick="timerStart('${task._id}')">Start</button>
            <button class="btnStop btn btn-danger" onclick="timerStop('${task._id}')">Stop</button>
              <button onclick="removeTask('${task._id}')">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
            </span>
            </div>
          </li>
        `
      })
    $('#taskList').html(html)
  })
}
