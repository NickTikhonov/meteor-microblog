Template.profile.onCreated(function() {
  console.log("THE ID IS: " + Template.currentData().id);
  this.subscribe('postsBy', Template.currentData().id);
  this.subscribe('user', Template.currentData().id);
});

Template.profile.helpers({
  'posts': function() {
    return Posts.find({owner: this.id, parent: null}, {sort: {date: -1}});
  },
  'hasPosts': function() {
    return Posts.find({owner: this.id, parent: null}).count() > 0;
  },
  'user': function() {
    return Meteor.users.findOne({_id: this.id});
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
  }
});

Template.userinfoheader.events({
  'click .follow-user': function(e,t) {
    Meteor.call('toggleFollow', this._id);
  }
});