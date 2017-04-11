$(document).ready(() => {
  updateView()
  $('#btnRemove').click(removeCheckedTasks)
  $('#btnClear').click(removeAllTasks)
  $('#btnAdd').click(postNewTodo)
  $('#inAdd').keypress(event => {
    if (event.which === 13) {
      event.preventDefault() // prvent blinking
      postNewTodo()
    }
  })
})

function postNewTodo (event) {
  let task = {
    title: $('#inAdd').val(),
    status: 'ToDo'
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

function updateStartTime (id) {
  ajax.modifyTask(id, {startDate: new Date()}, data => {
    updateView()
  })
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
            <span id="timeDate">${task.startDate ? task.startDate.slice(0, 10) : ''}</span>
            <span id="timeHour">${task.startDate ? task.startDate.slice(11, 16) : ''}</span>
            <button id="startButton" onclick="updateStartTime('${task._id}')">Start</button>
            <button id="stopButton" onclick="updateStopTime('${task._id}')">Stop</button>
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
