
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
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.CP}</td>
        <td></td>
        <td> <input class="btn btn-primary" type="button" value="Solicitar préstamo"> </td>
         </tr> `;
      });
  //Acceder al tbody usando el DOM
      const $tbody = document.getElementById("tableBody_users");
      $tbody.innerHTML = content ;
  
    } catch (ex) {
      alert(ex);
    }
  };
  
  window.addEventListener("load", async () => {
    await listUsers();
  });