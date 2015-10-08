var allowed = [List, Board, Card];

allowed.forEach(function(item){
  item.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
});
