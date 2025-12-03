export default class Jugador {
    /**
     * 
     * @param {String} nombre 
     * @param {String} avatar 
     * @param {number} puntos 
     * @param {Array} inventario 
     * @param {number} vida 
     */
    constructor(nombre, avatar, puntos, inventario, vida) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = puntos;
        this.inventario = inventario;
        this.vida = vida;
        this.maxVida = vida;
    }

    //Métodos

    /**
     * 
     * @param {object} objeto 
     * 
     */
    addObjetoInventario(objeto){
        const objetoClonado = structuredClone(objeto);
        this.inventario.push(objetoClonado)
    }

    /**
     * 
     * @param {number} puntosNuevos 
     */
    ActualizarPuntos(puntosNuevos){
        this.puntos += puntosNuevos;
    }

    /**
     * 
     * @returns {number}
     */
    obtenerAtaqueTotal(){
        return this.inventario.filter(objeto => objeto.tipo === "arma")
        .reduce((sum, objeto) => sum + objeto.bonus,0);
    }

    /**
     * 
     * @returns {number}
     */
    obtenerDefensaTotal(){
        return this.inventario.filter(objeto => objeto.tipo === "armadura")
        .reduce((sum, objeto) => sum + objeto.bonus,0);
    }

    /**
     * 
     * @returns {number}
     */
    obtenerVidaTotal(){
        const bonusVida = this.inventario.filter(objeto => objeto.tipo === "consumible")
        .reduce((sum, objeto) => sum + objeto.bonus,0);
        return this.vida + bonusVida;
    }

}