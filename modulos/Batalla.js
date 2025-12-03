import Jefe from "../clases/Jefe.js";

/**
 * 
 * @param {Jugador} jugador 
 * @param {Enemigo|Jefe} enemigo
 * @returns {{ganador: string, puntosGanados: number}}
 * 
 */
function combate(jugador, enemigo){

    let vidaJugador = jugador.obtenerVidaTotal();
    let vidaEnemigo = enemigo.vida;

    const atkJugador = jugador.obtenerAtaqueTotal();
    const defJugador = jugador.obtenerDefensaTotal();

    const atkEnemigo = enemigo.atk;

    while(vidaJugador>0 && vidaEnemigo>0){

        vidaJugador = (vidaJugador + defJugador) - atkEnemigo;
        vidaEnemigo = vidaEnemigo - atkJugador;
    }

    if(vidaJugador == 0 && vidaEnemigo > 0){
        return {ganador: "enemigo", puntosGanados: 0};
    }

    let puntos = 100 +atkEnemigo;

    if(enemigo instanceof Jefe){
        puntos = puntos * enemigo.multiAtk;
    }

    return {ganador: "jugador", puntosGanados: puntos};
}

export {combate};