

// --------------------- IMPORTS ---------------------
import { productos, AplicarElDescuento } from "./Mercado.js";
import { enemigos, jefeFinal } from "./Enemigos.js";
import { combate } from "./Batalla.js";
import Jefe from "../clases/Jefe.js";
import { DistinguirJugador, GuardarJugador, RenderizarTabla } from "./Ranking.js";


// --------------------- VARIABLES GLOBALES ---------------------
/** @type {Object|null} Referencia del objeto Jugador */
let jugadorRef = null;

/** @type {Array} Carrito temporal con productos seleccionados */
let carritoLocal = [];

/** @type {Object|null} Enemigo seleccionado actualmente */
let enemigoActual = null;

/** @type {Object|null} Resultado de la última batalla */
let resultadoFinalBatalla = null;


// --------------------- SET DEL JUGADOR ---------------------
/**
 * Establece la referencia del jugador en el módulo UI.
 * 
 * @param {Object} ref - Objeto del Jugador
 * @param {string} ref.nombre - Nombre del jugador
 * @param {string} ref.avatar - URL del avatar
 * @param {Array} ref.inventario - Array de objetos del inventario
 * @param {number} ref.puntos - Puntos actuales del jugador
 */
export function setJugador(ref) {
    jugadorRef = ref;
}


// --------------------- CAMBIO DE ESCENA ---------------------
/**
 * Oculta todas las escenas y muestra la escena especificada.
 * 
 * @param {string} escenaId - ID del elemento HTML de la escena a mostrar
 * 
 * @example
 * mostrarEscena("escena3"); // Muestra la escena 3 y oculta las demás
 */
export function mostrarEscena(escenaId) {
    document.querySelectorAll(".escena").forEach(escena =>
        escena.classList.add("oculta")
    );
    document.getElementById(escenaId).classList.remove("oculta");
}


// --------------------- PINTAR INVENTARIO ---------------------
/**
 * Actualiza la visualización del inventario en todas las escenas.
 * Crea las casillas visuales con las imágenes de los objetos del inventario.
 */
export function fillInventario() {

    document.querySelectorAll("#inventarioCasillas").forEach(inv => {
        inv.innerHTML = "";

        jugadorRef.inventario.forEach(obj => {
            const casilla = document.createElement("div");
            casilla.classList.add("casillaInv");
            casilla.innerHTML = `<img src="${obj.imagen}" alt="${obj.nombre}">`;
            inv.appendChild(casilla);
        });
    });
}


// --------------------- ACTUALIZAR STATS ---------------------
/**
 * Actualiza la visualización de las estadísticas del jugador en la escena 3.
 * Muestra vida total, ataque, defensa y puntos.
 */
export function actualizarStatsJugador() {

    document.getElementById("hpJugador3").textContent = jugadorRef.obtenerVidaTotal();
    document.getElementById("atkJugador3").textContent = jugadorRef.obtenerAtaqueTotal();
    document.getElementById("defJugador3").textContent = jugadorRef.obtenerDefensaTotal();
    document.getElementById("puntosJugador3").textContent = jugadorRef.puntos;
}


// --------------------- ANIMACIÓN MONEDAS ---------------------
/**
 * Muestra una animación de tres monedas cayendo desde arriba
 * Posicionadas en 25%, 50% y 75% del ancho de pantalla
 */
export function animarMonedas() {
    const posiciones = ['25%', '50%', '75%'];
    
    posiciones.forEach((posicion, index) => {
        const moneda = document.createElement('img');
        moneda.src = './style/imgs/moneda.png';
        moneda.classList.add('moneda-animada');
        moneda.style.left = posicion;
        
        document.body.insertAdjacentElement('beforeend', moneda);
        
        // Eliminar la moneda después de la animación
        setTimeout(() => {
            moneda.remove();
        }, 2500);
    });
}


// --------------------- PREPARAR ESCENA 2 (MERCADO) ---------------------
/**
 * Prepara la tienda (escena 2).
 * Genera tarjetas de productos con un descuento aleatorio según rareza.
 * Agrega funcionalidad para añadir/devolver productos al carrito.
 */
export function prepararTienda() {

    const contenedorProductos = document.getElementById("ListadoProductos");
    contenedorProductos.innerHTML = "";

    // Rareza aleatoria para descuento
    const rarezas = ["comun", "raro", "epico"];
    const rarezaDescuento = rarezas[Math.floor(Math.random() * rarezas.length)];

    const productosConDescuento = AplicarElDescuento("rareza", rarezaDescuento, 20);

    const preciosRebajados = new Map();
    productosConDescuento.forEach(p => preciosRebajados.set(p.nombre, p.precio));

    productos.forEach(producto => {

        const precio = preciosRebajados.has(producto.nombre)
            ? preciosRebajados.get(producto.nombre)
            : producto.precio;

        const card = document.createElement("div");
        card.classList.add("producto");

        card.innerHTML = `
            <img src="${producto.imagen}">
            <h3>${producto.nombre}</h3>
            <p>Rareza: ${producto.rareza}</p>
            <p>Bonus: ${producto.bonus}</p>
            <p>Precio: ${(precio / 100).toFixed(2)}C</p>
            <button class="btnProducto">Añadir</button>
        `;

        const btn = card.querySelector(".btnProducto");

        btn.addEventListener("click", () => {

            if (!card.classList.contains("seleccionado")) {

                carritoLocal.push(producto);
                actualizarCarrito();
                fillInventario();

                card.classList.add("seleccionado");
                btn.textContent = "Devolver";

            } else {

                carritoLocal = carritoLocal.filter(p => p.nombre !== producto.nombre);
                actualizarCarrito();
                fillInventario();

                card.classList.remove("seleccionado");
                btn.textContent = "Añadir";
            }
        });

        contenedorProductos.appendChild(card);
    });
}


