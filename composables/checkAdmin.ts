export default function checkAdmin(email: string): Boolean {
  const admins = ["h.junho420@gmail.com", "hyunseunglee2008@gmail.com"];
  return admins.indexOf(email) !== -1;
}
