Template.boards.helpers({
  boards: function () {
    return Board.find();
  }
});

Template.boards.events({
  'click .deleteBoardItem': function () {
    console.log(this);
    var board = this;
    new Confirmation({
      message: "Are you sure ?",
      title: "Delete Board Confirmation",
      cancelText: "Cancel",
      okText: "Ok",
      success: true
    }, function (ok) {
      if(ok){
        Meteor.call("deleteModel", board);
      }
    });
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
    return Card.find({listId: this._id}, {
      sort: { order: 1 }
    });
  },
  boardListOptions: function () {
    var list = this;
    return {
        group: {
            name: "boardLists",
            pull: true,
            put: true
        },
        onAdd: function (evt) {
          var card = _.clone(evt.data);
          evt.data = card;
          delete evt.data._id;
          evt.data.listId = list._id;
        }
    };
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
    var list = this, order;
    var cardWithHighestOrder = Card.findOne({listId: list._id}, {sort: {order: -1}});
    if(cardWithHighestOrder == null){
      order = 0;
    }
    else{
      order = cardWithHighestOrder.order + 1;
    }
    Card.insert({
      title: event.target.title.value,
      listId: list._id,
      order: order
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

Template.listCard.events({
  'click .delete-card-item': function (event, template) {
    var card = this;
    event.stopImmediatePropagation();
    new Confirmation({
      message: "Are you sure ?",
      title: "Delete Card Confirmation",
      cancelText: "Cancel",
      okText: "Ok",
      success: true
    }, function (ok) {
      if(ok){
        Card.remove({_id: card._id});
      }
    });
  },
  'click': function (event, template) {
    Router.go('card', this);
  }
});

Template.card.onRendered(function () {
  Overlay.show('cardOverlayContent');
});

Template.card.onDestroyed(function () {
  Overlay.hide();
});
