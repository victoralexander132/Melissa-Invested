window.addEventListener("load", function () {
  listClientDetails();
  handleRegistrarPrestamo();
});

function listClientDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const users = JSON.parse(localStorage.getItem("users"));
  let user = users[id - 1];
  const idprestamo = parseInt(localStorage.getItem("nuevoidPrestamo"));
  const $name = document.getElementById("name");
  const $email = document.getElementById("email");
  const $phone = document.getElementById("phone");
  const $cp = document.getElementById("cp");
  const $idprestamo = document.getElementById("prestamoid");
  const $monto = document.getElementById("monto");
  $monto.addEventListener("keyup", function () {
    const $total = document.getElementById("total");
    let monto = parseInt($monto.value);
    let interes = 0.2;
    $total.value = monto + monto * interes;
  });

  $name.value = user.name;
  $email.value = user.email;
  $phone.value = user.phone;
  $cp.value = user.CP;
  $idprestamo.value = idprestamo;

}

function validateFields() {
  const monto = document.getElementById("monto").value;
  const interes = document.getElementById("interes").value;

  // Verificar si los valores son válidos
  if (monto && interes) {
    Swal.fire({
      title: 'Registro exitoso',
      icon: 'success'
    })
    return true;
  }

  return false;

}

function handleRegistrarPrestamo() {

  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  const idprestamo = parseInt(localStorage.getItem("nuevoidPrestamo"));
  const btnregistrar = document.getElementById("btnregistrar");
  btnregistrar.addEventListener("click", () => {

    if (validateFields()) {
      let prestamosstr = localStorage.getItem("prestamos");
      let prestamos = JSON.parse(prestamosstr);
      localStorage.setItem("nuevoidPrestamo", idprestamo + 1);
      let montonuevo = document.getElementById("monto").value;
      let newMonto = parseInt(montonuevo) + parseInt(montonuevo) * 0.2;
      let nuevoPrestamo = {
        id: idprestamo,
        idusuario: id,
        monto: newMonto,
        interes: 0.2,
        Pagos: [
          { Pagado: false },
          { Pagado: false },
          { Pagado: false },
          { Pagado: false },
        ],
      };
      prestamos.push(nuevoPrestamo);
      localStorage.setItem("prestamos", JSON.stringify(prestamos));
      setTimeout(function () {
        location.href = "../../prestamos.html";
      }, 2800);

    } else {
      Swal.fire({
        title: 'Completa  los campos faltantes',
        icon: 'warning'
      })
    }
  });

}
