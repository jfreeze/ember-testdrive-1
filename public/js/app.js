App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
//  adapter2: DS.RESTAdapter.extend({
//      url: 'http://localhost:9393'
//  })
});

App.Router.map(function() {
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' })
  });
  this.resource('about');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('posts');
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,
  edit: function() {
    this.set('isEditing', true);
  },
  doneEditing: function() {
    this.set('isEditing', false);
//    this.get('store').commit();
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.Post.find();
  }
});

App.Post = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  intro: DS.attr('string'),
  extended: DS.attr('string'),
  publishedAt: DS.attr('date')
});

App.Post.FIXTURES = [{
    id: 1,
    title: "Rails is Omakase",
    author: "dh2",
    publishedAt: new Date('12-27-2012'),
    intro: "This is the intro",
    extended: "alsfj slkjfasl;f jasl;fj asl;fj as;lfj als;fj a;lsfj"
},{
    id: 2,
    title: "The Parley Letter",
    author: "dh3",
    publishedAt: new Date('05-10-2013'),
    intro: "More of This is the intro",
    extended: "the **quick** brown _fox_ jumped over the ...\n\nHeader\n=\nHeader2\n-\nmore stufffj a;lsfj"
}]

Ember.Handlebars.registerBoundHelper('date', function(date) {
    return moment(date).fromNow();
});

var showdown = new Showdown.converter();
Ember.Handlebars.registerBoundHelper('markdown', function(input) {
  return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
});

