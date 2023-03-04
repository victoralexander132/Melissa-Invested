
const listUsers = async () => {
    try {

        const response = await fetch('../../users.json');
        const users = await response.json();
      
      console.log(users)

     let content = ``;
      users.forEach((user, index) => {
        content += ` <tr> 
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.Prestamos[0].id}</td>
        <td>${user.Prestamos[0].monto}</td>
        <td>${user.Prestamos[0].interes}</td>
        <td>${user.Prestamos[0].fecha}</td>
        <td>${actualizarPago()}</td>
        <td>${actualizarPago()}</td>
        <td>${actualizarPago()}</td>
        <td>${actualizarPago()}</td>
        <td></td>
        <td><button class="btn btn-danger solicitarBtn" type="button">Eliminar</button></td>
 `;
      });

      //


      const $tbody = document.getElementById("tableBody_users");
      $tbody.innerHTML = content ;
  
    } catch (ex) {
      alert(ex);
    }
  };


  function actualizarPago (){
    return `
    <select class="form-select" aria-label="Default select example">
    <option selected value="1">Pendiente</option>
    <option value="2">Pagado</option>
  </select>
    `

  };


  window.addEventListener("load", async () => {
    await listUsers();
  });

  const newClientButton = document.getElementById("newClientButton");

  newClientButton.addEventListener("click", () => {
    window.location.href = "./formularioNuevos.html";
  });
  


  