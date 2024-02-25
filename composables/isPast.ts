export default function isPast(toCompare: string): boolean {
  const pre = new Date();
  const toCom = new Date(toCompare);

  return pre >= toCom;
}
