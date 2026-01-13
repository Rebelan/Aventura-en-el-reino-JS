/**
 * 
 * @param {number} puntuacion 
 * @param {number} umbral - Le pongo un valor minimo por si acaso no se proporciona un valor
 * @returns {string} Devolverá "Pro" o "Noob" en base a la condición
 */
function DistinguirJugador(puntuacion, umbral = 300){
    return puntuacion >= umbral ? "Pro" : "Noob";
}

/**
 * Guarda los datos del jugador en LocalStorage
 * 
 * @param {Object} jugador - Objeto del jugador con nombre, puntos y dinero
 */
function GuardarJugador(jugador) {
    const jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
    
    // Evitar duplicados: buscar si el jugador ya existe
    const indice = jugadores.findIndex(j => j.nombre === jugador.nombre);
    
    if (indice !== -1) {
        // Si existe, actualizar
        jugadores[indice] = {
            nombre: jugador.nombre,
            puntos: jugador.puntos,
            dinero: jugador.dinero
        };
    } else {
        // Si no existe, añadir
        jugadores.push({
            nombre: jugador.nombre,
            puntos: jugador.puntos,
            dinero: jugador.dinero
        });
    }
    
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
}

/**
 * Obtiene todos los jugadores del LocalStorage
 * 
 * @returns {Array} Array de jugadores guardados
 */
function ObtenerJugadores() {
    return JSON.parse(localStorage.getItem('jugadores')) || [];
}

/**
 * Renderiza la tabla de ranking en la escena 6
 */
function RenderizarTabla() {
    const jugadores = ObtenerJugadores();
    
    // Ordenar por puntos descendente
    jugadores.sort((a, b) => b.puntos - a.puntos);
    
    const tablaBody = document.getElementById('tablaRankingBody');
    
    if (!tablaBody) {
        console.error('Elemento tablaRankingBody no encontrado');
        return;
    }
    
    tablaBody.innerHTML = '';
    
    jugadores.forEach(jugador => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${jugador.nombre}</td>
            <td>${jugador.puntos}</td>
            <td>${jugador.dinero}</td>
        `;
        tablaBody.appendChild(fila);
    });
}

export {
    DistinguirJugador,
    GuardarJugador,
    ObtenerJugadores,
    RenderizarTabla
};