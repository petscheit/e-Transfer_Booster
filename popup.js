$(function(){
  finishTask();
  buttonClick();
  enterListener();
})

var finishTask = function(){
  $('body').on('click', '.task', function(event){
    $(this).addClass('hide')
    var index = $(this).attr('id')
    var entry = JSON.parse(localStorage.getItem('todo') || [] )
    entry[index].status = 'done'
    localStorage.setItem('todo', JSON.stringify(entry));
    chrome.extension.getBackgroundPage().setBadgeText()
  })
}

var buttonClick = function(){
  $('#dashboard').on('click', function(event){
    chrome.tabs.create({url: 'dashboard.html'})
  })
}

var enterListener = function(){
  $('#addTaskText').keydown(function(e) {
      if(e.keyCode == 13) {
        var options = {selection: $('#addTaskText').val()}
        chrome.extension.getBackgroundPage().saveToLocalStorage(options)
      }
  });
}

window.onload = function() {
  if (localStorage.todo === undefined){
      var todo = [{name: "Keine Aufgaben!"}]
  } else {
      var todo = JSON.parse(localStorage.getItem('todo') || [] );
  }

  _.each(todo, function(task, index){
    if (task.status === 'open' && (task.reminder === undefined || task.reminder <= Date.today().toString('yyyy-MM-dd'))){
      var heute = Date.now()
      stunden = Math.round((heute - task.timestamp) / (1000*60*60))
      if (stunden > 24){
        $('#tasks').append('<tr id="' + index + '" class="task"><td>' + task.name + " -  <small>" + Math.round(stunden / 24) + ' Tage</small>' + '</td></tr>')
      } else {
        $('#tasks').append('<tr id="' + index + '" class="task"><td>' + task.name + " -  <small>" + stunden + ' Stunden</small>' + '</td></tr>')
      }
    }
  });
}

