import Producto from "../clases/Producto.js";


const productos = [
    new Producto("Espada corta","./style/imgs/espada_corta.png",950,"comun","arma",5),
    new Producto("Escudo de madera","./style/imgs/escudo_madera.png",800,"comun","armadura",3),
    new Producto("Pocion de vida","./style/imgs/pocion_vida.png",500,"comun","consumible",20),
    new Producto("Arco largo","./style/imgs/arco_largo.png",1500,"raro","arma",10),
];

/**
 * @param {string} rareza
 * Se filtran los productos por rareza
 */

function filtrarProductos(rareza){
    let productosFiltrados = productos.filter(producto => producto.rareza === rareza);
    return productosFiltrados;
}
/**
 * 
 * @param {string} filtro - Será la rareza o tipo al que se aplica el descuento
 * @param {string} tipoFiltro - En caso de que sea rareza el tipo sera comun por ejemplo y en caso de tipo será arma por ejemplo
 * @param {number} descuento - El descuento que se aplicará a los productos
 * @returns {Producto[]} Lista de productos con descuento (clonada)
 */
function AplicarElDescuento(filtro, tipoFiltro, descuento){
    return productos.filter(prod => prod[filtro] === tipoFiltro).map(prod => prod.AplicarDescuento(descuento));
}

function BuscarUnProducto(nombre){
    return productos.find(product => product.nombre === nombre) || null; //si no lo encuentra lo ponemos a null para que no pete
}

export { productos, filtrarProductos, AplicarElDescuento, BuscarUnProducto };