// import { mesaClient } from "./bindings/ClientBinding";
// import { mesa } from "";

// import the binding
// then in here do Shiny.registerInputBinding(thebinding, 'thebindingname')

// rather, import the function from mesaoutputbinding
// should the function name be something like registerBinding(name, component)?

import 'Shiny';
import Mesa from './components/Mesa.svelte';
import {
  registerMesaComponent,
  initMesaComponent,
} from './bindings/OutputBinding';
import { registerMesaData } from './message-handlers';

window.mesa = {
  initMesaComponent: initMesaComponent,
  // tables: [], // {id: 'html id for the table', sessionUrl: 'url for the session, if using ssr', instance: 'the table instance'}
  tableRegistry: [],
  // 'components' is probably not needed
  // b/c in mesaOutput(), we have to call the correct component, but we
  // don't know yet if we'll need client rendered, server rendered, etc.
  // so we never call the component directly from this 'components' object
  components: {
    Mesa: Mesa,
  }, // 'Client', 'ClientPagination', 'ServerPagination', 'ServerInfScroll', etc.
  // most likely don't actually need this
  // or at least can simplify it
  bindings: [], // {outputName: 'name', binding: 'the class'}
};

registerMesaComponent(
  (component = Mesa),
  (selector = '.mesa'),
  (outputName = 'Mesa'),
);

Shiny.addCustomMessageHandler('registerMesaData', registerMesaData);
