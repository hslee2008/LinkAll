export default function checkTeacher(email: string): Boolean {
  const admins = [
    "h.junho420@gmail.com",
    "hyunseunglee2008@gmail.com",
    "yundozero@gmail.com",
    "yjong2007@gmail.com",
  ];
  return admins.indexOf(email) !== -1;
}
