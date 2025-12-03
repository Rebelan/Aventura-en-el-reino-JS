

// --------------------- IMPORTS ---------------------
import { productos, AplicarElDescuento } from "./Mercado.js";
import { enemigos, jefeFinal } from "./Enemigos.js";
import { combate } from "./Batalla.js";
import Jefe from "../clases/Jefe.js";
import { DistinguirJugador } from "./Ranking.js";


// --------------------- VARIABLES GLOBALES ---------------------
let jugadorRef = null;
let carritoLocal = [];
let enemigoActual = null;
let resultadoFinalBatalla = null;


// --------------------- SET DEL JUGADOR ---------------------
export function setJugador(ref) {
    jugadorRef = ref;
}


// --------------------- CAMBIO DE ESCENA ---------------------
export function mostrarEscena(escenaId) {
    document.querySelectorAll(".escena").forEach(escena =>
        escena.classList.add("oculta")
    );
    document.getElementById(escenaId).classList.remove("oculta");
}


// --------------------- PINTAR INVENTARIO ---------------------
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
export function actualizarStatsJugador() {

    document.getElementById("hpJugador3").textContent = jugadorRef.obtenerVidaTotal();
    document.getElementById("atkJugador3").textContent = jugadorRef.obtenerAtaqueTotal();
    document.getElementById("defJugador3").textContent = jugadorRef.obtenerDefensaTotal();
    document.getElementById("puntosJugador3").textContent = jugadorRef.puntos;
}


// --------------------- PREPARAR ESCENA 2 (MERCADO) ---------------------
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

    const idx = enemigos.indexOf(enemigo);
    if (idx !== -1) enemigos.splice(idx, 1);
}


// --------------------- ESCENA 6 - FINAL DEL JUEGO ---------------------
export function prepararEscena6() {

    document.getElementById("finalAvatarJugador").src = jugadorRef.avatar;
    document.getElementById("finalNombreJugador").textContent = jugadorRef.nombre;
    document.getElementById("finalPuntos").textContent = jugadorRef.puntos;

    const rango = DistinguirJugador(jugadorRef.puntos);

    document.getElementById("finalRango").textContent = rango;
}


// --------------------- EXPORTS NECESARIOS ---------------------
export {
    enemigoActual,
    resultadoFinalBatalla
};
