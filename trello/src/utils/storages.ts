export async function setToLocalStorage(key: string, data: any): Promise<void> {
  window.localStorage.setItem(key, data);
}

export function getFromLocalStorage(key: string): string | null {
  return window.localStorage.getItem(key);
}

export function clearLocalStorage(): void {
  window.localStorage.clear();
}
