Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('userlist', { path: '/users'});
  this.route('profile', {
    path: '/user/:id',
    data: function() {
      return {
        'id': this.params.id
      }
    }
  });
});
