let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3


function iniciarJuego(){

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'    

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarPokemonJugador) 


    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)

    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonRetiniciar = document.getElementById('boton-reiniciar')
    botonRetiniciar.addEventListener('click', reiniciarJuego)

}


function seleccionarPokemonJugador(){

    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let spanPokemonJugador = document.getElementById('pokemon-jugador')

    if (document.getElementById('bulbasaur').checked){
        spanPokemonJugador.innerHTML = 'bulbasaur'
        seleccionarPokemonEnemigo()
    } else if(document.getElementById('charmander').checked){
        spanPokemonJugador.innerHTML = 'charmander'
        seleccionarPokemonEnemigo()
    } else if(document.getElementById('squirtle').checked){
        spanPokemonJugador.innerHTML = 'squirtle'
        seleccionarPokemonEnemigo()
    } else {
        alert('Elige un Pokemón!')
        location.reload()
    }    

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'block'
    


}


function nombrePokemonElegido(){

}


function seleccionarPokemonEnemigo(){
    let pokemonAleatorio = aleatorio(1,3)
    let spanPokemonEnemigo = document.getElementById('pokemon-enemigo')

    if(pokemonAleatorio == 1){
        spanPokemonEnemigo.innerHTML = 'bulbasaur'
    } else if(pokemonAleatorio==2){
        spanPokemonEnemigo.innerHTML = 'charmander'
    } else {spanPokemonEnemigo.innerHTML='squirtle'}

}


function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}

function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)
    if (ataqueAleatorio==1){ ataqueEnemigo='FUEGO'}
    else if (ataqueAleatorio==2){ ataqueEnemigo='AGUA'}
    else { ataqueEnemigo='TIERRA'}

    combate()
}


function combate(){
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    let resultado = 'PERDISTE'
    if(ataqueJugador==ataqueEnemigo){
        resultado = 'EMPATE'
    } else if(ataqueJugador=='FUEGO' && ataqueEnemigo=='TIERRA'){
        resultado = 'GANASTE'
        vidasEnemigo --
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador=='AGUA' && ataqueEnemigo=='FUEGO'){
        resultado = 'GANASTE'
        vidasEnemigo --
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador=='TIERRA' && ataqueEnemigo=='AGUA'){
        resultado = 'GANASTE'
        vidasEnemigo --
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        vidasJugador --
        spanVidasJugador.innerHTML = vidasJugador
    }



    crearMensaje(resultado)

    revisarVidas()
}

function revisarVidas(){
    if (vidasEnemigo==0){
        crearMensajeFinal('FELICITACIONES, GANASTE!')
    } else if (vidasJugador==0){
        crearMensajeFinal('LO SIENTO, PERDISTE')
    }
}

function crearMensajeFinal(resultadoFinal){

    let sectionMensajes = document.getElementById('mensajes')

    let parrafo = document.createElement('p')

    parrafo.innerHTML = resultadoFinal
    sectionMensajes.appendChild(parrafo)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true
    
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = true

    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = true

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'block'    

}

function crearMensaje(resultado){

    let sectionMensajes = document.getElementById('mensajes')

    let parrafo = document.createElement('p')

    parrafo.innerHTML = 'Tu pokemon atacó con '+ ataqueJugador + ' \nEl pokemon enemigo atacó con ' + ataqueEnemigo + ' ' + resultado
    
    sectionMensajes.appendChild(parrafo)

}


function reiniciarJuego(){

    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}



   

window.addEventListener('load', iniciarJuego)