Meteor.publish("boards", function () {
  return Board.find();
});

Meteor.publish("lists", function () {
  return List.find();
});

Meteor.publish("cards", function () {
  return Card.find();
});
