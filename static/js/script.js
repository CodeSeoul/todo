let tasks = ['Go to store','Buy Bacon','Eat Bacon'];

$(document).ready(() => {
  populate();
  addEventListeners();
});

function populate() {
  let $tasks = $('#taskList');
  $tasks.html('');
  for (let i = 0; i < tasks.length; i++) {
    let $task = $('<li>').text(tasks[i]);
    $tasks.append($task);
  }
}

function addEventListeners() {
  $('#btnAdd').click(() => {
    let $inAdd = $('#inAdd').val();
    tasks.push($inAdd);
    populate();
    window.alert("added " + $inAdd);
  });
}
