
const listUsers = () => {
  try { 
    if (localStorage.getItem("users")===null){
      //fetch users.json file into users variable
      fetch('../../users.json')
      .then(response => response.json())
      .then(users => {
          localStorage.setItem("users", JSON.stringify(users));
        });
      } else{
            var users = JSON.parse(localStorage.getItem("users"));
          }
              

    let content = ``;
    users.forEach((user, index) => {
      content += `<tr> 
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.CP}</td>
        <td></td>
        <td></td>
        <td><button  class="btn btn-primary solicitarBtn" type="button">Solicitar préstamo</button></td>
      </tr>`;
    });


    const $tbody = document.getElementById("tableBody_users");
    $tbody.innerHTML = content;

    const buttons = document.querySelectorAll('.solicitarBtn');
    buttons.forEach((button) => {
      button.addEventListener('click', solicitarPrestamo);
    });
  
  } catch (ex) {
    alert(ex);
  }
};

const solicitarPrestamo = function(e) {
  let id = e.target.parentNode.parentNode.cells[0].textContent;
  window.location.href=`../../formularioClientes.html?id=${id}`
};



window.addEventListener("load", async () => {
  await listUsers();
  
 
});




