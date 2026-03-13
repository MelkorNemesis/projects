// Cancel a fetch request after 5 seconds using AbortSignal.timeout
const url = 'https://jsonplaceholder.typicode.com/posts/1';
fetch(url, { signal: AbortSignal.timeout(5000) })
