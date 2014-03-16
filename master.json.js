window["distri/color-picker:master"]({
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
      "content": "html\n  height: 100%\n\nbody\n  background-color: red\n  height: 100%\n  margin: 0\n\n.overlay\n  width: 100%\n  height: 100%\n  position: absolute\n\n  &.w\n    background-image: linear-gradient(#fff, rgba(255, 255, 255, 0))\n  &.b\n    background-image: linear-gradient(left, #000, rgba(0, 0, 0, 0))\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Color Picker\n============\n\n    {applyStylesheet} = require(\"./util\")\n    \n    applyStylesheet(require(\"./style\"))\n    \n    document.body.appendChild require(\"./template\")()\n",
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
    },
    "template.haml": {
      "path": "template.haml",
      "mode": "100644",
      "content": ".overlay.b\n.overlay.w\n",
      "type": "blob"
    }
  },
  "distribution": {
    "style": {
      "path": "style",
      "content": "module.exports = \"html {\\n  height: 100%;\\n}\\n\\nbody {\\n  background-color: red;\\n  height: 100%;\\n  margin: 0;\\n}\\n\\n.overlay {\\n  width: 100%;\\n  height: 100%;\\n  position: absolute;\\n}\\n\\n.overlay.w {\\n  background-image: -ms-linear-gradient(#fff, rgba(255, 255, 255, 0));\\n  background-image: -moz-linear-gradient(#fff, rgba(255, 255, 255, 0));\\n  background-image: -webkit-linear-gradient(#fff, rgba(255, 255, 255, 0));\\n  background-image: linear-gradient(#fff, rgba(255, 255, 255, 0));\\n}\\n\\n.overlay.b {\\n  background-image: -ms-linear-gradient(left, #000, rgba(0, 0, 0, 0));\\n  background-image: -moz-linear-gradient(left, #000, rgba(0, 0, 0, 0));\\n  background-image: -webkit-linear-gradient(left, #000, rgba(0, 0, 0, 0));\\n  background-image: linear-gradient(left, #000, rgba(0, 0, 0, 0));\\n}\";",
      "type": "blob"
    },
    "main": {
      "path": "main",
      "content": "(function() {\n  var applyStylesheet;\n\n  applyStylesheet = require(\"./util\").applyStylesheet;\n\n  applyStylesheet(require(\"./style\"));\n\n  document.body.appendChild(require(\"./template\")());\n\n}).call(this);\n\n//# sourceURL=main.coffee",
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
    },
    "template": {
      "path": "template",
      "content": "Runtime = require(\"/_lib/hamljr_runtime\");\n\nmodule.exports = (function(data) {\n  return (function() {\n    var __runtime;\n    __runtime = Runtime(this);\n    __runtime.push(document.createDocumentFragment());\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"overlay\", \"b\");\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"overlay\", \"w\");\n    __runtime.pop();\n    return __runtime.pop();\n  }).call(data);\n});\n",
      "type": "blob"
    },
    "_lib/hamljr_runtime": {
      "path": "_lib/hamljr_runtime",
      "content": "(function() {\n  var Runtime, dataName, document,\n    __slice = [].slice;\n\n  dataName = \"__hamlJR_data\";\n\n  if (typeof window !== \"undefined\" && window !== null) {\n    document = window.document;\n  } else {\n    document = global.document;\n  }\n\n  Runtime = function(context) {\n    var append, bindObservable, classes, id, lastParent, observeAttribute, observeText, pop, push, render, stack, top;\n    stack = [];\n    lastParent = function() {\n      var element, i;\n      i = stack.length - 1;\n      while ((element = stack[i]) && element.nodeType === 11) {\n        i -= 1;\n      }\n      return element;\n    };\n    top = function() {\n      return stack[stack.length - 1];\n    };\n    append = function(child) {\n      var _ref;\n      if ((_ref = top()) != null) {\n        _ref.appendChild(child);\n      }\n      return child;\n    };\n    push = function(child) {\n      return stack.push(child);\n    };\n    pop = function() {\n      return append(stack.pop());\n    };\n    render = function(child) {\n      push(child);\n      return pop();\n    };\n    bindObservable = function(element, value, update) {\n      var observable, unobserve;\n      if (typeof Observable === \"undefined\" || Observable === null) {\n        update(value);\n        return;\n      }\n      observable = Observable(value);\n      observable.observe(update);\n      update(observable());\n      unobserve = function() {\n        return observable.stopObserving(update);\n      };\n      element.addEventListener(\"DOMNodeRemoved\", unobserve, true);\n      return element;\n    };\n    id = function() {\n      var element, sources, update, value;\n      sources = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      element = top();\n      update = function(newValue) {\n        if (typeof newValue === \"function\") {\n          newValue = newValue();\n        }\n        return element.id = newValue;\n      };\n      value = function() {\n        var possibleValues;\n        possibleValues = sources.map(function(source) {\n          if (typeof source === \"function\") {\n            return source();\n          } else {\n            return source;\n          }\n        }).filter(function(idValue) {\n          return idValue != null;\n        });\n        return possibleValues[possibleValues.length - 1];\n      };\n      return bindObservable(element, value, update);\n    };\n    classes = function() {\n      var element, sources, update, value;\n      sources = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      element = top();\n      update = function(newValue) {\n        if (typeof newValue === \"function\") {\n          newValue = newValue();\n        }\n        return element.className = newValue;\n      };\n      value = function() {\n        var possibleValues;\n        possibleValues = sources.map(function(source) {\n          if (typeof source === \"function\") {\n            return source();\n          } else {\n            return source;\n          }\n        }).filter(function(sourceValue) {\n          return sourceValue != null;\n        });\n        return possibleValues.join(\" \");\n      };\n      return bindObservable(element, value, update);\n    };\n    observeAttribute = function(name, value) {\n      var element, update;\n      element = top();\n      update = function(newValue) {\n        return element.setAttribute(name, newValue);\n      };\n      return bindObservable(element, value, update);\n    };\n    observeText = function(value) {\n      var element, update;\n      switch (value != null ? value.nodeType : void 0) {\n        case 1:\n        case 3:\n        case 11:\n          render(value);\n          return;\n      }\n      element = document.createTextNode('');\n      update = function(newValue) {\n        return element.nodeValue = newValue;\n      };\n      bindObservable(element, value, update);\n      return render(element);\n    };\n    return {\n      push: push,\n      pop: pop,\n      id: id,\n      classes: classes,\n      attribute: observeAttribute,\n      text: observeText,\n      filter: function(name, content) {},\n      each: function(items, fn) {\n        var elements, parent, replace;\n        items = Observable(items);\n        elements = [];\n        parent = lastParent();\n        items.observe(function(newItems) {\n          return replace(elements, newItems);\n        });\n        replace = function(oldElements, items) {\n          var firstElement;\n          if (oldElements) {\n            firstElement = oldElements[0];\n            parent = (firstElement != null ? firstElement.parentElement : void 0) || parent;\n            elements = items.map(function(item, index, array) {\n              var element;\n              element = fn.call(item, item, index, array);\n              element[dataName] = item;\n              parent.insertBefore(element, firstElement);\n              return element;\n            });\n            return oldElements.each(function(element) {\n              return element.remove();\n            });\n          } else {\n            return elements = items.map(function(item, index, array) {\n              var element;\n              element = fn.call(item, item, index, array);\n              element[dataName] = item;\n              return element;\n            });\n          }\n        };\n        return replace(null, items);\n      },\n      \"with\": function(item, fn) {\n        var element, replace, value;\n        element = null;\n        item = Observable(item);\n        item.observe(function(newValue) {\n          return replace(element, newValue);\n        });\n        value = item();\n        replace = function(oldElement, value) {\n          var parent;\n          element = fn.call(value);\n          element[dataName] = item;\n          if (oldElement) {\n            parent = oldElement.parentElement;\n            parent.insertBefore(element, oldElement);\n            return oldElement.remove();\n          } else {\n\n          }\n        };\n        return replace(element, value);\n      },\n      on: function(eventName, fn) {\n        var element;\n        element = lastParent();\n        if (eventName === \"change\") {\n          switch (element.nodeName) {\n            case \"SELECT\":\n              element[\"on\" + eventName] = function() {\n                var selectedOption;\n                selectedOption = this.options[this.selectedIndex];\n                return fn(selectedOption[dataName]);\n              };\n              if (fn.observe) {\n                return fn.observe(function(newValue) {\n                  return Array.prototype.forEach.call(element.options, function(option, index) {\n                    if (option[dataName] === newValue) {\n                      return element.selectedIndex = index;\n                    }\n                  });\n                });\n              }\n              break;\n            default:\n              element[\"on\" + eventName] = function() {\n                return fn(element.value);\n              };\n              if (fn.observe) {\n                return fn.observe(function(newValue) {\n                  return element.value = newValue;\n                });\n              }\n          }\n        } else {\n          return element[\"on\" + eventName] = function(event) {\n            return fn.call(context, event);\n          };\n        }\n      }\n    };\n  };\n\n  module.exports = Runtime;\n\n}).call(this);\n\n//# sourceURL=runtime.coffee",
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