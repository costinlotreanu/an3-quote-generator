// select elements
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const btnTwitter = document.querySelector('#twitter');
const btnNewQuote = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');
const container = document.querySelector('#quote-container');

// onload
getQuoteFromApi();
btnNewQuote.addEventListener('click', getQuoteFromApi);
btnTwitter.addEventListener('click', tweet);

async function getQuoteFromApi() {
  showLoadingSpinner();
  const APIurl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  // use proxy to avoid CORS error from API
  const url = 'https://corsproxy.io/?' + encodeURIComponent(APIurl);
  try {
    const response = await fetch(url);
    const data = await response.json();
    data.quoteAuthor = data.quoteAuthor ? data.quoteAuthor : 'Unknown';
    // Show quote
    quote.innerText = data.quoteText;
    author.innerText = data.quoteAuthor;
    removeLoadingSpinner();
  } catch (error) {
    console.log(error);
    getQuoteFromApi();
  }
}

function tweet() {
  const textTweet = quote.innerText;
  const authorTweet = author.innerText;
  const url = `https://twitter.com/intent/tweet?text=${textTweet} - ${authorTweet}`;
  window.open(url, '_blank');
}

function showLoadingSpinner() {
  loader.hidden = false;
  container.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    container.hidden = false;
    loader.hidden = true;
  }
}
