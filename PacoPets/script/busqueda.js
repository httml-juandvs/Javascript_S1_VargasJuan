const cpets = document.getElementById('casa');
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
      for (i=0;i<data.animals.length;i++){
        let mascota = data.animals[i]
        let imageSrc = mascota.photos[0]?.full || mascota.photos[0]?.large || mascota.photos[0]?.medium || mascota.photos[0]?.small || '';
        cpets.innerHTML += `
              <div class="mascota-card">
                <img src="${imageSrc}" alt="Doberman" class="mascota-img">
                <h3 class="mascota-nombre">${mascota.name}</h3>
                <p class="mascota-info">${mascota.description}</p>
                <button class="adoptar-btn">Adoptar</button>
                <button class="favorito-btn">☆</button>
            </div>
            `;
      }
    });
})
}
document.addEventListener('DOMContentLoaded', todo);