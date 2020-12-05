const submitButton = document.getElementById('modify-quote');
const quoteContainer = document.getElementById('new-quote');
const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  const id = document.getElementById('id').value;

  fetch(`/api/quotes?id=${id}&quote=${quote}&person=${person}`, {
    method: 'PUT',
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(({quote}) => {
    const Quote = document.createElement('div');
    Quote.innerHTML = `
    <h3>Congrats, your quote was modified!</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    quoteContainer.appendChild(Quote);
  });
});
