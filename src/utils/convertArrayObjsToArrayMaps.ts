export default function convertArrayObjsToArrayMaps(arr: any) {
    const maps = arr.map((item: any) => {
      console.log(item);
      const map = new Map();
      const id = Object.keys(item)[0];
      const data = item[id];
      return map.set(Number(id), data);
    });
    console.log(maps);
    return maps;
  }