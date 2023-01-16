// Script de la segunda Pantalla para explorar el mapa y encontrar enemigos

function iniciarMapa(){
    // Mostrar la sección y el mapa canvas
    sectionSeleccionarAnimal.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    mapa.width = mapa.getBoundingClientRect().width - 20 
    mapa.height = mapa.width * (567/678)
    // Definir aleatoriamente la posición de los avatares enemigos
    animales.forEach( (animal) =>{
        animal.x = aleatorio(100, mapa.width-80)
        animal.y = aleatorio(0, mapa.height-80)
    })
    // Escuchar eventos con las flechas
    window.addEventListener('keydown', presionarTecla)
    window.addEventListener('keyup', detenerMovimiento)
    // Actualizar la información del mapa cada 50 milisegundos
    intervalo = setInterval(actualizarMapa, 50)
}


function actualizarMapa(){
    // Limpiar mapa
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    // Pintar fondo
    mapaBackground.src = './assets/mapa3.jpg'
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    // Pintar avatar del Jugador de acuerdo a la velocidad, que depende de los botones de las flechas
    animalJugador.x = animalJugador.x + animalJugador.velocidadX
    animalJugador.y = animalJugador.y + animalJugador.velocidadY
    animalJugador.dibujarAvatar()
    // Pintar avatares enemigos
    animales.forEach( (animal) =>{
        animal.dibujarAvatar()
    })
    // Si el avatar del jugador está en movimiento se revisa si hay colisión con alguno de los avatares enemigos
    if (animalJugador.velocidadY != 0 || animalJugador.velocidadX != 0){
        animales.forEach( (animalEnemigo) =>{
            revisarColision(animalEnemigo)
        })
    }
}

// Función para desencadenar el movimiento cuando se unde una flecha
function presionarTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            animalJugador.velocidadY = -10
            break
        case 'ArrowDown':
            animalJugador.velocidadY = 10
            break
        case 'ArrowLeft':
            animalJugador.velocidadX = -10
            break  
        case 'ArrowRight':
            animalJugador.velocidadX = 10
            break      
    }
}

// Detener el movimiento cuando se deja de presionar una tecla
function detenerMovimiento(){
    animalJugador.velocidadX = 0
    animalJugador.velocidadY = 0
}

// Función para verificar si hay una colisión con un avatar enemigo determinado
function revisarColision(enemigo){
    // Definir los límites del área que ocupa el avatar enemigo
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho
    // Definir los límites del área que ocupa el avatar del Jugador
    const arribaJugador = animalJugador.y
    const abajoJugador = animalJugador.y + animalJugador.alto
    const izquierdaJugador = animalJugador.x
    const derechaJugador = animalJugador.x + animalJugador.ancho
    // Si no hay colisión, no se desencadena ninguna acción
    if(
        abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ){
        return
    }
    else {
        // Si se presenta una colisión se inicia la tercera fase del juego: batalla contra el enemigo con que se colisiona
        detenerMovimiento()
        animalEnemigo = enemigo
        iniciarBatalla()     
    }
}
