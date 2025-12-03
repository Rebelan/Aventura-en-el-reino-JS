/**
 * 
 * @param {number} puntuacion 
 * @param {number} umbral - Le pongo un valor minimo por si acaso no se proporciona un valor
 * @returns {string} Devolverá "Pro" o "Noob" en base a la condición
 */
function DistinguirJugador(puntuacion, umbral = 300){
    return puntuacion >= umbral ? "Pro" : "Noob";
}

export {DistinguirJugador};