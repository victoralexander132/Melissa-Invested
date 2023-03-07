window.addEventListener("load", async () => {
  handleRegresar();
  listIDPrestamo();
  handleRegistrar();
}
);



function handleRegresar() {
  const $button = document.getElementById("botonredirect");
  $button.addEventListener("click", () => {
    window.location.href = "../../index.html";
  });
}

function listIDPrestamo() {
  const $idPrestamo = document.getElementById("prestamoid");
  $idPrestamo.value = localStorage.getItem("nuevoidPrestamo");
}

function handleRegistrar() {
  let btnRegistrar = document.getElementById("btnregistrar");
  btnRegistrar.addEventListener("click", (e) => {
    let prestamosstr = localStorage.getItem("prestamos");
    let prestamos = JSON.parse(prestamosstr);

    let usersstr = localStorage.getItem("users");
    let users = JSON.parse(usersstr);

    let $name = document.getElementById("name").value;
    let $email = document.getElementById("email").value;
    let $phone = document.getElementById("phone").value;
    let $CP = document.getElementById("cp").value;

    let $monto = parseInt(document.getElementById("monto").value);
    let $interes = parseInt(document.getElementById("interes").value);

    let newMonto = ($monto * $interes * .01) + $monto;

    let idprestamo = parseInt(localStorage.getItem("nuevoidPrestamo"));
    let idCliente = parseInt(localStorage.getItem("nuevoidCliente"));

    let newCliente = {
      id: idCliente,
      name: $name,
      email: $email,
      phone: $phone,
      CP: $CP,
    };

    let nuevoPrestamo = {
      id: idprestamo,
      idusuario: idCliente,
      monto: newMonto,
      interes: $interes,
      Pagos: [
        { Pagado: false },
        { Pagado: false },
        { Pagado: false },
        { Pagado: false },
      ],
    };

    localStorage.setItem("nuevoidCliente", idCliente + 1);
    localStorage.setItem("nuevoidPrestamo", idprestamo + 1);

    users.push(newCliente);
    localStorage.setItem("users", JSON.stringify(users));

    prestamos.push(nuevoPrestamo);
    localStorage.setItem("prestamos", JSON.stringify(prestamos));

    Swal.fire({
      title: 'Registro exitoso',
      icon: 'success'
    });
    e.preventDefault();

    setTimeout(function () {
      location.href = "../../prestamos.html";
    }, 2800);


  });

}
