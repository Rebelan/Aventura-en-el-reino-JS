import Enemigo from "./Enemigo.js";

/**
 * Clase que representa un Jefe enemigo (enemigo especial con ataque multiplicado).
 * Extiende la clase Enemigo con un multiplicador de ataque.
 * 
 * @extends Enemigo
 */
class Jefe extends Enemigo{
    /**
     * Crea una instancia de Jefe.
     * 
     * @param {string} nombre - Nombre del jefe
     * @param {string} avatar - URL de la imagen del avatar del jefe
     * @param {number} atk - Valor base de ataque del jefe
     * @param {number} vida - Vida máxima del jefe
     * @param {number} [multiAtk=1.2] - Multiplicador de ataque (por defecto 1.2 = 20% más de daño)
     * 
     * @example
     * const dragonJefe = new Jefe("Dragón Oscuro", "./dragon.png", 50, 200, 1.5);
     */
    constructor(nombre,avatar,atk,vida,multiAtk = 1.2){
        super(nombre,avatar,atk,vida);
        this.multiAtk = multiAtk;
    }
}

export default Jefe;