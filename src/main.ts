import "./style.css";

let puntuacion: number = 0;

// Muestra puntación por pantalla
const muestraPuntuacion = () => {
  const elementoPuntuacion = document.getElementById("puntuacion");
  if (elementoPuntuacion) {
    elementoPuntuacion.innerHTML = `Llevas ${puntuacion} puntos`;
  } else {
    console.error("muestraPuntuacion: No se ha encontrado el elemento con id puntuacionActual")
  }
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);


// Intercambia la imagen de la carta segun el valor de la carta que recibe 
const mostrarCarta = (carta: number): void => {
  const imagenCarta = document.getElementById("imagenCarta") as HTMLImageElement;
  if (!imagenCarta) {
    console.error("No se encontró el elemento id imagenCarta");
    return;
  }
  switch (carta) {
    case 1: 
      imagenCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg`;
      break;
    case 2:
      imagenCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg`;
      break;
    case 3:
      imagenCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg`
      break;
    case 4:
      imagenCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg`
      break;
    case 5:
      imagenCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg`
      break;
    case 6:
      imagenCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg`
      break;
    case 7:
      imagenCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg`
      break;
    case 10:
      imagenCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg`
      break;
    case 11:
      imagenCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg`
      break;
    case 12:
      imagenCarta.src = `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg`
      break;
    default:
      console.error("Carta no valida")
  }
};

// Genera una carta aleatoria de 1 a 7 y de 10 a 12
const dameCarta = (): number => {
  const carta: number = Math.ceil(Math.random() * 10);
  if (carta > 7) {
    return carta + 2;
  } else {
    return carta;
  }
};


// Calcula el valor de las cartas
const calcularValorDeCarta = (carta: number): number => {
  if (carta <= 7) {
    return carta;
  } else {
    return 0.5;
  }
};


const gestionarGameOver = (puntuacion: number): void => {
  if (puntuacion > 7.5) {
    const elementoGameOver = document.getElementById("gameOver");
    if (elementoGameOver) {
      elementoGameOver.innerHTML = "¡Game Over! Has pasado los 7.5 puntos, intentalo de nuevo."
    }

    // Desactivar el botón Dame carta
    const botonDameCarta = document.getElementById("dameCarta") as HTMLButtonElement;
    if (botonDameCarta) {
      botonDameCarta.disabled = true;
    }
    finalizarPartida();
  }
};


const gestionarMePlanto = (puntuacion: number): void => {
  let elementoMeplanto = document.getElementById("mePlanto");
  if (!elementoMeplanto) {
    console.error("No se encontró el elemento id imagenCarta");

  } else if (puntuacion <= 4.5) {
    elementoMeplanto.innerHTML = "Has sido muy conservador";

  } else if (puntuacion === 5 || puntuacion === 5.5 ) {
    elementoMeplanto.innerHTML = "Te ha entrado cangelo eh?";

  } else if (puntuacion === 6 || puntuacion === 6.5 || puntuacion === 7) {
    elementoMeplanto.innerHTML = " Casi casi...";

  } else if (puntuacion === 7.5) {
    elementoMeplanto.innerHTML = "¡Lo has clavado! ¡Enhorabuena!";
  }
  };


// Bontón para plantarse
const botonMePlanto = document.getElementById("botonMePlanto") as HTMLButtonElement;
botonMePlanto?.addEventListener("click", () => {
  gestionarMePlanto(puntuacion);
 const botonDameCarta = document.getElementById("dameCarta") as HTMLButtonElement;
  if (botonDameCarta) {
    botonDameCarta.disabled = true;
  }
  finalizarPartida();
 });

// Botón para pedir carta
const botonDameCarta = document.getElementById("dameCarta");
botonDameCarta?.addEventListener("click", () => {
  const carta: number = dameCarta();
  mostrarCarta(carta);
  const valorActual = calcularValorDeCarta(carta);
  puntuacion += valorActual;
  muestraPuntuacion();
  console.log(`Puntuación tras pedir carta: ${puntuacion}`);
  gestionarGameOver(puntuacion);
});

// Muestra el botón nueva partida al finalizar partida  
const finalizarPartida = () => {
  const botonDameCarta = document.getElementById("dameCarta") as HTMLButtonElement;
  if (botonDameCarta) {
    botonDameCarta.disabled = true;
  }
  const botonNuevaPartida = document.getElementById("nuevaPartida") as HTMLButtonElement;
  if (botonNuevaPartida) {
    botonNuevaPartida.style.display = "block";
  }
}

// Función que reinicia todos los elementos de la partida
const reiniciaPartida = () => {
  puntuacion = 0;

  let elementoMeplanto = document.getElementById("mePlanto");
  if (elementoMeplanto) {
    elementoMeplanto.innerHTML = "";
  }

  const elementoGameOver = document.getElementById("gameOver");
  if (elementoGameOver) {
    elementoGameOver.innerHTML = "";
  }

  const botonDameCarta = document.getElementById("dameCarta") as HTMLButtonElement;
  if (botonDameCarta) {
    botonDameCarta.disabled = false;
  }

  const elementoPuntuacion = document.getElementById("puntuacion");
  if (elementoPuntuacion) {
    elementoPuntuacion.innerHTML = `Llevas ${puntuacion} puntos`;
  }

  const imagenCarta = document.getElementById("imagenCarta") as HTMLImageElement;
  if (imagenCarta) {
    imagenCarta.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
};

// Botón para reiniciar partida
const botonNuevaPartida = document.getElementById("nuevaPartida");
botonNuevaPartida?.addEventListener("click", () => {
  reiniciaPartida();
  botonNuevaPartida.style.display = "none";
});
