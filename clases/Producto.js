class Producto{
    /**
     * 
     * @param {String} nombre 
     * @param {String} imagen 
     * @param {number} precio 
     * @param {String} rareza 
     * @param {String} tipo 
     * @param {number} bonus 
     */
    constructor(nombre,imagen,precio,rareza,tipo,bonus){
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.rareza = rareza;
        this.tipo = tipo;
        this.bonus = bonus;
    }
    
    
    /**
     * @param {object} producto
     *  convierte el precio (ej: 950 --> 9,50)
     */
    FormatearAtributos(){
        const precioFormateado = (this.precio / 100)
            .toFixed(2)
            .replace(".", ",");
        return `${precioFormateado}C`;
    }

    /**
     * @param {number} descuento
     * Recibe un valor y devuelve una nueva copia (clon) del producto con el
     * precio modificado
     * @returns {object}
     */
    AplicarDescuento(descuento){
        let copiaProducto = structuredClone(this);

        copiaProducto.precio = Math.round(this.precio * (1 - descuento / 100));

        return copiaProducto;
    }


}

export default Producto;