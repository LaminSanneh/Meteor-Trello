Template.boards.helpers({
  boards: function () {
    return Board.find();
  }
});

Template.boards.events({
  'click .deleteBoardItem': function () {
    console.log(this);
    Meteor.call("deleteModel", this);
  },
  'submit .createNewModelForm': function (event, target) {
    event.preventDefault();

    var newModelTitle = event.target.title.value;
    Board.insert({
      title: newModelTitle,
      lists: []
    });
    event.target.title.value = "";
  }
});

Template.board.helpers({
  lists: function () {
    return List.find({boardId: this._id}, {
      sort: { order: 1 }
    });
  }
});

Template.boardList.helpers({
  cards: function () {
    return Card.find({listId: this._id});
  }
});

Template.cardInlineModelCreator.onCreated(function() {
  this.inEditMode = new ReactiveVar;
  this.inEditMode.set(false);
});

Template.cardInlineModelCreator.helpers({
  inEditMode: function() {
    return Template.instance().inEditMode.get();
  }
});

Template.cardInlineModelCreator.events({
  'click .add-model-link': function (event, template) {
    template.inEditMode.set(true);
  },
  'click .cancel-add-model-link': function (event, template) {
    template.inEditMode.set(false);
  },
  'submit .model-creator-form': function (event, template) {
    event.preventDefault();
    var list = this;
    Card.insert({
      title: event.target.title.value,
      listId: list._id
    });
  }
});

Template.listInlineModelCreator.onCreated(function() {
  this.inEditMode = new ReactiveVar;
  this.inEditMode.set(false);
});

Template.listInlineModelCreator.helpers({
  inEditMode: function() {
    return Template.instance().inEditMode.get();
  }
});

Template.listInlineModelCreator.events({
  'click .add-model-link': function (event, template) {
    template.inEditMode.set(true);
  },
  'click .cancel-add-model-link': function (event, template) {
    template.inEditMode.set(false);
  },
  'submit .model-creator-form': function (event, template) {
    event.preventDefault();
    var board = this.board, order;
    var listWithHighestOrder = List.findOne({boardId: board._id}, {sort: {order: -1}});
    if(listWithHighestOrder == null){
      order = 0;
    }
    else{
      order = listWithHighestOrder.order + 1;
    }
    List.insert({
      title: event.target.title.value,
      boardId: board._id,
      order: order
    });
  }
});
