var USER_INFO = {
  fields: {
    _id: 1,
    username: 1,
    emails: 1
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


// Publishing Likes
Meteor.publish("likes", function(postId) {
  return Likes.find({parent: postId});
});

var deleteChildren = function(id) {
  Posts.find({parent:id}).forEach(function(post) {
    deleteChildren(post._id);
    Posts.remove(post._id);
  })
};