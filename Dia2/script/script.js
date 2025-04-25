    const pokemonImage = document.querySelector(".pokemon-image")
    const pokemonNumber = document.querySelector(".pokemon-number")
    const pokemonName = document.querySelector(".pokemon-name")
    const form = document.querySelector(".form")
    const input = document.querySelector(".input-search")
    const buttonPrev = document.querySelector(".btn-prev")
    const buttonNext = document.querySelector(".btn-next")
  
    let searchPokemonId = 1
  
    // Función para hacer peticiones a la PokeAPI usando XMLHttpRequest
    const fetchPokemon = (pokemon) => {
      const xhr = new XMLHttpRequest()
      xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`, true)
  
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText)
          searchPokemonId = data.id
          renderPokemonData(data)
        } else {
          renderNotFound()
        }
      }
  
      xhr.onerror = () => {
        renderNotFound()
      }
  
      xhr.send()
    }
  

    const renderPokemonData = (data) => {
      pokemonImage.style.display = "block"
      pokemonNumber.textContent = data.id.toString().padStart(3, "0")
      pokemonName.textContent = data.name
  
    
      const sprites = data.sprites
      if (sprites.versions["generation-v"]["black-white"].animated.front_default) {
        pokemonImage.src = sprites.versions["generation-v"]["black-white"].animated.front_default
      } else if (sprites.front_default) {
        pokemonImage.src = sprites.front_default
      } else {
        pokemonImage.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
      }
  
      input.value = ""
    }
  
    
    const renderNotFound = () => {
      pokemonImage.style.display = "none"
      pokemonName.textContent = "Not found"
      pokemonNumber.textContent = ""
      input.value = ""
    }
  
   
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      fetchPokemon(input.value.trim())
    })
  
    buttonPrev.addEventListener("click", () => {
      if (searchPokemonId > 1) {
        searchPokemonId--
        fetchPokemon(searchPokemonId.toString())
      }
    })
  
    buttonNext.addEventListener("click", () => {
      searchPokemonId++
      fetchPokemon(searchPokemonId.toString())
    })
    fetchPokemon("1")
  