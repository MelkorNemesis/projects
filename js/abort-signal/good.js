// Cancel a fetch request after 5 seconds using AbortController
const url = 'https://jsonplaceholder.typicode.com/posts/1';
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);
fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timeoutId));

