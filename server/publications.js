Meteor.publish("boards", function () {
  return Board.find();
});

Meteor.publish("lists", function () {
  return List.find();
});
