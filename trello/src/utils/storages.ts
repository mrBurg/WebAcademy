export async function setToLocalStorage(key: string, data: any) {
  window.localStorage.setItem(key, data);
}

export function getFromLocalStorage(key: string) {
  return window.localStorage.getItem(key);
}
