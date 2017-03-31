$(document).ready(() => {
  populate()
  addEventListenersToAdd()
  addEventListenersToRemove()
  addEventListenersToTrash()
})

function populate () {
  let $tasks = $('#taskList')
  findTasksByAjax(data => {
    let tasks = data.filter(function(value) {
      return value.status !== 'Archived'
    })
    $tasks.html('')
    $('.task-count').empty().hide().append(tasks.length).fadeIn(600)
    $(".task-form").trigger("reset");
    $('#inAdd').focus();
    for (let i = 0; i < tasks.length; i++) {
      let $liTask = $('<li>').addClass('list-group-item')
      let $checkbox = $('<input>').attr('type', 'checkbox').attr('name', 'checkRemove').attr('id', tasks[i]._id).css('align', 'left')
      let $btnTrash = $('<button>').attr('id', tasks[i]._id).text('X').click(removeTask)
      // $btnTrash.html('<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>')
        $liTask.append($checkbox).append(tasks[i].title).append($btnTrash)
        $tasks.append($liTask)
    }
  })
}

function addEventListenersToAdd () {
  $('#inAdd').keypress(function(event){
    if(event.which === 13) {
      let inAdd = {
        title: $('#inAdd').val(),
        status: 'ToDo',
      }
      validateTodo(inAdd) === true ? postNewTodo(inAdd) : window.alert(validateTodo(inAdd))
    }
  })

  $('#btnAdd').click(() => {
    let inAdd = {
        title: $('#inAdd').val(),
        status: 'ToDo'
    }
    validateTodo(inAdd) === true ? postNewTodo(inAdd) : window.alert(validateTodo(inAdd))
  })
}

function postNewTodo(task) {
  createTaskByAjax(task, data => {
    populate()
  })
}

function addEventListenersToRemove () {
  $('#btnRemove').click(function () {
    let checkedItems = $('input[type="checkbox"]:checkbox:checked')
    let arr = []
    for (let i = 0; i < checkedItems.length; i++) {
      arr.push(checkedItems[i].id)
    }
    deleteTasksByAjax(arr, data => {
      populate()
    })
  })
}

function addEventListenersToTrash () {
  $('#btnClear').click(function () {
    deleteTasksByAjax(['ALL'], data => {
      populate()
    })
  })
}

function removeTask (event) {
  let id = event.target.id
  deleteTasksByAjax([id], data => {
    populate()
  })
}

function validateTodo($inAdd) {
  if ($inAdd.title.length < 1) return "Todo shouldn't be blank"
  if ($inAdd.title.length > 70) return 'Todo should be less than 70 characters, yours is ' + $inAdd.title.length + '.'
  // needs to populate the form value if the length is too long so users don't have to retype the todo when failing validation

  return true
}
