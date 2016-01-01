Template.profile.onCreated(function() {
  this.subscribe('postsBy', FlowRouter.getParam('id'));
  this.subscribe('user', FlowRouter.getParam('id'));
  this.subscribe('followers', FlowRouter.getParam('id'));
  this.subscribe('followedUsers', FlowRouter.getParam('id'));
});

Template.profile.helpers({
  'posts': function() {
    return Posts.find({owner: FlowRouter.getParam('id'), parent: null}, {sort: {date: -1}});
  },
  'hasPosts': function() {
    return Posts.find({owner: FlowRouter.getParam('id'), parent: null}).count() > 0;
  },
  'user': function() {
    return Meteor.users.findOne({_id: FlowRouter.getParam('id')});
  }
});

Template.userinfoheader.onCreated(function(){
  this.subscribe('followedUsers', Meteor.userId());
});

Template.userinfoheader.helpers({
  'displayName': function() {
    if (this.username) {
      return this.username;
    } else if (this.emails && this.emails.length > 0) {
      return this.emails[0].address;
    } else {
      return "Anonymous";
    }
  },
  'memberSince': function() {
    return new Date(this.createdAt).toDateString();
  },
  'isFollowing': function() {
    return Follows.find({user: this._id, follower: Meteor.userId()}).count() > 0;
  },
  'notCurrentUserProfile': function() {
    return this._id !== Meteor.userId();
  },
  'followerCount': function() {
    return Follows.find({user: FlowRouter.getParam('id')}).count();
  },
  'usersFollowedCount': function() {
    return Follows.find({follower: FlowRouter.getParam('id')}).count();
  }
});

Template.userinfoheader.events({
  'click .follow-user': function(e,t) {
    Meteor.call('toggleFollow', this._id);
  }
});