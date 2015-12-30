var USER_INFO = {
  fields: {
    _id: 1,
    username: 1,
    emails: 1,
    createdAt: 1
  }
};

// Publishing Users
Meteor.publish("users", function(userId) {
  return Meteor.users.find({}, USER_INFO);
});

Meteor.publish("user", function(userId) {
  return Meteor.users.find({_id: userId}, USER_INFO);
});


// Publishing Posts
Meteor.publish("postsBy", function(userId) {
  return Posts.find({owner: userId, parent: null});
});

Meteor.publish("posts", function(parent) {
  return Posts.find({parent: parent});
});

Meteor.publish("wall", function() {
  if (Meteor.user) {
    var authors = Follows.find({
      follower: Meteor.userId
    }).fetch().map(function(followedUser) {
      return followedUser.user;
    });

    authors.push(this.userId);

    return Posts.find({
      parent: null,
      owner: {
        $in: authors
      }
    });
  }
});

// Publishing Likes
Meteor.publish("likes", function(postId) {
  return Likes.find({parent: postId});
});

// Publishing Follows
Meteor.publish("followers", function(userId) {
  return Follows.find({user: userId});
});

Meteor.publish("followedUsers", function(userId) {
  return Follows.find({follower: userId});
});

