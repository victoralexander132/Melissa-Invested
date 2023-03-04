const solicitarPrestamo = function(e) {
  console.log("Holi Mundo"); 
};



const listUsers = async () => {
  try {
    const response = await fetch('../../users.json');
    const users = await response.json();
  
    console.log(users)

    let content = ``;
    users.forEach((user, index) => {
      content += `<tr> 
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.CP}</td>
        <td></td>
        <td><button onClick="solicitarPrestamo()" class="btn btn-primary solicitarBtn" type="button">Solicitar préstamo</button></td>
      </tr>`;
    });



    const $tbody = document.getElementById("tableBody_users");
    $tbody.innerHTML = content;
  
  } catch (ex) {
    alert(ex);
  }
};



window.addEventListener("load", async () => {
  await listUsers();
  
 
});

