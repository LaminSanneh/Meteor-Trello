Meteor.startup(function () {
  Sortable.collections = ['lists', 'cards'];

  if(Board.find().count() == 0){
    var lists1 = [
      {
        title: 'List 1 for Board 1'
      },
      {
        title: 'List 2 for Board 1'
      }
    ],
    lists2 = [
      {
        title: 'List 1 for Board 2'
      },
      {
        title: 'List 2 for Board 2'
      }
    ];

    var board1 = {
      title: "Board 1"
    },
    board2 = {
      title: "Board 2"
    };

    board1 = Board.insert(board1);
    board1 = Board.findOne({_id: board1});

    lists1.forEach(function (list, i) {
      list.order = i;
      list = List.insert(list);
      list = List.findOne({_id: list});
      list.boardId = board1._id;
      List.update({_id: list._id}, list);
    });

    board2 = Board.insert(board2);
    board2 = Board.findOne({_id: board2});

    lists2.forEach(function (list, i) {
      list.order = i;
      list = List.insert(list);
      list = List.findOne({_id: list});
      list.boardId = board2._id;
      List.update({_id: list._id}, list);
    });

    // list = List.insert(lists1[0]);
    // board1.lists.push(list);
    // list = List.insert(lists1[1]);
    // board1.lists.push(list);
    //
    // list = List.insert(lists2[0]);
    // board2.lists.push(list);
    // list = List.insert(lists2[1]);
    // board2.lists.push(list);
    //
    // Board.update({_id: board1._id}, board1);
    // Board.update({_id: board2._id}, board2);
  }
});
