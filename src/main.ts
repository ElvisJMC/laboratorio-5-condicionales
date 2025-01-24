import "./style.css";

let puntuacion: number = 0;

// Muestra puntación por pantalla
const muestraPuntuacion = () => {
  const elementoPuntuacion = document.getElementById("puntuacion");
  if (elementoPuntuacion) {
    elementoPuntuacion.innerHTML = `Llevas ${puntuacion} puntos`;
  } else {
    console.error(
      "muestraPuntuacion: No se ha encontrado el elemento con id puntuacionActual"
    );
  }
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);

const obtenerNumeroAleatorio = (): number => {
  return Math.ceil(Math.random() * 10);
};

// Genera una carta aleatoria de 1 a 7 y de 10 a 12
const dameCarta = (numeroAleatorio: number): number => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }
  return numeroAleatorio;
};

const calcularValorDeCarta = (carta: number): number => {
  if (carta <= 7) {
    return carta;
  }
  return 0.5;
};

const sumarPuntuacion = (valorActual: number) => {
  return puntuacion + valorActual;
};

const actualizarPuntuacion = (puntosSumados: number) => {
  puntuacion += puntosSumados;
};

const gestionarNuevaCarta = (): void => {
  const numeroAleatorio = obtenerNumeroAleatorio();
  const carta = dameCarta(numeroAleatorio);
  pintarCarta(carta);
  const valorActual = calcularValorDeCarta(carta);
  const puntosSumados = sumarPuntuacion(valorActual);
  actualizarPuntuacion(puntosSumados);
  muestraPuntuacion();
  console.log(`Puntuación tras pedir carta: ${puntuacion}`);
  gestionarFinalDePartida();
};

// Pedir carta / Inicia la partida
const botonDameCarta = document.getElementById("dameCarta");
if (botonDameCarta instanceof HTMLButtonElement) {
  botonDameCarta.addEventListener("click", gestionarNuevaCarta);
}

// Intercambia la imagen de la carta segun el valor de la carta que recibe
const obtenerUrlCarta = (carta: number): string => {
  switch (carta) {
    case 1:
      return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg`;
    case 2:
      return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg`;
    case 3:
      return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg`;
    case 4:
      return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg`;
    case 5:
      return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg`;
    case 6:
      return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg`;
    case 7:
      return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg`;
    case 10:
      return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg`;
    case 11:
      return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg`;
    case 12:
      return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg`;
    default:
      return "Carta no valida";
  }
};

const actualizarUrlCarta = (UrlCarta: string): void => {
  const imagenCarta = document.getElementById("imagenCarta");
  if (imagenCarta instanceof HTMLImageElement) {
    imagenCarta.src = UrlCarta;
  }
};

const pintarCarta = (carta: number): void => {
  const UrlCarta = obtenerUrlCarta(carta);
  actualizarUrlCarta(UrlCarta);
};

const obtenerMensajePuntuacion = (puntuacion: number): string => {
  if (puntuacion === 7.5) {
    return "¡Lo has clavado! ¡Enhorabuena!";
  } else if (puntuacion > 7.5) {
    return "¡Game Over! Has pasado los 7.5 puntos, intentalo de nuevo.";
  } else {
    throw new Error("Resultado no reconocido. Verifica la puntuación.");
  }
};

const pintarMensajePuntuacion = (resultadoPuntuacion: string): void => {
  const mensajePuntuacionFinal = document.getElementById(
    "mensajePuntuacionFinal"
  );
  if (mensajePuntuacionFinal) {
    mensajePuntuacionFinal.innerHTML = resultadoPuntuacion;
  }
};

const gestionarFinalDePartida = (): void => {
  const resultadoPuntuacion = obtenerMensajePuntuacion(puntuacion);
  pintarMensajePuntuacion(resultadoPuntuacion);
  botonesFinalDePartida();
};

const obtenerMensajeMePlanto = (puntuacion: number): string => {
  if (puntuacion <= 4.5) {
    return "Has sido muy conservador";
  } else if (puntuacion === 5 || puntuacion === 5.5) {
    return "Te ha entrado cangelo eh?";
  } else if (puntuacion === 6 || puntuacion === 6.5 || puntuacion === 7) {
    return "Casi casi...";
  } else {
    return "No se encontró el elemento id imagenCarta";
  }
};

const pintarMensajeMePlanto = (resultadopMensajeMePlanto: string) => {
  const elementoMeplanto = document.getElementById("mePlanto");
  if (elementoMeplanto) {
    elementoMeplanto.innerHTML = resultadopMensajeMePlanto;
  }
};

const gestionarMePlanto = (): void => {
  const resultadopMensajeMePlanto = obtenerMensajeMePlanto(puntuacion);
  pintarMensajeMePlanto(resultadopMensajeMePlanto);
};

const botonMePlanto = document.getElementById("botonMePlanto");
if (botonMePlanto) {
  botonMePlanto?.addEventListener("click", () => {
    gestionarMePlanto();
    botonesFinalDePartida();
  });
}

const botonesFinalDePartida = () => {
  const botonDameCarta = document.getElementById("dameCarta");
  if (botonDameCarta instanceof HTMLButtonElement) {
    botonDameCarta.disabled = true;
  }
  const botonMePlanto = document.getElementById("botonMePlanto");
  if (botonMePlanto instanceof HTMLButtonElement) {
    botonMePlanto.disabled = true;
  }
  const botonNuevaPartida = document.getElementById("nuevaPartida");
  if (botonNuevaPartida instanceof HTMLButtonElement) {
    botonNuevaPartida.style.display = "block";
  }
};

// Reinicia todos los elementos de la partida
const reiniciaPartida = (): void => {
  puntuacion = 0;
  const elementoMeplanto = document.getElementById("mePlanto");
  if (elementoMeplanto) {
    elementoMeplanto.innerHTML = "";
  }
  const mensajePuntuacionFinal = document.getElementById(
    "mensajePuntuacionFinal"
  );
  if (mensajePuntuacionFinal) {
    mensajePuntuacionFinal.innerHTML = "";
  }
  const botonDameCarta = document.getElementById("dameCarta");
  if (botonDameCarta instanceof HTMLButtonElement) {
    botonDameCarta.disabled = false;
  }
  const botonMePlanto = document.getElementById("botonMePlanto");
  if (botonMePlanto instanceof HTMLButtonElement) {
    botonMePlanto.disabled = false;
  }
  const elementoPuntuacion = document.getElementById("puntuacion");
  if (elementoPuntuacion) {
    elementoPuntuacion.innerHTML = `Llevas ${puntuacion} puntos`;
  }
  const imagenCarta = document.getElementById("imagenCarta");
  if (imagenCarta instanceof HTMLImageElement) {
    imagenCarta.src =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
};

const botonNuevaPartida = document.getElementById("nuevaPartida");
if (botonNuevaPartida instanceof HTMLButtonElement) {
  botonNuevaPartida.addEventListener("click", () => {
    reiniciaPartida();
    botonNuevaPartida.style.display = "none";
  });
}
