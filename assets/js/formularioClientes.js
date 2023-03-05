const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (localStorage.getItem("users") === null) {
  //fetch users.json file into users variable
  fetch("../../users.json")
    .then((response) => response.json())
    .then((users) => {
      //se introdujo JSON al localStorage
      localStorage.setItem("users", JSON.stringify(users));
    });
} else{
    var users = JSON.parse(localStorage.getItem("users"));
  }

   let user = users[id-1];

  const $name = document.getElementById("name");
  const $email = document.getElementById("email");
  const $phone = document.getElementById("phone");
  const $cp = document.getElementById("cp");
  
  $name.value = user.name;
  $email.value = user.email;
  $phone.value = user.phone;
  $cp.value = user.CP;


  if(localStorage.getItem("idprestamos") === null){



  };
 //variable para guardar los ids
  let idprestamos= 0