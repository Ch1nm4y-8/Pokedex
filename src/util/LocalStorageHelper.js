export function getIdsFromLocalStorageAsSet() {
  const savedFavorites = localStorage.getItem("favorites");
  return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
}
export function getIdsFromLocalStorageAsArray() {
  const savedFavorites = localStorage.getItem("favorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
}

export function addIdToLocalStorage(id) {
  const ids = getIdsFromLocalStorageAsSet();
  ids.add(id);
  localStorage.setItem("favorites", JSON.stringify(Array.from(ids)));
  return ids;
}

export function removeIdFromLocalStorage(id) {
  const ids = getIdsFromLocalStorageAsSet();
  ids.delete(id);
  localStorage.setItem("favorites", JSON.stringify(Array.from(ids)));
  return ids;
}
