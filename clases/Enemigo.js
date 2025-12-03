/**
 * Clase que representa un enemigo en el juego.
 * Define los atributos básicos de un enemigo: nombre, avatar, ataque y vida.
 */
class Enemigo {
    /**
     * Crea una instancia de Enemigo.
     * 
     * @param {string} nombre - Nombre del enemigo
     * @param {string} avatar - URL de la imagen del avatar del enemigo
     * @param {number} atk - Valor de ataque del enemigo
     * @param {number} vida - Vida máxima del enemigo
     * 
     * @example
     * const goblin = new Enemigo("Goblin", "./goblin.png", 10, 30);
     */
    constructor(nombre, avatar, atk, vida) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.atk = atk;
        this.vida = vida;
    }
}

export default Enemigo;