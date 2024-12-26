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
async function sendPost(formData) {
  await fetch("/api/posts", {
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
async function getThreads(page, limit = 3) {
  page = Number(page);
  limit = Number.isInteger(Number(limit)) == true ? Number(limit) : 3;

  try {
    const resp = await fetch(`/api/thread?page=${page}&limit=${limit}`, {
      method: "GET",
    });
    const data = await resp.json();
    outputThread(data);
  } catch (error) {
    console.log(error);
  }
}
// function for get posts
async function getPostsInThread(threadId) {
  // console.log(threadId);
  try {
    const resp = await fetch(`/api/posts?thread_id=${threadId}`, {
      method: "GET",
    });
    const data = await resp.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
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

// create output thread
async function outputThread(data) {
  const threadbody = document.querySelector("#thread-list");
  let htmlthread = "";
  let postarr = new Array();
  // loop for get one thread
  for (d in data) {
    // console.log(data[d]);
    htmlthread += `
      <a href="/thread/${data[d].id}">
        <div class="card w-75 px-5 mt-2 m-auto border-primary bg-secondary text-light">
          <div class="flex"><p> ${data[d].id} </p>
            <p>  ---- </p>
            <p>  ${data[d].username == null ? "" : data[d].username} </p>
            <p>  ----  </p>
            <p>  ${data[d].created_ad} </p>
          </div>
          <div>  <p>  ${data[d].content} </p> </div>
        </div>
      </a>
   `;
    try {
      let posts = await getPostsInThread(data[d].id);
      // console.log(posts);
      for (p in posts) {
        if (p == 3) {
          break;
        }
        htmlthread += `
                 <div class="card w-75 px-5 m-auto border border-top-0 mt-2 border-primary-subtle bg-secondary-subtle">
                <div class="flex">
                  <p>${posts[p].id}</p>
                  <p>----</p>
                  <p>${posts[p].username}</p>
                  <p>----</p>
                  <p>${posts[p].created_ad}</p>
                </div>
                <div><p>${posts[p].content}</p></div>
              </div>`;
      }
    } catch {
      console.log("error  ");
    }
  }
  threadbody.innerHTML = htmlthread;
}
// create output posts under thread

// simple router
if (window.location.pathname == "/") {
  if (window.location.search == "") {
    getThreads(1, 4);
  } else {
    let strip = stripQuerySearch(window.location.search);
    getThreads(strip["page"], strip["limit"]);
  }
}
// -----------------------------------------------------
