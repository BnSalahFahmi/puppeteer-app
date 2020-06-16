console.log('Client-side code running');

const screenShotBtn = document.getElementById('screenshot-btn');
screenShotBtn.addEventListener('click', function(e) {
  fetch('/screenshot-click', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        alert('Screenshot generated successfully in your root folder !');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

const pdfBtn = document.getElementById('pdf-btn');
pdfBtn.addEventListener('click', function(e) {
  fetch('/pdf-click', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        alert('PDF generated successfully in your root folder !');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});
