Meteor.methods({
  deleteModel: function(model){
    Board.remove({_id: model._id});
  }
});
