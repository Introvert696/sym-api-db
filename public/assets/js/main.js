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
function getThreads(page) {
  fetch("/api/thread?page=" + page, {
    method: "GET",
  }).then((resp) => {
    console.log(resp.json());
  });
}
// function for get posts
function getPosts() {}
getThreads(1);
