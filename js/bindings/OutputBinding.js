import 'Shiny';

class MesaOutputBinding extends Shiny.OutputBinding {
  constructor(component, selector) {
    super();
    this.component = component;
  }

  initializeComponent(props) {
    this.componentInstance = new this.component({
      target: document.getElementById(`${props.id}-container`),
      props: props,
      hydrate: true,
    });
  }

  find(scope) {
    return document.querySelectorAll(selector);
  }

  renderValue(el, data) {
    this.componentInstance.$set(data);
  }
}

// we can probably simplify here
// we most likely only need one binding
// and then initMesaComponent can just take an id (or just props, which includes the id)
// we could even simplify the class above by hard-coding the selector since
//   we'll only use 1 binding
// and we could remove the component from the constructor
// if we use more than one component, we could pass that in with initMesaComponent
export function registerMesaComponent(component, selector, outputName) {
  const Binding = new MesaOutputBinding(component, selector);
  Shiny.outputBindings.register(Binding, outputName);
  window.mesa.bindings.push({
    outputName: outputName,
    Binding: Binding,
  });
}

export function initMesaComponent(outputName, props) {
  Binding = window.mesa.bindings.find(
    (binding) => binding.outputName === outputName,
  )['Binding'];
  Binding.initializeComponent(props);
}

// export function mesaOutput(props, component, selector, outputName) {
//   const MesaOutputBinding = new (class extends Shiny.OutputBinding {
//     constructor() {
//       super();
//       this.component = component;
//       this.componentInstance = new this.component({
//         target: document.getElementById(`${props.id}-container`),
//         props: props,
//         hydrate: true,
//       });
//     }

//     find(scope) {
//       // return scope.querySelectorAll(selector);
//       return document.querySelectorAll(selector)
//     }

//     renderValue(el, data) {
//       this.componentInstance.$set(data);
//     }
//   })();

//   Shiny.outputBindings.register(MesaOutputBinding, outputName);
// }
