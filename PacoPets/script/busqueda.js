const cpets = document.getElementById('pets-container');
const url = `https://api.petfinder.com/v2/animals`;

function todo(){
  fetch('https://api.petfinder.com/v2/oauth2/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'bh20WygaOyIJRvEYM3nsxs1lokBsxnFcMY55bQLiJS4OvO1WNO',
    client_secret: 'CyjczaOJFPVhbVfOQd4uRarVwnph7EIHXGcvMDps'
  })
})
  .then(res => res.json())
  .then(data => {
    const token = data.access_token;
    console.log('Token recibido:', token);
    fetch(`${url}`,{
    method: 'GET',
    headers: {
      'accept':'*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  })
    .then(response => response.json())
    .then(data => {
        console.log(data);
      cpets.innerHTML = `
      <div class="card">
  <div class="card-image">
    <img src="https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Foto de Coco">
    <button class="favorite">&#9829;</button>
  </div>
  <div class="card-content">
    <div class="header">
      <h2>Coco</h2>
      <span class="age">2 Años</span>
    </div>
    <p class="description">
      Coco es un pájaro colorido que puede aprender a hablar y silbar melodías.
    </p>
    <button class="more-button">Conocer Más</button>
  </div>
</div>
      `;
    });
})
}
document.addEventListener('DOMContentLoaded', todo);