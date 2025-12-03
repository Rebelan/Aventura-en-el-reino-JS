import Enemigo from "./Enemigo.js";

class Jefe extends Enemigo{
    /**
     * @param {string} nombre
     * @param {string} avatar
     * @param {number} atk
     * @param {number} vida
     * @param {number} multiAtk
     */
    constructor(nombre,avatar,atk,vida,multiAtk = 1.2){
        super(nombre,avatar,atk,vida);
        this.multiAtk = multiAtk;
    }
}

export default Jefe;