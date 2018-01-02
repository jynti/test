function PrioritySort(domElements){
  this.lists = domElements.lists;
  this.button = domElements.button;
}

PrioritySort.prototype.init = function(){
  this.createForOuterList();
}

PrioritySort.prototype.createForOuterList = function(){
  var _this = this;
  this.lists.each(function(index, item){
    var outerList = new OuterList($(item));
    outerList.init();
  });
}

////////////////////////////////////////////////////////////
function OuterList(list){
  this.list = list;
}

OuterList.prototype.init = function(){
  this.show();
  this.bindClickEvent();
}

OuterList.prototype.show = function(){
  var _this = this;
  var initialCount = this.list.data("initial-items-count");

  var x = this.list.find("li")
  x.each(function(index, item){
    if(!$(item).data("priority-order")){
      $(item).data("priority-order", 0);
    }
  });
  var sorted = this.sortByPriority().reverse();
  var visibleList = sorted.slice(0, initialCount);
  var hiddenList = sorted.slice(initialCount, sorted.length);
  hiddenList.forEach(function(item, index){
    $(item).hide();
  })
  visibleList.forEach(function(item, index){
    _this.list.append($(item));
  })
}

OuterList.prototype.showAll = function(){
  var _this = this;
  var allListItems = this.list.find("li").toArray();
  allListItems.sort(function(listItem1, listItem2){
    if($(listItem1).text() > $(listItem2).text()){
      return 1;
    }
    else{
      return -1;
    }
  });
  $(allListItems).each(function(index, item){
    _this.list.append($(item));
    $(item).show();
  })
}

OuterList.prototype.bindClickEvent = function(){
  var _this = this;
  this.button = this.list.next();
  this.button.on("click", function(){
    if($(this).val() == "See All"){
      $(this).val("See Less");
      _this.showAll();
    } else {
      $(this).val("See All");
      _this.show();
    }
  })
}

OuterList.prototype.sortByPriority = function(){
  priority = this.list.find("li").toArray();
  priority.sort(function(listItem1, listItem2){
    var first = $(listItem1).data("priority-order");
    var second = $(listItem2).data("priority-order");
    return first - second;
  });
  return priority;
}

///////////////////////////////////////////////////////////
$(document).ready(function(){
  domElements = {
    lists: $("ul").filter(".priority-sort"),
    button: $("input[name='button']")
  };

  var prioritySort = new PrioritySort(domElements);
  prioritySort.init();
});
