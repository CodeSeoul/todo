let tasks = ['Go to store','Buy Bacon','Eat Bacon','Look at bacon','Think about Bacon'];

$(document).ready(() => {
  populate();
  addEventListenersToAdd();
  addEventListenersToRemove();
  // addEventLIstenersToTrash();
});

function populate() {
  let $tasks = $('#taskList');
  $tasks.html('');
  for (let i = 0; i < tasks.length; i++) {
    let $task = $('<li class="list-group-item">');
    let taskHtml = `<input type="checkbox" name="checkRemove" id="${i}" style="align:left">` +
      tasks[i] + `<button name="trash-icon" id="${tasks[i]}" onclick="removeTask('` + tasks[i] + `')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>`;
    $task.html(taskHtml);
    $tasks.append($task);
  }
}

function addEventListenersToAdd() {
  $('#btnAdd').click(() => {
    let $inAdd = $('#inAdd').val();
    if (validateLength($inAdd) === true) {
      tasks.push($inAdd);
      populate();
      console.log("added " + $inAdd);
    } else {
      window.alert(validateLength($inAdd));
    }
  });
}

function addEventListenersToRemove() {
  $('#btnRemove').click(function() {
    let checkedItems = $('input[type="checkbox"]:checkbox:checked');
    for (let i = 0; i < checkedItems.length; i++) {
      let id = checkedItems[i - i].id
      tasks.splice(id, 1);
    }
    populate();
  });
}

// function addEventLIstenersToTrash() {
//   $('button[name="trash-icon"]').each(function() {
//     $(this).click(function(event, id) {
//     }, $(this).attr('id'));
//   });
// }

function removeTask(id) {
  let index = tasks.indexOf(id);
  tasks.splice(index, 1);
  populate();
}

function validateLength($inAdd) {
  if ($inAdd.length < 1) return "Opps, Todo shouldn't be blank";
  if ($inAdd.length > 70) return "Todo should be less than 70 characters, yours is " + $inAdd.length + ".";
  return true;
}
