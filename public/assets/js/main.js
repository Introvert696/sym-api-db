try {
  // thread
  const threadForm = document.getElementById("threadform");
  const threadSubmitter = document.querySelector("button[value=submitthread]");

  // event create a thread
  threadSubmitter.addEventListener("click", (e) => {
    console.log("11;");
    const threadFormData = new FormData(threadForm, threadSubmitter);
    sendThread(threadFormData);
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
  const postSubmitter = document.querySelector("#submitpost");
  console.log(postSubmitter);
  // event post
  postSubmitter.addEventListener("click", (e) => {
    // console.log(postForm);
    const postFormData = new FormData(postForm, postSubmitter);
    // console.log(postFormData);
    console.log("posts;");
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
  // console.log(Number.isInteger(Number(limit)));
  fetch("/api/thread?page=" + page + "&limit=" + limit, {
    method: "GET",
  }).then((resp) => {
    const data = resp.json();
    data.then((el) => {
      outputThread(el);
    });
  });
}
// function for get posts
function getPostsInThread(threadId) {
  // console.log(threadId);
  fetch("/api/posts?thread_id=" + threadId, {
    method: "GET",
  }).then((resp) => {
    const data = resp.json();
    data.then((el) => {
      console.log(el);
    });
  });
}

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
function outputThread(data) {
  const threadbody = document.querySelector("#thread-list");
  let htmlthread = "";
  // loop for get one thread
  data.forEach((el) => {
    // create html element for thread
    htmlthread += `
    <a
						href="/thread/${el.id}">
						<div
							class="card w-75 px-5 mt-2 m-auto border-primary bg-secondary text-light">
							<div
								class="flex">
								<p>
									${el.id}
								</p>
								<p>
									----
								</p>
								<p>
									${el.username == null ? "" : el.username}
								</p>
								<p>
									----
								</p>
								<p>
									${el.created_ad}
								</p>
							</div>
							<div>
								<p>
									${el.content}
								</p>
							</div>
						</div>
					</a>
    `;
    // reqeust for get posts this thread
    // thread id  = el.id
    let posts = getPostsInThread(el.id);
    console.log(posts);
  });
  // console.log(htmlthread);
  threadbody.innerHTML = htmlthread;
}
// create output posts under thread

// create a async methods all
