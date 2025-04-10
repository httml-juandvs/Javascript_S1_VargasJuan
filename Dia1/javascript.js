console.log("###############################");
console.log("#### Bienvenido a Campulands ####");
console.log("#### 1. Iniciar como Camper ####");
console.log("#### 2. Iniciar como Trainer ###");
console.log("#### 3. Iniciar como Coordinador #");
console.log("###############################");

alert("Bienvenido a Campulands");
let opcion = prompt("Selecciona una opción (1.Camper.  2.Trainer.   3.Coordinador):");

switch(opcion) {
  case '1':
    alert("Has iniciado como Camper.");
    
    break;
  case '2':
    alert("Has iniciado como Trainer.");
    break;
  case '3':
    alert("Has iniciado como Coordinador.");
    break;
  default:
    alert("Opción no válida.");
}

// Elaborado por Juan David Vargas Soto T.I: 1907499083