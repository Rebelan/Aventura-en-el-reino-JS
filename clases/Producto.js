/**
 * Clase que representa un producto (objeto) disponible en la tienda.
 * Almacena información sobre armas, armaduras y consumibles.
 */
class Producto{
    /**
     * Crea una instancia de Producto.
     * 
     * @param {string} nombre - Nombre del producto
     * @param {string} imagen - URL de la imagen del producto
     * @param {number} precio - Precio en monedas (se divide entre 100 para mostrar)
     * @param {string} rareza - Nivel de rareza: "comun", "raro" o "epico"
     * @param {string} tipo - Tipo de producto: "arma", "armadura" o "consumible"
     * @param {number} bonus - Valor de bonificación que aporta el producto
     * 
     * @example
     * const espada = new Producto("Espada", "./espada.png", 5000, "raro", "arma", 15);
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
     * Formatea el precio del producto para mostrar en la UI.
     * Convierte el precio interno a formato de moneda (ej: 950 --> 9,50C).
     * 
     * @returns {string} Precio formateado con símbolo de moneda
     * 
     * @example
     * espada.FormatearAtributos(); // "50,00C"
     */
    FormatearAtributos(){
        const precioFormateado = (this.precio / 100)
            .toFixed(2)
            .replace(".", ",");
        return `${precioFormateado}C`;
    }

    /**
     * Crea una copia del producto con el precio reducido por el descuento.
     * No modifica el producto original.
     * 
     * @param {number} descuento - Porcentaje de descuento (ej: 20 para 20% de descuento)
     * @returns {Producto} Nuevo producto clonado con precio modificado
     * 
     * @example
     * const espada = new Producto("Espada", "./espada.png", 5000, "raro", "arma", 15);
     * const espadaConDescuento = espada.AplicarDescuento(20); // Descuento del 20%
     */
    AplicarDescuento(descuento){
        let copiaProducto = structuredClone(this);

        copiaProducto.precio = Math.round(this.precio * (1 - descuento / 100));

        return copiaProducto;
    }


}

export default Producto;