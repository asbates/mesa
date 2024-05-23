import 'Shiny';
import { MesaOutputBinding } from './bindings/MesaOutputBinding';
import { initMesaComponent, registerMesaData } from './utils/mesa.js';

const Binding = new MesaOutputBinding();
Shiny.outputBindings.register(Binding, 'Mesa');

Shiny.addCustomMessageHandler('registerMesaData', registerMesaData);

window.mesa = {
  initMesaComponent: initMesaComponent,
  tableRegistry: [],
  ShinyBinding: Binding,
};
