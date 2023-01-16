// Script para la tercera fase del juego 

function iniciarBatalla(){
    // Ocultar sección anterior, mostrar sección y animales en batalla
    sectionVerMapa.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    mostrarAnimalesBatalla()
    // Habilitar los botones de ataques y sus acciones
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)   
    botonTierra.addEventListener('click', ataqueTierra)
}

// Se manipula el DOM para mostrar los animales que están batallando
function mostrarAnimalesBatalla(){
    tarjetaAnimalJugador.innerHTML = `
    <p><b>${animalJugador.nombre}</b></p>
    <img src=${animalJugador.foto}>
    ` 
    tarjetaAnimalEnemigo.innerHTML = `
    <p><b>${animalEnemigo.nombre}</b></p>
    <img src=${animalEnemigo.foto}>
    `
    actualizarVidas()
}

// Cada vez que se selecciona un ataque, se asigna un ataque aleatorio al enemigo
function ataqueFuego(){
    ataqueJugador = fuego
    ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador = agua
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = tierra
    ataqueAleatorioEnemigo()
}

// Mostrar y guardar ataques en cada ronda y decidir el ganador
function ataqueAleatorioEnemigo(){
    ataqueEnemigo = ataques[aleatorio(0,ataques.length-1)]
    mostrarAtaques()
    guardarAtaques()
    combate()
}

// Mostrar ataques actuales debajo de los animales
function mostrarAtaques(){
    ataqueActualJugador.innerHTML = "¡" + ataqueJugador.nombre + "!"
    ataqueActualEnemigo.innerHTML = "¡" + ataqueEnemigo.nombre + "!"
}

// Guardar cada ataque en la parte lateral
function guardarAtaques(){
    contenedorAtaquesJugador.innerHTML += `
    <img src="${ataqueJugador.foto}">
    `
    contenedorAtaquesEnemigo.innerHTML += `
    <img src="${ataqueEnemigo.foto}">
    `
}

// Decidir quién pierde una vida de acuerdo a una lógica análoga a piedra, papel o tijera
function combate(){
    if(ataqueJugador==ataqueEnemigo){
        return
    } else if(ataqueJugador==fuego && ataqueEnemigo==tierra){
        vidasEnemigo --
    } else if(ataqueJugador==agua && ataqueEnemigo==fuego){
        vidasEnemigo --
    } else if(ataqueJugador==tierra && ataqueEnemigo==agua){
        vidasEnemigo --
    } else {
        vidasJugador --
    }
    actualizarVidas()
    revisarVidas()
}

// Manipular el  DOM para actualizar las vidas
function actualizarVidas(){
    contenedorVidasJugador.innerHTML = " "
    contenedorVidasEnemigo.innerHTML = " "
    for (let i = 0; i<vidasJugador; i++ ){
        contenedorVidasJugador.innerHTML += `
        <div class="vida">
        `
    }
    for (let i = 0; i<vidasEnemigo; i++ ){
        contenedorVidasEnemigo.innerHTML += `
        <div class="vida">
        `
    }
}

// Finalizar el juego si algún personaje se quedó sin vidas
function revisarVidas(){
    if (vidasEnemigo==0){
        finDelJuego("Ganaste")
    } else if (vidasJugador==0){
        finDelJuego("Perdiste")
    }
}

// Dar opacidad, deshabilitar botones y mostrar boton de reiniciar
function finDelJuego(mensaje){
    sectionSeleccionarAtaque.style.opacity = "0.3";
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
    contenedorGanador.innerHTML = mensaje
    botonRetiniciar.addEventListener('click', reiniciarJuego)
}

function reiniciarJuego(){
    location.reload()
}