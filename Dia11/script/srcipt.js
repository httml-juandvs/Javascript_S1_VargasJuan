async function api() {
    let response = await fetch ("https://67f91c1b094de2fe6ea07f34.mockapi.io/productos/1");
    let data = await response.json();

    return data;
}

async function d1() {
    let data = await api();

    let producto = document.getElementById("nombre");
    let foto = document.getElementById("imagen");
    let precio = document.getElementById("precio");
    let categoria = document.getElementById("tipo");
    let stock = document.getElementById("inventario");

    producto.textContent = data ["name"];
    foto.src = data ["image"];
    precio.textContent= data["price"];
    categoria.textContent = data ["category"];
    stock.textContent = data ["stock"]

   
}
d1()