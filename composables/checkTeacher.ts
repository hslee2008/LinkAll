import { ref, onValue } from "firebase/database";
import { db } from "../plugins/firebase.ts";

export default async function checkTeacher(email: string): Boolean {
  const isTeacher = false;

  const adminRef = await onValue(
    ref(db, "teachers"),
    (snapshot) => (isTeacher = snapshot.split(",").indexOf(email) !== -1)
  );

  return isTeacher
}
