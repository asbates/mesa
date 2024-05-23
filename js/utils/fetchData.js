export const fetchDataPagination = async (id, pagination) => {
  const url = window.mesa.tableRegistry.find((table) => table.id === id).url;
  const response = await fetch(`${url}?pageIndex=${pagination.pageIndex}`);
  const data = await response.json();
  return data;
};

export const fetchDataInfiniteScroll = async (id, { pageParam }) => {
  const url = window.mesa.tableRegistry.find((table) => table.id === id).url;
  const response = await fetch(`${url}?cursor=${pageParam}`);
  const data = await response.json();
  return data;
};
