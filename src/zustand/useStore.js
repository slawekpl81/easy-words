import create from "zustand";

import { getRandomInd } from "../components/random";

// function uniqueUsers(users, user) {
//   if (users.includes(user)) {
//     return [...user];
//   } else {
//     return [...users, user];
//   }
// }

function getFromStorage() {
  try {
    // const tempUsers = JSON.parse(localStorage.getItem("users"));
    const tempUsers = JSON.parse(localStorage.users);
    console.log(tempUsers);
    return tempUsers;
  } catch (error) {
    return [];
  }
}

const useStore = create((set) => ({
  users: [],
  addUser: (newUser) => set((state) => ({ users: [...state.users, newUser] })),
  removeUser: (id) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
  loadUsers: () => set({ users: getFromStorage() }),
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user.id }),
  points: 0,
  resetPoints: () => set((state) => ({ points: 0 })),
  incPoints: () =>
    set((state) => ({
      points: state.points + 1,
      users: state.users.map((user) =>
        user.id === state.currentUser
          ? { ...user, points: user.points + 1 }
          : user
      ),
    })),
  decPoints: () =>
    set((state) => ({
      points: state.points - 1,
      users: state.users.map((user) =>
        user.id === state.currentUser
          ? { ...user, points: user.points - 1 }
          : user
      ),
    })),
  answer: 0,
  correctAnswer: () => set({ answer: true }),
  wrongAnswer: () => set({ answer: false }),
  resetAnswer: () => set({ answer: 0 }),
  id: getRandomInd(),
  setNextId: (newId) => set({ id: newId }),
}));

export default useStore;
