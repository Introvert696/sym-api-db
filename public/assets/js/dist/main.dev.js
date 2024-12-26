"use strict";

try {
  // thread vars
  var threadForm = document.getElementById("threadform");
  var threadSubmitter = document.querySelector("button[value=submitthread]"); // event create a thread

  threadSubmitter.addEventListener("click", function (e) {
    var threadFormData = new FormData(threadForm, threadSubmitter);
    sendThread(threadFormData);
  });
} catch (error) {
  console.log(error);
} // send thread


function sendThread(formData) {
  fetch("/api/thread", {
    method: "POST",
    body: formData
  }).then(function (resp) {
    location.reload();
  })["catch"](function (resp) {
    console.log(resp);
    return false;
  });
}

try {
  // posts vars
  var postForm = document.getElementById("postform");
  var postSubmitter = document.querySelector("#submitpost"); // event create a post

  postSubmitter.addEventListener("click", function (e) {
    var postFormData = new FormData(postForm, postSubmitter);
    sendPost(postFormData);
  });
} catch (error) {
  console.log(error);
} // send posts


function sendPost(formData) {
  return regeneratorRuntime.async(function sendPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/posts", {
            method: "POST",
            body: formData
          }).then(function (resp) {
            location.reload();
          })["catch"](function (resp) {
            console.log(resp);
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
} // get threads


function getThreads(page) {
  var limit,
      resp,
      data,
      _args2 = arguments;
  return regeneratorRuntime.async(function getThreads$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          limit = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 3;
          page = Number(page);
          limit = Number.isInteger(Number(limit)) == true ? Number(limit) : 3;
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch("/api/thread?page=".concat(page, "&limit=").concat(limit), {
            method: "GET"
          }));

        case 6:
          resp = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(resp.json());

        case 9:
          data = _context2.sent;
          outputThread(data);
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 13]]);
} // get posts


function getPostsInThread(threadId) {
  var resp, data;
  return regeneratorRuntime.async(function getPostsInThread$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch("/api/posts?thread_id=".concat(threadId), {
            method: "GET"
          }));

        case 3:
          resp = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(resp.json());

        case 6:
          data = _context3.sent;
          return _context3.abrupt("return", data);

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
} // strip query vars


function stripQuerySearch(query) {
  query = query.replace("?", "");
  var params = new Array();
  var aqueryArr = query.split("&");
  aqueryArr.forEach(function (el) {
    var temparr = el.split("=");
    params[temparr[0]] = Number(temparr[1]);
  });
  return params;
} // output thread


function outputThread(data) {
  var threadbody, htmlthread, postarr, posts;
  return regeneratorRuntime.async(function outputThread$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          threadbody = document.querySelector("#thread-list");
          htmlthread = "";
          postarr = new Array(); // loop for get one thread

          _context4.t0 = regeneratorRuntime.keys(data);

        case 4:
          if ((_context4.t1 = _context4.t0()).done) {
            _context4.next = 26;
            break;
          }

          d = _context4.t1.value;
          htmlthread += "\n      <a href=\"/thread/".concat(data[d].id, "\">\n        <div class=\"card w-75 px-5 mt-2 m-auto border-primary bg-secondary text-light\">\n          <div class=\"flex\"><p> ").concat(data[d].id, " </p>\n            <p>  ---- </p>\n            <p>  ").concat(data[d].username == null ? "" : data[d].username, " </p>\n            <p>  ----  </p>\n            <p>  ").concat(data[d].created_ad, " </p>\n          </div>\n          <div>  <p>  ").concat(data[d].content, " </p> </div>\n        </div>\n      </a>\n   "); // get posts under current thread

          _context4.prev = 7;
          _context4.next = 10;
          return regeneratorRuntime.awrap(getPostsInThread(data[d].id));

        case 10:
          posts = _context4.sent;
          _context4.t2 = regeneratorRuntime.keys(posts);

        case 12:
          if ((_context4.t3 = _context4.t2()).done) {
            _context4.next = 19;
            break;
          }

          p = _context4.t3.value;

          if (!(p == 3)) {
            _context4.next = 16;
            break;
          }

          return _context4.abrupt("break", 19);

        case 16:
          htmlthread += "\n                 <div class=\"card w-75 px-5 m-auto border border-top-0 mt-2 border-primary-subtle bg-secondary-subtle\">\n                <div class=\"flex\">\n                  <p>".concat(posts[p].id, "</p>\n                  <p>----</p>\n                  <p>").concat(posts[p].username, "</p>\n                  <p>----</p>\n                  <p>").concat(posts[p].created_ad, "</p>\n                </div>\n                <div><p>").concat(posts[p].content, "</p></div>\n              </div>");
          _context4.next = 12;
          break;

        case 19:
          _context4.next = 24;
          break;

        case 21:
          _context4.prev = 21;
          _context4.t4 = _context4["catch"](7);
          console.log("error  ");

        case 24:
          _context4.next = 4;
          break;

        case 26:
          threadbody.innerHTML = htmlthread;

        case 27:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 21]]);
} // simple router


if (window.location.pathname == "/") {
  if (window.location.search == "") {
    getThreads(1, 3);
  } else {
    var strip = stripQuerySearch(window.location.search);
    getThreads(strip["page"], strip["limit"]);
  }
}