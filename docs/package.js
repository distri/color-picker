(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 \n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "color-picker\n============\n\nPicking my colors like yeah\n",
      "type": "blob"
    },
    "style.styl": {
      "path": "style.styl",
      "mode": "100644",
      "content": "body\n  background-color: red\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Color Picker\n============\n\n    {applyStylesheet} = require(\"./util\")\n    \n    applyStylesheet(require(\"./style\"))\n    ",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.0\"\n",
      "type": "blob"
    },
    "util.coffee.md": {
      "path": "util.coffee.md",
      "mode": "100644",
      "content": "Util\n====\n\n    module.exports =\n      applyStylesheet: (style, id=\"primary\") ->\n        styleNode = document.createElement(\"style\")\n        styleNode.innerHTML = style\n        styleNode.id = id\n\n        if previousStyleNode = document.head.querySelector(\"style##{id}\")\n          previousStyleNode.parentNode.removeChild(prevousStyleNode)\n\n        document.head.appendChild(styleNode)\n",
      "type": "blob"
    }
  },
  "distribution": {
    "style": {
      "path": "style",
      "content": "module.exports = \"body {\\n  background-color: red;\\n}\";",
      "type": "blob"
    },
    "main": {
      "path": "main",
      "content": "(function() {\n  var applyStylesheet;\n\n  applyStylesheet = require(\"./util\").applyStylesheet;\n\n  applyStylesheet(require(\"./style\"));\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\"};",
      "type": "blob"
    },
    "util": {
      "path": "util",
      "content": "(function() {\n  module.exports = {\n    applyStylesheet: function(style, id) {\n      var previousStyleNode, styleNode;\n      if (id == null) {\n        id = \"primary\";\n      }\n      styleNode = document.createElement(\"style\");\n      styleNode.innerHTML = style;\n      styleNode.id = id;\n      if (previousStyleNode = document.head.querySelector(\"style#\" + id)) {\n        previousStyleNode.parentNode.removeChild(prevousStyleNode);\n      }\n      return document.head.appendChild(styleNode);\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=util.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "repository": {
    "id": 17806153,
    "name": "color-picker",
    "full_name": "distri/color-picker",
    "owner": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://gravatar.com/avatar/192f3f168409e79c42107f081139d9f3?d=https%3A%2F%2Fidenticons.github.com%2Ff90c81ffc1498e260c820082f2e7ca5f.png&r=x",
      "gravatar_id": "192f3f168409e79c42107f081139d9f3",
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/distri/color-picker",
    "description": "Picking my colors like yeah",
    "fork": false,
    "url": "https://api.github.com/repos/distri/color-picker",
    "forks_url": "https://api.github.com/repos/distri/color-picker/forks",
    "keys_url": "https://api.github.com/repos/distri/color-picker/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/distri/color-picker/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/distri/color-picker/teams",
    "hooks_url": "https://api.github.com/repos/distri/color-picker/hooks",
    "issue_events_url": "https://api.github.com/repos/distri/color-picker/issues/events{/number}",
    "events_url": "https://api.github.com/repos/distri/color-picker/events",
    "assignees_url": "https://api.github.com/repos/distri/color-picker/assignees{/user}",
    "branches_url": "https://api.github.com/repos/distri/color-picker/branches{/branch}",
    "tags_url": "https://api.github.com/repos/distri/color-picker/tags",
    "blobs_url": "https://api.github.com/repos/distri/color-picker/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/distri/color-picker/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/distri/color-picker/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/distri/color-picker/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/distri/color-picker/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/distri/color-picker/languages",
    "stargazers_url": "https://api.github.com/repos/distri/color-picker/stargazers",
    "contributors_url": "https://api.github.com/repos/distri/color-picker/contributors",
    "subscribers_url": "https://api.github.com/repos/distri/color-picker/subscribers",
    "subscription_url": "https://api.github.com/repos/distri/color-picker/subscription",
    "commits_url": "https://api.github.com/repos/distri/color-picker/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/distri/color-picker/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/distri/color-picker/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/distri/color-picker/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/distri/color-picker/contents/{+path}",
    "compare_url": "https://api.github.com/repos/distri/color-picker/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/distri/color-picker/merges",
    "archive_url": "https://api.github.com/repos/distri/color-picker/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/distri/color-picker/downloads",
    "issues_url": "https://api.github.com/repos/distri/color-picker/issues{/number}",
    "pulls_url": "https://api.github.com/repos/distri/color-picker/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/distri/color-picker/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/distri/color-picker/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/distri/color-picker/labels{/name}",
    "releases_url": "https://api.github.com/repos/distri/color-picker/releases{/id}",
    "created_at": "2014-03-16T18:39:28Z",
    "updated_at": "2014-03-16T18:39:28Z",
    "pushed_at": "2014-03-16T18:39:28Z",
    "git_url": "git://github.com/distri/color-picker.git",
    "ssh_url": "git@github.com:distri/color-picker.git",
    "clone_url": "https://github.com/distri/color-picker.git",
    "svn_url": "https://github.com/distri/color-picker",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://gravatar.com/avatar/192f3f168409e79c42107f081139d9f3?d=https%3A%2F%2Fidenticons.github.com%2Ff90c81ffc1498e260c820082f2e7ca5f.png&r=x",
      "gravatar_id": "192f3f168409e79c42107f081139d9f3",
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 2,
    "branch": "master",
    "publishBranch": "gh-pages"
  },
  "dependencies": {}
});