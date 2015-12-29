Template.userlist.onCreated(function() {
  this.subscribe('users', Meteor.userId());
});

Template.userlist.helpers({
  'allusers': function() {
    return Meteor.users.find({});
  },
  'numusers': function() {
    return Meteor.users.find({}).count();
  }
});

Template.userinfo.helpers({
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