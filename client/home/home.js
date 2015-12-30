/**
 * After this page is rendered, do this:
 */
Template.home.rendered = function() {
  Deps.autorun(function() {
    Meteor.subscribe("wall");
  });
}

Template.home.helpers({
  'posts': function() {
    return Posts.find({parent:null}, {sort: {date: -1}});
  },
  'noPosts': function() {
    return Posts.find({parent:null}).count() === 0;
  }
});

/**
 * Have one of these for each template
 */
Template.home.events({
  'keyup .posttext':function(evt, tmpl) {
    if (evt.which == 13) {
      var posttext = tmpl.find('.posttext').value;

      Meteor.call('addPost', {
        text: posttext,
        parent: null
      });

      $('.posttext').val("").select().focus();
    }
  }
});