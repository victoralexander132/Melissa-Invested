window.addEventListener("load", async () => {
  await checkLocalStorage();
  await listUsers();
  handleSolicitarPrestamo();
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

async function listUsers() {
  const users = JSON.parse(localStorage.getItem("users"));
  let content = ``;
  users.forEach((user) => {
    content += `
  <tr> 
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.phone}</td>
    <td>${user.CP}</td>
    <td>${handleActualizarStatus(user)}</td>
    <td><button  class="btn btn-primary solicitarBtn" type="button">Solicitar préstamo</button></td>
  </tr>
  `;
  });

  const $tbody = document.getElementById("tableBody_users");
  $tbody.innerHTML = content;
}

function handleSolicitarPrestamo() {
  const buttons = document.querySelectorAll(".solicitarBtn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let id = e.target.parentNode.parentNode.cells[0].textContent;
      window.location.href = `../../formularioClientes.html?id=${id}`;
    });
  });
}

function handleActualizarStatus(user) {
  let prestamos = JSON.parse(localStorage.getItem("prestamos"));
  let content = ``;
  
  let prestamosUsuario = prestamos.filter((prestamo) => prestamo.idusuario == user.id);
  
  prestamosUsuario.forEach((prestamo) => {
    let idPrestamo = prestamo.id;

    if (isActive(idPrestamo)) {
      content += `Activo`;
    } else {
      content += `Inactivo`;
    }
  });

  if (content.includes("Activo")) {
    return `<span class="badge bg-success">Activo</span>`;
  } else {
    return `<span class="badge bg-danger">Inactivo</span>`;
  }
}

function isActive(idPrestamo) {
  let prestamos = JSON.parse(localStorage.getItem("prestamos"));
  let prestamo = prestamos.find((prestamo) => prestamo.id == idPrestamo);
  let status = (prestamo.Pagos[0].Pagado && prestamo.Pagos[1].Pagado && prestamo.Pagos[2].Pagado && prestamo.Pagos[3].Pagado);
  if (status) {
    return false;
  } else {
    return true;
  }
}