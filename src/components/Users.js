import { useRef } from "react";
import useStore from "../zustand/useStore";

import { v4 as uuidv4 } from 'uuid';

import { getRandomId, sortUsers } from "./random";

import medal1 from "../img/medal1.png";
import medal2 from "../img/medal2.png";
import medal3 from "../img/medal3.png";

function Users() {
  const users = useStore((state) => state.users);
  const addUser = useStore((state) => state.addUser);
  const removeUser = useStore((state) => state.removeUser);
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const resetPoints = useStore((state) => state.resetPoints);
  const myRef = useRef("");

  const handleAddUser = (event) => {
    event.preventDefault();
    const newUser = { name: myRef.current.value, points: 0, id: uuidv4() };
    addUser(newUser);
    myRef.current.value = "";
  };
  const handleRemoveUser = (event) => {
    event.preventDefault();
    const removeId = event.target.name;
    removeUser(removeId);
  };


  const setUser = (event) => {
    event.preventDefault();
    // console.log(users);
    let temp = event.target.name;
    // console.log(event.target);

    // if (temp.slice(-1) === "=") {
    //   temp = temp.slice(0, -6);
    // } else {
    //   temp = temp.slice(0, -3);
    // }
    const tempUser = users.find((user) => user.id == temp);
    // console.log(users)
    // console.log(tempUser)
    setCurrentUser(tempUser);
    resetPoints();
    // localStorage.setItem("users", JSON.stringify(users));
  };
  return (
    <div>
      <p className="alert alert-danger h3">USERS:</p>
      {users.sort(sortUsers).map((user) => (
        <p key={getRandomId()}>
          {users[0] === user && <img src={medal1} alt={'gold medal'}/>}
          {users[1] === user && <img src={medal2} alt={'silver medal'}/>}
          {users[2] === user && <img src={medal3} alt={'bronze medal'}/>}
          <button
            className="btn btn-warning m-1"
            onClick={setUser}
            name={user.id}
          >
            {user.id === currentUser && "==>"}
            {user.name}({user.points}){user.id === currentUser && "<=="}
          </button>
          <button
            className="btn btn-danger m-1 btn-sm"
            onClick={handleRemoveUser}
            name={user.id}
          >
            X
          </button>
        </p>
      ))}
      <br />
      <input
    className="form-control mt-3"
    ref={myRef}
    // val={myRef.current.value}
    placeholder="type your Name"
    type="text"
    />
      <button className="btn btn-info m-1" onClick={handleAddUser}>
        Add USER
      </button>
    </div>
  );
}

export default Users;
