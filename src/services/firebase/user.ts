import db from "../../firebase";
import {
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

type Months = {
  value: string;
};

export type User = {
  id?: string;
  name: string;
  years: Array<{ id: number; months: Months[] }>;
  isRented: boolean;
  info: string;
  value: number;
};

export const currentYear = Number(localStorage.getItem("currentYear")) || 2021;

export const currentYearIndex = (
  years: Array<{ id: number; months: Months[] }>
): { id?: number; months?: Months[] } => {
  const yearsIndex = years.find((y) => y.id === currentYear);
  return yearsIndex || {};
};

const sortFunction = (a: User, b: User) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
};

const usersRef = collection(db, "users");
const UserService = {
  getUsers(callback: (users: User[]) => void) {
    onSnapshot(query(usersRef, orderBy("name", "asc")), (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      callback(users.sort(sortFunction));
    });
  },
  async addUser(user: User) {
    await addDoc(usersRef, user);
  },
  async removeUser(id: string) {
    await deleteDoc(doc(db, "users", id));
  },
  async editUser(id: string, user: User) {
    await updateDoc(doc(db, "users", id), user);
  },
};

export const { getUsers, addUser, removeUser, editUser } = UserService;
