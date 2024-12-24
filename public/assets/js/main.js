
fetch('/api/thread').then(
    response=> response.json()
).then(
    result => console.log(result)
);
let threads = await  promise.json();

console.log(threads);

