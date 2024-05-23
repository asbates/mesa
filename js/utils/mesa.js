export const initMesaComponent = (props) => {
  Binding = window.mesa.ShinyBinding;
  Binding.initializeComponent(props);
};

export const registerMesaTable = (id, instance) => {
  const tableIsRegistered =
    window.mesa.tableRegistry.filter((table) => table.id === id).length > 0
      ? true
      : false;

  if (!tableIsRegistered) {
    window.mesa.tableRegistry.push({ id: msg.id, instance: instance });
    return;
  }

  window.mesa.tableRegistry.forEach((table) => {
    if (table.id === id) {
      table.instance = instance;
      return table;
    } else {
      return table;
    }
  });
};

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
