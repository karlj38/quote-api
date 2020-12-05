const submitButton = document.getElementById('delete-quote');
const quoteContainer = document.getElementById('new-quote');
const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

submitButton.addEventListener('click', () => {
  const id = document.getElementById('id').value;

  fetch(`/api/quotes?id=${id}`, {
    method: 'DELETE',
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(({quote}) => {
    const newQuote = document.createElement('div');
    if (quote) {
      newQuote.innerHTML = `
    <h3>Congrats, your quote was deleted!</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    } 
    quoteContainer.appendChild(newQuote);
  });
});
