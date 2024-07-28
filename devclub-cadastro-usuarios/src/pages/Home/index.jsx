import { useEffect, useState, useRef, useRouter } from "react";

import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState([]);
  const [idade, setIdade] = useState([]);
  const [email, setEmail] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);

    // const usersFromApi = await axios.get("https://jsonplaceholder.typicode.com/users");
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers();
  }

  // async function updateUsers(id) {
  //   const updateUsersFromApi = await api.get("/usuarios");
  //   console.log(updateUsersFromApi);
  // }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form action="">
        <h1> Cadastro de usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input placeholder="Idade" name="idade" type="number" ref={inputAge} />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          ref={inputEmail}
        />
        <button type="button">
          Cadastrar
        </button>
      </form>
      {users.map((user) => (
        <div
          key={user.id}
          className="card"
          onClick={() => updateUsers(user.id)}
        >
          <div>
            <p>
              Nome:<span>{user.name}</span>
            </p>
            <p>
              Idade:<span>{user.age} anos</span>
            </p>
            <p>
              E-mail:<span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
