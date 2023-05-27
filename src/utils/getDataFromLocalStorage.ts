export default function getDataFromLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  return data !== '[]' && data !== null ? JSON.parse(data) : null;
}
