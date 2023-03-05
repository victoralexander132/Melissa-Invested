const listUsers = async () => {
  try {
    const responsePrestamos = await fetch("../../prestamos.json");
    const prestamos = await responsePrestamos.json();

    const response = await fetch("../../users.json");
    const users = await response.json();

    console.log(prestamos.prestamos);
    console.log(prestamos.prestamos[0].idusuario);
    console.log(users[0].name);


    let content = ``;
    prestamos.prestamos.forEach(prestamo => {
      content +=`
      <tr>
      <td>${prestamo.id}</td>
      <td>${users[prestamo.idusuario-1].name}</td>
      <td>${prestamo.monto}</td>
      <td>${prestamo.interes}</td>
      <td>${actualizarPago()}</td>
      <td>${actualizarPago()}</td>
      <td>${actualizarPago()}</td>
      <td>${actualizarPago()}</td>
      <td>${prestamo.fecha}</td>
      <td><button  class="btn btn-danger solicitarBtn" type="button">Eliminar</button></td>
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
