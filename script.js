// getQuote API
async function getQuote() {
  const proxyUrl = 'https://proxy.cors.sh/';
  const APIurl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  try {
    const response = await fetch(proxyUrl + APIurl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    getQuote();
    console.log(error);
  }
}

// onload
getQuote();
