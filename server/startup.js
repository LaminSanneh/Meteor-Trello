Meteor.startup(function () {
  if(Board.find().count() == 0){
    var boards = [
      {
        title: "Board 1",
        lists: [
          {
            title: 'List 1 for Board 1'
          },
          {
            title: 'List 2 for Board 1'
          }
        ]
      },
      {
        title: "Board 2",
        lists: [
          {
            title: 'List 1 for Board 2'
          },
          {
            title: 'List 2 for Board 2'
          }
        ]
      }
    ];

    boards.forEach(function(board){
      Board.insert(board);
    });
  }
});
