Router.route('/', function () {
  this.render('boards');
});

Router.route('/boards/:_id', function () {
  this.render('board', {
    data: function () {
      return Board.findOne({_id: this.params._id});
    }
  });
},
{
  name: 'board'
});
