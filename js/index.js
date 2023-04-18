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
const alicuotaIva = 0.21 ;
const lineaResultado = "TOTAL COMPRA: " ;

// - - - - - - - - - - - - - - - - - - - - - //  

// - - - - - - F U N C I O N E S - - - - - - //

function ingresoDatos () {
    nombre = prompt("Nombre");
    apellido = prompt("Apellido");
    edad = prompt("Edad");
    alert("Datos ingresados correctamente!");
}

function procesoCompra (compra) {
    if (compra == "S") { 
        if (puedeComprar) {
            cantidad = prompt("Cantidad de productos")
            precio = valorUnitario + ( valorUnitario * alicuotaIva )
            total = precio * cantidad
            resultado = lineaResultado + total
            alert(resultado)
        }else{
            alert("Lo siento, solo mayores de edad pueden realizar una compra")
        }
    }else{
        alert("Nos vemos!")
    }
}

// - - - - - - - - - - - - - - - - - - - - - //

// - - - - - - I N I C I O   D E L   P R O G R A M A - - - - - - //

// LA WEB SIEMPRE SOLICITARA INGRESO DE USUARIO
while(true) {
    ingresoDatos();

    // Valido datos ingresados //
    if (edad >= 18) {
        esMayor = true
    }

    if (nombre != "admin" && apellido != "admin") {
        esUsuario = true;
    }

    puedeComprar = esUsuario && esMayor;

    do {
        alert(nombre + ",vas a realizar una compra?");
        opcion = prompt("S/N");
        // Inicio proceso de compra //
        procesoCompra(opcion);    
    }while(opcion == "S");
}
// - - - - - - F I N   D E L   P R O G R A M A - - - - - - //