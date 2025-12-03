import Jefe from "../clases/Jefe.js";
import Enemigo from "../clases/Enemigo.js";

// 4 enemigos normales
export const enemigos = [
    new Enemigo("Goblin", "./style/imgs/goblin.png", 4, 20),
    new Enemigo("Esqueleto", "./style/imgs/esqueleto.png", 5, 25),
    new Enemigo("Bandido", "./style/imgs/bandido.png", 6, 30),
    new Enemigo("Lobo Oscuro", "./style/imgs/lobo.png", 7, 18),
];

// 1 jefe final
export const jefeFinal = new Jefe(
    "Dragón Rojo",
    "../style/imgs/dragon.png",
    10,   // atk
    45,   // vida
    1.5   // multiAtk
);

export function obtenerEnemigoAleatorio() {

    // probabilidad de jefe
    const probJefe = 0.2;

    if(Math.random() < probJefe){
        return jefeFinal;
    }

    // enemigo normal
    return enemigos[Math.floor(Math.random() * enemigos.length)];
}
