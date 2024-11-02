function addUser(event) {
  event.preventDefault();

  const userId = document.getElementById("userId").value;
  let userName = document.querySelector("input[name='name']").value;
  let userEmail = document.querySelector("input[name='email']").value;
  let userPhone = document.querySelector("input[name='phone']").value;
  let userAddress = document.querySelector("input[name='address']").value;
  let userCity = document.querySelector("input[name='city']").value;
  let userWork = document.querySelector("select[name='work_option']").value;
  let userTravel = document.querySelector("input[name='travel']").checked;

  let users = getUsersFromStorage();

  if (userId) {
    // Atualizando usuário existente
    users = users.map((user) =>
      user.id === parseInt(userId)
        ? {
            id: parseInt(userId),
            userName,
            userEmail,
            userPhone,
            userAddress,
            userCity,
            userWork,
            userTravel,
          }
        : user
    );
  } else {
    if (validation(userName, userAddress, userCity, userPhone, userEmail)) {
      const newUser = {
        id: Date.now(),
        userName,
        userEmail,
        userPhone,
        userAddress,
        userCity,
        userWork,
        userTravel,
      };
      users.push(newUser);
    }
  }

  localStorage.setItem("users", JSON.stringify(users));

  //   console.log(users);
  resetForm();
  renderUsers();
  // validation();
}

// Função para obter os usuários armazenados no localStorage
function getUsersFromStorage() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

// Função para exibir os usuários na tabela
function renderUsers() {
  const users = getUsersFromStorage();
  const userTableBody = document.getElementById("userTableBody");
  userTableBody.innerHTML = "";

  let sort = document.querySelector("select[name='work_option1']").value;
  let filtrarNome = document.getElementById("search").value.toLowerCase();

  users
    // pesquisa por titulo
    .filter((user) => user.userName.toLowerCase().includes(filtrarNome))

    // ordernar por ascendente ou decendente na ordem alfabetica
    .sort((a, b) =>
      sort === "Cresc"
        ? a.userCity.localeCompare(b.userCity)
        : b.userCity.localeCompare(a.userCity)
    )
    .forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${user.userName}</td>
            <td>${user.userEmail}</td>
            <td>${user.userPhone}</td>
            <td>${user.userAddress}</td>
            <td>${user.userCity}</td>
            <td>${user.userWork}</td>
            <td>${user.userTravel == true ? "sim" : "não"}</td>
            <td>
                <button onclick="editUser(${user.id})">Editar</button>
                <button onclick="deleteUser(${user.id})">Excluir</button>
            </td>
        `;
      userTableBody.appendChild(row);
    });
}

// Função para editar os usuários
function editUser(id) {
  const users = getUsersFromStorage();
  const user = users.find((user) => user.id === id);
  document.getElementById("userId").value = user.id;
  document.querySelector("input[name='name']").value = user.userName;
  document.querySelector("input[name='email']").value = user.userEmail;
  document.querySelector("input[name='phone']").value = user.userPhone;
  document.querySelector("input[name='address']").value = user.userAddress;
  document.querySelector("input[name='city']").value = user.userCity;
  document.querySelector("select[name='work_option']").value = user.userWork;
  document.querySelector("input[name='travel']").checked = user.userTravel;

  document.getElementById("submit").innerText = "Atualizar";
}

// Função para deletar os usuários
function deleteUser(id) {
  let users = getUsersFromStorage();
  users = users.filter((user) => user.id != id);
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
}

// Função para limpar os campos
function resetForm() {
  document.getElementById("userId").value = "";
  document.querySelector("input[name='name']").value = "";
  document.querySelector("input[name='email']").value = "";
  document.querySelector("input[name='phone']").value = "";
  document.querySelector("input[name='address']").value = "";
  document.querySelector("input[name='city']").value = "";
  //   document.querySelector("select[name='work_option']").value = false;
  document.querySelector("input[name='travel']").checked = "";

  document.getElementById("submit").innerText = "Cadastrar";
}

function validation(userName, userEmail, userAddress, userCity, userPhone) {
  let msg = "";
  if (userName == "") {
    msg += "Informe o nome do usúario \n";
  }
  if (userEmail == "") {
    msg += "Informe o email do usúario \n";
  }
  if (userPhone == "") {
    msg += "Informe o telefone do usúario \n";
  }
  if (userAddress == "") {
    msg += "Informe o endereço do usúario \n";
  }
  if (userCity == "") {
    msg += "Informe a cidade do usúario \n";
  }

  if (msg != "") {
    alert(msg);
    return false;
  }
  return true;
}

document.getElementById("userForm").addEventListener("submit", addUser);
document.addEventListener("DOMContentLoaded", renderUsers);
