let link = `https://681b43ad17018fe5057ad33d.mockapi.io/heroes`
function api(){
    axios.get(link)
    .then((response)=>{
        console.log(response["data"])
    })
}
function añadir(personaje,actor,edad,ubicacion,imagen,fecha,productora,trajes){
    axios.post(link,{
        "personaje":personaje,
        "actor":actor,
        "edad":edad,
        "ubicacion":ubicacion,
        "imagen:poster":imagen,
        "fecha":fecha,
        "productora":productora,
        "trajes":trajes
    })
}
api()
document.getElementById("guardar").addEventListener("click", function(e){
    e.preventDefault();

    let personaje = document.getElementById("nombre_personaje").value
    let actor = document.getElementById("nombre_actor").value
    let edad = document.getElementById("edad_actor").value
    let ubicacion = document.getElementById("ubicacion").value
    let imagen = document.getElementById("poster").value
    let fecha = document.getElementById("fecha").value
    let productora = document.getElementById("productora").value
    let count = 0;
    let iterador = ``;

    for (let i = 1; document.getElementById(`input_${i}`) !== null; i++) {
        count++;
        let elemento = document.getElementById(`input_${i}`);

        iterador += `${i}:${elemento.value}`
    }
    

    añadir(personaje,actor,edad,ubicacion,imagen,fecha,productora,iterador)
})

document.getElementById("trajecitos").addEventListener("click", function(e) {
    e.preventDefault();

    let añadir = document.getElementById("añadir_trajes");

    añadir.innerHTML = `<div class="trajes">
                            <h1>Registro de Trajes</h1>
                            <div>
                                <h1>Trajes del Personaje</h1>
                                <p>
                                    En esta sección podrás registrar cada uno de los trajes usados por el actor en sus películas.
                                </p>
                                <button id="new" class="botonmas">+</button>
                                <div id="contenedor_trajes"></div>
                            </div>
                        </div>`;

    let count = 0
    document.getElementById("new").addEventListener("click", function(e) {
        e.preventDefault();
        count ++
        let contenedor = document.getElementById("contenedor_trajes");
        contenedor.innerHTML += `<div class="traje">
                                    <h2>Nombre del Traje</h2>
                                    <input id="input_${count}"type="text" placeholder="Nombre del traje">
                                    <button"class="botoneliminar">-</button>
                                 </div>`;
    });
});
