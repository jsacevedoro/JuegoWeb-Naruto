// Script de la Pantalla inicial para elegir personaje

window.addEventListener('load', iniciarJuego)

// Ocultar otras secciones, mostrar los animales disponibles para elección y habilitar botón de invocar
function iniciarJuego(){  
    ocultarSecciones()
    mostrarTarjetasanimales()
    botonAnimalJugador.addEventListener('click', seleccionarAnimalJugador) 
}

// Ocultar las secciones de las otras fases del juego
function ocultarSecciones(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    sectionReiniciar.style.display = 'none' 
}

// Manipular DOM para mostrar animales
function mostrarTarjetasanimales(){
    animales.forEach((animal) => {
        opcionDeAnimales = `
        <input type="radio" name="animal" id=${animal.nombre}>
        <label class="tarjeta-de-animal" for=${animal.nombre}>
            <img src=${animal.foto} alt=${animal.nombre}>
            <p><b>${animal.nombre}</b></p>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeAnimales 
    })
}


// Desencadenar acciones al oprimir el botón Invocar
function seleccionarAnimalJugador(){

    // Verificar si ningún input está checkeado
    let checked = document.querySelectorAll('input[name="animal"]:checked')
    if(checked.length==0){
        alert("Elige un animal ninja")
        // Se reinicia el juego hasta que el jugador elija un animal
        location.reload()
    } else{ 
        // Relacionar la tarjeta seleccionada con el objeto del animal
        animalJugadorId = eval(document.querySelector('input[name="animal"]:checked')).id
        animales.forEach((animal) => {
            if(animalJugadorId==animal.nombre){
                // animalJugador es una copia del objeto original
                animalJugador = Object.assign(Object.create(Object.getPrototypeOf(animal)), animal)
            }
        })
        // Iniciar la segunda fase del juego
        iniciarMapa()  
    }   
}
