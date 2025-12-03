/**
 * Clase que representa al jugador del juego.
 * Gestiona la vida, puntos, inventario y cálculo de estadísticas.
 */
export default class Jugador {
    /**
     * Crea una instancia del Jugador.
     * 
     * @param {string} nombre - Nombre del jugador
     * @param {string} avatar - URL de la imagen del avatar del jugador
     * @param {number} puntos - Puntos iniciales del jugador
     * @param {Array} inventario - Array inicial de objetos en el inventario
     * @param {number} vida - Vida máxima y actual del jugador
     * 
     * @example
     * const jugador = new Jugador("Héroe", "./avatar.png", 0, [], 100);
     */
    constructor(nombre, avatar, puntos, inventario, vida) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = puntos;
        this.inventario = inventario;
        this.vida = vida;
        this.maxVida = vida;
    }

    /**
     * Añade un objeto al inventario del jugador (crea un clon para evitar referencias).
     * 
     * @param {Object} objeto - Objeto a añadir (debe tener propiedades tipo, bonus, imagen, nombre)
     * @param {string} objeto.tipo - Tipo de objeto: "arma", "armadura" o "consumible"
     * @param {number} objeto.bonus - Valor de bonificación del objeto
     * @param {string} objeto.imagen - URL de la imagen del objeto
     * @param {string} objeto.nombre - Nombre del objeto
     */
    addObjetoInventario(objeto){
        const objetoClonado = structuredClone(objeto);
        this.inventario.push(objetoClonado)
    }

    /**
     * Actualiza los puntos del jugador.
     * 
     * @param {number} puntosNuevos - Cantidad de puntos a añadir
     */
    ActualizarPuntos(puntosNuevos){
        this.puntos += puntosNuevos;
    }

    /**
     * Calcula el ataque total del jugador (vida base + bonificación de armas).
     * 
     * @returns {number} Valor de ataque total
     */
    obtenerAtaqueTotal(){
        return this.inventario.filter(objeto => objeto.tipo === "arma")
        .reduce((sum, objeto) => sum + objeto.bonus,0);
    }

    /**
     * Calcula la defensa total del jugador (bonificación de armaduras).
     * 
     * @returns {number} Valor de defensa total
     */
    obtenerDefensaTotal(){
        return this.inventario.filter(objeto => objeto.tipo === "armadura")
        .reduce((sum, objeto) => sum + objeto.bonus,0);
    }

    /**
     * Calcula la vida total del jugador (vida base + bonificación de consumibles).
     * 
     * @returns {number} Valor de vida total
     */
    obtenerVidaTotal(){
        const bonusVida = this.inventario.filter(objeto => objeto.tipo === "consumible")
        .reduce((sum, objeto) => sum + objeto.bonus,0);
        return this.vida + bonusVida;
    }

}