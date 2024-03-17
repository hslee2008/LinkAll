import { ref, onValue } from "firebase/database";
import { db } from "../plugins/firebase";

export default async function checkTeacher(email: string) {
  let isTeacher = false;

  await onValue(
    ref(db, "teachers"),
    (snapshot) =>
      (isTeacher = snapshot.toString().split(",").indexOf(email) !== -1)
  );

  return isTeacher;
}
