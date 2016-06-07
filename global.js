date = function() {
  return new Date().getTime()
}

dateFunction = function(days) {
  return Date.today().addDays(days).toString('yyyy-MM-dd')
}

saveToLocalStorage = function(options) {
  console.log(options)
  if (localStorage.todo === undefined){
    var array = []
  } else {
    var array = JSON.parse(localStorage.getItem('todo') || [] );
  }
  array.push({name: options.selection, status: 'open', 'timestamp': date(), 'reminder': options['reminder']});
  localStorage.setItem('todo', JSON.stringify(array));
  chrome.extension.getBackgroundPage().setBadgeText()
}

var todo = function() {
  if (localStorage.todo === undefined){
      var todoArray = []
  } else {
      var todoArray = JSON.parse(localStorage.getItem('todo') || [] );
  }
  return todoArray
}