// --------------------- PINTAR CARRITO ---------------------
/**
 * Actualiza la visualización del carrito de compras.
 * Muestra los productos seleccionados en la escena de tienda.
 */
export function actualizarCarrito() {

    const cont = document.getElementById("carrito");
    cont.innerHTML = "";

    carritoLocal.forEach(prod => {
        const item = document.createElement("div");
        item.classList.add("producto");
        item.innerHTML = `
            <img src="${prod.imagen}">
            <h4>${prod.nombre}</h4>
        `;
        cont.appendChild(item);
    });
}


// --------------------- ESCENA 3 ---------------------
/**
 * Prepara la escena 3 (confirmación de compra).
 * Pasa los objetos del carrito al inventario del jugador.
 * Actualiza las estadísticas y visualización del jugador.
 */
export function prepararEscena3() {

    // Pasar objetos del carrito al jugador
    carritoLocal.forEach(prod => jugadorRef.addObjetoInventario(prod));
    carritoLocal = [];

    fillInventario();
    actualizarStatsJugador();

    document.getElementById("avatarJugador3").src = jugadorRef.avatar;
    document.getElementById("nombreJugador3").textContent = jugadorRef.nombre;
}


// --------------------- ESCENA 4 - LISTA DE ENEMIGOS ---------------------
/**
 * Prepara la escena 4 (selección de enemigos).
 * Genera tarjetas con todos los enemigos disponibles.
 * Al hacer clic en un enemigo, inicia el combate.
 */
export function prepararEscena4() {

    const lista = document.getElementById("listaEnemigos");
    lista.innerHTML = "";

    let listaCompleta = enemigos.length > 0 ? [...enemigos] : [jefeFinal];

    listaCompleta.forEach(enemigo => {

        const card = document.createElement("div");
        card.classList.add("tarjeta-enemigo");

        card.innerHTML = `
            <img src="${enemigo.avatar}" alt="${enemigo.nombre}">
            <h3>${enemigo.nombre}</h3>
            <p><strong>Vida:</strong> ${enemigo.vida}</p>
            <p><strong>Ataque:</strong> ${enemigo.atk}</p>
        `;

        card.addEventListener("click", ()=>{

            enemigoActual = enemigo;
            resultadoFinalBatalla = combate(jugadorRef, enemigo);

            prepararEscena5();
            mostrarEscena("escena5");
        });

        lista.appendChild(card);
    });

    fillInventario();
}


// --------------------- ESCENA 5 - RESULTADO BATALLA ---------------------
/**
 * Prepara la escena 5 (resultado de la batalla).
 * Muestra el resultado (victoria/derrota) y actualiza puntos.
 * Elimina el enemigo vencido de la lista.
 */
export function prepararEscena5() {

    const resultado = resultadoFinalBatalla;
    const enemigo = enemigoActual;

    document.getElementById("avatarJugadorResultado").src = jugadorRef.avatar;
    document.getElementById("avatarEnemigoResultado").src = enemigo.avatar;

    const msg = document.getElementById("mensajeResultado");
    const pts = document.getElementById("puntosGanados");

    if (resultado.ganador === "enemigo") {
        msg.textContent = "Has sido derrotado.";
        msg.style.color = "red";
        pts.textContent = "";
        return;
    }

    msg.textContent = "¡Victoria!";
    msg.style.color = "lime";

    pts.textContent = `Puntos ganados: ${resultado.puntosGanados}`;
    jugadorRef.puntos += resultado.puntosGanados;
    
    // Animar monedas al ganar
    animarMonedas();

    const idx = enemigos.indexOf(enemigo);
    if (idx !== -1) enemigos.splice(idx, 1);
}


// --------------------- ESCENA 6 - FINAL DEL JUEGO ---------------------
/**
 * Prepara la escena 7 (pantalla final con ranking).
 * Guarda el jugador en LocalStorage.
 */
export function prepararEscena6() {
    // Guardar el jugador en LocalStorage
    GuardarJugador(jugadorRef);
}


// --------------------- CONFETI CELEBRACIÓN ---------------------
/**
 * Lanza efecto de confeti en pantalla para celebrar la victoria final.
 * Utiliza la librería canvas-confetti.
 */
export function confetiCelebracion() {
    confetti({
        particleCount: 200,
        spread: 80,
        startVelocity: 40,
        origin: { y: 0.6 }
    });
}


// --------------------- EXPORTS NECESARIOS ---------------------
/**
 * Enemigo actual seleccionado en la batalla
 * @type {Object|null}
 */
export {
    enemigoActual,
    resultadoFinalBatalla
};
