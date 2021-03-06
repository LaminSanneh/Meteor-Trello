Router.plugin('auth', {
  except: [
    'login'
  ]
});

Router.route('/', function () {
  this.render('boards');
});

Router.route('/boards/:_id', function () {
  this.render('board', {
    data: function () {
      return Board.findOne({_id: this.params._id});
    }
  });
},{
  name: 'board'
});

Router.route('/cards/:_id', function () {
  this.render('card', {
    data: function () {
      return Card.findOne({_id: this.params._id});
    }
  });
},{
  name: 'card'
});

Router.route('/login', function () {
  this.render('login');
});
