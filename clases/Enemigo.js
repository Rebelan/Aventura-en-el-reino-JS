class Enemigo {
    /**
     * @param {string} nombre
     * @param {string} avatar
     * @param {number} atk
     * @param {number} vida 
     */
    constructor(nombre, avatar, atk, vida) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.atk = atk;
        this.vida = vida;
    }
}

export default Enemigo;