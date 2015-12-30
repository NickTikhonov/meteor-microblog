var deleteChildren = function(id) {
  Posts.find({parent:id}).forEach(function(post) {
    deleteChildren(post._id);
    Posts.remove(post._id);
  })
};

Meteor.methods({
  //{text:'',owner:'',date:'',parent:''}
  'addPost': function(options) {
    if (!Meteor.user())
      throw new Meteor.Error("not-authorised");

    var level = 1;
    if (options.parent !== null) {
      parent = Posts.findOne(options.parent);
      level = parent.level + 1;
    }

    Posts.insert({
      text: options.text,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      date: new Date(),
      parent: options.parent,
      level: level
    });
  },
  //{owner:'',parent:''}
  'toggleLike': function(parent) {
    if (!Meteor.user())
      throw new Meteor.Error("not-authorised");

    var likes = Likes.find({
      owner: Meteor.userId(),
      parent: parent
    });
    if (likes.count() == 0){
      Likes.insert({
        owner: Meteor.userId(),
        parent: parent
      });
    } else {
      Likes.remove({
        owner: Meteor.userId(),
        parent: parent
      });
    }
  },
  'removePost': function(id) {
    var post = Posts.findOne(id);
    if (post.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorised");
    }

    deleteChildren(id);
    Posts.remove({_id:id});
  },
  'removeAll': function() {
    if (!Meteor.user())
      throw new Meteor.Error("not-authorised");

    Posts.remove({});
  },
  'toggleFollow': function(userId) {
    if (!Meteor.user() || Meteor.userId() === userId)
      throw new Meteor.Error("not-authorised");

    console.log("toggleFollow called");

    var query = {
      user: userId,
      follower: Meteor.userId()
    };
    console.log(query);

    if (Follows.find(query).count() == 0) {
      console.log("No follows exist");
      Follows.insert(query);
    } else {
      console.log("Follow already exists");
      Follows.remove(query);
    }
  }
});