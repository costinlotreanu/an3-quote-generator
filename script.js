// select elements
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const btnTwitter = document.querySelector('#twitter');
const btnNewQuote = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');
const container = document.querySelector('#quote-container');

// onload
getQuote();

// event listener
btnNewQuote.addEventListener('click', getQuote);
btnTwitter.addEventListener('click', tweet);

// getQuote API
async function getQuote() {
  load();
  const APIurl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  const url = 'https://corsproxy.io/?' + encodeURIComponent(APIurl);
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Unknow author if no value
    data.quoteAuthor = data.quoteAuthor ? data.quoteAuthor : 'Unknown';

    // Show quote
    quote.innerText = data.quoteText;
    author.innerText = data.quoteAuthor;
    loadComplete();
  } catch (error) {
    getQuote();
    console.log(error);
  }
}

// Tweet (X platform now)
function tweet() {
  const textTweet = quote.innerText;
  const authorTweet = author.innerText;
  const url = `https://twitter.com/intent/tweet?text=${textTweet} - ${authorTweet}`;
  window.open(url, '_blank');
}

// loader animation
function load() {
  loader.hidden = false;
  container.hidden = true;
}

function loadComplete() {
  if (!loader.hidden) {
    container.hidden = false;
    loader.hidden = true;
  }
}
