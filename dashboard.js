$(function(){
  sortTasks();
  openTask(openTasks);
  doneTask(doneTasks);
  tomorrowTask(tomorrowTasks);
})

var sortTasks = function() {
  var tasks = JSON.parse(localStorage.getItem('todo') || [] );
  openTasks = []
  doneTasks = []
  tomorrowTasks = []

  _.each(tasks, function(task){
    if (task.reminder === Date.today().addDays(1).toString('yyyy-MM-dd')){
      tomorrowTasks.push(task)
    } else if (task.status === 'done'){
      doneTasks.push(task)
    } else if (task.status === 'open'){
      openTasks.push(task)
    }
  })
}

var openTask = function(tasks) {
  _.each(tasks, function(task, index){
    var heute = Date.now()
    stunden = Math.round((heute - task.timestamp) / (1000*60*60))
    if (stunden > 24){
      $('#openTasks').append('<tr id="' + index + '" class="taskMain"><td>' + task.name + " - <small>" + Math.round(stunden / 24) + ' Tage</small>' + '</td></tr>')
    } else {
      $('#openTasks').append('<tr id="' + index + '" class="taskMain"><td>' + task.name + " - <small>" + stunden + ' Stunden</small>' + '</td></tr>')
    }
  });
}

var doneTask = function(tasks) {
  _.each(tasks, function(task, index){
    var heute = Date.now()
    stunden = Math.round((task.timestamp - heute) / (1000*60*60))
    $('#doneTasks').append('<tr id="' + index + '" class="taskMain"><td>' + task.name + '</td></tr>')
  });
}

var tomorrowTask = function(tasks) {
  _.each(tasks, function(task, index){
    $('#tomorrowTasks').append('<tr id="' + index + '" class="taskMain"><td>' + task.name + '</td></tr>')
  });
}
