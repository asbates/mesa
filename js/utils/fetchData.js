export const fetchDataInfiniteScroll = async (id, { pageParam }) => {
  const url = window.mesa.tableRegistry.find((table) => table.id === id).url;
  const response = await fetch(`${url}?cursor=${pageParam}`);
  const data = await response.json();
  return data;
};
