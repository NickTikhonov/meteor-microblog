Template.post.onCreated( function() {
    this.subscribe('likes', Template.currentData()._id);
    this.subscribe('posts', Template.currentData()._id);
});

Template.post.helpers({
    'avatarSize': function() {
        return 20 + (40 / this.level);
    },
    'likeCount': function() {
        return Likes.find({parent:this._id}).count();
    },
    'comments': function() {
        console.log(this._id);
        return Posts.find({ parent:this._id});
    },
    'userOwned': function() {
        return this.owner === Meteor.userId();
    },
    'liked': function() {
        return Likes.find({
                owner: Meteor.userId(),
                parent: this._id
        }).count() > 0;
    },
    'single': function(num) {
        return num === 1;
    }
});

Template.post.events({
    'keyup .comment': function(evt, tmpl) {
        if(evt.which === 13 && tmpl.data === this){
            var commentText = evt.currentTarget.value;

            Meteor.call('addPost', {
                text: commentText,
                parent: this._id
            });

            $(".comment").val("");
        }
    },
    'click .deletebtn': function(evt, tmpl) {
        if (tmpl.data === this)
            Meteor.call('removePost', this._id);
    },
    'click .likebtn': function(evt, tmpl) {
        if (tmpl.data === this)
            Meteor.call('toggleLike', this._id);
    }
});
