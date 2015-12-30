FlowRouter.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render('layout', {content: 'home'});
  }
});

FlowRouter.route('/users', {
  name: 'userlist',
  action: function() {
    BlazeLayout.render('layout', {content: 'userlist'});
  }
});

FlowRouter.route('/user/:id', {
  name: 'profile',
  action: function() {
    BlazeLayout.render('layout', {content: 'profile'});
  }
});
