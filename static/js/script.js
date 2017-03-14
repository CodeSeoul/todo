$(document).ready(() => {
  populate()
  addEventListenersToAdd()
  addEventListenersToRemove()
  // addEventLIstenersToTrash();
  $('#btnAjax').click(callAjax)
})

function populate () {
  let $tasks = $('#taskList')
  $.get('http://localhost:3000/tasks')
    .done(data => {
      let tasks = JSON.parse(data)
      $tasks.html('')
      for (let i = 0; i < tasks.length; i++) {
        let $task = $('<li class="list-group-item">')
        let taskHtml = `<input type="checkbox" name="checkRemove" id="${tasks[i]}" style="align:left">` +
          tasks[i] + `<button name="trash-icon" id="${tasks[i]}" onclick="removeTask('` + tasks[i] + `')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>`
        $task.html(taskHtml)
        $tasks.append($task)
      }
    })
}

function addEventListenersToAdd () {
  $('#btnAdd').click(() => {
    let inAdd = $('#inAdd').val()
    let btnValidity = checkValidityButtons(inAdd, 'a')
    if (btnValidity === true) {
      $.post('http://localhost:3000/tasks', inAdd)
        .done(data => {
          populate()
        })
    } else {
      window.alert(btnValidity)
    }
  })
}

function addEventListenersToRemove () {
  $('#btnRemove').click(function () {
    let checkedItems = $('input[type="checkbox"]:checkbox:checked')
    console.log(checkedItems)
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

// function addEventLIstenersToTrash () {
//   $('button[name="trash-icon"]').each(function () {
//     $(this).click(function (event, id) {
//       $.ajax({
//         url: 'http://localhost:3000/tasks',
//         method: 'DELETE',
//         data: id
//       }).done(data => {
//         populate()
//       })
//     }, $(this).attr('id'))
//   })
// }

function removeTask (id) {
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
  // if ($inAdd.length < 1) return "Opps, Todo shouldn't be blank"
  // if ($inAdd.length > 70) return 'Todo should be less than 70 characters, yours is ' + $inAdd.length + '.'
  //
  // let isTaskInList = tasks.includes($inAdd)
  //
  // if (op === 'a' && isTaskInList) { // Checks Add Button
  //   return 'Oops, Task is already in the list'
  // } else if (op === 'r' && !isTaskInList) { // Checks Remove Buton
  //   return 'Oops, Task is NOT in the list'
  // }
  //
  return true
}

function callAjax () {
  $.get('http://localhost:3000/tasks')
    .done(data => {
      window.alert(data)
    })
}
