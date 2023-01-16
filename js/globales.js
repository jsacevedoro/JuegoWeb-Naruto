// Secciones
const sectionSeleccionarAnimal = document.getElementById('seleccionar-animal')
const sectionVerMapa = document.getElementById('ver-mapa')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
// Elementos en seleccionar animal
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const botonAnimalJugador = document.getElementById('boton-animal')
// Elementos en ver mapa
const mapa = document.getElementById('mapa')
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



let animalJugadorId
let animalJugador


let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
let animalEnemigo 

let ataqueJugador
let ataqueEnemigo
let opcionDeAnimales

let vidasJugador = 3
let vidasEnemigo = 3


// Animales
class animal{
    constructor(nombre, foto, avatarSrc, x = 10, y = 10) {
        this.nombre = nombre
        this.foto = foto
        this.avatar = new Image()
        this.avatar.src = avatarSrc
        this.x = x
        this.y = y
        this.ancho = 80
        this.alto = 80
        this.velocidadX = 0
        this.velocidadY = 0
    }

    dibujarAvatar(){
        lienzo.drawImage(
            this.avatar,
            this.x,
            this.y,
            this.alto,
            this.ancho        
        )
    }
}
// Tres animales distintos
let manda = new animal("Manda", "./assets/mandaborder.png", "./assets/mandaAvatar.png")
let gamabunta = new animal("Gamabunta", "./assets/gamabuntaborder.png", "./assets/gamabuntaAvatar.png")
let katsuyu = new animal("Katsuyu", "./assets/katsuyuborder.png", "./assets/katsuyuAvatar.png")
// Arreglo con todos lo animales
let animales = []
animales.push(manda,gamabunta,katsuyu)


// Ataques
class ataque{
    constructor(nombre, foto) {
        this.nombre = nombre
        this.foto = foto
    }
}
// Tres ataques distintos
let fuego = new animal("KATÓN", "./assets/fireButton.png")
let agua = new animal("SUITÓN", "./assets/waterButton.png")
let tierra = new animal("DOTÓN", "./assets/rockButton.png")
// Arreglo con todos los ataques
let ataques = []
ataques.push(fuego,agua,tierra)


// Función para obtener un entero aleatorio en un intervalo, de uso recurrente en todo el juego
function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

