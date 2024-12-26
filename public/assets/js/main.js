try {
  // thread
  const threadForm = document.getElementById("threadform");
  const threadSubmitter = document.querySelector("button[value=submitthread]");

  // event create a thread
  threadSubmitter.addEventListener("click", (e) => {
    const threadFormData = new FormData(threadForm, threadSubmitter);

    // sendThread(threadFormData);
  });
} catch (error) {
  console.log(error);
}
// send thread
function sendThread(formData) {
  fetch("/api/thread", {
    method: "POST",
    body: formData,
  })
    .then((resp) => {
      location.reload();
    })
    .catch((resp) => {
      console.log(resp);
      return false;
    });
}

try {
  // posts
  const postForm = document.getElementById("postform");
  const postSubmitter = document.querySelector("button[value=submitpost]");

  // event post
  postSubmitter.addEventListener("click", (e) => {
    console.log(postForm);
    const postFormData = new FormData(postForm, postSubmitter);
    console.log(postFormData);
    for (const [key, value] of postFormData) {
      console.log(key);
    }

    sendPost(postFormData);
  });
} catch (error) {
  console.log(error);
}
// function send posts
function sendPost(formData) {
  fetch("/api/posts", {
    method: "POST",
    body: formData,
  })
    .then((resp) => {
      location.reload();
    })
    .catch((resp) => {
      console.log(resp);
    });
}
// function for get threads
function getThreads(page, limit = 3) {
  page = Number(page);
  limit = Number.isInteger(Number(limit)) == true ? Number(limit) : 3;
  console.log(Number.isInteger(Number(limit)));
  fetch("/api/thread?page=" + page + "&limit=" + limit, {
    method: "GET",
  }).then((resp) => {
    console.log(resp.json());
  });
}
// function for get posts
function getPosts() {}

// function strip query search
function stripQuerySearch(query) {
  query = query.replace("?", "");
  let params = new Array();
  let aqueryArr = query.split("&");
  aqueryArr.forEach((el) => {
    let temparr = el.split("=");
    params[temparr[0]] = Number(temparr[1]);
  });
  return params;
}

console.log(window.location.pathname);

// simple router
if (window.location.pathname == "/") {
  if (window.location.search == "") {
    getThreads(1, 4);
  } else {
    let strip = stripQuerySearch(window.location.search);
    getThreads(strip["page"], strip["limit"]);
  }
}

// create output thread

// create output posts under thread
