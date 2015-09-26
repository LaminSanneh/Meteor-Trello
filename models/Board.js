Board = new Mongo.Collection("boards");

// boardCursor = Board.find();
//
// boardCursor.observe({
//   added: function(board){
//     board.lists = [];
//     Board.update({_id: board._id}, board);
//   }
// });
