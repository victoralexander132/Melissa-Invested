const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (localStorage.getItem("users") === null) {
  //fetch users.json file into users variable
  fetch("../../users.json")
    .then((response) => response.json())
    .then((users) => {
      //se introdujo JSON al localStorage
      localStorage.setItem("users", JSON.stringify(users));
    });
} else {
  var users = JSON.parse(localStorage.getItem("users"));
}

if (localStorage.getItem("prestamos") === null) {
  //fetch users.json file into users variable
  fetch("../../prestamos.json")
    .then((response) => response.json())
    .then((prestamos) => {
      console.log(prestamos)
      localStorage.setItem("prestamos", JSON.stringify(prestamos.prestamos));
    });
} else {
  var prestamos = JSON.parse(localStorage.getItem("prestamos"));
}

let user = users[id - 1];

const idprestamo = parseInt(localStorage.getItem("nuevoidPrestamo"));

const $name = document.getElementById("name");
const $email = document.getElementById("email");
const $phone = document.getElementById("phone");
const $cp = document.getElementById("cp");
const $idprestamo = document.getElementById("prestamoid");
const btnregistrar = document.getElementById("btnregistrar");

btnregistrar.addEventListener("click", registro)

function registro (){
  let prestamosstr = localStorage.getItem("prestamos")
  let prestamos = JSON.parse(prestamosstr)
localStorage.setItem("nuevoidPrestamo",idprestamo+1)
let montonuevo = document.getElementById("monto").value
 

let nuevoPrestamo = {
  id: parseInt(idprestamo),
  idusuario: parseInt(id) ,
  monto: parseInt(montonuevo),
  interes: .2,
  Pagos: [
          {Pagado: false},
          {Pagado: false},
          {Pagado: false},
          {Pagado: false}
  ]
}

prestamos.push(nuevoPrestamo)
localStorage.setItem("prestamos", JSON.stringify(prestamos))
location.href="../../prestamos.html"




}






$name.value = user.name;
$email.value = user.email;
$phone.value = user.phone;
$cp.value = user.CP;
$idprestamo.value = idprestamo;

