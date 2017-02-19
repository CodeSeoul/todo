let tasks = ['Go to store','Buy Bacon','Eat Bacon'];

$(document).ready(() => {
  populate();
  addEventListeners();
});

function populate() {
  let $tasks = $('#taskList');
  $tasks.html('');
  for (let i = 0; i < tasks.length; i++) {
    let $task = $('<li class="list-group-item">').text(tasks[i]);
    $tasks.append($task);
  }
}

function addEventListeners() {
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

function validateLength($inAdd) {
  if ($inAdd.length < 1) return "Opps, Todo shouldn't be blank"
  if ($inAdd.length > 70) return "Todo should be less than 70 characters, yours is " + $inAdd.length + "."
  return true;
}
