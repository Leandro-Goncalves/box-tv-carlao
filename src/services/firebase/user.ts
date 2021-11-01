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

export type User = {
  id?: string;
  name: string;
  months: Array<string>;
  isRented: boolean;
  info: string;
  value: number;
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
