Template.userprofile.onCreated(function() {
  console.log("THE ID IS: " + Template.currentData().id);
  this.subscribe('postsBy', Template.currentData().id);
  this.subscribe('user', Template.currentData().id);
});

Template.userprofile.helpers({
  'posts': function() {
    return Posts.find({owner: this.id, parent: null});
  },
  'hasPosts': function() {
    return Posts.find({}).count() > 0;
  },
  'user': function() {
    return Meteor.users.findOne({_id: this.id});
  },
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
  }
});