export default function sortByOrderAndConvertToObject(data: any): any {
  const sortedKeys = Object.keys(data).sort(
    (a, b) => data[a].order - data[b].order
  );
  const sortedData: any = {};
  sortedKeys.forEach((key: string) => {
    sortedData[key] = data[key];
  });
  return sortedData;
}
