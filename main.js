// Aqui se hace el flujo principal del jueguito las funciones estan en UI.js
import Jugador from "./clases/Jugador.js";
import {
    setJugador,
    mostrarEscena,
    prepararTienda,
    fillInventario,
    prepararEscena3,
    prepararEscena4,
    prepararEscena5,
    prepararEscena6,
    actualizarStatsJugador,
    enemigoActual,
    resultadoFinalBatalla
} from "./modulos/UI.js";
import Jefe from "./clases/Jefe.js";

document.addEventListener("DOMContentLoaded", () => {

    const jugador = new Jugador(
        "Jugador",
        "./style/imgs/avatar.png",
        0,
        [],
        100
    );

    setJugador(jugador);

    // Escena 1 visible al inicio
    mostrarEscena("escena1");
    fillInventario();

    // Botón ir al mercado
    document.getElementById("btnMercado").addEventListener("click", () => {
        prepararTienda();
        mostrarEscena("escena2");
        fillInventario();
    });

    // Botón Continuar desde escena2 a escena3
    document.getElementById("continuar3").addEventListener("click", () => {
        prepararEscena3();
        mostrarEscena("escena3");
    });

    // Botón ir a escena4
    document.getElementById("Enemigos").addEventListener("click", () => {
        prepararEscena4();
        mostrarEscena("escena4");
    });

    function confeti(){
        confetti({
        particleCount: 200,
        spread: 80,
        startVelocity: 40,
        origin: { y: 0.6 }
    });
    }
    // Botón volver tras batalla
    document.getElementById("volverEnemigos").addEventListener("click", () => {

        const resultado = resultadoFinalBatalla;
        const enemigo = enemigoActual;

        if (resultado.ganador === "jugador" && enemigo instanceof Jefe) {
            prepararEscena6();
            mostrarEscena("escena6");
            confeti();
            return;
        }

        prepararEscena4();
        mostrarEscena("escena4");
    });

    // Reinicio del juego
    document.getElementById("reiniciarPartida").addEventListener("click", ()=>{
        location.reload();
    });

});
