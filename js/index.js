// - - - - - - V A R I A B L E S - - - - - - //  

// VARIABLES STRING //
let nombre ;
let apellido ;
let tipoUsuario ;
let compra ;

// VARIABLES NUMERICAS //
let edad ;
let precio ;

// VARIABLES BOOLEANAS //
var esMayor = false ;
var puedeComprar = false ;

// CONSTANTES //
const valorUnitario = 100.00 ;
const alicuotaIva = 1.21 ;
const lineaResultado = "TOTAL COMPRA: " ;

// - - - - - - - - - - - - - - - - - - - - - //

// - - - - - - - A R R A Y S - - - - - - - - //

const productosLista = [];  // Almacena todos los productos disponibles en la Web //

const carritoLista = [];  // Almacena el carrito de compra generado por el usuario //

// - - - - - - - C L A S E S - - - - - - - - //

class Producto {
    constructor(nombre, categoria, precio, idProducto) {
        this.idProducto = idProducto ;
        this.nombre = nombre ;
        this.categoria = categoria ;
        this.precio = precio ;
    }
}

class Carrito {
    constructor (Producto , cantidad) {
        this.Producto = Producto ;
        this.cantidad = cantidad ;
        this.precioTotalProducto = function() {
                                        this.Producto.precio * this.cantidad  ;
                                    }
    }
}

// - - - - - - F U N C I O N E S - - - - - - //

// Solicita ingresar datos por pantalla al usuario //
function ingresoDatos () {
    nombre = document.getElementById("nombre").value 
    apellido = document.getElementById("apellido").value
    edad = document.getElementById("edad").value
    consFinal = document.getElementById("consFinal").value
}

// Funcion principal de un proceso de compra. Lista en pantalla todos los productos disponibles y solicita agregar al carrito cada producto //
function procesoCompra (compra) {
    if (compra == "S") { 
        if (puedeComprar) {

            // Muestro lista de productos //
            function mostrarProductos (productosLista)

            do{
                // Solicita datos del producto para agregar al carrito //
                idProducto = prompt("ID del producto")
                cantidad = prompt("Cantidad del producto")
                
                // Agrego el producto al carrito //
                const carrito = new Carrito (productos[idProducto], cantidad)
                listaCarrito.push(carrito)

                opcion = prompt("Desea agregar otro producto? S/N")
            }while(opcion == "S")

        }else{
            alert("Lo siento, solo mayores de edad pueden realizar una compra")
        }
    }else{
        alert("Nos vemos!")
    }
}

// Permite realizar un ABM de productos para disponibilizar en la web (SOLO DISPONIBLE PARA EL ADMIN) //
// Cada producto sera identificado por un ID para si posterior consulta o tratamiento //
function cargarProductos(accion, productos) {

    // Segun la accion elegida por el usuario, se ejecuta la logica correspondiente //
    while (true) {
        switch (accion) {
        case "AGREGAR": { // Agrega nuevos productos al array //
            let id = 0;

            // Determina que IDs estan ocupados para no duplicar //
            if (productos.length > 0) {
                const ultimaIdProducto = productos[productos.length - 1].id;
                id = ultimaIdProducto + 1;
            }

            const nombre = prompt("Ingrese el nombre del producto (o escriba 'salir' para finalizar):");

            if (nombre.toLowerCase() === "salir") {
                break;
            }

            const categoria = prompt("Ingrese la categoría del producto:");
            const precio = parseFloat(prompt("Ingrese el precio del producto:"));

            const producto = new Producto(nombre, categoria, precio, id);
            productos.push(producto);

            id++;
        }
        case "ELIMINAR": { // Elimina un producto por ID //
            const idEliminar = parseInt(prompt("Ingrese el ID del producto a eliminar (o escriba 'salir' para finalizar):"));
            const index = productos.findIndex(producto => producto.id === idEliminar);

            if (index !== -1) {
                productos.splice(index, 1);
                console.log("Producto eliminado exitosamente.");
            } else {
                console.log("No se encontró un producto con el ID especificado.");
            }
        }
        case "MODIFICAR": { // Modifica los atributos de un producto por ID //
            const idModificar = parseInt(prompt("Ingrese el ID del producto a modificar (o escriba 'salir' para finalizar):"));
            const index = productos.findIndex(producto => producto.id === idModificar);

            if (index !== -1) {
                const nombre = prompt("Ingrese el nuevo nombre del producto:");
                const categoria = prompt("Ingrese la nueva categoría del producto:");
                const precio = parseFloat(prompt("Ingrese el nuevo precio del producto:"));

                productos[index].nombre = nombre;
                productos[index].categoria = categoria;
                productos[index].precio = precio;

                console.log("Producto modificado exitosamente.");
            } else {
                console.log("No se encontró un producto con el ID especificado.");
            }
        }
        default:
            console.log("Acción no válida. Por favor, ingrese una acción válida (AGREGAR, ELIMINAR o MODIFICAR).");
            break;
        }

        if (nombre.toLowerCase() === "salir") {
            break;
        }
    } 
    return productos;
}

// Lista en pantalla todos los productos que se encuentran cargados en al web //
function mostrarProductos(productosLista) {
    for (let i = 0; i < productosLista.length; i++) {
        const producto = productosLista[i];
        const item = document.createElement("li");
        item.textContent = `${producto.id} - ${producto.nombre} - ${producto.categoria} - $${producto.precio.toFixed(2)}`;
        document.getElementById("listaProductos").appendChild(item);
    }
}

// - - - - - - - - - - - - - - - - - - - - - //

// - - - - - - I N I C I O   D E L   P R O G R A M A - - - - - - //

// LA WEB SIEMPRE SOLICITARA INGRESO DE USUARIO
while(true) {
    
    // Se ejecuta la funcion de ingreso de datos //
    document.getElementById("ingresar").addEventListener("click", ingresoDatos);

    // Valido datos ingresados //

    // Si la persona que esta ingresando no es ADMIN, asumo que es USER //
    // Si es ADMIN, inicia el proceso de carga de productos //
    if (nombre != "admin" && apellido != "admin") {
        esUsuario = true;
        window.location.href = "formulario.html";
    }else{
        window.location.href = "listado.html";
        accion = document.getElementById("accion").value ;
        cargarProductos(accion, productosLista);
    }
    
    // Valido con una bandera si es mayor de edad //
    if (edad >= 18) {
        esMayor = true
    }

    // Si es USER, es mayor de edad y hay productos en la WEB, PUEDE COMPRAR //
    puedeComprar = esUsuario && esMayor && hayProductos ;

    do {
        alert(nombre + ",vas a realizar una compra?");
        opcion = prompt("S/N");
        // Inicio proceso de compra //
        procesoCompra(opcion);    
    }while(opcion == "S");
}
// - - - - - - F I N   D E L   P R O G R A M A - - - - - - //