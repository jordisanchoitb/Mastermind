//Declaración de constantes.
const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";


//Declaración de variables globales.
const userCombi = [];
var master = [];
var intento = 1;
var aciertos = 0;

function init() {
    //1. Genera el código random del master
    master = generarColores(COLORS);
    console.log(master);

    //2. Crea todas las filas según el número de intentos.
    for (let i = 0; i < MAX_INTENTOS; i++) {
        crearFila();
    }
    filastrys = document.getElementsByClassName("rowResult");
    for (let i = MAX_INTENTOS; i > 0; i--) {
        filastrys[i - 1].id = "turno" + i;
    }
}

function crearFila() {
    document.getElementById("Result").innerHTML += ROW_RESULT;
}

function generarColores(arrayColores) {
    let arrayColoresOcultos = [];
    for (let i = 0; i < 4; i++) {
        NumberRandom = Math.floor(Math.random() * arrayColores.length);
        arrayColoresOcultos.push(arrayColores[NumberRandom]);
    }
    return arrayColoresOcultos;
}

/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
    let divinfo = document.getElementById("info");
    console.log(userCombi);
    if (userCombi.length == MAX_COMBI_COLORES) {

        mostrarCombinacionUsuario();

        let aciertos = comprobarAciertos();
        console.log("Aciertos: " + aciertos);

        let coincidencias = comprobarCoincidencias();
        console.log("Coincidencias: " + coincidencias);

        mostrarResultadoCirculos(aciertos, coincidencias);

        if (aciertos.length == 4) {
            divinfo.innerHTML = "Has ganado !!!";
            divinfo.style.fontSize = "xx-large";
        }
        else if (intento == MAX_INTENTOS) {
            divinfo.innerHTML = "Has perdido";
            divinfo.style.fontSize = "xx-large";
        }
        else {
            userCombi.length = 0;
            intento++;
            console.log(intento);
            divinfo.innerHTML = "Intento " + intento + " de " + MAX_INTENTOS;
            document.getElementById("combiText").value = "";
        }
    }
    else {
        alert("Debes introducir 4 colores");
    }
}

function mostrarCombinacionUsuario() {
    let fila = document.getElementById("turno" + intento);
    let arrayCeldas = fila.getElementsByClassName("celUserCombi");
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        arrayCeldas[i].id = userCombi[i];
    }
}

function comprobarAciertos() {
    let aciertos = [];
    let masterColors = document.getElementById("master");
    let arrayMasterColors = masterColors.getElementsByClassName("cel");
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        console.log(userCombi[i] + " es igual a " + master[i] + "?" + " " + (userCombi[i] == master[i]));
        if (userCombi[i] == master[i]) {
            aciertos.push(i);       
            arrayMasterColors[i].id = userCombi[i];
        }
    }
    return aciertos;
}

function comprobarCoincidencias() {
    let coincidencias = [];
    let masterArrayCopy = master.slice();
    let aciertos = comprobarAciertos();
    for (let i = 0; i < aciertos.length; i++) {
        masterArrayCopy.splice(masterArrayCopy.indexOf(userCombi[aciertos[i]]), 1);
    }
    console.log("Array copia master sin colores correctos: " + masterArrayCopy);
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        if (masterArrayCopy.includes(userCombi[i])) {
            coincidencias.push(i);

            masterArrayCopy.splice(masterArrayCopy.indexOf(userCombi[i]), 1);
        }
    }
    if (coincidencias.length == 0) {
        coincidencias.push(-1);
    }
    return coincidencias;
}

function mostrarResultadoCirculos(aciertos, coincidencias) {
    let fila = document.getElementById("turno" + intento);
    let arrayCercles = fila.getElementsByClassName("cercleResult");
    console.log("Hay " + coincidencias.length + " coincidencias");
    for (let i = 0; i < arrayCercles.length; i++) {    
        if (aciertos.includes(i)) {
            arrayCercles[i].style.backgroundColor = BLACK;
        } else if (coincidencias.includes(i)) {
            arrayCercles[i].style.backgroundColor = WHITE;
        }
    }
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        if (!(aciertos.includes(i)) && !(coincidencias.includes(i)) && !(coincidencias.includes(-1))) {
            arrayCercles[i].style.backgroundColor = GREY;
        }
    }
}


/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
    if (userCombi.length < MAX_COMBI_COLORES) {
        userCombi.push(color);
    }
    else {
        alert("No puedes introducir más colores");
    }
    document.getElementById("combiText").value = userCombi;
}


/** Template con el código HTML que corresponde a cada fila de juego/intento. */
const ROW_RESULT = `<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
    </div>
    <div class="rowCercleResult w25 flex wrap center">
       <div class="w40 h40">
            <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
    <div>
</div>`;