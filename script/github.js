jQuery.githubUser = function(username, callback) {
  //jQuery.getJSON("http://github.com/api/v1/json/" + username + "?callback=?", callback);
  jQuery.getJSON("https://api.github.com/users/" + username + "/repos", callback);
}

jQuery.githubUserGists = function(username, callback) {
  //jQuery.getJSON("http://github.com/api/v1/json/" + username + "?callback=?", callback);
  jQuery.getJSON("https://api.github.com/users/" + username + "/gists", callback);
}
 
jQuery.fn.loadRepositoriesGists = function(username, r, g) {
  this.html("<span>Querying GitHub for repositories...</span>");
 
  var target = this;
  if(r==1){
  $.githubUser(username, function(data) {
    var repos = data;
    sortByNumberOfWatchers(repos);
 
    var list = $('<dl/>');
    target.empty().append(list);
    $(repos).each(function() {
      list.append('<dt><a href="'+ this.svn_url +'">' + this.name + '</a></dt>');
      list.append('<dd>' + this.description + '</dd>');
    });
  });
  }

  if(g==1){
  $.githubUserGists(username, function(data) {
    var gists = data;
    sortByNumberOfWatchers(gists);
 
    var list = $('<dl/>');
    target.append(list);
    $(gists).each(function() {
      list.append('<dt><a href="'+ this.svn_url +'">' + this.name + '</a></dt>');
      list.append('<dd>' + this.description + '</dd>');
    });
  });
  }
 
  function sortByNumberOfWatchers(repos) {
    repos.sort(function(a,b) {
      return b.watchers - a.watchers;
    });
  }
};

jQuery.fn.loadRepositories = function (username) {
  this.loadRepositoriesGists(username, 1, 0);
};

jQuery.fn.loadGists = function (username) {
  this.loadRepositoriesGists(username, 0, 1);
};
