window.addEventListener("load", async () => {
  await checkLocalStorage();
  await listPrestamos();
  handleSelectStatus();
  handleDisabled();
  handleEliminarPrestamo();
  handleNuevoPrestamo();
});

async function checkLocalStorage() {
  if (localStorage.getItem("users") === null) {
    const response = await fetch("../../users.json");
    const users = await response.json();
    localStorage.setItem("users", JSON.stringify(users));
  }
  if (localStorage.getItem("prestamos") === null) {
    const response = await fetch("../../prestamos.json");
    const prestamos = await response.json();
    localStorage.setItem("prestamos", JSON.stringify(prestamos.prestamos));
  }
  if (localStorage.getItem("nuevoidPrestamo") === null) {
    localStorage.setItem("nuevoidPrestamo", 15);
  }
  if (localStorage.getItem("nuevoidCliente") === null) {
    localStorage.setItem("nuevoidCliente", 11);
  }
}

async function listPrestamos() {
  const prestamos = JSON.parse(localStorage.getItem("prestamos"));
  const users = JSON.parse(localStorage.getItem("users"));

  let content = ``;
  prestamos.forEach((prestamo) => {
    content += `
    <tr>
    <td>${prestamo.id}</td>
    <td>${users[prestamo.idusuario - 1].name}</td>
    <td>${"$ " + prestamo.monto}</td>
    <td>${prestamo.interes + "%"}</td>
    <td>${handleSelectStatus(prestamo.Pagos[0].Pagado)}</td>
    <td>${handleSelectStatus(prestamo.Pagos[1].Pagado)}</td>
    <td>${handleSelectStatus(prestamo.Pagos[2].Pagado)}</td>
    <td>${handleSelectStatus(prestamo.Pagos[3].Pagado)}</td>
    <td>${"$ " + (prestamo.monto + (prestamo.monto*prestamo.interes*.01))}</td>
    <td><button  class="btn btn-danger solicitarBtneliminar" type="button">Eliminar</button></td>
    </tr>
    `;
  });

  const $tbody = document.getElementById("tableBody_users");
  $tbody.innerHTML = content;
}

function handleSelectStatus(status) {
  let content = '';
  content +=
  `
    <select class="form-select" aria-label="Default select example">
    <option ${status?'':'selected'} value="1">Pendiente</option>
    <option ${status?'selected':''} value="2">Pagado</option>
    </select>
  `;
  return content;
}

function handleDisabled(){
  const selectStatus = document.querySelectorAll(".form-select");
  selectStatus.forEach((select, indexSelect) => {
    console.log(select.value);
    if (select.value == "2") {
      select.disabled = true;
    }
    select.addEventListener("change", (e) => {
      if (confirm("Estás seguro de realizar este cambio?")) {
        let prestamos = JSON.parse(localStorage.getItem("prestamos"));
        let id = e.target.parentNode.parentNode.cells[0].textContent;
        let index = prestamos.findIndex((prestamo) => prestamo.id == id);
        prestamos[index].Pagos[indexSelect%4].Pagado = select.value=='2';
        localStorage.setItem("prestamos", JSON.stringify(prestamos));
        select.disabled = true;
      } else {
        select.value = "1";
      }
    });
  });
}

function handleEliminarPrestamo() {
  const eliminarBotones = document.querySelectorAll(".solicitarBtneliminar");
  eliminarBotones.forEach((button) => {
    button.addEventListener("click", (e) => {
      let id = e.target.parentNode.parentNode.cells[0].textContent;
      let prestamos = JSON.parse(localStorage.getItem("prestamos"));
      prestamos = prestamos.filter((prestamo) => prestamo.id != id);
      localStorage.setItem("prestamos", JSON.stringify(prestamos));
      location.reload();
    });
  });
}

function handleNuevoPrestamo() {
  const newClientButton = document.getElementById("newClientButton");
  newClientButton.addEventListener("click", () => {
  window.location.href = "./formularioNuevos.html";
});
}
