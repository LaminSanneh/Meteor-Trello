Session.setDefault('counter', 0);

Template.boards.helpers({
  boards: function () {
    return Board.find();
  }
});

Template.boards.events({
  'click .deleteBoardItem': function () {
    console.log(this);
    Meteor.call("deleteModel", this);
  }
});
