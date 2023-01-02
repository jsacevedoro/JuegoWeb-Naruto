// Secciones
const sectionSeleccionarAnimal = document.getElementById('seleccionar-animal')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
// Elementos en seleccionar animal
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const botonAnimalJugador = document.getElementById('boton-animal')
// Elementos en seleccionar ataque
const tarjetaAnimalJugador = document.getElementById('animal-jugador')
const tarjetaAnimalEnemigo = document.getElementById('animal-enemigo')
const contenedorVidasJugador = document.getElementById('vidas-jugador')
const contenedorVidasEnemigo = document.getElementById('vidas-enemigo')
const ataqueActualJugador = document.getElementById('ataque-actual-jugador')
const ataqueActualEnemigo = document.getElementById('ataque-actual-enemigo')
const contenedorAtaquesJugador = document.getElementById('ataques-jugador')
const contenedorAtaquesEnemigo = document.getElementById('ataques-enemigo')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const sectionMensajes = document.getElementById('mensajes')
// Elementos en reiniciar
const contenedorGanador = document.getElementById('ganador')
const botonRetiniciar = document.getElementById('boton-reiniciar')


let animales = []

let animalJugadorId
let animalJugador
let animalEnemigo 

let ataqueJugador
let ataqueEnemigo
let opcionDeAnimales

let ataques = []

let vidasJugador = 3
let vidasEnemigo = 3

class animal{
    constructor(nombre, foto) {
        this.nombre = nombre
        this.foto = foto
    }
}

class ataque{
    constructor(nombre,foto) {
        this.nombre = nombre
        this.foto = foto
    }
}

let manda = new animal("Manda", "./assets/mandaborder.png")
let gamabunta = new animal("Gamabunta", "./assets/gamabuntaborder.png")
let katsuyu = new animal("Katsuyu", "./assets/katsuyuborder.png")

let fuego = new animal("KATÓN", "./assets/fireButton.png")
let agua = new animal("SUITÓN", "./assets/waterButton.png")
let tierra = new animal("DOTÓN", "./assets/rockButton.png")

animales.push(manda,gamabunta,katsuyu)
ataques.push(fuego,agua,tierra)

function iniciarJuego(){  

    sectionSeleccionarAtaque.style.display = 'none'

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

    sectionReiniciar.style.display = 'none'    
    botonAnimalJugador.addEventListener('click', seleccionarAnimalJugador) 
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)   
    botonTierra.addEventListener('click', ataqueTierra)
    botonRetiniciar.addEventListener('click', reiniciarJuego)
}


function seleccionarAnimalJugador(){
    sectionSeleccionarAnimal.style.display = 'none'

    // Verificar si ningún input está checkeado
    let checked = document.querySelectorAll('input[name="animal"]:checked')
    if(checked.length==0){
        alert("Elige un animal ninja")
        location.reload()
    } else{
        animalJugadorId = eval(document.querySelector('input[name="animal"]:checked')).id
        seleccionarAnimalEnemigo()
        sectionSeleccionarAtaque.style.display = 'flex'
        mostrarAnimalesBatalla()
    }   
}

function seleccionarAnimalEnemigo(){
    animalEnemigo = animales[aleatorio(0, animales.length-1)]
}

function mostrarAnimalesBatalla(){
    animales.forEach((animal) => {
        if(animalJugadorId==animal.nombre){
            animalJugador = animal
        }
    })   
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


function ataqueAleatorioEnemigo(){
    ataqueEnemigo = ataques[aleatorio(0,ataques.length-1)]
    mostrarAtaques()
    guardarAtaques()
    combate()
}

function mostrarAtaques(){
    ataqueActualJugador.innerHTML = "¡" + ataqueJugador.nombre + "!"
    ataqueActualEnemigo.innerHTML = "¡" + ataqueEnemigo.nombre + "!"
}

function guardarAtaques(){
    contenedorAtaquesJugador.innerHTML += `
    <img src="${ataqueJugador.foto}">
    `
    contenedorAtaquesEnemigo.innerHTML += `
    <img src="${ataqueEnemigo.foto}">
    `
}


function combate(){
    let resultado = 'PERDISTE'
    if(ataqueJugador==ataqueEnemigo){
        resultado = 'EMPATE'
    } else if(ataqueJugador==fuego && ataqueEnemigo==tierra){
        resultado = 'GANASTE'
        vidasEnemigo --
    } else if(ataqueJugador==agua && ataqueEnemigo==fuego){
        resultado = 'GANASTE'
        vidasEnemigo --
    } else if(ataqueJugador==tierra && ataqueEnemigo==agua){
        resultado = 'GANASTE'
        vidasEnemigo --
    } else {
        vidasJugador --
    }
    actualizarVidas()
    revisarVidas()
}

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

function revisarVidas(){
    if (vidasEnemigo==0){
        finDelJuego("Ganaste")
    } else if (vidasJugador==0){
        finDelJuego("Perdiste")
    }
}

function finDelJuego(mensaje){
    sectionSeleccionarAtaque.style.opacity = "0.3";
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
    contenedorGanador.innerHTML = mensaje
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', iniciarJuego)