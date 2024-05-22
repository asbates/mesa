export const registerMesaData = (msg) => {
  const tableIsRegistered =
    window.mesa.tableRegistry.filter((table) => table.id === msg.id).length > 0
      ? true
      : false;

  if (!tableIsRegistered) {
    window.mesa.tableRegistry.push({ id: msg.id, url: msg.url });
    return;
  }

  window.mesa.tableRegistry.forEach((table) => {
    if (table.id === msg.id) {
      table.url = msg.url;
      return table;
    } else {
      return table;
    }
  });
};
