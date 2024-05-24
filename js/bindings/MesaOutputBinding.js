import 'Shiny';
import Mesa from '../components/Mesa.svelte';

export class MesaOutputBinding extends Shiny.OutputBinding {
  constructor() {
    super();
    this.component = Mesa;
    this.selector = '.mesa-table';
  }

  initializeComponent(props) {
    this.componentInstance = new this.component({
      target: document.getElementById(`${props.id}-container`),
      props: props,
      hydrate: true,
    });
  }

  find(scope) {
    return document.querySelectorAll(this.selector);
  }

  renderValue(el, data) {
    this.componentInstance.$set(data);
  }
}
