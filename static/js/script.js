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
      for (let i = 0; i < tasks.length; i++) {
        let $liTask = $('<li>').addClass('list-group-item')
        let $checkbox = $('<input>').attr('type', 'checkbox').attr('name', 'checkRemove').attr('id', tasks[i]._id).css('align', 'left')
        let $btnTrash = $('<button>').attr('id', tasks[i]).click(removeTask)
        $btnTrash.html('<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>')
        $liTask.append($checkbox).append(tasks[i].title).append($btnTrash)
        $tasks.append($liTask)
      }
    })
}

function addEventListenersToAdd () {
  $('#btnAdd').click(() => {
    let inAdd = {
        title: $('#inAdd').val(),
        status: 'ToDo'
    }
    let btnValidity = checkValidityButtons(inAdd, 'a')
    if (btnValidity === true) {
      $.get('http://localhost:3000/tasks')
        .done(data => {

          let tasks = JSON.parse(data)
          console.log(data)
          if (tasks.indexOf(inAdd) === -1) {
            $.ajax({
              url: 'http://localhost:3000/tasks',
              method: 'POST',
              contentType: 'application/json',
              data: JSON.stringify(inAdd)
            }).done(data => {
                populate()
              })
            } else {
              window.alert('that todo is already on the list')
            }
        })
    } else {
      window.alert(btnValidity)
    }
  })
}

function addEventListenersToRemove () {
  $('#btnRemove').click(function () {
    let checkedItems = $('input[type="checkbox"]:checkbox:checked')
    let arr = []
    for (let i = 0; i < checkedItems.length; i++) {
      arr.push(checkedItems[i].id)
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
  $.ajax({
    url: 'http://localhost:3000/tasks',
    method: 'DELETE',
    data: JSON.stringify([id])
  }).done(data => {
    populate()
  })
}

function checkValidityButtons ($inAdd, op) { // @: $inAdd: texture input, op: operation code
  if ($inAdd.length < 1) return "Opps, Todo shouldn't be blank"
  if ($inAdd.length > 70) return 'Todo should be less than 70 characters, yours is ' + $inAdd.length + '.'

  return true
}
