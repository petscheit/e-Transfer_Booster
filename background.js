chrome.contextMenus.create({
  "title": "Merken",
  "contexts": ["selection"],
  "onclick" : function(selection){
    saveToLocalStorage({selection: selection.selectionText})
  }
});

chrome.contextMenus.create({
  "title": "Morgen Erinnern",
  "contexts": ["selection"],
  "onclick" : function(selection){
    saveToLocalStorage({reminder: dateFunction(1), selection: selection.selectionText})
  }
});

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse){
    if(request.msg == 'addTask'){
      sendResponse(dateFunction(1));
    }
  }
)

var openTasksNumber = function(){
  count = 0
  _.each(todo(), function(task){
    if (task.status === 'open'){
      console.log(task)
      count++
    }
  })
  return count.toString()
}

chrome.browserAction.setBadgeText({
  text: openTasksNumber()
});
