// select elements
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const btnTwitter = document.querySelector('#twitter');
const btnNewQuote = document.querySelector('#new-quote');

// onload
getQuote();

// getQuote API
async function getQuote() {
  const proxyUrl = 'https://proxy.cors.sh/';
  const APIurl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  try {
    const response = await fetch(proxyUrl + APIurl);
    const data = await response.json();
    // Unknow author if no value
    data.quoteAuthor = data.quoteAuthor ? data.quoteAuthor : 'Unknown';

    // Show quote
    quote.innerText = data.quoteText;
    author.innerText = data.quoteAuthor;
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

// event listener
btnNewQuote.addEventListener('click', getQuote);
btnTwitter.addEventListener('click', tweet);
