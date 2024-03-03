export default function isAfterOneDay(toCompare: string): boolean {
  const pre = new Date();
  const toCom = new Date(toCompare);

  toCom.setDate(toCom.getDate() + 1);

  return pre >= toCom;
}
