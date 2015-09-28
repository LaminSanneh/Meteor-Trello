var subscriptions = ["boards", "lists", "cards"];

subscriptions.forEach(function (subscription) {
  Meteor.subscribe(subscription);
});
