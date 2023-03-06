const listUsers = async () => {
  try {
    if (localStorage.getItem("users") === null) {
      //fetch users.json file into users variable
      fetch("../../users.json")
        .then((response) => response.json())
        .then((users) => {
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
          localStorage.setItem("prestamos", JSON.stringify(prestamos.prestamos));
        });
    } else {
      var prestamos = JSON.parse(localStorage.getItem("prestamos"));
    }


    let content = ``;
    prestamos.forEach((prestamo) => {
      content += `
      <tr>
      <td>${prestamo.id}</td>
      <td>${users[prestamo.idusuario - 1].name}</td>
      <td>${prestamo.monto}</td>
      <td>${prestamo.interes}</td>
      <td>${actualizarPago()}</td>
      <td>${actualizarPago()}</td>
      <td>${actualizarPago()}</td>
      <td>${actualizarPago()}</td>
      <td></td>
      <td><button  class="btn btn-danger solicitarBtneliminar" type="button">Eliminar</button></td>
      </tr>
      `;
    });

    const $tbody = document.getElementById("tableBody_users");
    $tbody.innerHTML = content;
  } catch (ex) {
    alert(ex);
  }
};

function actualizarPago() {
  return `
    <select class="form-select" aria-label="Default select example">
    <option selected value="1">Pendiente</option>
    <option value="2">Pagado</option>
  </select>
    `;
}

window.addEventListener("load", async () => {
  await listUsers();

  const eliminarBotones = document.querySelectorAll(".solicitarBtneliminar");
  eliminarBotones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const prestamos = JSON.parse(localStorage.getItem("prestamos"));

      let idPrestamo = e.target.parentNode.parentNode.cells[0].textContent;
      let newPrestamos = prestamos.filter((prestamo) => {
        return prestamo.id != idPrestamo;
      });

      localStorage.setItem("prestamos", JSON.stringify(newPrestamos));
 
 
      location.reload()
    });
  });
});

const newClientButton = document.getElementById("newClientButton");

newClientButton.addEventListener("click", () => {
  window.location.href = "./formularioNuevos.html";
});

//prueb

/*var fechctul= new Date();
  var Die = fechctul.getDate();
  var Mes = fechctul.getMonth()+1;
  var nio = fechctul.getFullYear();

  console.log(Die + '/' + Mes +"/" + nio);*/

//buscarparent
