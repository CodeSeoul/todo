$(document).ready(() => {
  populate()
  addEventListenersToAdd()
  addEventListenersToRemove()
  addEventListenersToTrash()
})

function populate () {
  let $tasks = $('#taskList')
  $.get('http://localhost:3000/tasks')
    .done(data => {
      let tasks = JSON.parse(data)
      $tasks.html('')
      $('.task-count').empty().hide().append(tasks.length).fadeIn(600)
      $(".task-form").trigger("reset");
      $('#inAdd').focus();
      for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i]._id)
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

function postNewTodo(todoObj) {
  $.get('http://localhost:3000/tasks')
    .done(data => {

    let tasks = JSON.parse(data)
    console.log(data)
    if (tasks.indexOf(todoObj) === -1) {
      $.ajax({
        url: 'http://localhost:3000/tasks',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(todoObj)
      }).done(data => {
          populate()
        })
      } else {
        window.alert('that todo is already on the list')
      }
  })
}

function addEventListenersToRemove () {
  $('#btnRemove').click(function () {
    let checkedItems = $('input[type="checkbox"]:checkbox:checked')
    let arr = []
    for (let i = 0; i < checkedItems.length; i++) {
      arr.push(parseInt(checkedItems[i].id))
    }
    $.ajax({
      url: 'http://localhost:3000/tasks',
      method: 'DELETE',
      contentType: 'application/json',
      data: JSON.stringify(arr)
    }).done(data => {
      populate()
    })
  })
}

function addEventListenersToTrash () {
  $('#btnClear').click(function () {
    $.ajax({
      url: 'http://localhost:3000/tasks',
      method: 'DELETE',
      contentType: 'application/json',
      data: 'ALL'
    }).done(data => {
      populate()
    })
  })
}

function removeTask (event) {
  let id = event.target.id
  console.log('id:', id)
  console.log("###", JSON.stringify([id]))
  $.ajax({
    url: 'http://localhost:3000/tasks',
    method: 'DELETE',
    contentType: 'application/json',
    data: JSON.stringify([parseInt(id)])
  }).done(data => {
    populate()
  })
}

function validateTodo($inAdd) {
  if ($inAdd.title.length < 1) return "Todo shouldn't be blank"
  if ($inAdd.title.length > 70) return 'Todo should be less than 70 characters, yours is ' + $inAdd.title.length + '.'

  return true
}
