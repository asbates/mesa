(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // globals:Shiny
  var require_Shiny = __commonJS({
    "globals:Shiny"(exports, module) {
      module.exports = window.Shiny;
    }
  });

  // index.js
  var import_Shiny2 = __toESM(require_Shiny(), 1);

  // bindings/MesaOutputBinding.js
  var import_Shiny = __toESM(require_Shiny(), 1);

  // node_modules/svelte/src/runtime/internal/utils.js
  function noop() {
  }
  function assign(tar, src) {
    for (const k in src)
      tar[k] = src[k];
    return (
      /** @type {T & S} */
      tar
    );
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function subscribe(store, ...callbacks) {
    if (store == null) {
      for (const callback of callbacks) {
        callback(void 0);
      }
      return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function get_store_value(store) {
    let value;
    subscribe(store, (_) => value = _)();
    return value;
  }
  function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
  }
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0) {
        return lets;
      }
      if (typeof lets === "object") {
        const merged = [];
        const len = Math.max($$scope.dirty.length, lets.length);
        for (let i = 0; i < len; i += 1) {
          merged[i] = $$scope.dirty[i] | lets[i];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
      slot.p(slot_context, slot_changes);
    }
  }
  function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
      const dirty = [];
      const length = $$scope.ctx.length / 32;
      for (let i = 0; i < length; i++) {
        dirty[i] = -1;
      }
      return dirty;
    }
    return -1;
  }
  function null_to_empty(value) {
    return value == null ? "" : value;
  }
  function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
  }

  // node_modules/svelte/src/runtime/internal/globals.js
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
    // @ts-ignore Node typings have this
    global
  );

  // node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
  var ResizeObserverSingleton = class _ResizeObserverSingleton {
    /**
     * @private
     * @readonly
     * @type {WeakMap<Element, import('./private.js').Listener>}
     */
    _listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
    /**
     * @private
     * @type {ResizeObserver}
     */
    _observer = void 0;
    /** @type {ResizeObserverOptions} */
    options;
    /** @param {ResizeObserverOptions} options */
    constructor(options) {
      this.options = options;
    }
    /**
     * @param {Element} element
     * @param {import('./private.js').Listener} listener
     * @returns {() => void}
     */
    observe(element2, listener) {
      this._listeners.set(element2, listener);
      this._getObserver().observe(element2, this.options);
      return () => {
        this._listeners.delete(element2);
        this._observer.unobserve(element2);
      };
    }
    /**
     * @private
     */
    _getObserver() {
      return this._observer ?? (this._observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          _ResizeObserverSingleton.entries.set(entry.target, entry);
          this._listeners.get(entry.target)?.(entry);
        }
      }));
    }
  };
  ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;

  // node_modules/svelte/src/runtime/internal/dom.js
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function upper_bound(low, high, key, value) {
    while (low < high) {
      const mid = low + (high - low >> 1);
      if (key(mid) <= value) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
  function init_hydrate(target) {
    if (target.hydrate_init)
      return;
    target.hydrate_init = true;
    let children2 = (
      /** @type {ArrayLike<NodeEx2>} */
      target.childNodes
    );
    if (target.nodeName === "HEAD") {
      const my_children = [];
      for (let i = 0; i < children2.length; i++) {
        const node = children2[i];
        if (node.claim_order !== void 0) {
          my_children.push(node);
        }
      }
      children2 = my_children;
    }
    const m = new Int32Array(children2.length + 1);
    const p = new Int32Array(children2.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children2.length; i++) {
      const current = children2[i].claim_order;
      const seq_len = (longest > 0 && children2[m[longest]].claim_order <= current ? longest + 1 : upper_bound(1, longest, (idx) => children2[m[idx]].claim_order, current)) - 1;
      p[i] = m[seq_len] + 1;
      const new_len = seq_len + 1;
      m[new_len] = i;
      longest = Math.max(new_len, longest);
    }
    const lis = [];
    const to_move = [];
    let last = children2.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
      lis.push(children2[cur - 1]);
      for (; last >= cur; last--) {
        to_move.push(children2[last]);
      }
      last--;
    }
    for (; last >= 0; last--) {
      to_move.push(children2[last]);
    }
    lis.reverse();
    to_move.sort((a, b) => a.claim_order - b.claim_order);
    for (let i = 0, j = 0; i < to_move.length; i++) {
      while (j < lis.length && to_move[i].claim_order >= lis[j].claim_order) {
        j++;
      }
      const anchor = j < lis.length ? lis[j] : null;
      target.insertBefore(to_move[i], anchor);
    }
  }
  function append_hydration(target, node) {
    if (is_hydrating) {
      init_hydrate(target);
      if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentNode !== target) {
        target.actual_end_child = target.firstChild;
      }
      while (target.actual_end_child !== null && target.actual_end_child.claim_order === void 0) {
        target.actual_end_child = target.actual_end_child.nextSibling;
      }
      if (node !== target.actual_end_child) {
        if (node.claim_order !== void 0 || node.parentNode !== target) {
          target.insertBefore(node, target.actual_end_child);
        }
      } else {
        target.actual_end_child = node.nextSibling;
      }
    } else if (node.parentNode !== target || node.nextSibling !== null) {
      target.appendChild(node);
    }
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
      append_hydration(target, node);
    } else if (node.parentNode !== target || node.nextSibling != anchor) {
      target.insertBefore(node, anchor || null);
    }
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function get_svelte_dataset(node) {
    return node.dataset.svelteH;
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function init_claim_info(nodes) {
    if (nodes.claim_info === void 0) {
      nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
  }
  function claim_node(nodes, predicate, process_node, create_node, dont_update_last_index = false) {
    init_claim_info(nodes);
    const result_node = (() => {
      for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
        const node = nodes[i];
        if (predicate(node)) {
          const replacement = process_node(node);
          if (replacement === void 0) {
            nodes.splice(i, 1);
          } else {
            nodes[i] = replacement;
          }
          if (!dont_update_last_index) {
            nodes.claim_info.last_index = i;
          }
          return node;
        }
      }
      for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
        const node = nodes[i];
        if (predicate(node)) {
          const replacement = process_node(node);
          if (replacement === void 0) {
            nodes.splice(i, 1);
          } else {
            nodes[i] = replacement;
          }
          if (!dont_update_last_index) {
            nodes.claim_info.last_index = i;
          } else if (replacement === void 0) {
            nodes.claim_info.last_index--;
          }
          return node;
        }
      }
      return create_node();
    })();
    result_node.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return result_node;
  }
  function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(
      nodes,
      /** @returns {node is Element | SVGElement} */
      (node) => node.nodeName === name,
      /** @param {Element} node */
      (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
          const attribute = node.attributes[j];
          if (!attributes[attribute.name]) {
            remove.push(attribute.name);
          }
        }
        remove.forEach((v) => node.removeAttribute(v));
        return void 0;
      },
      () => create_element(name)
    );
  }
  function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, element);
  }
  function claim_text(nodes, data) {
    return claim_node(
      nodes,
      /** @returns {node is Text} */
      (node) => node.nodeType === 3,
      /** @param {Text} node */
      (node) => {
        const data_str = "" + data;
        if (node.data.startsWith(data_str)) {
          if (node.data.length !== data_str.length) {
            return node.splitText(data_str.length);
          }
        } else {
          node.data = data_str;
        }
      },
      () => text(data),
      true
      // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
  }
  function claim_space(nodes) {
    return claim_text(nodes, " ");
  }
  function set_data(text3, data) {
    data = "" + data;
    if (text3.data === data)
      return;
    text3.data = /** @type {string} */
    data;
  }
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach(
      /** @param {Element} node */
      (node) => {
        result[node.slot || "default"] = true;
      }
    );
    return result;
  }
  function construct_svelte_component(component, props) {
    return new component(props);
  }

  // node_modules/svelte/src/runtime/internal/lifecycle.js
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
  }
  function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
  }
  function getContext(key) {
    return get_current_component().$$.context.get(key);
  }

  // node_modules/svelte/src/runtime/internal/scheduler.js
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = /* @__PURE__ */ Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }

  // node_modules/svelte/src/runtime/internal/transitions.js
  var outroing = /* @__PURE__ */ new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
      // parent group
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }

  // node_modules/svelte/src/runtime/internal/each.js
  function ensure_array_like(array_like_or_iterator) {
    return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }

  // node_modules/svelte/src/shared/boolean_attributes.js
  var _boolean_attributes = (
    /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]
  );
  var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);

  // node_modules/svelte/src/runtime/internal/ssr.js
  var ATTR_REGEX = /[&"]/g;
  var CONTENT_REGEX = /[&<]/g;
  function escape(value, is_attr = false) {
    const str = String(value);
    const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
    pattern.lastIndex = 0;
    let escaped = "";
    let last = 0;
    while (pattern.test(str)) {
      const i = pattern.lastIndex - 1;
      const ch = str[i];
      escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
      last = i + 1;
    }
    return escaped + str.substring(last);
  }
  function validate_component(component, name) {
    if (!component || !component.$$render) {
      if (name === "svelte:component")
        name += " this={...}";
      throw new Error(
        `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
      );
    }
    return component;
  }
  var on_destroy;
  function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
      const parent_component = current_component;
      const $$ = {
        on_destroy,
        context: new Map(context || (parent_component ? parent_component.$$.context : [])),
        // these will be immediately discarded
        on_mount: [],
        before_update: [],
        after_update: [],
        callbacks: blank_object()
      };
      set_current_component({ $$ });
      const html = fn(result, props, bindings, slots);
      set_current_component(parent_component);
      return html;
    }
    return {
      render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
        on_destroy = [];
        const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
        const html = $$render(result, props, {}, $$slots, context);
        run_all(on_destroy);
        return {
          html,
          css: {
            code: Array.from(result.css).map((css) => css.code).join("\n"),
            map: null
            // TODO
          },
          head: result.title + result.head
        };
      },
      $$render
    };
  }

  // node_modules/svelte/src/runtime/internal/Component.js
  function create_component(block) {
    block && block.c();
  }
  function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
  }
  function mount_component(component, target, anchor) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance7, create_fragment7, not_equal, props, append_styles = null, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance7 ? instance7(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment7 ? create_fragment7($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /** The Svelte component constructor */
      $$ctor;
      /** Slots */
      $$s;
      /** The Svelte component instance */
      $$c;
      /** Whether or not the custom element is connected */
      $$cn = false;
      /** Component props data */
      $$d = {};
      /** `true` if currently in the process of reflecting component props back to attributes */
      $$r = false;
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      $$p_d = {};
      /** @type {Record<string, Function[]>} Event listeners */
      $$l = {};
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      $$l_u = /* @__PURE__ */ new Map();
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      addEventListener(type, listener, options) {
        this.$$l[type] = this.$$l[type] || [];
        this.$$l[type].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type, listener, options);
      }
      removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      async connectedCallback() {
        this.$$cn = true;
        if (!this.$$c) {
          let create_slot2 = function(name) {
            return () => {
              let node;
              const obj = {
                c: function create() {
                  node = element("slot");
                  if (name !== "default") {
                    attr(node, "name", name);
                  }
                },
                /**
                 * @param {HTMLElement} target
                 * @param {HTMLElement} [anchor]
                 */
                m: function mount(target, anchor) {
                  insert(target, node, anchor);
                },
                d: function destroy(detaching) {
                  if (detaching) {
                    detach(node);
                  }
                }
              };
              return obj;
            };
          };
          await Promise.resolve();
          if (!this.$$cn || this.$$c) {
            return;
          }
          const $$slots = {};
          const existing_slots = get_custom_elements_slots(this);
          for (const name of this.$$s) {
            if (name in existing_slots) {
              $$slots[name] = [create_slot2(name)];
            }
          }
          for (const attribute of this.attributes) {
            const name = this.$$g_p(attribute.name);
            if (!(name in this.$$d)) {
              this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
            }
          }
          for (const key in this.$$p_d) {
            if (!(key in this.$$d) && this[key] !== void 0) {
              this.$$d[key] = this[key];
              delete this[key];
            }
          }
          this.$$c = new this.$$ctor({
            target: this.shadowRoot || this,
            props: {
              ...this.$$d,
              $$slots,
              $$scope: {
                ctx: []
              }
            }
          });
          const reflect_attributes = () => {
            this.$$r = true;
            for (const key in this.$$p_d) {
              this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
              if (this.$$p_d[key].reflect) {
                const attribute_value = get_custom_element_value(
                  key,
                  this.$$d[key],
                  this.$$p_d,
                  "toAttribute"
                );
                if (attribute_value == null) {
                  this.removeAttribute(this.$$p_d[key].attribute || key);
                } else {
                  this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                }
              }
            }
            this.$$r = false;
          };
          this.$$c.$$.after_update.push(reflect_attributes);
          reflect_attributes();
          for (const type in this.$$l) {
            for (const listener of this.$$l[type]) {
              const unsub = this.$$c.$on(type, listener);
              this.$$l_u.set(listener, unsub);
            }
          }
          this.$$l = {};
        }
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      attributeChangedCallback(attr2, _oldValue, newValue) {
        if (this.$$r)
          return;
        attr2 = this.$$g_p(attr2);
        this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
        this.$$c?.$set({ [attr2]: this.$$d[attr2] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn) {
            this.$$c.$destroy();
            this.$$c = void 0;
          }
        });
      }
      $$g_p(attribute_name) {
        return Object.keys(this.$$p_d).find(
          (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop, value, props_definition, transform) {
    const type = props_definition[prop]?.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  var SvelteComponent = class {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$ = void 0;
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$set = void 0;
    /** @returns {void} */
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    /**
     * @template {Extract<keyof Events, string>} K
     * @param {K} type
     * @param {((e: Events[K]) => void) | null | undefined} callback
     * @returns {() => void}
     */
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    /**
     * @param {Partial<Props>} props
     * @returns {void}
     */
    $set(props) {
      if (this.$$set && !is_empty(props)) {
        this.$$.skip_bound = true;
        this.$$set(props);
        this.$$.skip_bound = false;
      }
    }
  };

  // node_modules/svelte/src/shared/version.js
  var PUBLIC_VERSION = "4";

  // node_modules/svelte/src/runtime/internal/disclose-version/index.js
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);

  // node_modules/@tanstack/table-core/build/lib/index.mjs
  function functionalUpdate(updater, input) {
    return typeof updater === "function" ? updater(input) : updater;
  }
  function makeStateUpdater(key, instance7) {
    return (updater) => {
      instance7.setState((old) => {
        return {
          ...old,
          [key]: functionalUpdate(updater, old[key])
        };
      });
    };
  }
  function isFunction(d) {
    return d instanceof Function;
  }
  function isNumberArray(d) {
    return Array.isArray(d) && d.every((val) => typeof val === "number");
  }
  function flattenBy(arr, getChildren) {
    const flat = [];
    const recurse = (subArr) => {
      subArr.forEach((item) => {
        flat.push(item);
        const children2 = getChildren(item);
        if (children2 != null && children2.length) {
          recurse(children2);
        }
      });
    };
    recurse(arr);
    return flat;
  }
  function memo(getDeps, fn, opts) {
    let deps = [];
    let result;
    return (depArgs) => {
      let depTime;
      if (opts.key && opts.debug)
        depTime = Date.now();
      const newDeps = getDeps(depArgs);
      const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep);
      if (!depsChanged) {
        return result;
      }
      deps = newDeps;
      let resultTime;
      if (opts.key && opts.debug)
        resultTime = Date.now();
      result = fn(...newDeps);
      opts == null || opts.onChange == null || opts.onChange(result);
      if (opts.key && opts.debug) {
        if (opts != null && opts.debug()) {
          const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
          const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
          const resultFpsPercentage = resultEndTime / 16;
          const pad = (str, num) => {
            str = String(str);
            while (str.length < num) {
              str = " " + str;
            }
            return str;
          };
          console.info(`%c\u23F1 ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120))}deg 100% 31%);`, opts == null ? void 0 : opts.key);
        }
      }
      return result;
    };
  }
  function getMemoOptions(tableOptions, debugLevel, key, onChange) {
    return {
      debug: () => {
        var _tableOptions$debugAl;
        return (_tableOptions$debugAl = tableOptions == null ? void 0 : tableOptions.debugAll) != null ? _tableOptions$debugAl : tableOptions[debugLevel];
      },
      key,
      onChange
    };
  }
  function createCell(table, row, column, columnId) {
    const getRenderValue = () => {
      var _cell$getValue;
      return (_cell$getValue = cell.getValue()) != null ? _cell$getValue : table.options.renderFallbackValue;
    };
    const cell = {
      id: `${row.id}_${column.id}`,
      row,
      column,
      getValue: () => row.getValue(columnId),
      renderValue: getRenderValue,
      getContext: memo(() => [table, column, row, cell], (table2, column2, row2, cell2) => ({
        table: table2,
        column: column2,
        row: row2,
        cell: cell2,
        getValue: cell2.getValue,
        renderValue: cell2.renderValue
      }), getMemoOptions(table.options, "debugCells", "cell.getContext"))
    };
    table._features.forEach((feature) => {
      feature.createCell == null || feature.createCell(cell, column, row, table);
    }, {});
    return cell;
  }
  function createColumn(table, columnDef, depth, parent) {
    var _ref, _resolvedColumnDef$id;
    const defaultColumn = table._getDefaultColumnDef();
    const resolvedColumnDef = {
      ...defaultColumn,
      ...columnDef
    };
    const accessorKey = resolvedColumnDef.accessorKey;
    let id = (_ref = (_resolvedColumnDef$id = resolvedColumnDef.id) != null ? _resolvedColumnDef$id : accessorKey ? accessorKey.replace(".", "_") : void 0) != null ? _ref : typeof resolvedColumnDef.header === "string" ? resolvedColumnDef.header : void 0;
    let accessorFn;
    if (resolvedColumnDef.accessorFn) {
      accessorFn = resolvedColumnDef.accessorFn;
    } else if (accessorKey) {
      if (accessorKey.includes(".")) {
        accessorFn = (originalRow) => {
          let result = originalRow;
          for (const key of accessorKey.split(".")) {
            var _result;
            result = (_result = result) == null ? void 0 : _result[key];
            if (result === void 0) {
              console.warn(`"${key}" in deeply nested key "${accessorKey}" returned undefined.`);
            }
          }
          return result;
        };
      } else {
        accessorFn = (originalRow) => originalRow[resolvedColumnDef.accessorKey];
      }
    }
    if (!id) {
      if (true) {
        throw new Error(resolvedColumnDef.accessorFn ? `Columns require an id when using an accessorFn` : `Columns require an id when using a non-string header`);
      }
      throw new Error();
    }
    let column = {
      id: `${String(id)}`,
      accessorFn,
      parent,
      depth,
      columnDef: resolvedColumnDef,
      columns: [],
      getFlatColumns: memo(() => [true], () => {
        var _column$columns;
        return [column, ...(_column$columns = column.columns) == null ? void 0 : _column$columns.flatMap((d) => d.getFlatColumns())];
      }, getMemoOptions(table.options, "debugColumns", "column.getFlatColumns")),
      getLeafColumns: memo(() => [table._getOrderColumnsFn()], (orderColumns2) => {
        var _column$columns2;
        if ((_column$columns2 = column.columns) != null && _column$columns2.length) {
          let leafColumns = column.columns.flatMap((column2) => column2.getLeafColumns());
          return orderColumns2(leafColumns);
        }
        return [column];
      }, getMemoOptions(table.options, "debugColumns", "column.getLeafColumns"))
    };
    for (const feature of table._features) {
      feature.createColumn == null || feature.createColumn(column, table);
    }
    return column;
  }
  var debug = "debugHeaders";
  function createHeader(table, column, options) {
    var _options$id;
    const id = (_options$id = options.id) != null ? _options$id : column.id;
    let header = {
      id,
      column,
      index: options.index,
      isPlaceholder: !!options.isPlaceholder,
      placeholderId: options.placeholderId,
      depth: options.depth,
      subHeaders: [],
      colSpan: 0,
      rowSpan: 0,
      headerGroup: null,
      getLeafHeaders: () => {
        const leafHeaders = [];
        const recurseHeader = (h) => {
          if (h.subHeaders && h.subHeaders.length) {
            h.subHeaders.map(recurseHeader);
          }
          leafHeaders.push(h);
        };
        recurseHeader(header);
        return leafHeaders;
      },
      getContext: () => ({
        table,
        header,
        column
      })
    };
    table._features.forEach((feature) => {
      feature.createHeader == null || feature.createHeader(header, table);
    });
    return header;
  }
  var Headers = {
    createTable: (table) => {
      table.getHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, leafColumns, left, right) => {
        var _left$map$filter, _right$map$filter;
        const leftColumns = (_left$map$filter = left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter : [];
        const rightColumns = (_right$map$filter = right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter : [];
        const centerColumns = leafColumns.filter((column) => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
        const headerGroups = buildHeaderGroups(allColumns, [...leftColumns, ...centerColumns, ...rightColumns], table);
        return headerGroups;
      }, getMemoOptions(table.options, debug, "getHeaderGroups"));
      table.getCenterHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, leafColumns, left, right) => {
        leafColumns = leafColumns.filter((column) => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
        return buildHeaderGroups(allColumns, leafColumns, table, "center");
      }, getMemoOptions(table.options, debug, "getCenterHeaderGroups"));
      table.getLeftHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left], (allColumns, leafColumns, left) => {
        var _left$map$filter2;
        const orderedLeafColumns = (_left$map$filter2 = left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter2 : [];
        return buildHeaderGroups(allColumns, orderedLeafColumns, table, "left");
      }, getMemoOptions(table.options, debug, "getLeftHeaderGroups"));
      table.getRightHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.right], (allColumns, leafColumns, right) => {
        var _right$map$filter2;
        const orderedLeafColumns = (_right$map$filter2 = right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter2 : [];
        return buildHeaderGroups(allColumns, orderedLeafColumns, table, "right");
      }, getMemoOptions(table.options, debug, "getRightHeaderGroups"));
      table.getFooterGroups = memo(() => [table.getHeaderGroups()], (headerGroups) => {
        return [...headerGroups].reverse();
      }, getMemoOptions(table.options, debug, "getFooterGroups"));
      table.getLeftFooterGroups = memo(() => [table.getLeftHeaderGroups()], (headerGroups) => {
        return [...headerGroups].reverse();
      }, getMemoOptions(table.options, debug, "getLeftFooterGroups"));
      table.getCenterFooterGroups = memo(() => [table.getCenterHeaderGroups()], (headerGroups) => {
        return [...headerGroups].reverse();
      }, getMemoOptions(table.options, debug, "getCenterFooterGroups"));
      table.getRightFooterGroups = memo(() => [table.getRightHeaderGroups()], (headerGroups) => {
        return [...headerGroups].reverse();
      }, getMemoOptions(table.options, debug, "getRightFooterGroups"));
      table.getFlatHeaders = memo(() => [table.getHeaderGroups()], (headerGroups) => {
        return headerGroups.map((headerGroup) => {
          return headerGroup.headers;
        }).flat();
      }, getMemoOptions(table.options, debug, "getFlatHeaders"));
      table.getLeftFlatHeaders = memo(() => [table.getLeftHeaderGroups()], (left) => {
        return left.map((headerGroup) => {
          return headerGroup.headers;
        }).flat();
      }, getMemoOptions(table.options, debug, "getLeftFlatHeaders"));
      table.getCenterFlatHeaders = memo(() => [table.getCenterHeaderGroups()], (left) => {
        return left.map((headerGroup) => {
          return headerGroup.headers;
        }).flat();
      }, getMemoOptions(table.options, debug, "getCenterFlatHeaders"));
      table.getRightFlatHeaders = memo(() => [table.getRightHeaderGroups()], (left) => {
        return left.map((headerGroup) => {
          return headerGroup.headers;
        }).flat();
      }, getMemoOptions(table.options, debug, "getRightFlatHeaders"));
      table.getCenterLeafHeaders = memo(() => [table.getCenterFlatHeaders()], (flatHeaders) => {
        return flatHeaders.filter((header) => {
          var _header$subHeaders;
          return !((_header$subHeaders = header.subHeaders) != null && _header$subHeaders.length);
        });
      }, getMemoOptions(table.options, debug, "getCenterLeafHeaders"));
      table.getLeftLeafHeaders = memo(() => [table.getLeftFlatHeaders()], (flatHeaders) => {
        return flatHeaders.filter((header) => {
          var _header$subHeaders2;
          return !((_header$subHeaders2 = header.subHeaders) != null && _header$subHeaders2.length);
        });
      }, getMemoOptions(table.options, debug, "getLeftLeafHeaders"));
      table.getRightLeafHeaders = memo(() => [table.getRightFlatHeaders()], (flatHeaders) => {
        return flatHeaders.filter((header) => {
          var _header$subHeaders3;
          return !((_header$subHeaders3 = header.subHeaders) != null && _header$subHeaders3.length);
        });
      }, getMemoOptions(table.options, debug, "getRightLeafHeaders"));
      table.getLeafHeaders = memo(() => [table.getLeftHeaderGroups(), table.getCenterHeaderGroups(), table.getRightHeaderGroups()], (left, center, right) => {
        var _left$0$headers, _left$, _center$0$headers, _center$, _right$0$headers, _right$;
        return [...(_left$0$headers = (_left$ = left[0]) == null ? void 0 : _left$.headers) != null ? _left$0$headers : [], ...(_center$0$headers = (_center$ = center[0]) == null ? void 0 : _center$.headers) != null ? _center$0$headers : [], ...(_right$0$headers = (_right$ = right[0]) == null ? void 0 : _right$.headers) != null ? _right$0$headers : []].map((header) => {
          return header.getLeafHeaders();
        }).flat();
      }, getMemoOptions(table.options, debug, "getLeafHeaders"));
    }
  };
  function buildHeaderGroups(allColumns, columnsToGroup, table, headerFamily) {
    var _headerGroups$0$heade, _headerGroups$;
    let maxDepth = 0;
    const findMaxDepth = function(columns, depth) {
      if (depth === void 0) {
        depth = 1;
      }
      maxDepth = Math.max(maxDepth, depth);
      columns.filter((column) => column.getIsVisible()).forEach((column) => {
        var _column$columns;
        if ((_column$columns = column.columns) != null && _column$columns.length) {
          findMaxDepth(column.columns, depth + 1);
        }
      }, 0);
    };
    findMaxDepth(allColumns);
    let headerGroups = [];
    const createHeaderGroup = (headersToGroup, depth) => {
      const headerGroup = {
        depth,
        id: [headerFamily, `${depth}`].filter(Boolean).join("_"),
        headers: []
      };
      const pendingParentHeaders = [];
      headersToGroup.forEach((headerToGroup) => {
        const latestPendingParentHeader = [...pendingParentHeaders].reverse()[0];
        const isLeafHeader = headerToGroup.column.depth === headerGroup.depth;
        let column;
        let isPlaceholder = false;
        if (isLeafHeader && headerToGroup.column.parent) {
          column = headerToGroup.column.parent;
        } else {
          column = headerToGroup.column;
          isPlaceholder = true;
        }
        if (latestPendingParentHeader && (latestPendingParentHeader == null ? void 0 : latestPendingParentHeader.column) === column) {
          latestPendingParentHeader.subHeaders.push(headerToGroup);
        } else {
          const header = createHeader(table, column, {
            id: [headerFamily, depth, column.id, headerToGroup == null ? void 0 : headerToGroup.id].filter(Boolean).join("_"),
            isPlaceholder,
            placeholderId: isPlaceholder ? `${pendingParentHeaders.filter((d) => d.column === column).length}` : void 0,
            depth,
            index: pendingParentHeaders.length
          });
          header.subHeaders.push(headerToGroup);
          pendingParentHeaders.push(header);
        }
        headerGroup.headers.push(headerToGroup);
        headerToGroup.headerGroup = headerGroup;
      });
      headerGroups.push(headerGroup);
      if (depth > 0) {
        createHeaderGroup(pendingParentHeaders, depth - 1);
      }
    };
    const bottomHeaders = columnsToGroup.map((column, index) => createHeader(table, column, {
      depth: maxDepth,
      index
    }));
    createHeaderGroup(bottomHeaders, maxDepth - 1);
    headerGroups.reverse();
    const recurseHeadersForSpans = (headers) => {
      const filteredHeaders = headers.filter((header) => header.column.getIsVisible());
      return filteredHeaders.map((header) => {
        let colSpan = 0;
        let rowSpan = 0;
        let childRowSpans = [0];
        if (header.subHeaders && header.subHeaders.length) {
          childRowSpans = [];
          recurseHeadersForSpans(header.subHeaders).forEach((_ref) => {
            let {
              colSpan: childColSpan,
              rowSpan: childRowSpan
            } = _ref;
            colSpan += childColSpan;
            childRowSpans.push(childRowSpan);
          });
        } else {
          colSpan = 1;
        }
        const minChildRowSpan = Math.min(...childRowSpans);
        rowSpan = rowSpan + minChildRowSpan;
        header.colSpan = colSpan;
        header.rowSpan = rowSpan;
        return {
          colSpan,
          rowSpan
        };
      });
    };
    recurseHeadersForSpans((_headerGroups$0$heade = (_headerGroups$ = headerGroups[0]) == null ? void 0 : _headerGroups$.headers) != null ? _headerGroups$0$heade : []);
    return headerGroups;
  }
  var createRow = (table, id, original, rowIndex, depth, subRows, parentId) => {
    let row = {
      id,
      index: rowIndex,
      original,
      depth,
      parentId,
      _valuesCache: {},
      _uniqueValuesCache: {},
      getValue: (columnId) => {
        if (row._valuesCache.hasOwnProperty(columnId)) {
          return row._valuesCache[columnId];
        }
        const column = table.getColumn(columnId);
        if (!(column != null && column.accessorFn)) {
          return void 0;
        }
        row._valuesCache[columnId] = column.accessorFn(row.original, rowIndex);
        return row._valuesCache[columnId];
      },
      getUniqueValues: (columnId) => {
        if (row._uniqueValuesCache.hasOwnProperty(columnId)) {
          return row._uniqueValuesCache[columnId];
        }
        const column = table.getColumn(columnId);
        if (!(column != null && column.accessorFn)) {
          return void 0;
        }
        if (!column.columnDef.getUniqueValues) {
          row._uniqueValuesCache[columnId] = [row.getValue(columnId)];
          return row._uniqueValuesCache[columnId];
        }
        row._uniqueValuesCache[columnId] = column.columnDef.getUniqueValues(row.original, rowIndex);
        return row._uniqueValuesCache[columnId];
      },
      renderValue: (columnId) => {
        var _row$getValue;
        return (_row$getValue = row.getValue(columnId)) != null ? _row$getValue : table.options.renderFallbackValue;
      },
      subRows: subRows != null ? subRows : [],
      getLeafRows: () => flattenBy(row.subRows, (d) => d.subRows),
      getParentRow: () => row.parentId ? table.getRow(row.parentId, true) : void 0,
      getParentRows: () => {
        let parentRows = [];
        let currentRow = row;
        while (true) {
          const parentRow = currentRow.getParentRow();
          if (!parentRow)
            break;
          parentRows.push(parentRow);
          currentRow = parentRow;
        }
        return parentRows.reverse();
      },
      getAllCells: memo(() => [table.getAllLeafColumns()], (leafColumns) => {
        return leafColumns.map((column) => {
          return createCell(table, row, column, column.id);
        });
      }, getMemoOptions(table.options, "debugRows", "getAllCells")),
      _getAllCellsByColumnId: memo(() => [row.getAllCells()], (allCells) => {
        return allCells.reduce((acc, cell) => {
          acc[cell.column.id] = cell;
          return acc;
        }, {});
      }, getMemoOptions(table.options, "debugRows", "getAllCellsByColumnId"))
    };
    for (let i = 0; i < table._features.length; i++) {
      const feature = table._features[i];
      feature == null || feature.createRow == null || feature.createRow(row, table);
    }
    return row;
  };
  var ColumnFaceting = {
    createColumn: (column, table) => {
      column._getFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, column.id);
      column.getFacetedRowModel = () => {
        if (!column._getFacetedRowModel) {
          return table.getPreFilteredRowModel();
        }
        return column._getFacetedRowModel();
      };
      column._getFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, column.id);
      column.getFacetedUniqueValues = () => {
        if (!column._getFacetedUniqueValues) {
          return /* @__PURE__ */ new Map();
        }
        return column._getFacetedUniqueValues();
      };
      column._getFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, column.id);
      column.getFacetedMinMaxValues = () => {
        if (!column._getFacetedMinMaxValues) {
          return void 0;
        }
        return column._getFacetedMinMaxValues();
      };
    }
  };
  var includesString = (row, columnId, filterValue) => {
    var _row$getValue;
    const search = filterValue.toLowerCase();
    return Boolean((_row$getValue = row.getValue(columnId)) == null || (_row$getValue = _row$getValue.toString()) == null || (_row$getValue = _row$getValue.toLowerCase()) == null ? void 0 : _row$getValue.includes(search));
  };
  includesString.autoRemove = (val) => testFalsey(val);
  var includesStringSensitive = (row, columnId, filterValue) => {
    var _row$getValue2;
    return Boolean((_row$getValue2 = row.getValue(columnId)) == null || (_row$getValue2 = _row$getValue2.toString()) == null ? void 0 : _row$getValue2.includes(filterValue));
  };
  includesStringSensitive.autoRemove = (val) => testFalsey(val);
  var equalsString = (row, columnId, filterValue) => {
    var _row$getValue3;
    return ((_row$getValue3 = row.getValue(columnId)) == null || (_row$getValue3 = _row$getValue3.toString()) == null ? void 0 : _row$getValue3.toLowerCase()) === (filterValue == null ? void 0 : filterValue.toLowerCase());
  };
  equalsString.autoRemove = (val) => testFalsey(val);
  var arrIncludes = (row, columnId, filterValue) => {
    var _row$getValue4;
    return (_row$getValue4 = row.getValue(columnId)) == null ? void 0 : _row$getValue4.includes(filterValue);
  };
  arrIncludes.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
  var arrIncludesAll = (row, columnId, filterValue) => {
    return !filterValue.some((val) => {
      var _row$getValue5;
      return !((_row$getValue5 = row.getValue(columnId)) != null && _row$getValue5.includes(val));
    });
  };
  arrIncludesAll.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
  var arrIncludesSome = (row, columnId, filterValue) => {
    return filterValue.some((val) => {
      var _row$getValue6;
      return (_row$getValue6 = row.getValue(columnId)) == null ? void 0 : _row$getValue6.includes(val);
    });
  };
  arrIncludesSome.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
  var equals = (row, columnId, filterValue) => {
    return row.getValue(columnId) === filterValue;
  };
  equals.autoRemove = (val) => testFalsey(val);
  var weakEquals = (row, columnId, filterValue) => {
    return row.getValue(columnId) == filterValue;
  };
  weakEquals.autoRemove = (val) => testFalsey(val);
  var inNumberRange = (row, columnId, filterValue) => {
    let [min2, max2] = filterValue;
    const rowValue = row.getValue(columnId);
    return rowValue >= min2 && rowValue <= max2;
  };
  inNumberRange.resolveFilterValue = (val) => {
    let [unsafeMin, unsafeMax] = val;
    let parsedMin = typeof unsafeMin !== "number" ? parseFloat(unsafeMin) : unsafeMin;
    let parsedMax = typeof unsafeMax !== "number" ? parseFloat(unsafeMax) : unsafeMax;
    let min2 = unsafeMin === null || Number.isNaN(parsedMin) ? -Infinity : parsedMin;
    let max2 = unsafeMax === null || Number.isNaN(parsedMax) ? Infinity : parsedMax;
    if (min2 > max2) {
      const temp = min2;
      min2 = max2;
      max2 = temp;
    }
    return [min2, max2];
  };
  inNumberRange.autoRemove = (val) => testFalsey(val) || testFalsey(val[0]) && testFalsey(val[1]);
  var filterFns = {
    includesString,
    includesStringSensitive,
    equalsString,
    arrIncludes,
    arrIncludesAll,
    arrIncludesSome,
    equals,
    weakEquals,
    inNumberRange
  };
  function testFalsey(val) {
    return val === void 0 || val === null || val === "";
  }
  var ColumnFiltering = {
    getDefaultColumnDef: () => {
      return {
        filterFn: "auto"
      };
    },
    getInitialState: (state) => {
      return {
        columnFilters: [],
        ...state
      };
    },
    getDefaultOptions: (table) => {
      return {
        onColumnFiltersChange: makeStateUpdater("columnFilters", table),
        filterFromLeafRows: false,
        maxLeafRowFilterDepth: 100
      };
    },
    createColumn: (column, table) => {
      column.getAutoFilterFn = () => {
        const firstRow = table.getCoreRowModel().flatRows[0];
        const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
        if (typeof value === "string") {
          return filterFns.includesString;
        }
        if (typeof value === "number") {
          return filterFns.inNumberRange;
        }
        if (typeof value === "boolean") {
          return filterFns.equals;
        }
        if (value !== null && typeof value === "object") {
          return filterFns.equals;
        }
        if (Array.isArray(value)) {
          return filterFns.arrIncludes;
        }
        return filterFns.weakEquals;
      };
      column.getFilterFn = () => {
        var _table$options$filter, _table$options$filter2;
        return isFunction(column.columnDef.filterFn) ? column.columnDef.filterFn : column.columnDef.filterFn === "auto" ? column.getAutoFilterFn() : (
          // @ts-ignore
          (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[column.columnDef.filterFn]) != null ? _table$options$filter : filterFns[column.columnDef.filterFn]
        );
      };
      column.getCanFilter = () => {
        var _column$columnDef$ena, _table$options$enable, _table$options$enable2;
        return ((_column$columnDef$ena = column.columnDef.enableColumnFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnFilters) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && !!column.accessorFn;
      };
      column.getIsFiltered = () => column.getFilterIndex() > -1;
      column.getFilterValue = () => {
        var _table$getState$colum;
        return (_table$getState$colum = table.getState().columnFilters) == null || (_table$getState$colum = _table$getState$colum.find((d) => d.id === column.id)) == null ? void 0 : _table$getState$colum.value;
      };
      column.getFilterIndex = () => {
        var _table$getState$colum2, _table$getState$colum3;
        return (_table$getState$colum2 = (_table$getState$colum3 = table.getState().columnFilters) == null ? void 0 : _table$getState$colum3.findIndex((d) => d.id === column.id)) != null ? _table$getState$colum2 : -1;
      };
      column.setFilterValue = (value) => {
        table.setColumnFilters((old) => {
          const filterFn = column.getFilterFn();
          const previousFilter = old == null ? void 0 : old.find((d) => d.id === column.id);
          const newFilter = functionalUpdate(value, previousFilter ? previousFilter.value : void 0);
          if (shouldAutoRemoveFilter(filterFn, newFilter, column)) {
            var _old$filter;
            return (_old$filter = old == null ? void 0 : old.filter((d) => d.id !== column.id)) != null ? _old$filter : [];
          }
          const newFilterObj = {
            id: column.id,
            value: newFilter
          };
          if (previousFilter) {
            var _old$map;
            return (_old$map = old == null ? void 0 : old.map((d) => {
              if (d.id === column.id) {
                return newFilterObj;
              }
              return d;
            })) != null ? _old$map : [];
          }
          if (old != null && old.length) {
            return [...old, newFilterObj];
          }
          return [newFilterObj];
        });
      };
    },
    createRow: (row, _table) => {
      row.columnFilters = {};
      row.columnFiltersMeta = {};
    },
    createTable: (table) => {
      table.setColumnFilters = (updater) => {
        const leafColumns = table.getAllLeafColumns();
        const updateFn = (old) => {
          var _functionalUpdate;
          return (_functionalUpdate = functionalUpdate(updater, old)) == null ? void 0 : _functionalUpdate.filter((filter) => {
            const column = leafColumns.find((d) => d.id === filter.id);
            if (column) {
              const filterFn = column.getFilterFn();
              if (shouldAutoRemoveFilter(filterFn, filter.value, column)) {
                return false;
              }
            }
            return true;
          });
        };
        table.options.onColumnFiltersChange == null || table.options.onColumnFiltersChange(updateFn);
      };
      table.resetColumnFilters = (defaultState) => {
        var _table$initialState$c, _table$initialState;
        table.setColumnFilters(defaultState ? [] : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnFilters) != null ? _table$initialState$c : []);
      };
      table.getPreFilteredRowModel = () => table.getCoreRowModel();
      table.getFilteredRowModel = () => {
        if (!table._getFilteredRowModel && table.options.getFilteredRowModel) {
          table._getFilteredRowModel = table.options.getFilteredRowModel(table);
        }
        if (table.options.manualFiltering || !table._getFilteredRowModel) {
          return table.getPreFilteredRowModel();
        }
        return table._getFilteredRowModel();
      };
    }
  };
  function shouldAutoRemoveFilter(filterFn, value, column) {
    return (filterFn && filterFn.autoRemove ? filterFn.autoRemove(value, column) : false) || typeof value === "undefined" || typeof value === "string" && !value;
  }
  var sum = (columnId, _leafRows, childRows) => {
    return childRows.reduce((sum2, next) => {
      const nextValue = next.getValue(columnId);
      return sum2 + (typeof nextValue === "number" ? nextValue : 0);
    }, 0);
  };
  var min = (columnId, _leafRows, childRows) => {
    let min2;
    childRows.forEach((row) => {
      const value = row.getValue(columnId);
      if (value != null && (min2 > value || min2 === void 0 && value >= value)) {
        min2 = value;
      }
    });
    return min2;
  };
  var max = (columnId, _leafRows, childRows) => {
    let max2;
    childRows.forEach((row) => {
      const value = row.getValue(columnId);
      if (value != null && (max2 < value || max2 === void 0 && value >= value)) {
        max2 = value;
      }
    });
    return max2;
  };
  var extent = (columnId, _leafRows, childRows) => {
    let min2;
    let max2;
    childRows.forEach((row) => {
      const value = row.getValue(columnId);
      if (value != null) {
        if (min2 === void 0) {
          if (value >= value)
            min2 = max2 = value;
        } else {
          if (min2 > value)
            min2 = value;
          if (max2 < value)
            max2 = value;
        }
      }
    });
    return [min2, max2];
  };
  var mean = (columnId, leafRows) => {
    let count2 = 0;
    let sum2 = 0;
    leafRows.forEach((row) => {
      let value = row.getValue(columnId);
      if (value != null && (value = +value) >= value) {
        ++count2, sum2 += value;
      }
    });
    if (count2)
      return sum2 / count2;
    return;
  };
  var median = (columnId, leafRows) => {
    if (!leafRows.length) {
      return;
    }
    const values = leafRows.map((row) => row.getValue(columnId));
    if (!isNumberArray(values)) {
      return;
    }
    if (values.length === 1) {
      return values[0];
    }
    const mid = Math.floor(values.length / 2);
    const nums = values.sort((a, b) => a - b);
    return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };
  var unique = (columnId, leafRows) => {
    return Array.from(new Set(leafRows.map((d) => d.getValue(columnId))).values());
  };
  var uniqueCount = (columnId, leafRows) => {
    return new Set(leafRows.map((d) => d.getValue(columnId))).size;
  };
  var count = (_columnId, leafRows) => {
    return leafRows.length;
  };
  var aggregationFns = {
    sum,
    min,
    max,
    extent,
    mean,
    median,
    unique,
    uniqueCount,
    count
  };
  var ColumnGrouping = {
    getDefaultColumnDef: () => {
      return {
        aggregatedCell: (props) => {
          var _toString, _props$getValue;
          return (_toString = (_props$getValue = props.getValue()) == null || _props$getValue.toString == null ? void 0 : _props$getValue.toString()) != null ? _toString : null;
        },
        aggregationFn: "auto"
      };
    },
    getInitialState: (state) => {
      return {
        grouping: [],
        ...state
      };
    },
    getDefaultOptions: (table) => {
      return {
        onGroupingChange: makeStateUpdater("grouping", table),
        groupedColumnMode: "reorder"
      };
    },
    createColumn: (column, table) => {
      column.toggleGrouping = () => {
        table.setGrouping((old) => {
          if (old != null && old.includes(column.id)) {
            return old.filter((d) => d !== column.id);
          }
          return [...old != null ? old : [], column.id];
        });
      };
      column.getCanGroup = () => {
        var _column$columnDef$ena, _table$options$enable;
        return ((_column$columnDef$ena = column.columnDef.enableGrouping) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableGrouping) != null ? _table$options$enable : true) && (!!column.accessorFn || !!column.columnDef.getGroupingValue);
      };
      column.getIsGrouped = () => {
        var _table$getState$group;
        return (_table$getState$group = table.getState().grouping) == null ? void 0 : _table$getState$group.includes(column.id);
      };
      column.getGroupedIndex = () => {
        var _table$getState$group2;
        return (_table$getState$group2 = table.getState().grouping) == null ? void 0 : _table$getState$group2.indexOf(column.id);
      };
      column.getToggleGroupingHandler = () => {
        const canGroup = column.getCanGroup();
        return () => {
          if (!canGroup)
            return;
          column.toggleGrouping();
        };
      };
      column.getAutoAggregationFn = () => {
        const firstRow = table.getCoreRowModel().flatRows[0];
        const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
        if (typeof value === "number") {
          return aggregationFns.sum;
        }
        if (Object.prototype.toString.call(value) === "[object Date]") {
          return aggregationFns.extent;
        }
      };
      column.getAggregationFn = () => {
        var _table$options$aggreg, _table$options$aggreg2;
        if (!column) {
          throw new Error();
        }
        return isFunction(column.columnDef.aggregationFn) ? column.columnDef.aggregationFn : column.columnDef.aggregationFn === "auto" ? column.getAutoAggregationFn() : (_table$options$aggreg = (_table$options$aggreg2 = table.options.aggregationFns) == null ? void 0 : _table$options$aggreg2[column.columnDef.aggregationFn]) != null ? _table$options$aggreg : aggregationFns[column.columnDef.aggregationFn];
      };
    },
    createTable: (table) => {
      table.setGrouping = (updater) => table.options.onGroupingChange == null ? void 0 : table.options.onGroupingChange(updater);
      table.resetGrouping = (defaultState) => {
        var _table$initialState$g, _table$initialState;
        table.setGrouping(defaultState ? [] : (_table$initialState$g = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.grouping) != null ? _table$initialState$g : []);
      };
      table.getPreGroupedRowModel = () => table.getFilteredRowModel();
      table.getGroupedRowModel = () => {
        if (!table._getGroupedRowModel && table.options.getGroupedRowModel) {
          table._getGroupedRowModel = table.options.getGroupedRowModel(table);
        }
        if (table.options.manualGrouping || !table._getGroupedRowModel) {
          return table.getPreGroupedRowModel();
        }
        return table._getGroupedRowModel();
      };
    },
    createRow: (row, table) => {
      row.getIsGrouped = () => !!row.groupingColumnId;
      row.getGroupingValue = (columnId) => {
        if (row._groupingValuesCache.hasOwnProperty(columnId)) {
          return row._groupingValuesCache[columnId];
        }
        const column = table.getColumn(columnId);
        if (!(column != null && column.columnDef.getGroupingValue)) {
          return row.getValue(columnId);
        }
        row._groupingValuesCache[columnId] = column.columnDef.getGroupingValue(row.original);
        return row._groupingValuesCache[columnId];
      };
      row._groupingValuesCache = {};
    },
    createCell: (cell, column, row, table) => {
      cell.getIsGrouped = () => column.getIsGrouped() && column.id === row.groupingColumnId;
      cell.getIsPlaceholder = () => !cell.getIsGrouped() && column.getIsGrouped();
      cell.getIsAggregated = () => {
        var _row$subRows;
        return !cell.getIsGrouped() && !cell.getIsPlaceholder() && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
      };
    }
  };
  function orderColumns(leafColumns, grouping, groupedColumnMode) {
    if (!(grouping != null && grouping.length) || !groupedColumnMode) {
      return leafColumns;
    }
    const nonGroupingColumns = leafColumns.filter((col) => !grouping.includes(col.id));
    if (groupedColumnMode === "remove") {
      return nonGroupingColumns;
    }
    const groupingColumns = grouping.map((g) => leafColumns.find((col) => col.id === g)).filter(Boolean);
    return [...groupingColumns, ...nonGroupingColumns];
  }
  var ColumnOrdering = {
    getInitialState: (state) => {
      return {
        columnOrder: [],
        ...state
      };
    },
    getDefaultOptions: (table) => {
      return {
        onColumnOrderChange: makeStateUpdater("columnOrder", table)
      };
    },
    createColumn: (column, table) => {
      column.getIndex = memo((position) => [_getVisibleLeafColumns(table, position)], (columns) => columns.findIndex((d) => d.id === column.id), getMemoOptions(table.options, "debugColumns", "getIndex"));
      column.getIsFirstColumn = (position) => {
        var _columns$;
        const columns = _getVisibleLeafColumns(table, position);
        return ((_columns$ = columns[0]) == null ? void 0 : _columns$.id) === column.id;
      };
      column.getIsLastColumn = (position) => {
        var _columns;
        const columns = _getVisibleLeafColumns(table, position);
        return ((_columns = columns[columns.length - 1]) == null ? void 0 : _columns.id) === column.id;
      };
    },
    createTable: (table) => {
      table.setColumnOrder = (updater) => table.options.onColumnOrderChange == null ? void 0 : table.options.onColumnOrderChange(updater);
      table.resetColumnOrder = (defaultState) => {
        var _table$initialState$c;
        table.setColumnOrder(defaultState ? [] : (_table$initialState$c = table.initialState.columnOrder) != null ? _table$initialState$c : []);
      };
      table._getOrderColumnsFn = memo(() => [table.getState().columnOrder, table.getState().grouping, table.options.groupedColumnMode], (columnOrder, grouping, groupedColumnMode) => (columns) => {
        let orderedColumns = [];
        if (!(columnOrder != null && columnOrder.length)) {
          orderedColumns = columns;
        } else {
          const columnOrderCopy = [...columnOrder];
          const columnsCopy = [...columns];
          while (columnsCopy.length && columnOrderCopy.length) {
            const targetColumnId = columnOrderCopy.shift();
            const foundIndex = columnsCopy.findIndex((d) => d.id === targetColumnId);
            if (foundIndex > -1) {
              orderedColumns.push(columnsCopy.splice(foundIndex, 1)[0]);
            }
          }
          orderedColumns = [...orderedColumns, ...columnsCopy];
        }
        return orderColumns(orderedColumns, grouping, groupedColumnMode);
      }, getMemoOptions(table.options, "debugTable", "_getOrderColumnsFn"));
    }
  };
  var getDefaultColumnPinningState = () => ({
    left: [],
    right: []
  });
  var ColumnPinning = {
    getInitialState: (state) => {
      return {
        columnPinning: getDefaultColumnPinningState(),
        ...state
      };
    },
    getDefaultOptions: (table) => {
      return {
        onColumnPinningChange: makeStateUpdater("columnPinning", table)
      };
    },
    createColumn: (column, table) => {
      column.pin = (position) => {
        const columnIds = column.getLeafColumns().map((d) => d.id).filter(Boolean);
        table.setColumnPinning((old) => {
          var _old$left3, _old$right3;
          if (position === "right") {
            var _old$left, _old$right;
            return {
              left: ((_old$left = old == null ? void 0 : old.left) != null ? _old$left : []).filter((d) => !(columnIds != null && columnIds.includes(d))),
              right: [...((_old$right = old == null ? void 0 : old.right) != null ? _old$right : []).filter((d) => !(columnIds != null && columnIds.includes(d))), ...columnIds]
            };
          }
          if (position === "left") {
            var _old$left2, _old$right2;
            return {
              left: [...((_old$left2 = old == null ? void 0 : old.left) != null ? _old$left2 : []).filter((d) => !(columnIds != null && columnIds.includes(d))), ...columnIds],
              right: ((_old$right2 = old == null ? void 0 : old.right) != null ? _old$right2 : []).filter((d) => !(columnIds != null && columnIds.includes(d)))
            };
          }
          return {
            left: ((_old$left3 = old == null ? void 0 : old.left) != null ? _old$left3 : []).filter((d) => !(columnIds != null && columnIds.includes(d))),
            right: ((_old$right3 = old == null ? void 0 : old.right) != null ? _old$right3 : []).filter((d) => !(columnIds != null && columnIds.includes(d)))
          };
        });
      };
      column.getCanPin = () => {
        const leafColumns = column.getLeafColumns();
        return leafColumns.some((d) => {
          var _d$columnDef$enablePi, _ref, _table$options$enable;
          return ((_d$columnDef$enablePi = d.columnDef.enablePinning) != null ? _d$columnDef$enablePi : true) && ((_ref = (_table$options$enable = table.options.enableColumnPinning) != null ? _table$options$enable : table.options.enablePinning) != null ? _ref : true);
        });
      };
      column.getIsPinned = () => {
        const leafColumnIds = column.getLeafColumns().map((d) => d.id);
        const {
          left,
          right
        } = table.getState().columnPinning;
        const isLeft = leafColumnIds.some((d) => left == null ? void 0 : left.includes(d));
        const isRight = leafColumnIds.some((d) => right == null ? void 0 : right.includes(d));
        return isLeft ? "left" : isRight ? "right" : false;
      };
      column.getPinnedIndex = () => {
        var _table$getState$colum, _table$getState$colum2;
        const position = column.getIsPinned();
        return position ? (_table$getState$colum = (_table$getState$colum2 = table.getState().columnPinning) == null || (_table$getState$colum2 = _table$getState$colum2[position]) == null ? void 0 : _table$getState$colum2.indexOf(column.id)) != null ? _table$getState$colum : -1 : 0;
      };
    },
    createRow: (row, table) => {
      row.getCenterVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allCells, left, right) => {
        const leftAndRight = [...left != null ? left : [], ...right != null ? right : []];
        return allCells.filter((d) => !leftAndRight.includes(d.column.id));
      }, getMemoOptions(table.options, "debugRows", "getCenterVisibleCells"));
      row.getLeftVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.left], (allCells, left) => {
        const cells = (left != null ? left : []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({
          ...d,
          position: "left"
        }));
        return cells;
      }, getMemoOptions(table.options, "debugRows", "getLeftVisibleCells"));
      row.getRightVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.right], (allCells, right) => {
        const cells = (right != null ? right : []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({
          ...d,
          position: "right"
        }));
        return cells;
      }, getMemoOptions(table.options, "debugRows", "getRightVisibleCells"));
    },
    createTable: (table) => {
      table.setColumnPinning = (updater) => table.options.onColumnPinningChange == null ? void 0 : table.options.onColumnPinningChange(updater);
      table.resetColumnPinning = (defaultState) => {
        var _table$initialState$c, _table$initialState;
        return table.setColumnPinning(defaultState ? getDefaultColumnPinningState() : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnPinning) != null ? _table$initialState$c : getDefaultColumnPinningState());
      };
      table.getIsSomeColumnsPinned = (position) => {
        var _pinningState$positio;
        const pinningState = table.getState().columnPinning;
        if (!position) {
          var _pinningState$left, _pinningState$right;
          return Boolean(((_pinningState$left = pinningState.left) == null ? void 0 : _pinningState$left.length) || ((_pinningState$right = pinningState.right) == null ? void 0 : _pinningState$right.length));
        }
        return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
      };
      table.getLeftLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.left], (allColumns, left) => {
        return (left != null ? left : []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
      }, getMemoOptions(table.options, "debugColumns", "getLeftLeafColumns"));
      table.getRightLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.right], (allColumns, right) => {
        return (right != null ? right : []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
      }, getMemoOptions(table.options, "debugColumns", "getRightLeafColumns"));
      table.getCenterLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, left, right) => {
        const leftAndRight = [...left != null ? left : [], ...right != null ? right : []];
        return allColumns.filter((d) => !leftAndRight.includes(d.id));
      }, getMemoOptions(table.options, "debugColumns", "getCenterLeafColumns"));
    }
  };
  var defaultColumnSizing = {
    size: 150,
    minSize: 20,
    maxSize: Number.MAX_SAFE_INTEGER
  };
  var getDefaultColumnSizingInfoState = () => ({
    startOffset: null,
    startSize: null,
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: false,
    columnSizingStart: []
  });
  var ColumnSizing = {
    getDefaultColumnDef: () => {
      return defaultColumnSizing;
    },
    getInitialState: (state) => {
      return {
        columnSizing: {},
        columnSizingInfo: getDefaultColumnSizingInfoState(),
        ...state
      };
    },
    getDefaultOptions: (table) => {
      return {
        columnResizeMode: "onEnd",
        columnResizeDirection: "ltr",
        onColumnSizingChange: makeStateUpdater("columnSizing", table),
        onColumnSizingInfoChange: makeStateUpdater("columnSizingInfo", table)
      };
    },
    createColumn: (column, table) => {
      column.getSize = () => {
        var _column$columnDef$min, _ref, _column$columnDef$max;
        const columnSize = table.getState().columnSizing[column.id];
        return Math.min(Math.max((_column$columnDef$min = column.columnDef.minSize) != null ? _column$columnDef$min : defaultColumnSizing.minSize, (_ref = columnSize != null ? columnSize : column.columnDef.size) != null ? _ref : defaultColumnSizing.size), (_column$columnDef$max = column.columnDef.maxSize) != null ? _column$columnDef$max : defaultColumnSizing.maxSize);
      };
      column.getStart = memo((position) => [position, _getVisibleLeafColumns(table, position), table.getState().columnSizing], (position, columns) => columns.slice(0, column.getIndex(position)).reduce((sum2, column2) => sum2 + column2.getSize(), 0), getMemoOptions(table.options, "debugColumns", "getStart"));
      column.getAfter = memo((position) => [position, _getVisibleLeafColumns(table, position), table.getState().columnSizing], (position, columns) => columns.slice(column.getIndex(position) + 1).reduce((sum2, column2) => sum2 + column2.getSize(), 0), getMemoOptions(table.options, "debugColumns", "getAfter"));
      column.resetSize = () => {
        table.setColumnSizing((_ref2) => {
          let {
            [column.id]: _,
            ...rest
          } = _ref2;
          return rest;
        });
      };
      column.getCanResize = () => {
        var _column$columnDef$ena, _table$options$enable;
        return ((_column$columnDef$ena = column.columnDef.enableResizing) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnResizing) != null ? _table$options$enable : true);
      };
      column.getIsResizing = () => {
        return table.getState().columnSizingInfo.isResizingColumn === column.id;
      };
    },
    createHeader: (header, table) => {
      header.getSize = () => {
        let sum2 = 0;
        const recurse = (header2) => {
          if (header2.subHeaders.length) {
            header2.subHeaders.forEach(recurse);
          } else {
            var _header$column$getSiz;
            sum2 += (_header$column$getSiz = header2.column.getSize()) != null ? _header$column$getSiz : 0;
          }
        };
        recurse(header);
        return sum2;
      };
      header.getStart = () => {
        if (header.index > 0) {
          const prevSiblingHeader = header.headerGroup.headers[header.index - 1];
          return prevSiblingHeader.getStart() + prevSiblingHeader.getSize();
        }
        return 0;
      };
      header.getResizeHandler = (_contextDocument) => {
        const column = table.getColumn(header.column.id);
        const canResize = column == null ? void 0 : column.getCanResize();
        return (e) => {
          if (!column || !canResize) {
            return;
          }
          e.persist == null || e.persist();
          if (isTouchStartEvent(e)) {
            if (e.touches && e.touches.length > 1) {
              return;
            }
          }
          const startSize = header.getSize();
          const columnSizingStart = header ? header.getLeafHeaders().map((d) => [d.column.id, d.column.getSize()]) : [[column.id, column.getSize()]];
          const clientX = isTouchStartEvent(e) ? Math.round(e.touches[0].clientX) : e.clientX;
          const newColumnSizing = {};
          const updateOffset = (eventType, clientXPos) => {
            if (typeof clientXPos !== "number") {
              return;
            }
            table.setColumnSizingInfo((old) => {
              var _old$startOffset, _old$startSize;
              const deltaDirection = table.options.columnResizeDirection === "rtl" ? -1 : 1;
              const deltaOffset = (clientXPos - ((_old$startOffset = old == null ? void 0 : old.startOffset) != null ? _old$startOffset : 0)) * deltaDirection;
              const deltaPercentage = Math.max(deltaOffset / ((_old$startSize = old == null ? void 0 : old.startSize) != null ? _old$startSize : 0), -0.999999);
              old.columnSizingStart.forEach((_ref3) => {
                let [columnId, headerSize] = _ref3;
                newColumnSizing[columnId] = Math.round(Math.max(headerSize + headerSize * deltaPercentage, 0) * 100) / 100;
              });
              return {
                ...old,
                deltaOffset,
                deltaPercentage
              };
            });
            if (table.options.columnResizeMode === "onChange" || eventType === "end") {
              table.setColumnSizing((old) => ({
                ...old,
                ...newColumnSizing
              }));
            }
          };
          const onMove = (clientXPos) => updateOffset("move", clientXPos);
          const onEnd = (clientXPos) => {
            updateOffset("end", clientXPos);
            table.setColumnSizingInfo((old) => ({
              ...old,
              isResizingColumn: false,
              startOffset: null,
              startSize: null,
              deltaOffset: null,
              deltaPercentage: null,
              columnSizingStart: []
            }));
          };
          const contextDocument = _contextDocument || typeof document !== "undefined" ? document : null;
          const mouseEvents = {
            moveHandler: (e2) => onMove(e2.clientX),
            upHandler: (e2) => {
              contextDocument == null || contextDocument.removeEventListener("mousemove", mouseEvents.moveHandler);
              contextDocument == null || contextDocument.removeEventListener("mouseup", mouseEvents.upHandler);
              onEnd(e2.clientX);
            }
          };
          const touchEvents = {
            moveHandler: (e2) => {
              if (e2.cancelable) {
                e2.preventDefault();
                e2.stopPropagation();
              }
              onMove(e2.touches[0].clientX);
              return false;
            },
            upHandler: (e2) => {
              var _e$touches$;
              contextDocument == null || contextDocument.removeEventListener("touchmove", touchEvents.moveHandler);
              contextDocument == null || contextDocument.removeEventListener("touchend", touchEvents.upHandler);
              if (e2.cancelable) {
                e2.preventDefault();
                e2.stopPropagation();
              }
              onEnd((_e$touches$ = e2.touches[0]) == null ? void 0 : _e$touches$.clientX);
            }
          };
          const passiveIfSupported = passiveEventSupported() ? {
            passive: false
          } : false;
          if (isTouchStartEvent(e)) {
            contextDocument == null || contextDocument.addEventListener("touchmove", touchEvents.moveHandler, passiveIfSupported);
            contextDocument == null || contextDocument.addEventListener("touchend", touchEvents.upHandler, passiveIfSupported);
          } else {
            contextDocument == null || contextDocument.addEventListener("mousemove", mouseEvents.moveHandler, passiveIfSupported);
            contextDocument == null || contextDocument.addEventListener("mouseup", mouseEvents.upHandler, passiveIfSupported);
          }
          table.setColumnSizingInfo((old) => ({
            ...old,
            startOffset: clientX,
            startSize,
            deltaOffset: 0,
            deltaPercentage: 0,
            columnSizingStart,
            isResizingColumn: column.id
          }));
        };
      };
    },
    createTable: (table) => {
      table.setColumnSizing = (updater) => table.options.onColumnSizingChange == null ? void 0 : table.options.onColumnSizingChange(updater);
      table.setColumnSizingInfo = (updater) => table.options.onColumnSizingInfoChange == null ? void 0 : table.options.onColumnSizingInfoChange(updater);
      table.resetColumnSizing = (defaultState) => {
        var _table$initialState$c;
        table.setColumnSizing(defaultState ? {} : (_table$initialState$c = table.initialState.columnSizing) != null ? _table$initialState$c : {});
      };
      table.resetHeaderSizeInfo = (defaultState) => {
        var _table$initialState$c2;
        table.setColumnSizingInfo(defaultState ? getDefaultColumnSizingInfoState() : (_table$initialState$c2 = table.initialState.columnSizingInfo) != null ? _table$initialState$c2 : getDefaultColumnSizingInfoState());
      };
      table.getTotalSize = () => {
        var _table$getHeaderGroup, _table$getHeaderGroup2;
        return (_table$getHeaderGroup = (_table$getHeaderGroup2 = table.getHeaderGroups()[0]) == null ? void 0 : _table$getHeaderGroup2.headers.reduce((sum2, header) => {
          return sum2 + header.getSize();
        }, 0)) != null ? _table$getHeaderGroup : 0;
      };
      table.getLeftTotalSize = () => {
        var _table$getLeftHeaderG, _table$getLeftHeaderG2;
        return (_table$getLeftHeaderG = (_table$getLeftHeaderG2 = table.getLeftHeaderGroups()[0]) == null ? void 0 : _table$getLeftHeaderG2.headers.reduce((sum2, header) => {
          return sum2 + header.getSize();
        }, 0)) != null ? _table$getLeftHeaderG : 0;
      };
      table.getCenterTotalSize = () => {
        var _table$getCenterHeade, _table$getCenterHeade2;
        return (_table$getCenterHeade = (_table$getCenterHeade2 = table.getCenterHeaderGroups()[0]) == null ? void 0 : _table$getCenterHeade2.headers.reduce((sum2, header) => {
          return sum2 + header.getSize();
        }, 0)) != null ? _table$getCenterHeade : 0;
      };
      table.getRightTotalSize = () => {
        var _table$getRightHeader, _table$getRightHeader2;
        return (_table$getRightHeader = (_table$getRightHeader2 = table.getRightHeaderGroups()[0]) == null ? void 0 : _table$getRightHeader2.headers.reduce((sum2, header) => {
          return sum2 + header.getSize();
        }, 0)) != null ? _table$getRightHeader : 0;
      };
    }
  };
  var passiveSupported = null;
  function passiveEventSupported() {
    if (typeof passiveSupported === "boolean")
      return passiveSupported;
    let supported = false;
    try {
      const options = {
        get passive() {
          supported = true;
          return false;
        }
      };
      const noop4 = () => {
      };
      window.addEventListener("test", noop4, options);
      window.removeEventListener("test", noop4);
    } catch (err) {
      supported = false;
    }
    passiveSupported = supported;
    return passiveSupported;
  }
  function isTouchStartEvent(e) {
    return e.type === "touchstart";
  }
  var ColumnVisibility = {
    getInitialState: (state) => {
      return {
        columnVisibility: {},
        ...state
      };
    },
    getDefaultOptions: (table) => {
      return {
        onColumnVisibilityChange: makeStateUpdater("columnVisibility", table)
      };
    },
    createColumn: (column, table) => {
      column.toggleVisibility = (value) => {
        if (column.getCanHide()) {
          table.setColumnVisibility((old) => ({
            ...old,
            [column.id]: value != null ? value : !column.getIsVisible()
          }));
        }
      };
      column.getIsVisible = () => {
        var _ref, _table$getState$colum;
        const childColumns = column.columns;
        return (_ref = childColumns.length ? childColumns.some((c) => c.getIsVisible()) : (_table$getState$colum = table.getState().columnVisibility) == null ? void 0 : _table$getState$colum[column.id]) != null ? _ref : true;
      };
      column.getCanHide = () => {
        var _column$columnDef$ena, _table$options$enable;
        return ((_column$columnDef$ena = column.columnDef.enableHiding) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableHiding) != null ? _table$options$enable : true);
      };
      column.getToggleVisibilityHandler = () => {
        return (e) => {
          column.toggleVisibility == null || column.toggleVisibility(e.target.checked);
        };
      };
    },
    createRow: (row, table) => {
      row._getAllVisibleCells = memo(() => [row.getAllCells(), table.getState().columnVisibility], (cells) => {
        return cells.filter((cell) => cell.column.getIsVisible());
      }, getMemoOptions(table.options, "debugRows", "_getAllVisibleCells"));
      row.getVisibleCells = memo(() => [row.getLeftVisibleCells(), row.getCenterVisibleCells(), row.getRightVisibleCells()], (left, center, right) => [...left, ...center, ...right], getMemoOptions(table.options, "debugRows", "getVisibleCells"));
    },
    createTable: (table) => {
      const makeVisibleColumnsMethod = (key, getColumns) => {
        return memo(() => [getColumns(), getColumns().filter((d) => d.getIsVisible()).map((d) => d.id).join("_")], (columns) => {
          return columns.filter((d) => d.getIsVisible == null ? void 0 : d.getIsVisible());
        }, getMemoOptions(table.options, "debugColumns", key));
      };
      table.getVisibleFlatColumns = makeVisibleColumnsMethod("getVisibleFlatColumns", () => table.getAllFlatColumns());
      table.getVisibleLeafColumns = makeVisibleColumnsMethod("getVisibleLeafColumns", () => table.getAllLeafColumns());
      table.getLeftVisibleLeafColumns = makeVisibleColumnsMethod("getLeftVisibleLeafColumns", () => table.getLeftLeafColumns());
      table.getRightVisibleLeafColumns = makeVisibleColumnsMethod("getRightVisibleLeafColumns", () => table.getRightLeafColumns());
      table.getCenterVisibleLeafColumns = makeVisibleColumnsMethod("getCenterVisibleLeafColumns", () => table.getCenterLeafColumns());
      table.setColumnVisibility = (updater) => table.options.onColumnVisibilityChange == null ? void 0 : table.options.onColumnVisibilityChange(updater);
      table.resetColumnVisibility = (defaultState) => {
        var _table$initialState$c;
        table.setColumnVisibility(defaultState ? {} : (_table$initialState$c = table.initialState.columnVisibility) != null ? _table$initialState$c : {});
      };
      table.toggleAllColumnsVisible = (value) => {
        var _value;
        value = (_value = value) != null ? _value : !table.getIsAllColumnsVisible();
        table.setColumnVisibility(table.getAllLeafColumns().reduce((obj, column) => ({
          ...obj,
          [column.id]: !value ? !(column.getCanHide != null && column.getCanHide()) : value
        }), {}));
      };
      table.getIsAllColumnsVisible = () => !table.getAllLeafColumns().some((column) => !(column.getIsVisible != null && column.getIsVisible()));
      table.getIsSomeColumnsVisible = () => table.getAllLeafColumns().some((column) => column.getIsVisible == null ? void 0 : column.getIsVisible());
      table.getToggleAllColumnsVisibilityHandler = () => {
        return (e) => {
          var _target;
          table.toggleAllColumnsVisible((_target = e.target) == null ? void 0 : _target.checked);
        };
      };
    }
  };
  function _getVisibleLeafColumns(table, position) {
    return !position ? table.getVisibleLeafColumns() : position === "center" ? table.getCenterVisibleLeafColumns() : position === "left" ? table.getLeftVisibleLeafColumns() : table.getRightVisibleLeafColumns();
  }
  var GlobalFaceting = {
    createTable: (table) => {
      table._getGlobalFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, "__global__");
      table.getGlobalFacetedRowModel = () => {
        if (table.options.manualFiltering || !table._getGlobalFacetedRowModel) {
          return table.getPreFilteredRowModel();
        }
        return table._getGlobalFacetedRowModel();
      };
      table._getGlobalFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, "__global__");
      table.getGlobalFacetedUniqueValues = () => {
        if (!table._getGlobalFacetedUniqueValues) {
          return /* @__PURE__ */ new Map();
        }
        return table._getGlobalFacetedUniqueValues();
      };
      table._getGlobalFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, "__global__");
      table.getGlobalFacetedMinMaxValues = () => {
        if (!table._getGlobalFacetedMinMaxValues) {
          return;
        }
        return table._getGlobalFacetedMinMaxValues();
      };
    }
  };
  var GlobalFiltering = {
    getInitialState: (state) => {
      return {
        globalFilter: void 0,
        ...state
      };
    },
    getDefaultOptions: (table) => {
      return {
        onGlobalFilterChange: makeStateUpdater("globalFilter", table),
        globalFilterFn: "auto",
        getColumnCanGlobalFilter: (column) => {
          var _table$getCoreRowMode;
          const value = (_table$getCoreRowMode = table.getCoreRowModel().flatRows[0]) == null || (_table$getCoreRowMode = _table$getCoreRowMode._getAllCellsByColumnId()[column.id]) == null ? void 0 : _table$getCoreRowMode.getValue();
          return typeof value === "string" || typeof value === "number";
        }
      };
    },
    createColumn: (column, table) => {
      column.getCanGlobalFilter = () => {
        var _column$columnDef$ena, _table$options$enable, _table$options$enable2, _table$options$getCol;
        return ((_column$columnDef$ena = column.columnDef.enableGlobalFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableGlobalFilter) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && ((_table$options$getCol = table.options.getColumnCanGlobalFilter == null ? void 0 : table.options.getColumnCanGlobalFilter(column)) != null ? _table$options$getCol : true) && !!column.accessorFn;
      };
    },
    createTable: (table) => {
      table.getGlobalAutoFilterFn = () => {
        return filterFns.includesString;
      };
      table.getGlobalFilterFn = () => {
        var _table$options$filter, _table$options$filter2;
        const {
          globalFilterFn
        } = table.options;
        return isFunction(globalFilterFn) ? globalFilterFn : globalFilterFn === "auto" ? table.getGlobalAutoFilterFn() : (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[globalFilterFn]) != null ? _table$options$filter : filterFns[globalFilterFn];
      };
      table.setGlobalFilter = (updater) => {
        table.options.onGlobalFilterChange == null || table.options.onGlobalFilterChange(updater);
      };
      table.resetGlobalFilter = (defaultState) => {
        table.setGlobalFilter(defaultState ? void 0 : table.initialState.globalFilter);
      };
    }
  };
  var RowExpanding = {
    getInitialState: (state) => {
      return {
        expanded: {},
        ...state
      };
    },
    getDefaultOptions: (table) => {
      return {
        onExpandedChange: makeStateUpdater("expanded", table),
        paginateExpandedRows: true
      };
    },
    createTable: (table) => {
      let registered = false;
      let queued = false;
      table._autoResetExpanded = () => {
        var _ref, _table$options$autoRe;
        if (!registered) {
          table._queue(() => {
            registered = true;
          });
          return;
        }
        if ((_ref = (_table$options$autoRe = table.options.autoResetAll) != null ? _table$options$autoRe : table.options.autoResetExpanded) != null ? _ref : !table.options.manualExpanding) {
          if (queued)
            return;
          queued = true;
          table._queue(() => {
            table.resetExpanded();
            queued = false;
          });
        }
      };
      table.setExpanded = (updater) => table.options.onExpandedChange == null ? void 0 : table.options.onExpandedChange(updater);
      table.toggleAllRowsExpanded = (expanded) => {
        if (expanded != null ? expanded : !table.getIsAllRowsExpanded()) {
          table.setExpanded(true);
        } else {
          table.setExpanded({});
        }
      };
      table.resetExpanded = (defaultState) => {
        var _table$initialState$e, _table$initialState;
        table.setExpanded(defaultState ? {} : (_table$initialState$e = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.expanded) != null ? _table$initialState$e : {});
      };
      table.getCanSomeRowsExpand = () => {
        return table.getPrePaginationRowModel().flatRows.some((row) => row.getCanExpand());
      };
      table.getToggleAllRowsExpandedHandler = () => {
        return (e) => {
          e.persist == null || e.persist();
          table.toggleAllRowsExpanded();
        };
      };
      table.getIsSomeRowsExpanded = () => {
        const expanded = table.getState().expanded;
        return expanded === true || Object.values(expanded).some(Boolean);
      };
      table.getIsAllRowsExpanded = () => {
        const expanded = table.getState().expanded;
        if (typeof expanded === "boolean") {
          return expanded === true;
        }
        if (!Object.keys(expanded).length) {
          return false;
        }
        if (table.getRowModel().flatRows.some((row) => !row.getIsExpanded())) {
          return false;
        }
        return true;
      };
      table.getExpandedDepth = () => {
        let maxDepth = 0;
        const rowIds = table.getState().expanded === true ? Object.keys(table.getRowModel().rowsById) : Object.keys(table.getState().expanded);
        rowIds.forEach((id) => {
          const splitId = id.split(".");
          maxDepth = Math.max(maxDepth, splitId.length);
        });
        return maxDepth;
      };
      table.getPreExpandedRowModel = () => table.getSortedRowModel();
      table.getExpandedRowModel = () => {
        if (!table._getExpandedRowModel && table.options.getExpandedRowModel) {
          table._getExpandedRowModel = table.options.getExpandedRowModel(table);
        }
        if (table.options.manualExpanding || !table._getExpandedRowModel) {
          return table.getPreExpandedRowModel();
        }
        return table._getExpandedRowModel();
      };
    },
    createRow: (row, table) => {
      row.toggleExpanded = (expanded) => {
        table.setExpanded((old) => {
          var _expanded;
          const exists = old === true ? true : !!(old != null && old[row.id]);
          let oldExpanded = {};
          if (old === true) {
            Object.keys(table.getRowModel().rowsById).forEach((rowId) => {
              oldExpanded[rowId] = true;
            });
          } else {
            oldExpanded = old;
          }
          expanded = (_expanded = expanded) != null ? _expanded : !exists;
          if (!exists && expanded) {
            return {
              ...oldExpanded,
              [row.id]: true
            };
          }
          if (exists && !expanded) {
            const {
              [row.id]: _,
              ...rest
            } = oldExpanded;
            return rest;
          }
          return old;
        });
      };
      row.getIsExpanded = () => {
        var _table$options$getIsR;
        const expanded = table.getState().expanded;
        return !!((_table$options$getIsR = table.options.getIsRowExpanded == null ? void 0 : table.options.getIsRowExpanded(row)) != null ? _table$options$getIsR : expanded === true || (expanded == null ? void 0 : expanded[row.id]));
      };
      row.getCanExpand = () => {
        var _table$options$getRow, _table$options$enable, _row$subRows;
        return (_table$options$getRow = table.options.getRowCanExpand == null ? void 0 : table.options.getRowCanExpand(row)) != null ? _table$options$getRow : ((_table$options$enable = table.options.enableExpanding) != null ? _table$options$enable : true) && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
      };
      row.getIsAllParentsExpanded = () => {
        let isFullyExpanded = true;
        let currentRow = row;
        while (isFullyExpanded && currentRow.parentId) {
          currentRow = table.getRow(currentRow.parentId, true);
          isFullyExpanded = currentRow.getIsExpanded();
        }
        return isFullyExpanded;
      };
      row.getToggleExpandedHandler = () => {
        const canExpand = row.getCanExpand();
        return () => {
          if (!canExpand)
            return;
          row.toggleExpanded();
        };
      };
    }
  };
  var defaultPageIndex = 0;
  var defaultPageSize = 10;
  var getDefaultPaginationState = () => ({
    pageIndex: defaultPageIndex,
    pageSize: defaultPageSize
  });
  var RowPagination = {
    getInitialState: (state) => {
      return {
        ...state,
        pagination: {
          ...getDefaultPaginationState(),
          ...state == null ? void 0 : state.pagination
        }
      };
    },
    getDefaultOptions: (table) => {
      return {
        onPaginationChange: makeStateUpdater("pagination", table)
      };
    },
    createTable: (table) => {
      let registered = false;
      let queued = false;
      table._autoResetPageIndex = () => {
        var _ref, _table$options$autoRe;
        if (!registered) {
          table._queue(() => {
            registered = true;
          });
          return;
        }
        if ((_ref = (_table$options$autoRe = table.options.autoResetAll) != null ? _table$options$autoRe : table.options.autoResetPageIndex) != null ? _ref : !table.options.manualPagination) {
          if (queued)
            return;
          queued = true;
          table._queue(() => {
            table.resetPageIndex();
            queued = false;
          });
        }
      };
      table.setPagination = (updater) => {
        const safeUpdater = (old) => {
          let newState = functionalUpdate(updater, old);
          return newState;
        };
        return table.options.onPaginationChange == null ? void 0 : table.options.onPaginationChange(safeUpdater);
      };
      table.resetPagination = (defaultState) => {
        var _table$initialState$p;
        table.setPagination(defaultState ? getDefaultPaginationState() : (_table$initialState$p = table.initialState.pagination) != null ? _table$initialState$p : getDefaultPaginationState());
      };
      table.setPageIndex = (updater) => {
        table.setPagination((old) => {
          let pageIndex = functionalUpdate(updater, old.pageIndex);
          const maxPageIndex = typeof table.options.pageCount === "undefined" || table.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : table.options.pageCount - 1;
          pageIndex = Math.max(0, Math.min(pageIndex, maxPageIndex));
          return {
            ...old,
            pageIndex
          };
        });
      };
      table.resetPageIndex = (defaultState) => {
        var _table$initialState$p2, _table$initialState;
        table.setPageIndex(defaultState ? defaultPageIndex : (_table$initialState$p2 = (_table$initialState = table.initialState) == null || (_table$initialState = _table$initialState.pagination) == null ? void 0 : _table$initialState.pageIndex) != null ? _table$initialState$p2 : defaultPageIndex);
      };
      table.resetPageSize = (defaultState) => {
        var _table$initialState$p3, _table$initialState2;
        table.setPageSize(defaultState ? defaultPageSize : (_table$initialState$p3 = (_table$initialState2 = table.initialState) == null || (_table$initialState2 = _table$initialState2.pagination) == null ? void 0 : _table$initialState2.pageSize) != null ? _table$initialState$p3 : defaultPageSize);
      };
      table.setPageSize = (updater) => {
        table.setPagination((old) => {
          const pageSize = Math.max(1, functionalUpdate(updater, old.pageSize));
          const topRowIndex = old.pageSize * old.pageIndex;
          const pageIndex = Math.floor(topRowIndex / pageSize);
          return {
            ...old,
            pageIndex,
            pageSize
          };
        });
      };
      table.setPageCount = (updater) => table.setPagination((old) => {
        var _table$options$pageCo;
        let newPageCount = functionalUpdate(updater, (_table$options$pageCo = table.options.pageCount) != null ? _table$options$pageCo : -1);
        if (typeof newPageCount === "number") {
          newPageCount = Math.max(-1, newPageCount);
        }
        return {
          ...old,
          pageCount: newPageCount
        };
      });
      table.getPageOptions = memo(() => [table.getPageCount()], (pageCount) => {
        let pageOptions = [];
        if (pageCount && pageCount > 0) {
          pageOptions = [...new Array(pageCount)].fill(null).map((_, i) => i);
        }
        return pageOptions;
      }, getMemoOptions(table.options, "debugTable", "getPageOptions"));
      table.getCanPreviousPage = () => table.getState().pagination.pageIndex > 0;
      table.getCanNextPage = () => {
        const {
          pageIndex
        } = table.getState().pagination;
        const pageCount = table.getPageCount();
        if (pageCount === -1) {
          return true;
        }
        if (pageCount === 0) {
          return false;
        }
        return pageIndex < pageCount - 1;
      };
      table.previousPage = () => {
        return table.setPageIndex((old) => old - 1);
      };
      table.nextPage = () => {
        return table.setPageIndex((old) => {
          return old + 1;
        });
      };
      table.firstPage = () => {
        return table.setPageIndex(0);
      };
      table.lastPage = () => {
        return table.setPageIndex(table.getPageCount() - 1);
      };
      table.getPrePaginationRowModel = () => table.getExpandedRowModel();
      table.getPaginationRowModel = () => {
        if (!table._getPaginationRowModel && table.options.getPaginationRowModel) {
          table._getPaginationRowModel = table.options.getPaginationRowModel(table);
        }
        if (table.options.manualPagination || !table._getPaginationRowModel) {
          return table.getPrePaginationRowModel();
        }
        return table._getPaginationRowModel();
      };
      table.getPageCount = () => {
        var _table$options$pageCo2;
        return (_table$options$pageCo2 = table.options.pageCount) != null ? _table$options$pageCo2 : Math.ceil(table.getRowCount() / table.getState().pagination.pageSize);
      };
      table.getRowCount = () => {
        var _table$options$rowCou;
        return (_table$options$rowCou = table.options.rowCount) != null ? _table$options$rowCou : table.getPrePaginationRowModel().rows.length;
      };
    }
  };
  var getDefaultRowPinningState = () => ({
    top: [],
    bottom: []
  });
  var RowPinning = {
    getInitialState: (state) => {
      return {
        rowPinning: getDefaultRowPinningState(),
        ...state
      };
    },
    getDefaultOptions: (table) => {
      return {
        onRowPinningChange: makeStateUpdater("rowPinning", table)
      };
    },
    createRow: (row, table) => {
      row.pin = (position, includeLeafRows, includeParentRows) => {
        const leafRowIds = includeLeafRows ? row.getLeafRows().map((_ref) => {
          let {
            id
          } = _ref;
          return id;
        }) : [];
        const parentRowIds = includeParentRows ? row.getParentRows().map((_ref2) => {
          let {
            id
          } = _ref2;
          return id;
        }) : [];
        const rowIds = /* @__PURE__ */ new Set([...parentRowIds, row.id, ...leafRowIds]);
        table.setRowPinning((old) => {
          var _old$top3, _old$bottom3;
          if (position === "bottom") {
            var _old$top, _old$bottom;
            return {
              top: ((_old$top = old == null ? void 0 : old.top) != null ? _old$top : []).filter((d) => !(rowIds != null && rowIds.has(d))),
              bottom: [...((_old$bottom = old == null ? void 0 : old.bottom) != null ? _old$bottom : []).filter((d) => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)]
            };
          }
          if (position === "top") {
            var _old$top2, _old$bottom2;
            return {
              top: [...((_old$top2 = old == null ? void 0 : old.top) != null ? _old$top2 : []).filter((d) => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)],
              bottom: ((_old$bottom2 = old == null ? void 0 : old.bottom) != null ? _old$bottom2 : []).filter((d) => !(rowIds != null && rowIds.has(d)))
            };
          }
          return {
            top: ((_old$top3 = old == null ? void 0 : old.top) != null ? _old$top3 : []).filter((d) => !(rowIds != null && rowIds.has(d))),
            bottom: ((_old$bottom3 = old == null ? void 0 : old.bottom) != null ? _old$bottom3 : []).filter((d) => !(rowIds != null && rowIds.has(d)))
          };
        });
      };
      row.getCanPin = () => {
        var _ref3;
        const {
          enableRowPinning,
          enablePinning
        } = table.options;
        if (typeof enableRowPinning === "function") {
          return enableRowPinning(row);
        }
        return (_ref3 = enableRowPinning != null ? enableRowPinning : enablePinning) != null ? _ref3 : true;
      };
      row.getIsPinned = () => {
        const rowIds = [row.id];
        const {
          top,
          bottom
        } = table.getState().rowPinning;
        const isTop = rowIds.some((d) => top == null ? void 0 : top.includes(d));
        const isBottom = rowIds.some((d) => bottom == null ? void 0 : bottom.includes(d));
        return isTop ? "top" : isBottom ? "bottom" : false;
      };
      row.getPinnedIndex = () => {
        var _table$_getPinnedRows, _visiblePinnedRowIds$;
        const position = row.getIsPinned();
        if (!position)
          return -1;
        const visiblePinnedRowIds = (_table$_getPinnedRows = table._getPinnedRows(position)) == null ? void 0 : _table$_getPinnedRows.map((_ref4) => {
          let {
            id
          } = _ref4;
          return id;
        });
        return (_visiblePinnedRowIds$ = visiblePinnedRowIds == null ? void 0 : visiblePinnedRowIds.indexOf(row.id)) != null ? _visiblePinnedRowIds$ : -1;
      };
    },
    createTable: (table) => {
      table.setRowPinning = (updater) => table.options.onRowPinningChange == null ? void 0 : table.options.onRowPinningChange(updater);
      table.resetRowPinning = (defaultState) => {
        var _table$initialState$r, _table$initialState;
        return table.setRowPinning(defaultState ? getDefaultRowPinningState() : (_table$initialState$r = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.rowPinning) != null ? _table$initialState$r : getDefaultRowPinningState());
      };
      table.getIsSomeRowsPinned = (position) => {
        var _pinningState$positio;
        const pinningState = table.getState().rowPinning;
        if (!position) {
          var _pinningState$top, _pinningState$bottom;
          return Boolean(((_pinningState$top = pinningState.top) == null ? void 0 : _pinningState$top.length) || ((_pinningState$bottom = pinningState.bottom) == null ? void 0 : _pinningState$bottom.length));
        }
        return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
      };
      table._getPinnedRows = memo((position) => [table.getRowModel().rows, table.getState().rowPinning[position], position], (visibleRows, pinnedRowIds, position) => {
        var _table$options$keepPi;
        const rows = ((_table$options$keepPi = table.options.keepPinnedRows) != null ? _table$options$keepPi : true) ? (
          //get all rows that are pinned even if they would not be otherwise visible
          //account for expanded parent rows, but not pagination or filtering
          (pinnedRowIds != null ? pinnedRowIds : []).map((rowId) => {
            const row = table.getRow(rowId, true);
            return row.getIsAllParentsExpanded() ? row : null;
          })
        ) : (
          //else get only visible rows that are pinned
          (pinnedRowIds != null ? pinnedRowIds : []).map((rowId) => visibleRows.find((row) => row.id === rowId))
        );
        return rows.filter(Boolean).map((d) => ({
          ...d,
          position
        }));
      }, getMemoOptions(table.options, "debugRows", "_getPinnedRows"));
      table.getTopRows = () => table._getPinnedRows("top");
      table.getBottomRows = () => table._getPinnedRows("bottom");
      table.getCenterRows = memo(() => [table.getRowModel().rows, table.getState().rowPinning.top, table.getState().rowPinning.bottom], (allRows, top, bottom) => {
        const topAndBottom = /* @__PURE__ */ new Set([...top != null ? top : [], ...bottom != null ? bottom : []]);
        return allRows.filter((d) => !topAndBottom.has(d.id));
      }, getMemoOptions(table.options, "debugRows", "getCenterRows"));
    }
  };
  var RowSelection = {
    getInitialState: (state) => {
      return {
        rowSelection: {},
        ...state
      };
    },
    getDefaultOptions: (table) => {
      return {
        onRowSelectionChange: makeStateUpdater("rowSelection", table),
        enableRowSelection: true,
        enableMultiRowSelection: true,
        enableSubRowSelection: true
        // enableGroupingRowSelection: false,
        // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
        // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
      };
    },
    createTable: (table) => {
      table.setRowSelection = (updater) => table.options.onRowSelectionChange == null ? void 0 : table.options.onRowSelectionChange(updater);
      table.resetRowSelection = (defaultState) => {
        var _table$initialState$r;
        return table.setRowSelection(defaultState ? {} : (_table$initialState$r = table.initialState.rowSelection) != null ? _table$initialState$r : {});
      };
      table.toggleAllRowsSelected = (value) => {
        table.setRowSelection((old) => {
          value = typeof value !== "undefined" ? value : !table.getIsAllRowsSelected();
          const rowSelection = {
            ...old
          };
          const preGroupedFlatRows = table.getPreGroupedRowModel().flatRows;
          if (value) {
            preGroupedFlatRows.forEach((row) => {
              if (!row.getCanSelect()) {
                return;
              }
              rowSelection[row.id] = true;
            });
          } else {
            preGroupedFlatRows.forEach((row) => {
              delete rowSelection[row.id];
            });
          }
          return rowSelection;
        });
      };
      table.toggleAllPageRowsSelected = (value) => table.setRowSelection((old) => {
        const resolvedValue = typeof value !== "undefined" ? value : !table.getIsAllPageRowsSelected();
        const rowSelection = {
          ...old
        };
        table.getRowModel().rows.forEach((row) => {
          mutateRowIsSelected(rowSelection, row.id, resolvedValue, true, table);
        });
        return rowSelection;
      });
      table.getPreSelectedRowModel = () => table.getCoreRowModel();
      table.getSelectedRowModel = memo(() => [table.getState().rowSelection, table.getCoreRowModel()], (rowSelection, rowModel) => {
        if (!Object.keys(rowSelection).length) {
          return {
            rows: [],
            flatRows: [],
            rowsById: {}
          };
        }
        return selectRowsFn(table, rowModel);
      }, getMemoOptions(table.options, "debugTable", "getSelectedRowModel"));
      table.getFilteredSelectedRowModel = memo(() => [table.getState().rowSelection, table.getFilteredRowModel()], (rowSelection, rowModel) => {
        if (!Object.keys(rowSelection).length) {
          return {
            rows: [],
            flatRows: [],
            rowsById: {}
          };
        }
        return selectRowsFn(table, rowModel);
      }, getMemoOptions(table.options, "debugTable", "getFilteredSelectedRowModel"));
      table.getGroupedSelectedRowModel = memo(() => [table.getState().rowSelection, table.getSortedRowModel()], (rowSelection, rowModel) => {
        if (!Object.keys(rowSelection).length) {
          return {
            rows: [],
            flatRows: [],
            rowsById: {}
          };
        }
        return selectRowsFn(table, rowModel);
      }, getMemoOptions(table.options, "debugTable", "getGroupedSelectedRowModel"));
      table.getIsAllRowsSelected = () => {
        const preGroupedFlatRows = table.getFilteredRowModel().flatRows;
        const {
          rowSelection
        } = table.getState();
        let isAllRowsSelected = Boolean(preGroupedFlatRows.length && Object.keys(rowSelection).length);
        if (isAllRowsSelected) {
          if (preGroupedFlatRows.some((row) => row.getCanSelect() && !rowSelection[row.id])) {
            isAllRowsSelected = false;
          }
        }
        return isAllRowsSelected;
      };
      table.getIsAllPageRowsSelected = () => {
        const paginationFlatRows = table.getPaginationRowModel().flatRows.filter((row) => row.getCanSelect());
        const {
          rowSelection
        } = table.getState();
        let isAllPageRowsSelected = !!paginationFlatRows.length;
        if (isAllPageRowsSelected && paginationFlatRows.some((row) => !rowSelection[row.id])) {
          isAllPageRowsSelected = false;
        }
        return isAllPageRowsSelected;
      };
      table.getIsSomeRowsSelected = () => {
        var _table$getState$rowSe;
        const totalSelected = Object.keys((_table$getState$rowSe = table.getState().rowSelection) != null ? _table$getState$rowSe : {}).length;
        return totalSelected > 0 && totalSelected < table.getFilteredRowModel().flatRows.length;
      };
      table.getIsSomePageRowsSelected = () => {
        const paginationFlatRows = table.getPaginationRowModel().flatRows;
        return table.getIsAllPageRowsSelected() ? false : paginationFlatRows.filter((row) => row.getCanSelect()).some((d) => d.getIsSelected() || d.getIsSomeSelected());
      };
      table.getToggleAllRowsSelectedHandler = () => {
        return (e) => {
          table.toggleAllRowsSelected(e.target.checked);
        };
      };
      table.getToggleAllPageRowsSelectedHandler = () => {
        return (e) => {
          table.toggleAllPageRowsSelected(e.target.checked);
        };
      };
    },
    createRow: (row, table) => {
      row.toggleSelected = (value, opts) => {
        const isSelected = row.getIsSelected();
        table.setRowSelection((old) => {
          var _opts$selectChildren;
          value = typeof value !== "undefined" ? value : !isSelected;
          if (row.getCanSelect() && isSelected === value) {
            return old;
          }
          const selectedRowIds = {
            ...old
          };
          mutateRowIsSelected(selectedRowIds, row.id, value, (_opts$selectChildren = opts == null ? void 0 : opts.selectChildren) != null ? _opts$selectChildren : true, table);
          return selectedRowIds;
        });
      };
      row.getIsSelected = () => {
        const {
          rowSelection
        } = table.getState();
        return isRowSelected(row, rowSelection);
      };
      row.getIsSomeSelected = () => {
        const {
          rowSelection
        } = table.getState();
        return isSubRowSelected(row, rowSelection) === "some";
      };
      row.getIsAllSubRowsSelected = () => {
        const {
          rowSelection
        } = table.getState();
        return isSubRowSelected(row, rowSelection) === "all";
      };
      row.getCanSelect = () => {
        var _table$options$enable;
        if (typeof table.options.enableRowSelection === "function") {
          return table.options.enableRowSelection(row);
        }
        return (_table$options$enable = table.options.enableRowSelection) != null ? _table$options$enable : true;
      };
      row.getCanSelectSubRows = () => {
        var _table$options$enable2;
        if (typeof table.options.enableSubRowSelection === "function") {
          return table.options.enableSubRowSelection(row);
        }
        return (_table$options$enable2 = table.options.enableSubRowSelection) != null ? _table$options$enable2 : true;
      };
      row.getCanMultiSelect = () => {
        var _table$options$enable3;
        if (typeof table.options.enableMultiRowSelection === "function") {
          return table.options.enableMultiRowSelection(row);
        }
        return (_table$options$enable3 = table.options.enableMultiRowSelection) != null ? _table$options$enable3 : true;
      };
      row.getToggleSelectedHandler = () => {
        const canSelect = row.getCanSelect();
        return (e) => {
          var _target;
          if (!canSelect)
            return;
          row.toggleSelected((_target = e.target) == null ? void 0 : _target.checked);
        };
      };
    }
  };
  var mutateRowIsSelected = (selectedRowIds, id, value, includeChildren, table) => {
    var _row$subRows;
    const row = table.getRow(id, true);
    if (value) {
      if (!row.getCanMultiSelect()) {
        Object.keys(selectedRowIds).forEach((key) => delete selectedRowIds[key]);
      }
      if (row.getCanSelect()) {
        selectedRowIds[id] = true;
      }
    } else {
      delete selectedRowIds[id];
    }
    if (includeChildren && (_row$subRows = row.subRows) != null && _row$subRows.length && row.getCanSelectSubRows()) {
      row.subRows.forEach((row2) => mutateRowIsSelected(selectedRowIds, row2.id, value, includeChildren, table));
    }
  };
  function selectRowsFn(table, rowModel) {
    const rowSelection = table.getState().rowSelection;
    const newSelectedFlatRows = [];
    const newSelectedRowsById = {};
    const recurseRows = function(rows, depth) {
      return rows.map((row) => {
        var _row$subRows2;
        const isSelected = isRowSelected(row, rowSelection);
        if (isSelected) {
          newSelectedFlatRows.push(row);
          newSelectedRowsById[row.id] = row;
        }
        if ((_row$subRows2 = row.subRows) != null && _row$subRows2.length) {
          row = {
            ...row,
            subRows: recurseRows(row.subRows)
          };
        }
        if (isSelected) {
          return row;
        }
      }).filter(Boolean);
    };
    return {
      rows: recurseRows(rowModel.rows),
      flatRows: newSelectedFlatRows,
      rowsById: newSelectedRowsById
    };
  }
  function isRowSelected(row, selection) {
    var _selection$row$id;
    return (_selection$row$id = selection[row.id]) != null ? _selection$row$id : false;
  }
  function isSubRowSelected(row, selection, table) {
    var _row$subRows3;
    if (!((_row$subRows3 = row.subRows) != null && _row$subRows3.length))
      return false;
    let allChildrenSelected = true;
    let someSelected = false;
    row.subRows.forEach((subRow) => {
      if (someSelected && !allChildrenSelected) {
        return;
      }
      if (subRow.getCanSelect()) {
        if (isRowSelected(subRow, selection)) {
          someSelected = true;
        } else {
          allChildrenSelected = false;
        }
      }
      if (subRow.subRows && subRow.subRows.length) {
        const subRowChildrenSelected = isSubRowSelected(subRow, selection);
        if (subRowChildrenSelected === "all") {
          someSelected = true;
        } else if (subRowChildrenSelected === "some") {
          someSelected = true;
          allChildrenSelected = false;
        } else {
          allChildrenSelected = false;
        }
      }
    });
    return allChildrenSelected ? "all" : someSelected ? "some" : false;
  }
  var reSplitAlphaNumeric = /([0-9]+)/gm;
  var alphanumeric = (rowA, rowB, columnId) => {
    return compareAlphanumeric(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
  };
  var alphanumericCaseSensitive = (rowA, rowB, columnId) => {
    return compareAlphanumeric(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
  };
  var text2 = (rowA, rowB, columnId) => {
    return compareBasic(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
  };
  var textCaseSensitive = (rowA, rowB, columnId) => {
    return compareBasic(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
  };
  var datetime = (rowA, rowB, columnId) => {
    const a = rowA.getValue(columnId);
    const b = rowB.getValue(columnId);
    return a > b ? 1 : a < b ? -1 : 0;
  };
  var basic = (rowA, rowB, columnId) => {
    return compareBasic(rowA.getValue(columnId), rowB.getValue(columnId));
  };
  function compareBasic(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
  }
  function toString(a) {
    if (typeof a === "number") {
      if (isNaN(a) || a === Infinity || a === -Infinity) {
        return "";
      }
      return String(a);
    }
    if (typeof a === "string") {
      return a;
    }
    return "";
  }
  function compareAlphanumeric(aStr, bStr) {
    const a = aStr.split(reSplitAlphaNumeric).filter(Boolean);
    const b = bStr.split(reSplitAlphaNumeric).filter(Boolean);
    while (a.length && b.length) {
      const aa = a.shift();
      const bb = b.shift();
      const an = parseInt(aa, 10);
      const bn = parseInt(bb, 10);
      const combo = [an, bn].sort();
      if (isNaN(combo[0])) {
        if (aa > bb) {
          return 1;
        }
        if (bb > aa) {
          return -1;
        }
        continue;
      }
      if (isNaN(combo[1])) {
        return isNaN(an) ? -1 : 1;
      }
      if (an > bn) {
        return 1;
      }
      if (bn > an) {
        return -1;
      }
    }
    return a.length - b.length;
  }
  var sortingFns = {
    alphanumeric,
    alphanumericCaseSensitive,
    text: text2,
    textCaseSensitive,
    datetime,
    basic
  };
  var RowSorting = {
    getInitialState: (state) => {
      return {
        sorting: [],
        ...state
      };
    },
    getDefaultColumnDef: () => {
      return {
        sortingFn: "auto",
        sortUndefined: 1
      };
    },
    getDefaultOptions: (table) => {
      return {
        onSortingChange: makeStateUpdater("sorting", table),
        isMultiSortEvent: (e) => {
          return e.shiftKey;
        }
      };
    },
    createColumn: (column, table) => {
      column.getAutoSortingFn = () => {
        const firstRows = table.getFilteredRowModel().flatRows.slice(10);
        let isString = false;
        for (const row of firstRows) {
          const value = row == null ? void 0 : row.getValue(column.id);
          if (Object.prototype.toString.call(value) === "[object Date]") {
            return sortingFns.datetime;
          }
          if (typeof value === "string") {
            isString = true;
            if (value.split(reSplitAlphaNumeric).length > 1) {
              return sortingFns.alphanumeric;
            }
          }
        }
        if (isString) {
          return sortingFns.text;
        }
        return sortingFns.basic;
      };
      column.getAutoSortDir = () => {
        const firstRow = table.getFilteredRowModel().flatRows[0];
        const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
        if (typeof value === "string") {
          return "asc";
        }
        return "desc";
      };
      column.getSortingFn = () => {
        var _table$options$sortin, _table$options$sortin2;
        if (!column) {
          throw new Error();
        }
        return isFunction(column.columnDef.sortingFn) ? column.columnDef.sortingFn : column.columnDef.sortingFn === "auto" ? column.getAutoSortingFn() : (_table$options$sortin = (_table$options$sortin2 = table.options.sortingFns) == null ? void 0 : _table$options$sortin2[column.columnDef.sortingFn]) != null ? _table$options$sortin : sortingFns[column.columnDef.sortingFn];
      };
      column.toggleSorting = (desc, multi) => {
        const nextSortingOrder = column.getNextSortingOrder();
        const hasManualValue = typeof desc !== "undefined" && desc !== null;
        table.setSorting((old) => {
          const existingSorting = old == null ? void 0 : old.find((d) => d.id === column.id);
          const existingIndex = old == null ? void 0 : old.findIndex((d) => d.id === column.id);
          let newSorting = [];
          let sortAction;
          let nextDesc = hasManualValue ? desc : nextSortingOrder === "desc";
          if (old != null && old.length && column.getCanMultiSort() && multi) {
            if (existingSorting) {
              sortAction = "toggle";
            } else {
              sortAction = "add";
            }
          } else {
            if (old != null && old.length && existingIndex !== old.length - 1) {
              sortAction = "replace";
            } else if (existingSorting) {
              sortAction = "toggle";
            } else {
              sortAction = "replace";
            }
          }
          if (sortAction === "toggle") {
            if (!hasManualValue) {
              if (!nextSortingOrder) {
                sortAction = "remove";
              }
            }
          }
          if (sortAction === "add") {
            var _table$options$maxMul;
            newSorting = [...old, {
              id: column.id,
              desc: nextDesc
            }];
            newSorting.splice(0, newSorting.length - ((_table$options$maxMul = table.options.maxMultiSortColCount) != null ? _table$options$maxMul : Number.MAX_SAFE_INTEGER));
          } else if (sortAction === "toggle") {
            newSorting = old.map((d) => {
              if (d.id === column.id) {
                return {
                  ...d,
                  desc: nextDesc
                };
              }
              return d;
            });
          } else if (sortAction === "remove") {
            newSorting = old.filter((d) => d.id !== column.id);
          } else {
            newSorting = [{
              id: column.id,
              desc: nextDesc
            }];
          }
          return newSorting;
        });
      };
      column.getFirstSortDir = () => {
        var _ref, _column$columnDef$sor;
        const sortDescFirst = (_ref = (_column$columnDef$sor = column.columnDef.sortDescFirst) != null ? _column$columnDef$sor : table.options.sortDescFirst) != null ? _ref : column.getAutoSortDir() === "desc";
        return sortDescFirst ? "desc" : "asc";
      };
      column.getNextSortingOrder = (multi) => {
        var _table$options$enable, _table$options$enable2;
        const firstSortDirection = column.getFirstSortDir();
        const isSorted = column.getIsSorted();
        if (!isSorted) {
          return firstSortDirection;
        }
        if (isSorted !== firstSortDirection && ((_table$options$enable = table.options.enableSortingRemoval) != null ? _table$options$enable : true) && // If enableSortRemove, enable in general
        (multi ? (_table$options$enable2 = table.options.enableMultiRemove) != null ? _table$options$enable2 : true : true)) {
          return false;
        }
        return isSorted === "desc" ? "asc" : "desc";
      };
      column.getCanSort = () => {
        var _column$columnDef$ena, _table$options$enable3;
        return ((_column$columnDef$ena = column.columnDef.enableSorting) != null ? _column$columnDef$ena : true) && ((_table$options$enable3 = table.options.enableSorting) != null ? _table$options$enable3 : true) && !!column.accessorFn;
      };
      column.getCanMultiSort = () => {
        var _ref2, _column$columnDef$ena2;
        return (_ref2 = (_column$columnDef$ena2 = column.columnDef.enableMultiSort) != null ? _column$columnDef$ena2 : table.options.enableMultiSort) != null ? _ref2 : !!column.accessorFn;
      };
      column.getIsSorted = () => {
        var _table$getState$sorti;
        const columnSort = (_table$getState$sorti = table.getState().sorting) == null ? void 0 : _table$getState$sorti.find((d) => d.id === column.id);
        return !columnSort ? false : columnSort.desc ? "desc" : "asc";
      };
      column.getSortIndex = () => {
        var _table$getState$sorti2, _table$getState$sorti3;
        return (_table$getState$sorti2 = (_table$getState$sorti3 = table.getState().sorting) == null ? void 0 : _table$getState$sorti3.findIndex((d) => d.id === column.id)) != null ? _table$getState$sorti2 : -1;
      };
      column.clearSorting = () => {
        table.setSorting((old) => old != null && old.length ? old.filter((d) => d.id !== column.id) : []);
      };
      column.getToggleSortingHandler = () => {
        const canSort = column.getCanSort();
        return (e) => {
          if (!canSort)
            return;
          e.persist == null || e.persist();
          column.toggleSorting == null || column.toggleSorting(void 0, column.getCanMultiSort() ? table.options.isMultiSortEvent == null ? void 0 : table.options.isMultiSortEvent(e) : false);
        };
      };
    },
    createTable: (table) => {
      table.setSorting = (updater) => table.options.onSortingChange == null ? void 0 : table.options.onSortingChange(updater);
      table.resetSorting = (defaultState) => {
        var _table$initialState$s, _table$initialState;
        table.setSorting(defaultState ? [] : (_table$initialState$s = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.sorting) != null ? _table$initialState$s : []);
      };
      table.getPreSortedRowModel = () => table.getGroupedRowModel();
      table.getSortedRowModel = () => {
        if (!table._getSortedRowModel && table.options.getSortedRowModel) {
          table._getSortedRowModel = table.options.getSortedRowModel(table);
        }
        if (table.options.manualSorting || !table._getSortedRowModel) {
          return table.getPreSortedRowModel();
        }
        return table._getSortedRowModel();
      };
    }
  };
  var builtInFeatures = [
    Headers,
    ColumnVisibility,
    ColumnOrdering,
    ColumnPinning,
    ColumnFaceting,
    ColumnFiltering,
    GlobalFaceting,
    //depends on ColumnFaceting
    GlobalFiltering,
    //depends on ColumnFiltering
    RowSorting,
    ColumnGrouping,
    //depends on RowSorting
    RowExpanding,
    RowPagination,
    RowPinning,
    RowSelection,
    ColumnSizing
  ];
  function createTable(options) {
    var _options$_features, _options$initialState;
    if (options.debugAll || options.debugTable) {
      console.info("Creating Table Instance...");
    }
    const _features = [...builtInFeatures, ...(_options$_features = options._features) != null ? _options$_features : []];
    let table = {
      _features
    };
    const defaultOptions = table._features.reduce((obj, feature) => {
      return Object.assign(obj, feature.getDefaultOptions == null ? void 0 : feature.getDefaultOptions(table));
    }, {});
    const mergeOptions = (options2) => {
      if (table.options.mergeOptions) {
        return table.options.mergeOptions(defaultOptions, options2);
      }
      return {
        ...defaultOptions,
        ...options2
      };
    };
    const coreInitialState = {};
    let initialState = {
      ...coreInitialState,
      ...(_options$initialState = options.initialState) != null ? _options$initialState : {}
    };
    table._features.forEach((feature) => {
      var _feature$getInitialSt;
      initialState = (_feature$getInitialSt = feature.getInitialState == null ? void 0 : feature.getInitialState(initialState)) != null ? _feature$getInitialSt : initialState;
    });
    const queued = [];
    let queuedTimeout = false;
    const coreInstance = {
      _features,
      options: {
        ...defaultOptions,
        ...options
      },
      initialState,
      _queue: (cb) => {
        queued.push(cb);
        if (!queuedTimeout) {
          queuedTimeout = true;
          Promise.resolve().then(() => {
            while (queued.length) {
              queued.shift()();
            }
            queuedTimeout = false;
          }).catch((error) => setTimeout(() => {
            throw error;
          }));
        }
      },
      reset: () => {
        table.setState(table.initialState);
      },
      setOptions: (updater) => {
        const newOptions = functionalUpdate(updater, table.options);
        table.options = mergeOptions(newOptions);
      },
      getState: () => {
        return table.options.state;
      },
      setState: (updater) => {
        table.options.onStateChange == null || table.options.onStateChange(updater);
      },
      _getRowId: (row, index, parent) => {
        var _table$options$getRow;
        return (_table$options$getRow = table.options.getRowId == null ? void 0 : table.options.getRowId(row, index, parent)) != null ? _table$options$getRow : `${parent ? [parent.id, index].join(".") : index}`;
      },
      getCoreRowModel: () => {
        if (!table._getCoreRowModel) {
          table._getCoreRowModel = table.options.getCoreRowModel(table);
        }
        return table._getCoreRowModel();
      },
      // The final calls start at the bottom of the model,
      // expanded rows, which then work their way up
      getRowModel: () => {
        return table.getPaginationRowModel();
      },
      //in next version, we should just pass in the row model as the optional 2nd arg
      getRow: (id, searchAll) => {
        let row = (searchAll ? table.getPrePaginationRowModel() : table.getRowModel()).rowsById[id];
        if (!row) {
          row = table.getCoreRowModel().rowsById[id];
          if (!row) {
            if (true) {
              throw new Error(`getRow could not find row with ID: ${id}`);
            }
            throw new Error();
          }
        }
        return row;
      },
      _getDefaultColumnDef: memo(() => [table.options.defaultColumn], (defaultColumn) => {
        var _defaultColumn;
        defaultColumn = (_defaultColumn = defaultColumn) != null ? _defaultColumn : {};
        return {
          header: (props) => {
            const resolvedColumnDef = props.header.column.columnDef;
            if (resolvedColumnDef.accessorKey) {
              return resolvedColumnDef.accessorKey;
            }
            if (resolvedColumnDef.accessorFn) {
              return resolvedColumnDef.id;
            }
            return null;
          },
          // footer: props => props.header.column.id,
          cell: (props) => {
            var _props$renderValue$to, _props$renderValue;
            return (_props$renderValue$to = (_props$renderValue = props.renderValue()) == null || _props$renderValue.toString == null ? void 0 : _props$renderValue.toString()) != null ? _props$renderValue$to : null;
          },
          ...table._features.reduce((obj, feature) => {
            return Object.assign(obj, feature.getDefaultColumnDef == null ? void 0 : feature.getDefaultColumnDef());
          }, {}),
          ...defaultColumn
        };
      }, getMemoOptions(options, "debugColumns", "_getDefaultColumnDef")),
      _getColumnDefs: () => table.options.columns,
      getAllColumns: memo(() => [table._getColumnDefs()], (columnDefs) => {
        const recurseColumns = function(columnDefs2, parent, depth) {
          if (depth === void 0) {
            depth = 0;
          }
          return columnDefs2.map((columnDef) => {
            const column = createColumn(table, columnDef, depth, parent);
            const groupingColumnDef = columnDef;
            column.columns = groupingColumnDef.columns ? recurseColumns(groupingColumnDef.columns, column, depth + 1) : [];
            return column;
          });
        };
        return recurseColumns(columnDefs);
      }, getMemoOptions(options, "debugColumns", "getAllColumns")),
      getAllFlatColumns: memo(() => [table.getAllColumns()], (allColumns) => {
        return allColumns.flatMap((column) => {
          return column.getFlatColumns();
        });
      }, getMemoOptions(options, "debugColumns", "getAllFlatColumns")),
      _getAllFlatColumnsById: memo(() => [table.getAllFlatColumns()], (flatColumns) => {
        return flatColumns.reduce((acc, column) => {
          acc[column.id] = column;
          return acc;
        }, {});
      }, getMemoOptions(options, "debugColumns", "getAllFlatColumnsById")),
      getAllLeafColumns: memo(() => [table.getAllColumns(), table._getOrderColumnsFn()], (allColumns, orderColumns2) => {
        let leafColumns = allColumns.flatMap((column) => column.getLeafColumns());
        return orderColumns2(leafColumns);
      }, getMemoOptions(options, "debugColumns", "getAllLeafColumns")),
      getColumn: (columnId) => {
        const column = table._getAllFlatColumnsById()[columnId];
        if (!column) {
          console.error(`[Table] Column with id '${columnId}' does not exist.`);
        }
        return column;
      }
    };
    Object.assign(table, coreInstance);
    for (let index = 0; index < table._features.length; index++) {
      const feature = table._features[index];
      feature == null || feature.createTable == null || feature.createTable(table);
    }
    return table;
  }
  function getCoreRowModel() {
    return (table) => memo(() => [table.options.data], (data) => {
      const rowModel = {
        rows: [],
        flatRows: [],
        rowsById: {}
      };
      const accessRows = function(originalRows, depth, parentRow) {
        if (depth === void 0) {
          depth = 0;
        }
        const rows = [];
        for (let i = 0; i < originalRows.length; i++) {
          const row = createRow(table, table._getRowId(originalRows[i], i, parentRow), originalRows[i], i, depth, void 0, parentRow == null ? void 0 : parentRow.id);
          rowModel.flatRows.push(row);
          rowModel.rowsById[row.id] = row;
          rows.push(row);
          if (table.options.getSubRows) {
            var _row$originalSubRows;
            row.originalSubRows = table.options.getSubRows(originalRows[i], i);
            if ((_row$originalSubRows = row.originalSubRows) != null && _row$originalSubRows.length) {
              row.subRows = accessRows(row.originalSubRows, depth + 1, row);
            }
          }
        }
        return rows;
      };
      rowModel.rows = accessRows(data);
      return rowModel;
    }, getMemoOptions(table.options, "debugTable", "getRowModel", () => table._autoResetPageIndex()));
  }

  // node_modules/svelte/src/runtime/store/index.js
  var subscriber_queue = [];
  function readable(value, start) {
    return {
      subscribe: writable(value, start).subscribe
    };
  }
  function writable(value, start = noop) {
    let stop;
    const subscribers = /* @__PURE__ */ new Set();
    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          const run_queue = !subscriber_queue.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update2(fn) {
      set(fn(value));
    }
    function subscribe2(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop = start(set, update2) || noop;
      }
      run2(value);
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0 && stop) {
          stop();
          stop = null;
        }
      };
    }
    return { set, update: update2, subscribe: subscribe2 };
  }
  function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single ? [stores] : stores;
    if (!stores_array.every(Boolean)) {
      throw new Error("derived() expects stores as input, got a falsy value");
    }
    const auto = fn.length < 2;
    return readable(initial_value, (set, update2) => {
      let started = false;
      const values = [];
      let pending = 0;
      let cleanup = noop;
      const sync = () => {
        if (pending) {
          return;
        }
        cleanup();
        const result = fn(single ? values[0] : values, set, update2);
        if (auto) {
          set(result);
        } else {
          cleanup = is_function(result) ? result : noop;
        }
      };
      const unsubscribers = stores_array.map(
        (store, i) => subscribe(
          store,
          (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (started) {
              sync();
            }
          },
          () => {
            pending |= 1 << i;
          }
        )
      );
      started = true;
      sync();
      return function stop() {
        run_all(unsubscribers);
        cleanup();
        started = false;
      };
    });
  }

  // node_modules/@tanstack/svelte-table/build/lib/index.mjs
  function create_fragment$1(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*content*/
          ctx[0]
        );
      },
      l(nodes) {
        t = claim_text(
          nodes,
          /*content*/
          ctx[0]
        );
      },
      m(target, anchor) {
        insert_hydration(target, t, anchor);
      },
      p(ctx2, [dirty]) {
        if (dirty & /*content*/
        1)
          set_data(
            t,
            /*content*/
            ctx2[0]
          );
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let { content } = $$props;
    $$self.$$set = ($$props2) => {
      if ("content" in $$props2)
        $$invalidate(0, content = $$props2.content);
    };
    return [content];
  }
  var Placeholder$1 = class Placeholder extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment$1, safe_not_equal, { content: 0 });
    }
  };
  var PlaceholderServer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    return `${escape($$props.content)}`;
  });
  var Placeholder2 = typeof document === "undefined" ? PlaceholderServer : Placeholder$1;
  function create_fragment(ctx, Comp, props) {
    let c;
    let current;
    c = new Comp({
      props,
      $$inline: true
    });
    return {
      c() {
        create_component(c.$$.fragment);
      },
      l(nodes) {
        claim_component(c.$$.fragment, nodes);
      },
      m(target, anchor) {
        mount_component(c, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(c.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(c.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(c, detaching);
      }
    };
  }
  function renderClient(Comp, props) {
    return class WrapperComp extends SvelteComponent {
      constructor(options) {
        super();
        init(this, options, null, (ctx) => create_fragment(ctx, Comp, props), safe_not_equal, {}, void 0);
      }
    };
  }
  function renderServer(Comp, props) {
    const WrapperComp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Comp, "TableComponent").$$render($$result, props, {}, {})}`;
    });
    return WrapperComp;
  }
  var renderComponent = typeof window === "undefined" ? renderServer : renderClient;
  function isSvelteServerComponent(component) {
    return typeof component === "object" && typeof component.$$render === "function" && typeof component.render === "function";
  }
  function isSvelteClientComponent(component) {
    var _component$name, _component$name2;
    let isHMR = "__SVELTE_HMR" in window;
    return component.prototype instanceof SvelteComponent || isHMR && ((_component$name = component.name) == null ? void 0 : _component$name.startsWith("Proxy<")) && ((_component$name2 = component.name) == null ? void 0 : _component$name2.endsWith(">"));
  }
  function isSvelteComponent(component) {
    if (typeof document === "undefined") {
      return isSvelteServerComponent(component);
    } else {
      return isSvelteClientComponent(component);
    }
  }
  function wrapInPlaceholder(content) {
    return renderComponent(Placeholder2, {
      content
    });
  }
  function flexRender(component, props) {
    if (!component)
      return null;
    if (isSvelteComponent(component)) {
      return renderComponent(component, props);
    }
    if (typeof component === "function") {
      const result = component(props);
      if (result === null || result === void 0)
        return null;
      if (isSvelteComponent(result)) {
        return renderComponent(result, props);
      }
      return wrapInPlaceholder(result);
    }
    return wrapInPlaceholder(component);
  }
  function createSvelteTable(options) {
    let optionsStore;
    if ("subscribe" in options) {
      optionsStore = options;
    } else {
      optionsStore = readable(options);
    }
    let resolvedOptions = {
      state: {},
      // Dummy state
      onStateChange: () => {
      },
      // noop
      renderFallbackValue: null,
      ...get_store_value(optionsStore)
    };
    let table = createTable(resolvedOptions);
    let stateStore = writable(
      /** @type {number} */
      table.initialState
    );
    let stateOptionsStore = derived([stateStore, optionsStore], (s) => s);
    const tableReadable = readable(table, function start(set) {
      const unsubscribe = stateOptionsStore.subscribe((_ref) => {
        let [state, options2] = _ref;
        table.setOptions((prev) => {
          return {
            ...prev,
            ...options2,
            state: {
              ...state,
              ...options2.state
            },
            // Similarly, we'll maintain both our internal state and any user-provided
            // state.
            onStateChange: (updater) => {
              if (updater instanceof Function) {
                stateStore.update(updater);
              } else {
                stateStore.set(updater);
              }
              resolvedOptions.onStateChange == null || resolvedOptions.onStateChange(updater);
            }
          };
        });
        set(table);
      });
      return function stop() {
        unsubscribe();
      };
    });
    return tableReadable;
  }

  // utils/mesa.js
  var initMesaComponent = (props) => {
    Binding = window.mesa.ShinyBinding;
    Binding.initializeComponent(props);
  };
  var registerMesaTable = (id, instance7) => {
    const tableIsRegistered = window.mesa.tableRegistry.filter((table) => table.id === id).length > 0 ? true : false;
    if (!tableIsRegistered) {
      window.mesa.tableRegistry.push({ id, instance: instance7 });
      return;
    }
    window.mesa.tableRegistry.forEach((table) => {
      if (table.id === id) {
        table.instance = instance7;
        return table;
      } else {
        return table;
      }
    });
  };
  var registerMesaData = (msg) => {
    const tableIsRegistered = window.mesa.tableRegistry.filter((table) => table.id === msg.id).length > 0 ? true : false;
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
  var resolveStyleOptions = (options) => {
    const tableClass = ["mesa-table"].concat(options.tableClass).filter((cls) => cls !== "").join(" ");
    const theadClass = ["mesa-thead"].concat(options.theadClass).filter((cls) => cls !== "").join(" ");
    const tbodyClass = ["mesa-tbody"].concat(options.tbodyClass).filter((cls) => cls !== "").join(" ");
    const thClass = ["mesa-th"].concat(options.thClass).filter((cls) => cls !== "").join(" ");
    const trClass = ["mesa-tr"].concat(options.trClass).filter((cls) => cls !== "").join(" ");
    const tdClass = ["mesa-td"].concat(options.tdClass).filter((cls) => cls !== "").join(" ");
    return {
      tableClass,
      theadClass,
      tbodyClass,
      thClass,
      trClass,
      tdClass
    };
  };

  // components/MesaClient.svelte
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[8] = list[i];
    return child_ctx;
  }
  function get_each_context_1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[11] = list[i];
    return child_ctx;
  }
  function get_each_context_2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[14] = list[i];
    return child_ctx;
  }
  function get_each_context_3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[17] = list[i];
    return child_ctx;
  }
  function create_if_block(ctx) {
    let th;
    let switch_instance;
    let th_class_value;
    let current;
    var switch_value = flexRender(
      /*header*/
      ctx[17].column.columnDef.header,
      /*header*/
      ctx[17].getContext()
    );
    function switch_props(ctx2, dirty) {
      return {};
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        th = element("th");
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        this.h();
      },
      l(nodes) {
        th = claim_element(nodes, "TH", { class: true });
        var th_nodes = children(th);
        if (switch_instance)
          claim_component(switch_instance.$$.fragment, th_nodes);
        th_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(th, "class", th_class_value = /*resolvedStyleOptions*/
        ctx[1].thClass);
      },
      m(target, anchor) {
        insert_hydration(target, th, anchor);
        if (switch_instance)
          mount_component(switch_instance, th, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*$table*/
        4 && switch_value !== (switch_value = flexRender(
          /*header*/
          ctx2[17].column.columnDef.header,
          /*header*/
          ctx2[17].getContext()
        ))) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, th, null);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && th_class_value !== (th_class_value = /*resolvedStyleOptions*/
        ctx2[1].thClass)) {
          attr(th, "class", th_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(th);
        }
        if (switch_instance)
          destroy_component(switch_instance);
      }
    };
  }
  function create_each_block_3(ctx) {
    let if_block_anchor;
    let current;
    let if_block = !/*header*/
    ctx[17].isPlaceholder && create_if_block(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      l(nodes) {
        if (if_block)
          if_block.l(nodes);
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert_hydration(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (!/*header*/
        ctx2[17].isPlaceholder) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*$table*/
            4) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_each_block_2(ctx) {
    let tr;
    let t;
    let tr_class_value;
    let current;
    let each_value_3 = ensure_array_like(
      /*headerGroup*/
      ctx[14].headers
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_3.length; i += 1) {
      each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        tr = element("tr");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t = space();
        this.h();
      },
      l(nodes) {
        tr = claim_element(nodes, "TR", { class: true });
        var tr_nodes = children(tr);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].l(tr_nodes);
        }
        t = claim_space(tr_nodes);
        tr_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(tr, "class", tr_class_value = /*resolvedStyleOptions*/
        ctx[1].trClass);
      },
      m(target, anchor) {
        insert_hydration(target, tr, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tr, null);
          }
        }
        append_hydration(tr, t);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*resolvedStyleOptions, $table*/
        6) {
          each_value_3 = ensure_array_like(
            /*headerGroup*/
            ctx2[14].headers
          );
          let i;
          for (i = 0; i < each_value_3.length; i += 1) {
            const child_ctx = get_each_context_3(ctx2, each_value_3, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_3(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tr, t);
            }
          }
          group_outros();
          for (i = each_value_3.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && tr_class_value !== (tr_class_value = /*resolvedStyleOptions*/
        ctx2[1].trClass)) {
          attr(tr, "class", tr_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_3.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_1(ctx) {
    let td;
    let switch_instance;
    let td_class_value;
    let current;
    var switch_value = flexRender(
      /*cell*/
      ctx[11].column.columnDef.cell,
      /*cell*/
      ctx[11].getContext()
    );
    function switch_props(ctx2, dirty) {
      return {};
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        td = element("td");
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        this.h();
      },
      l(nodes) {
        td = claim_element(nodes, "TD", { class: true });
        var td_nodes = children(td);
        if (switch_instance)
          claim_component(switch_instance.$$.fragment, td_nodes);
        td_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(td, "class", td_class_value = /*resolvedStyleOptions*/
        ctx[1].tdClass);
      },
      m(target, anchor) {
        insert_hydration(target, td, anchor);
        if (switch_instance)
          mount_component(switch_instance, td, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*$table*/
        4 && switch_value !== (switch_value = flexRender(
          /*cell*/
          ctx2[11].column.columnDef.cell,
          /*cell*/
          ctx2[11].getContext()
        ))) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, td, null);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && td_class_value !== (td_class_value = /*resolvedStyleOptions*/
        ctx2[1].tdClass)) {
          attr(td, "class", td_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(td);
        }
        if (switch_instance)
          destroy_component(switch_instance);
      }
    };
  }
  function create_each_block(ctx) {
    let tr;
    let t;
    let tr_class_value;
    let current;
    let each_value_1 = ensure_array_like(
      /*row*/
      ctx[8].getVisibleCells()
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        tr = element("tr");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t = space();
        this.h();
      },
      l(nodes) {
        tr = claim_element(nodes, "TR", { class: true });
        var tr_nodes = children(tr);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].l(tr_nodes);
        }
        t = claim_space(tr_nodes);
        tr_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(tr, "class", tr_class_value = /*resolvedStyleOptions*/
        ctx[1].trClass);
      },
      m(target, anchor) {
        insert_hydration(target, tr, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tr, null);
          }
        }
        append_hydration(tr, t);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*resolvedStyleOptions, $table*/
        6) {
          each_value_1 = ensure_array_like(
            /*row*/
            ctx2[8].getVisibleCells()
          );
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_1(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_1(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tr, t);
            }
          }
          group_outros();
          for (i = each_value_1.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && tr_class_value !== (tr_class_value = /*resolvedStyleOptions*/
        ctx2[1].trClass)) {
          attr(tr, "class", tr_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_1.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_fragment2(ctx) {
    let table_1;
    let thead;
    let thead_class_value;
    let t;
    let tbody;
    let tbody_class_value;
    let table_1_class_value;
    let current;
    let each_value_2 = ensure_array_like(
      /*$table*/
      ctx[2].getHeaderGroups()
    );
    let each_blocks_1 = [];
    for (let i = 0; i < each_value_2.length; i += 1) {
      each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    }
    const out = (i) => transition_out(each_blocks_1[i], 1, 1, () => {
      each_blocks_1[i] = null;
    });
    let each_value = ensure_array_like(
      /*$table*/
      ctx[2].getRowModel().rows
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    const out_1 = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        table_1 = element("table");
        thead = element("thead");
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].c();
        }
        t = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        this.h();
      },
      l(nodes) {
        table_1 = claim_element(nodes, "TABLE", { id: true, class: true });
        var table_1_nodes = children(table_1);
        thead = claim_element(table_1_nodes, "THEAD", { class: true });
        var thead_nodes = children(thead);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].l(thead_nodes);
        }
        thead_nodes.forEach(detach);
        t = claim_space(table_1_nodes);
        tbody = claim_element(table_1_nodes, "TBODY", { class: true });
        var tbody_nodes = children(tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].l(tbody_nodes);
        }
        tbody_nodes.forEach(detach);
        table_1_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(thead, "class", thead_class_value = /*resolvedStyleOptions*/
        ctx[1].theadClass);
        attr(tbody, "class", tbody_class_value = /*resolvedStyleOptions*/
        ctx[1].tbodyClass);
        attr(
          table_1,
          "id",
          /*id*/
          ctx[0]
        );
        attr(table_1, "class", table_1_class_value = /*resolvedStyleOptions*/
        ctx[1].tableClass);
      },
      m(target, anchor) {
        insert_hydration(target, table_1, anchor);
        append_hydration(table_1, thead);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          if (each_blocks_1[i]) {
            each_blocks_1[i].m(thead, null);
          }
        }
        append_hydration(table_1, t);
        append_hydration(table_1, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (dirty & /*resolvedStyleOptions, $table*/
        6) {
          each_value_2 = ensure_array_like(
            /*$table*/
            ctx2[2].getHeaderGroups()
          );
          let i;
          for (i = 0; i < each_value_2.length; i += 1) {
            const child_ctx = get_each_context_2(ctx2, each_value_2, i);
            if (each_blocks_1[i]) {
              each_blocks_1[i].p(child_ctx, dirty);
              transition_in(each_blocks_1[i], 1);
            } else {
              each_blocks_1[i] = create_each_block_2(child_ctx);
              each_blocks_1[i].c();
              transition_in(each_blocks_1[i], 1);
              each_blocks_1[i].m(thead, null);
            }
          }
          group_outros();
          for (i = each_value_2.length; i < each_blocks_1.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && thead_class_value !== (thead_class_value = /*resolvedStyleOptions*/
        ctx2[1].theadClass)) {
          attr(thead, "class", thead_class_value);
        }
        if (dirty & /*resolvedStyleOptions, $table*/
        6) {
          each_value = ensure_array_like(
            /*$table*/
            ctx2[2].getRowModel().rows
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tbody, null);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out_1(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && tbody_class_value !== (tbody_class_value = /*resolvedStyleOptions*/
        ctx2[1].tbodyClass)) {
          attr(tbody, "class", tbody_class_value);
        }
        if (!current || dirty & /*id*/
        1) {
          attr(
            table_1,
            "id",
            /*id*/
            ctx2[0]
          );
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && table_1_class_value !== (table_1_class_value = /*resolvedStyleOptions*/
        ctx2[1].tableClass)) {
          attr(table_1, "class", table_1_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_2.length; i += 1) {
          transition_in(each_blocks_1[i]);
        }
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks_1 = each_blocks_1.filter(Boolean);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          transition_out(each_blocks_1[i]);
        }
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(table_1);
        }
        destroy_each(each_blocks_1, detaching);
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    let resolvedStyleOptions;
    let $table;
    let { id } = $$props;
    let { columns = [] } = $$props;
    let { data = [] } = $$props;
    let { styleOptions = {} } = $$props;
    let options = writable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel()
    });
    let table = createSvelteTable(options);
    component_subscribe($$self, table, (value) => $$invalidate(2, $table = value));
    registerMesaTable(id, table);
    $$self.$$set = ($$props2) => {
      if ("id" in $$props2)
        $$invalidate(0, id = $$props2.id);
      if ("columns" in $$props2)
        $$invalidate(4, columns = $$props2.columns);
      if ("data" in $$props2)
        $$invalidate(5, data = $$props2.data);
      if ("styleOptions" in $$props2)
        $$invalidate(6, styleOptions = $$props2.styleOptions);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*columns, data*/
      48) {
        $: {
          options.update((oldOptions) => {
            return { ...oldOptions, columns, data };
          });
        }
      }
      if ($$self.$$.dirty & /*styleOptions*/
      64) {
        $:
          $$invalidate(1, resolvedStyleOptions = resolveStyleOptions(styleOptions));
      }
    };
    return [id, resolvedStyleOptions, $table, table, columns, data, styleOptions];
  }
  var MesaClient = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment2, safe_not_equal, {
        id: 0,
        columns: 4,
        data: 5,
        styleOptions: 6
      });
    }
    get id() {
      return this.$$.ctx[0];
    }
    set id(id) {
      this.$$set({ id });
      flush();
    }
    get columns() {
      return this.$$.ctx[4];
    }
    set columns(columns) {
      this.$$set({ columns });
      flush();
    }
    get data() {
      return this.$$.ctx[5];
    }
    set data(data) {
      this.$$set({ data });
      flush();
    }
    get styleOptions() {
      return this.$$.ctx[6];
    }
    set styleOptions(styleOptions) {
      this.$$set({ styleOptions });
      flush();
    }
  };
  var MesaClient_default = MesaClient;

  // node_modules/@tanstack/query-core/build/modern/subscribable.js
  var Subscribable = class {
    constructor() {
      this.listeners = /* @__PURE__ */ new Set();
      this.subscribe = this.subscribe.bind(this);
    }
    subscribe(listener) {
      this.listeners.add(listener);
      this.onSubscribe();
      return () => {
        this.listeners.delete(listener);
        this.onUnsubscribe();
      };
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {
    }
    onUnsubscribe() {
    }
  };

  // node_modules/@tanstack/query-core/build/modern/utils.js
  var isServer = typeof window === "undefined" || "Deno" in globalThis;
  function noop2() {
    return void 0;
  }
  function functionalUpdate2(updater, input) {
    return typeof updater === "function" ? updater(input) : updater;
  }
  function isValidTimeout(value) {
    return typeof value === "number" && value >= 0 && value !== Infinity;
  }
  function timeUntilStale(updatedAt, staleTime) {
    return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
  }
  function matchQuery(filters, query) {
    const {
      type = "all",
      exact,
      fetchStatus,
      predicate,
      queryKey,
      stale
    } = filters;
    if (queryKey) {
      if (exact) {
        if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
          return false;
        }
      } else if (!partialMatchKey(query.queryKey, queryKey)) {
        return false;
      }
    }
    if (type !== "all") {
      const isActive = query.isActive();
      if (type === "active" && !isActive) {
        return false;
      }
      if (type === "inactive" && isActive) {
        return false;
      }
    }
    if (typeof stale === "boolean" && query.isStale() !== stale) {
      return false;
    }
    if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
      return false;
    }
    if (predicate && !predicate(query)) {
      return false;
    }
    return true;
  }
  function matchMutation(filters, mutation) {
    const { exact, status, predicate, mutationKey } = filters;
    if (mutationKey) {
      if (!mutation.options.mutationKey) {
        return false;
      }
      if (exact) {
        if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
          return false;
        }
      } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
        return false;
      }
    }
    if (status && mutation.state.status !== status) {
      return false;
    }
    if (predicate && !predicate(mutation)) {
      return false;
    }
    return true;
  }
  function hashQueryKeyByOptions(queryKey, options) {
    const hashFn = options?.queryKeyHashFn || hashKey;
    return hashFn(queryKey);
  }
  function hashKey(queryKey) {
    return JSON.stringify(
      queryKey,
      (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
        result[key] = val[key];
        return result;
      }, {}) : val
    );
  }
  function partialMatchKey(a, b) {
    if (a === b) {
      return true;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
      return !Object.keys(b).some((key) => !partialMatchKey(a[key], b[key]));
    }
    return false;
  }
  function replaceEqualDeep(a, b) {
    if (a === b) {
      return a;
    }
    const array = isPlainArray(a) && isPlainArray(b);
    if (array || isPlainObject(a) && isPlainObject(b)) {
      const aItems = array ? a : Object.keys(a);
      const aSize = aItems.length;
      const bItems = array ? b : Object.keys(b);
      const bSize = bItems.length;
      const copy = array ? [] : {};
      let equalItems = 0;
      for (let i = 0; i < bSize; i++) {
        const key = array ? i : bItems[i];
        if (!array && a[key] === void 0 && b[key] === void 0 && aItems.includes(key)) {
          copy[key] = void 0;
          equalItems++;
        } else {
          copy[key] = replaceEqualDeep(a[key], b[key]);
          if (copy[key] === a[key] && a[key] !== void 0) {
            equalItems++;
          }
        }
      }
      return aSize === bSize && equalItems === aSize ? a : copy;
    }
    return b;
  }
  function shallowEqualObjects(a, b) {
    if (!b || Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    for (const key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
  function isPlainArray(value) {
    return Array.isArray(value) && value.length === Object.keys(value).length;
  }
  function isPlainObject(o) {
    if (!hasObjectPrototype(o)) {
      return false;
    }
    const ctor = o.constructor;
    if (ctor === void 0) {
      return true;
    }
    const prot = ctor.prototype;
    if (!hasObjectPrototype(prot)) {
      return false;
    }
    if (!prot.hasOwnProperty("isPrototypeOf")) {
      return false;
    }
    return true;
  }
  function hasObjectPrototype(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
  }
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  function replaceData(prevData, data, options) {
    if (typeof options.structuralSharing === "function") {
      return options.structuralSharing(prevData, data);
    } else if (options.structuralSharing !== false) {
      return replaceEqualDeep(prevData, data);
    }
    return data;
  }
  function keepPreviousData(previousData) {
    return previousData;
  }
  function addToEnd(items, item, max2 = 0) {
    const newItems = [...items, item];
    return max2 && newItems.length > max2 ? newItems.slice(1) : newItems;
  }
  function addToStart(items, item, max2 = 0) {
    const newItems = [item, ...items];
    return max2 && newItems.length > max2 ? newItems.slice(0, -1) : newItems;
  }
  var skipToken = Symbol();

  // node_modules/@tanstack/query-core/build/modern/focusManager.js
  var FocusManager = class extends Subscribable {
    #focused;
    #cleanup;
    #setup;
    constructor() {
      super();
      this.#setup = (onFocus) => {
        if (!isServer && window.addEventListener) {
          const listener = () => onFocus();
          window.addEventListener("visibilitychange", listener, false);
          return () => {
            window.removeEventListener("visibilitychange", listener);
          };
        }
        return;
      };
    }
    onSubscribe() {
      if (!this.#cleanup) {
        this.setEventListener(this.#setup);
      }
    }
    onUnsubscribe() {
      if (!this.hasListeners()) {
        this.#cleanup?.();
        this.#cleanup = void 0;
      }
    }
    setEventListener(setup) {
      this.#setup = setup;
      this.#cleanup?.();
      this.#cleanup = setup((focused) => {
        if (typeof focused === "boolean") {
          this.setFocused(focused);
        } else {
          this.onFocus();
        }
      });
    }
    setFocused(focused) {
      const changed = this.#focused !== focused;
      if (changed) {
        this.#focused = focused;
        this.onFocus();
      }
    }
    onFocus() {
      const isFocused = this.isFocused();
      this.listeners.forEach((listener) => {
        listener(isFocused);
      });
    }
    isFocused() {
      if (typeof this.#focused === "boolean") {
        return this.#focused;
      }
      return globalThis.document?.visibilityState !== "hidden";
    }
  };
  var focusManager = new FocusManager();

  // node_modules/@tanstack/query-core/build/modern/onlineManager.js
  var OnlineManager = class extends Subscribable {
    #online = true;
    #cleanup;
    #setup;
    constructor() {
      super();
      this.#setup = (onOnline) => {
        if (!isServer && window.addEventListener) {
          const onlineListener = () => onOnline(true);
          const offlineListener = () => onOnline(false);
          window.addEventListener("online", onlineListener, false);
          window.addEventListener("offline", offlineListener, false);
          return () => {
            window.removeEventListener("online", onlineListener);
            window.removeEventListener("offline", offlineListener);
          };
        }
        return;
      };
    }
    onSubscribe() {
      if (!this.#cleanup) {
        this.setEventListener(this.#setup);
      }
    }
    onUnsubscribe() {
      if (!this.hasListeners()) {
        this.#cleanup?.();
        this.#cleanup = void 0;
      }
    }
    setEventListener(setup) {
      this.#setup = setup;
      this.#cleanup?.();
      this.#cleanup = setup(this.setOnline.bind(this));
    }
    setOnline(online) {
      const changed = this.#online !== online;
      if (changed) {
        this.#online = online;
        this.listeners.forEach((listener) => {
          listener(online);
        });
      }
    }
    isOnline() {
      return this.#online;
    }
  };
  var onlineManager = new OnlineManager();

  // node_modules/@tanstack/query-core/build/modern/retryer.js
  function defaultRetryDelay(failureCount) {
    return Math.min(1e3 * 2 ** failureCount, 3e4);
  }
  function canFetch(networkMode) {
    return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
  }
  var CancelledError = class {
    constructor(options) {
      this.revert = options?.revert;
      this.silent = options?.silent;
    }
  };
  function isCancelledError(value) {
    return value instanceof CancelledError;
  }
  function createRetryer(config) {
    let isRetryCancelled = false;
    let failureCount = 0;
    let isResolved = false;
    let continueFn;
    let promiseResolve;
    let promiseReject;
    const promise = new Promise((outerResolve, outerReject) => {
      promiseResolve = outerResolve;
      promiseReject = outerReject;
    });
    const cancel = (cancelOptions) => {
      if (!isResolved) {
        reject(new CancelledError(cancelOptions));
        config.abort?.();
      }
    };
    const cancelRetry = () => {
      isRetryCancelled = true;
    };
    const continueRetry = () => {
      isRetryCancelled = false;
    };
    const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
    const canStart = () => canFetch(config.networkMode) && config.canRun();
    const resolve = (value) => {
      if (!isResolved) {
        isResolved = true;
        config.onSuccess?.(value);
        continueFn?.();
        promiseResolve(value);
      }
    };
    const reject = (value) => {
      if (!isResolved) {
        isResolved = true;
        config.onError?.(value);
        continueFn?.();
        promiseReject(value);
      }
    };
    const pause = () => {
      return new Promise((continueResolve) => {
        continueFn = (value) => {
          if (isResolved || canContinue()) {
            continueResolve(value);
          }
        };
        config.onPause?.();
      }).then(() => {
        continueFn = void 0;
        if (!isResolved) {
          config.onContinue?.();
        }
      });
    };
    const run2 = () => {
      if (isResolved) {
        return;
      }
      let promiseOrValue;
      try {
        promiseOrValue = config.fn();
      } catch (error) {
        promiseOrValue = Promise.reject(error);
      }
      Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
        if (isResolved) {
          return;
        }
        const retry = config.retry ?? (isServer ? 0 : 3);
        const retryDelay = config.retryDelay ?? defaultRetryDelay;
        const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
        const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
        if (isRetryCancelled || !shouldRetry) {
          reject(error);
          return;
        }
        failureCount++;
        config.onFail?.(failureCount, error);
        sleep(delay).then(() => {
          return canContinue() ? void 0 : pause();
        }).then(() => {
          if (isRetryCancelled) {
            reject(error);
          } else {
            run2();
          }
        });
      });
    };
    return {
      promise,
      cancel,
      continue: () => {
        continueFn?.();
        return promise;
      },
      cancelRetry,
      continueRetry,
      canStart,
      start: () => {
        if (canStart()) {
          run2();
        } else {
          pause().then(run2);
        }
        return promise;
      }
    };
  }

  // node_modules/@tanstack/query-core/build/modern/notifyManager.js
  function createNotifyManager() {
    let queue = [];
    let transactions = 0;
    let notifyFn = (callback) => {
      callback();
    };
    let batchNotifyFn = (callback) => {
      callback();
    };
    let scheduleFn = (cb) => setTimeout(cb, 0);
    const setScheduler = (fn) => {
      scheduleFn = fn;
    };
    const batch = (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush2();
        }
      }
      return result;
    };
    const schedule = (callback) => {
      if (transactions) {
        queue.push(callback);
      } else {
        scheduleFn(() => {
          notifyFn(callback);
        });
      }
    };
    const batchCalls = (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    };
    const flush2 = () => {
      const originalQueue = queue;
      queue = [];
      if (originalQueue.length) {
        scheduleFn(() => {
          batchNotifyFn(() => {
            originalQueue.forEach((callback) => {
              notifyFn(callback);
            });
          });
        });
      }
    };
    const setNotifyFunction = (fn) => {
      notifyFn = fn;
    };
    const setBatchNotifyFunction = (fn) => {
      batchNotifyFn = fn;
    };
    return {
      batch,
      batchCalls,
      schedule,
      setNotifyFunction,
      setBatchNotifyFunction,
      setScheduler
    };
  }
  var notifyManager = createNotifyManager();

  // node_modules/@tanstack/query-core/build/modern/removable.js
  var Removable = class {
    #gcTimeout;
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      this.clearGcTimeout();
      if (isValidTimeout(this.gcTime)) {
        this.#gcTimeout = setTimeout(() => {
          this.optionalRemove();
        }, this.gcTime);
      }
    }
    updateGcTime(newGcTime) {
      this.gcTime = Math.max(
        this.gcTime || 0,
        newGcTime ?? (isServer ? Infinity : 5 * 60 * 1e3)
      );
    }
    clearGcTimeout() {
      if (this.#gcTimeout) {
        clearTimeout(this.#gcTimeout);
        this.#gcTimeout = void 0;
      }
    }
  };

  // node_modules/@tanstack/query-core/build/modern/query.js
  var Query = class extends Removable {
    #initialState;
    #revertState;
    #cache;
    #retryer;
    #defaultOptions;
    #abortSignalConsumed;
    constructor(config) {
      super();
      this.#abortSignalConsumed = false;
      this.#defaultOptions = config.defaultOptions;
      this.setOptions(config.options);
      this.observers = [];
      this.#cache = config.cache;
      this.queryKey = config.queryKey;
      this.queryHash = config.queryHash;
      this.#initialState = config.state || getDefaultState(this.options);
      this.state = this.#initialState;
      this.scheduleGc();
    }
    get meta() {
      return this.options.meta;
    }
    setOptions(options) {
      this.options = { ...this.#defaultOptions, ...options };
      this.updateGcTime(this.options.gcTime);
    }
    optionalRemove() {
      if (!this.observers.length && this.state.fetchStatus === "idle") {
        this.#cache.remove(this);
      }
    }
    setData(newData, options) {
      const data = replaceData(this.state.data, newData, this.options);
      this.#dispatch({
        data,
        type: "success",
        dataUpdatedAt: options?.updatedAt,
        manual: options?.manual
      });
      return data;
    }
    setState(state, setStateOptions) {
      this.#dispatch({ type: "setState", state, setStateOptions });
    }
    cancel(options) {
      const promise = this.#retryer?.promise;
      this.#retryer?.cancel(options);
      return promise ? promise.then(noop2).catch(noop2) : Promise.resolve();
    }
    destroy() {
      super.destroy();
      this.cancel({ silent: true });
    }
    reset() {
      this.destroy();
      this.setState(this.#initialState);
    }
    isActive() {
      return this.observers.some((observer) => observer.options.enabled !== false);
    }
    isDisabled() {
      return this.getObserversCount() > 0 && !this.isActive();
    }
    isStale() {
      if (this.state.isInvalidated) {
        return true;
      }
      if (this.getObserversCount() > 0) {
        return this.observers.some(
          (observer) => observer.getCurrentResult().isStale
        );
      }
      return this.state.data === void 0;
    }
    isStaleByTime(staleTime = 0) {
      return this.state.isInvalidated || this.state.data === void 0 || !timeUntilStale(this.state.dataUpdatedAt, staleTime);
    }
    onFocus() {
      const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
      observer?.refetch({ cancelRefetch: false });
      this.#retryer?.continue();
    }
    onOnline() {
      const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
      observer?.refetch({ cancelRefetch: false });
      this.#retryer?.continue();
    }
    addObserver(observer) {
      if (!this.observers.includes(observer)) {
        this.observers.push(observer);
        this.clearGcTimeout();
        this.#cache.notify({ type: "observerAdded", query: this, observer });
      }
    }
    removeObserver(observer) {
      if (this.observers.includes(observer)) {
        this.observers = this.observers.filter((x) => x !== observer);
        if (!this.observers.length) {
          if (this.#retryer) {
            if (this.#abortSignalConsumed) {
              this.#retryer.cancel({ revert: true });
            } else {
              this.#retryer.cancelRetry();
            }
          }
          this.scheduleGc();
        }
        this.#cache.notify({ type: "observerRemoved", query: this, observer });
      }
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      if (!this.state.isInvalidated) {
        this.#dispatch({ type: "invalidate" });
      }
    }
    fetch(options, fetchOptions) {
      if (this.state.fetchStatus !== "idle") {
        if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
          this.cancel({ silent: true });
        } else if (this.#retryer) {
          this.#retryer.continueRetry();
          return this.#retryer.promise;
        }
      }
      if (options) {
        this.setOptions(options);
      }
      if (!this.options.queryFn) {
        const observer = this.observers.find((x) => x.options.queryFn);
        if (observer) {
          this.setOptions(observer.options);
        }
      }
      if (true) {
        if (!Array.isArray(this.options.queryKey)) {
          console.error(
            `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
          );
        }
      }
      const abortController = new AbortController();
      const queryFnContext = {
        queryKey: this.queryKey,
        meta: this.meta
      };
      const addSignalProperty = (object) => {
        Object.defineProperty(object, "signal", {
          enumerable: true,
          get: () => {
            this.#abortSignalConsumed = true;
            return abortController.signal;
          }
        });
      };
      addSignalProperty(queryFnContext);
      const fetchFn = () => {
        if (true) {
          if (this.options.queryFn === skipToken) {
            console.error(
              `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${this.options.queryHash}'`
            );
          }
        }
        if (!this.options.queryFn || this.options.queryFn === skipToken) {
          return Promise.reject(
            new Error(`Missing queryFn: '${this.options.queryHash}'`)
          );
        }
        this.#abortSignalConsumed = false;
        if (this.options.persister) {
          return this.options.persister(
            this.options.queryFn,
            queryFnContext,
            this
          );
        }
        return this.options.queryFn(
          queryFnContext
        );
      };
      const context = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        state: this.state,
        fetchFn
      };
      addSignalProperty(context);
      this.options.behavior?.onFetch(
        context,
        this
      );
      this.#revertState = this.state;
      if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
        this.#dispatch({ type: "fetch", meta: context.fetchOptions?.meta });
      }
      const onError = (error) => {
        if (!(isCancelledError(error) && error.silent)) {
          this.#dispatch({
            type: "error",
            error
          });
        }
        if (!isCancelledError(error)) {
          this.#cache.config.onError?.(
            error,
            this
          );
          this.#cache.config.onSettled?.(
            this.state.data,
            error,
            this
          );
        }
        if (!this.isFetchingOptimistic) {
          this.scheduleGc();
        }
        this.isFetchingOptimistic = false;
      };
      this.#retryer = createRetryer({
        fn: context.fetchFn,
        abort: abortController.abort.bind(abortController),
        onSuccess: (data) => {
          if (data === void 0) {
            if (true) {
              console.error(
                `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
              );
            }
            onError(new Error(`${this.queryHash} data is undefined`));
            return;
          }
          this.setData(data);
          this.#cache.config.onSuccess?.(data, this);
          this.#cache.config.onSettled?.(
            data,
            this.state.error,
            this
          );
          if (!this.isFetchingOptimistic) {
            this.scheduleGc();
          }
          this.isFetchingOptimistic = false;
        },
        onError,
        onFail: (failureCount, error) => {
          this.#dispatch({ type: "failed", failureCount, error });
        },
        onPause: () => {
          this.#dispatch({ type: "pause" });
        },
        onContinue: () => {
          this.#dispatch({ type: "continue" });
        },
        retry: context.options.retry,
        retryDelay: context.options.retryDelay,
        networkMode: context.options.networkMode,
        canRun: () => true
      });
      return this.#retryer.start();
    }
    #dispatch(action) {
      const reducer = (state) => {
        switch (action.type) {
          case "failed":
            return {
              ...state,
              fetchFailureCount: action.failureCount,
              fetchFailureReason: action.error
            };
          case "pause":
            return {
              ...state,
              fetchStatus: "paused"
            };
          case "continue":
            return {
              ...state,
              fetchStatus: "fetching"
            };
          case "fetch":
            return {
              ...state,
              ...fetchState(state.data, this.options),
              fetchMeta: action.meta ?? null
            };
          case "success":
            return {
              ...state,
              data: action.data,
              dataUpdateCount: state.dataUpdateCount + 1,
              dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: false,
              status: "success",
              ...!action.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null
              }
            };
          case "error":
            const error = action.error;
            if (isCancelledError(error) && error.revert && this.#revertState) {
              return { ...this.#revertState, fetchStatus: "idle" };
            }
            return {
              ...state,
              error,
              errorUpdateCount: state.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: state.fetchFailureCount + 1,
              fetchFailureReason: error,
              fetchStatus: "idle",
              status: "error"
            };
          case "invalidate":
            return {
              ...state,
              isInvalidated: true
            };
          case "setState":
            return {
              ...state,
              ...action.state
            };
        }
      };
      this.state = reducer(this.state);
      notifyManager.batch(() => {
        this.observers.forEach((observer) => {
          observer.onQueryUpdate();
        });
        this.#cache.notify({ query: this, type: "updated", action });
      });
    }
  };
  function fetchState(data, options) {
    return {
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
      ...data === void 0 && {
        error: null,
        status: "pending"
      }
    };
  }
  function getDefaultState(options) {
    const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
    const hasData = data !== void 0;
    const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
    return {
      data,
      dataUpdateCount: 0,
      dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchMeta: null,
      isInvalidated: false,
      status: hasData ? "success" : "pending",
      fetchStatus: "idle"
    };
  }

  // node_modules/@tanstack/query-core/build/modern/queryCache.js
  var QueryCache = class extends Subscribable {
    constructor(config = {}) {
      super();
      this.config = config;
      this.#queries = /* @__PURE__ */ new Map();
    }
    #queries;
    build(client, options, state) {
      const queryKey = options.queryKey;
      const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
      let query = this.get(queryHash);
      if (!query) {
        query = new Query({
          cache: this,
          queryKey,
          queryHash,
          options: client.defaultQueryOptions(options),
          state,
          defaultOptions: client.getQueryDefaults(queryKey)
        });
        this.add(query);
      }
      return query;
    }
    add(query) {
      if (!this.#queries.has(query.queryHash)) {
        this.#queries.set(query.queryHash, query);
        this.notify({
          type: "added",
          query
        });
      }
    }
    remove(query) {
      const queryInMap = this.#queries.get(query.queryHash);
      if (queryInMap) {
        query.destroy();
        if (queryInMap === query) {
          this.#queries.delete(query.queryHash);
        }
        this.notify({ type: "removed", query });
      }
    }
    clear() {
      notifyManager.batch(() => {
        this.getAll().forEach((query) => {
          this.remove(query);
        });
      });
    }
    get(queryHash) {
      return this.#queries.get(queryHash);
    }
    getAll() {
      return [...this.#queries.values()];
    }
    find(filters) {
      const defaultedFilters = { exact: true, ...filters };
      return this.getAll().find(
        (query) => matchQuery(defaultedFilters, query)
      );
    }
    findAll(filters = {}) {
      const queries = this.getAll();
      return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
    }
    notify(event) {
      notifyManager.batch(() => {
        this.listeners.forEach((listener) => {
          listener(event);
        });
      });
    }
    onFocus() {
      notifyManager.batch(() => {
        this.getAll().forEach((query) => {
          query.onFocus();
        });
      });
    }
    onOnline() {
      notifyManager.batch(() => {
        this.getAll().forEach((query) => {
          query.onOnline();
        });
      });
    }
  };

  // node_modules/@tanstack/query-core/build/modern/mutation.js
  var Mutation = class extends Removable {
    #observers;
    #mutationCache;
    #retryer;
    constructor(config) {
      super();
      this.mutationId = config.mutationId;
      this.#mutationCache = config.mutationCache;
      this.#observers = [];
      this.state = config.state || getDefaultState2();
      this.setOptions(config.options);
      this.scheduleGc();
    }
    setOptions(options) {
      this.options = options;
      this.updateGcTime(this.options.gcTime);
    }
    get meta() {
      return this.options.meta;
    }
    addObserver(observer) {
      if (!this.#observers.includes(observer)) {
        this.#observers.push(observer);
        this.clearGcTimeout();
        this.#mutationCache.notify({
          type: "observerAdded",
          mutation: this,
          observer
        });
      }
    }
    removeObserver(observer) {
      this.#observers = this.#observers.filter((x) => x !== observer);
      this.scheduleGc();
      this.#mutationCache.notify({
        type: "observerRemoved",
        mutation: this,
        observer
      });
    }
    optionalRemove() {
      if (!this.#observers.length) {
        if (this.state.status === "pending") {
          this.scheduleGc();
        } else {
          this.#mutationCache.remove(this);
        }
      }
    }
    continue() {
      return this.#retryer?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
      this.execute(this.state.variables);
    }
    async execute(variables) {
      this.#retryer = createRetryer({
        fn: () => {
          if (!this.options.mutationFn) {
            return Promise.reject(new Error("No mutationFn found"));
          }
          return this.options.mutationFn(variables);
        },
        onFail: (failureCount, error) => {
          this.#dispatch({ type: "failed", failureCount, error });
        },
        onPause: () => {
          this.#dispatch({ type: "pause" });
        },
        onContinue: () => {
          this.#dispatch({ type: "continue" });
        },
        retry: this.options.retry ?? 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode,
        canRun: () => this.#mutationCache.canRun(this)
      });
      const restored = this.state.status === "pending";
      const isPaused = !this.#retryer.canStart();
      try {
        if (!restored) {
          this.#dispatch({ type: "pending", variables, isPaused });
          await this.#mutationCache.config.onMutate?.(
            variables,
            this
          );
          const context = await this.options.onMutate?.(variables);
          if (context !== this.state.context) {
            this.#dispatch({
              type: "pending",
              context,
              variables,
              isPaused
            });
          }
        }
        const data = await this.#retryer.start();
        await this.#mutationCache.config.onSuccess?.(
          data,
          variables,
          this.state.context,
          this
        );
        await this.options.onSuccess?.(data, variables, this.state.context);
        await this.#mutationCache.config.onSettled?.(
          data,
          null,
          this.state.variables,
          this.state.context,
          this
        );
        await this.options.onSettled?.(data, null, variables, this.state.context);
        this.#dispatch({ type: "success", data });
        return data;
      } catch (error) {
        try {
          await this.#mutationCache.config.onError?.(
            error,
            variables,
            this.state.context,
            this
          );
          await this.options.onError?.(
            error,
            variables,
            this.state.context
          );
          await this.#mutationCache.config.onSettled?.(
            void 0,
            error,
            this.state.variables,
            this.state.context,
            this
          );
          await this.options.onSettled?.(
            void 0,
            error,
            variables,
            this.state.context
          );
          throw error;
        } finally {
          this.#dispatch({ type: "error", error });
        }
      } finally {
        this.#mutationCache.runNext(this);
      }
    }
    #dispatch(action) {
      const reducer = (state) => {
        switch (action.type) {
          case "failed":
            return {
              ...state,
              failureCount: action.failureCount,
              failureReason: action.error
            };
          case "pause":
            return {
              ...state,
              isPaused: true
            };
          case "continue":
            return {
              ...state,
              isPaused: false
            };
          case "pending":
            return {
              ...state,
              context: action.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: action.isPaused,
              status: "pending",
              variables: action.variables,
              submittedAt: Date.now()
            };
          case "success":
            return {
              ...state,
              data: action.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: false
            };
          case "error":
            return {
              ...state,
              data: void 0,
              error: action.error,
              failureCount: state.failureCount + 1,
              failureReason: action.error,
              isPaused: false,
              status: "error"
            };
        }
      };
      this.state = reducer(this.state);
      notifyManager.batch(() => {
        this.#observers.forEach((observer) => {
          observer.onMutationUpdate(action);
        });
        this.#mutationCache.notify({
          mutation: this,
          type: "updated",
          action
        });
      });
    }
  };
  function getDefaultState2() {
    return {
      context: void 0,
      data: void 0,
      error: null,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      status: "idle",
      variables: void 0,
      submittedAt: 0
    };
  }

  // node_modules/@tanstack/query-core/build/modern/mutationCache.js
  var MutationCache = class extends Subscribable {
    constructor(config = {}) {
      super();
      this.config = config;
      this.#mutations = /* @__PURE__ */ new Map();
      this.#mutationId = Date.now();
    }
    #mutations;
    #mutationId;
    build(client, options, state) {
      const mutation = new Mutation({
        mutationCache: this,
        mutationId: ++this.#mutationId,
        options: client.defaultMutationOptions(options),
        state
      });
      this.add(mutation);
      return mutation;
    }
    add(mutation) {
      const scope = scopeFor(mutation);
      const mutations = this.#mutations.get(scope) ?? [];
      mutations.push(mutation);
      this.#mutations.set(scope, mutations);
      this.notify({ type: "added", mutation });
    }
    remove(mutation) {
      const scope = scopeFor(mutation);
      if (this.#mutations.has(scope)) {
        const mutations = this.#mutations.get(scope)?.filter((x) => x !== mutation);
        if (mutations) {
          if (mutations.length === 0) {
            this.#mutations.delete(scope);
          } else {
            this.#mutations.set(scope, mutations);
          }
        }
      }
      this.notify({ type: "removed", mutation });
    }
    canRun(mutation) {
      const firstPendingMutation = this.#mutations.get(scopeFor(mutation))?.find((m) => m.state.status === "pending");
      return !firstPendingMutation || firstPendingMutation === mutation;
    }
    runNext(mutation) {
      const foundMutation = this.#mutations.get(scopeFor(mutation))?.find((m) => m !== mutation && m.state.isPaused);
      return foundMutation?.continue() ?? Promise.resolve();
    }
    clear() {
      notifyManager.batch(() => {
        this.getAll().forEach((mutation) => {
          this.remove(mutation);
        });
      });
    }
    getAll() {
      return [...this.#mutations.values()].flat();
    }
    find(filters) {
      const defaultedFilters = { exact: true, ...filters };
      return this.getAll().find(
        (mutation) => matchMutation(defaultedFilters, mutation)
      );
    }
    findAll(filters = {}) {
      return this.getAll().filter((mutation) => matchMutation(filters, mutation));
    }
    notify(event) {
      notifyManager.batch(() => {
        this.listeners.forEach((listener) => {
          listener(event);
        });
      });
    }
    resumePausedMutations() {
      const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
      return notifyManager.batch(
        () => Promise.all(
          pausedMutations.map((mutation) => mutation.continue().catch(noop2))
        )
      );
    }
  };
  function scopeFor(mutation) {
    return mutation.options.scope?.id ?? String(mutation.mutationId);
  }

  // node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
  function infiniteQueryBehavior(pages) {
    return {
      onFetch: (context, query) => {
        const fetchFn = async () => {
          const options = context.options;
          const direction = context.fetchOptions?.meta?.fetchMore?.direction;
          const oldPages = context.state.data?.pages || [];
          const oldPageParams = context.state.data?.pageParams || [];
          const empty2 = { pages: [], pageParams: [] };
          let cancelled = false;
          const addSignalProperty = (object) => {
            Object.defineProperty(object, "signal", {
              enumerable: true,
              get: () => {
                if (context.signal.aborted) {
                  cancelled = true;
                } else {
                  context.signal.addEventListener("abort", () => {
                    cancelled = true;
                  });
                }
                return context.signal;
              }
            });
          };
          const queryFn = context.options.queryFn && context.options.queryFn !== skipToken ? context.options.queryFn : () => {
            if (true) {
              if (context.options.queryFn === skipToken) {
                console.error(
                  `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${context.options.queryHash}'`
                );
              }
            }
            return Promise.reject(
              new Error(`Missing queryFn: '${context.options.queryHash}'`)
            );
          };
          const fetchPage = async (data, param, previous) => {
            if (cancelled) {
              return Promise.reject();
            }
            if (param == null && data.pages.length) {
              return Promise.resolve(data);
            }
            const queryFnContext = {
              queryKey: context.queryKey,
              pageParam: param,
              direction: previous ? "backward" : "forward",
              meta: context.options.meta
            };
            addSignalProperty(queryFnContext);
            const page = await queryFn(
              queryFnContext
            );
            const { maxPages } = context.options;
            const addTo = previous ? addToStart : addToEnd;
            return {
              pages: addTo(data.pages, page, maxPages),
              pageParams: addTo(data.pageParams, param, maxPages)
            };
          };
          let result;
          if (direction && oldPages.length) {
            const previous = direction === "backward";
            const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
            const oldData = {
              pages: oldPages,
              pageParams: oldPageParams
            };
            const param = pageParamFn(options, oldData);
            result = await fetchPage(oldData, param, previous);
          } else {
            result = await fetchPage(
              empty2,
              oldPageParams[0] ?? options.initialPageParam
            );
            const remainingPages = pages ?? oldPages.length;
            for (let i = 1; i < remainingPages; i++) {
              const param = getNextPageParam(options, result);
              result = await fetchPage(result, param);
            }
          }
          return result;
        };
        if (context.options.persister) {
          context.fetchFn = () => {
            return context.options.persister?.(
              fetchFn,
              {
                queryKey: context.queryKey,
                meta: context.options.meta,
                signal: context.signal
              },
              query
            );
          };
        } else {
          context.fetchFn = fetchFn;
        }
      }
    };
  }
  function getNextPageParam(options, { pages, pageParams }) {
    const lastIndex = pages.length - 1;
    return options.getNextPageParam(
      pages[lastIndex],
      pages,
      pageParams[lastIndex],
      pageParams
    );
  }
  function getPreviousPageParam(options, { pages, pageParams }) {
    return options.getPreviousPageParam?.(
      pages[0],
      pages,
      pageParams[0],
      pageParams
    );
  }
  function hasNextPage(options, data) {
    if (!data)
      return false;
    return getNextPageParam(options, data) != null;
  }
  function hasPreviousPage(options, data) {
    if (!data || !options.getPreviousPageParam)
      return false;
    return getPreviousPageParam(options, data) != null;
  }

  // node_modules/@tanstack/query-core/build/modern/queryClient.js
  var QueryClient = class {
    #queryCache;
    #mutationCache;
    #defaultOptions;
    #queryDefaults;
    #mutationDefaults;
    #mountCount;
    #unsubscribeFocus;
    #unsubscribeOnline;
    constructor(config = {}) {
      this.#queryCache = config.queryCache || new QueryCache();
      this.#mutationCache = config.mutationCache || new MutationCache();
      this.#defaultOptions = config.defaultOptions || {};
      this.#queryDefaults = /* @__PURE__ */ new Map();
      this.#mutationDefaults = /* @__PURE__ */ new Map();
      this.#mountCount = 0;
    }
    mount() {
      this.#mountCount++;
      if (this.#mountCount !== 1)
        return;
      this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
        if (focused) {
          await this.resumePausedMutations();
          this.#queryCache.onFocus();
        }
      });
      this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
        if (online) {
          await this.resumePausedMutations();
          this.#queryCache.onOnline();
        }
      });
    }
    unmount() {
      this.#mountCount--;
      if (this.#mountCount !== 0)
        return;
      this.#unsubscribeFocus?.();
      this.#unsubscribeFocus = void 0;
      this.#unsubscribeOnline?.();
      this.#unsubscribeOnline = void 0;
    }
    isFetching(filters) {
      return this.#queryCache.findAll({ ...filters, fetchStatus: "fetching" }).length;
    }
    isMutating(filters) {
      return this.#mutationCache.findAll({ ...filters, status: "pending" }).length;
    }
    getQueryData(queryKey) {
      const options = this.defaultQueryOptions({ queryKey });
      return this.#queryCache.get(options.queryHash)?.state.data;
    }
    ensureQueryData(options) {
      const cachedData = this.getQueryData(options.queryKey);
      if (cachedData === void 0)
        return this.fetchQuery(options);
      else {
        const defaultedOptions = this.defaultQueryOptions(options);
        const query = this.#queryCache.build(this, defaultedOptions);
        if (options.revalidateIfStale && query.isStaleByTime(defaultedOptions.staleTime)) {
          void this.prefetchQuery(defaultedOptions);
        }
        return Promise.resolve(cachedData);
      }
    }
    getQueriesData(filters) {
      return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
        const data = state.data;
        return [queryKey, data];
      });
    }
    setQueryData(queryKey, updater, options) {
      const defaultedOptions = this.defaultQueryOptions({ queryKey });
      const query = this.#queryCache.get(
        defaultedOptions.queryHash
      );
      const prevData = query?.state.data;
      const data = functionalUpdate2(updater, prevData);
      if (data === void 0) {
        return void 0;
      }
      return this.#queryCache.build(this, defaultedOptions).setData(data, { ...options, manual: true });
    }
    setQueriesData(filters, updater, options) {
      return notifyManager.batch(
        () => this.#queryCache.findAll(filters).map(({ queryKey }) => [
          queryKey,
          this.setQueryData(queryKey, updater, options)
        ])
      );
    }
    getQueryState(queryKey) {
      const options = this.defaultQueryOptions({ queryKey });
      return this.#queryCache.get(options.queryHash)?.state;
    }
    removeQueries(filters) {
      const queryCache = this.#queryCache;
      notifyManager.batch(() => {
        queryCache.findAll(filters).forEach((query) => {
          queryCache.remove(query);
        });
      });
    }
    resetQueries(filters, options) {
      const queryCache = this.#queryCache;
      const refetchFilters = {
        type: "active",
        ...filters
      };
      return notifyManager.batch(() => {
        queryCache.findAll(filters).forEach((query) => {
          query.reset();
        });
        return this.refetchQueries(refetchFilters, options);
      });
    }
    cancelQueries(filters = {}, cancelOptions = {}) {
      const defaultedCancelOptions = { revert: true, ...cancelOptions };
      const promises = notifyManager.batch(
        () => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
      );
      return Promise.all(promises).then(noop2).catch(noop2);
    }
    invalidateQueries(filters = {}, options = {}) {
      return notifyManager.batch(() => {
        this.#queryCache.findAll(filters).forEach((query) => {
          query.invalidate();
        });
        if (filters.refetchType === "none") {
          return Promise.resolve();
        }
        const refetchFilters = {
          ...filters,
          type: filters.refetchType ?? filters.type ?? "active"
        };
        return this.refetchQueries(refetchFilters, options);
      });
    }
    refetchQueries(filters = {}, options) {
      const fetchOptions = {
        ...options,
        cancelRefetch: options?.cancelRefetch ?? true
      };
      const promises = notifyManager.batch(
        () => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
          let promise = query.fetch(void 0, fetchOptions);
          if (!fetchOptions.throwOnError) {
            promise = promise.catch(noop2);
          }
          return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
        })
      );
      return Promise.all(promises).then(noop2);
    }
    fetchQuery(options) {
      const defaultedOptions = this.defaultQueryOptions(options);
      if (defaultedOptions.retry === void 0) {
        defaultedOptions.retry = false;
      }
      const query = this.#queryCache.build(this, defaultedOptions);
      return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
    }
    prefetchQuery(options) {
      return this.fetchQuery(options).then(noop2).catch(noop2);
    }
    fetchInfiniteQuery(options) {
      options.behavior = infiniteQueryBehavior(options.pages);
      return this.fetchQuery(options);
    }
    prefetchInfiniteQuery(options) {
      return this.fetchInfiniteQuery(options).then(noop2).catch(noop2);
    }
    resumePausedMutations() {
      if (onlineManager.isOnline()) {
        return this.#mutationCache.resumePausedMutations();
      }
      return Promise.resolve();
    }
    getQueryCache() {
      return this.#queryCache;
    }
    getMutationCache() {
      return this.#mutationCache;
    }
    getDefaultOptions() {
      return this.#defaultOptions;
    }
    setDefaultOptions(options) {
      this.#defaultOptions = options;
    }
    setQueryDefaults(queryKey, options) {
      this.#queryDefaults.set(hashKey(queryKey), {
        queryKey,
        defaultOptions: options
      });
    }
    getQueryDefaults(queryKey) {
      const defaults = [...this.#queryDefaults.values()];
      let result = {};
      defaults.forEach((queryDefault) => {
        if (partialMatchKey(queryKey, queryDefault.queryKey)) {
          result = { ...result, ...queryDefault.defaultOptions };
        }
      });
      return result;
    }
    setMutationDefaults(mutationKey, options) {
      this.#mutationDefaults.set(hashKey(mutationKey), {
        mutationKey,
        defaultOptions: options
      });
    }
    getMutationDefaults(mutationKey) {
      const defaults = [...this.#mutationDefaults.values()];
      let result = {};
      defaults.forEach((queryDefault) => {
        if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
          result = { ...result, ...queryDefault.defaultOptions };
        }
      });
      return result;
    }
    defaultQueryOptions(options) {
      if (options._defaulted) {
        return options;
      }
      const defaultedOptions = {
        ...this.#defaultOptions.queries,
        ...this.getQueryDefaults(options.queryKey),
        ...options,
        _defaulted: true
      };
      if (!defaultedOptions.queryHash) {
        defaultedOptions.queryHash = hashQueryKeyByOptions(
          defaultedOptions.queryKey,
          defaultedOptions
        );
      }
      if (defaultedOptions.refetchOnReconnect === void 0) {
        defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
      }
      if (defaultedOptions.throwOnError === void 0) {
        defaultedOptions.throwOnError = !!defaultedOptions.suspense;
      }
      if (!defaultedOptions.networkMode && defaultedOptions.persister) {
        defaultedOptions.networkMode = "offlineFirst";
      }
      if (defaultedOptions.enabled !== true && defaultedOptions.queryFn === skipToken) {
        defaultedOptions.enabled = false;
      }
      return defaultedOptions;
    }
    defaultMutationOptions(options) {
      if (options?._defaulted) {
        return options;
      }
      return {
        ...this.#defaultOptions.mutations,
        ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
        ...options,
        _defaulted: true
      };
    }
    clear() {
      this.#queryCache.clear();
      this.#mutationCache.clear();
    }
  };

  // node_modules/@tanstack/query-core/build/modern/queryObserver.js
  var QueryObserver = class extends Subscribable {
    constructor(client, options) {
      super();
      this.options = options;
      this.#client = client;
      this.#selectError = null;
      this.bindMethods();
      this.setOptions(options);
    }
    #client;
    #currentQuery = void 0;
    #currentQueryInitialState = void 0;
    #currentResult = void 0;
    #currentResultState;
    #currentResultOptions;
    #selectError;
    #selectFn;
    #selectResult;
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    #lastQueryWithDefinedData;
    #staleTimeoutId;
    #refetchIntervalId;
    #currentRefetchInterval;
    #trackedProps = /* @__PURE__ */ new Set();
    bindMethods() {
      this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
      if (this.listeners.size === 1) {
        this.#currentQuery.addObserver(this);
        if (shouldFetchOnMount(this.#currentQuery, this.options)) {
          this.#executeFetch();
        } else {
          this.updateResult();
        }
        this.#updateTimers();
      }
    }
    onUnsubscribe() {
      if (!this.hasListeners()) {
        this.destroy();
      }
    }
    shouldFetchOnReconnect() {
      return shouldFetchOn(
        this.#currentQuery,
        this.options,
        this.options.refetchOnReconnect
      );
    }
    shouldFetchOnWindowFocus() {
      return shouldFetchOn(
        this.#currentQuery,
        this.options,
        this.options.refetchOnWindowFocus
      );
    }
    destroy() {
      this.listeners = /* @__PURE__ */ new Set();
      this.#clearStaleTimeout();
      this.#clearRefetchInterval();
      this.#currentQuery.removeObserver(this);
    }
    setOptions(options, notifyOptions) {
      const prevOptions = this.options;
      const prevQuery = this.#currentQuery;
      this.options = this.#client.defaultQueryOptions(options);
      if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean") {
        throw new Error("Expected enabled to be a boolean");
      }
      this.#updateQuery();
      this.#currentQuery.setOptions(this.options);
      if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
        this.#client.getQueryCache().notify({
          type: "observerOptionsUpdated",
          query: this.#currentQuery,
          observer: this
        });
      }
      const mounted = this.hasListeners();
      if (mounted && shouldFetchOptionally(
        this.#currentQuery,
        prevQuery,
        this.options,
        prevOptions
      )) {
        this.#executeFetch();
      }
      this.updateResult(notifyOptions);
      if (mounted && (this.#currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || this.options.staleTime !== prevOptions.staleTime)) {
        this.#updateStaleTimeout();
      }
      const nextRefetchInterval = this.#computeRefetchInterval();
      if (mounted && (this.#currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || nextRefetchInterval !== this.#currentRefetchInterval)) {
        this.#updateRefetchInterval(nextRefetchInterval);
      }
    }
    getOptimisticResult(options) {
      const query = this.#client.getQueryCache().build(this.#client, options);
      const result = this.createResult(query, options);
      if (shouldAssignObserverCurrentProperties(this, result)) {
        this.#currentResult = result;
        this.#currentResultOptions = this.options;
        this.#currentResultState = this.#currentQuery.state;
      }
      return result;
    }
    getCurrentResult() {
      return this.#currentResult;
    }
    trackResult(result, onPropTracked) {
      const trackedResult = {};
      Object.keys(result).forEach((key) => {
        Object.defineProperty(trackedResult, key, {
          configurable: false,
          enumerable: true,
          get: () => {
            this.trackProp(key);
            onPropTracked?.(key);
            return result[key];
          }
        });
      });
      return trackedResult;
    }
    trackProp(key) {
      this.#trackedProps.add(key);
    }
    getCurrentQuery() {
      return this.#currentQuery;
    }
    refetch({ ...options } = {}) {
      return this.fetch({
        ...options
      });
    }
    fetchOptimistic(options) {
      const defaultedOptions = this.#client.defaultQueryOptions(options);
      const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
      query.isFetchingOptimistic = true;
      return query.fetch().then(() => this.createResult(query, defaultedOptions));
    }
    fetch(fetchOptions) {
      return this.#executeFetch({
        ...fetchOptions,
        cancelRefetch: fetchOptions.cancelRefetch ?? true
      }).then(() => {
        this.updateResult();
        return this.#currentResult;
      });
    }
    #executeFetch(fetchOptions) {
      this.#updateQuery();
      let promise = this.#currentQuery.fetch(
        this.options,
        fetchOptions
      );
      if (!fetchOptions?.throwOnError) {
        promise = promise.catch(noop2);
      }
      return promise;
    }
    #updateStaleTimeout() {
      this.#clearStaleTimeout();
      if (isServer || this.#currentResult.isStale || !isValidTimeout(this.options.staleTime)) {
        return;
      }
      const time = timeUntilStale(
        this.#currentResult.dataUpdatedAt,
        this.options.staleTime
      );
      const timeout = time + 1;
      this.#staleTimeoutId = setTimeout(() => {
        if (!this.#currentResult.isStale) {
          this.updateResult();
        }
      }, timeout);
    }
    #computeRefetchInterval() {
      return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
    }
    #updateRefetchInterval(nextInterval) {
      this.#clearRefetchInterval();
      this.#currentRefetchInterval = nextInterval;
      if (isServer || this.options.enabled === false || !isValidTimeout(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
        return;
      }
      this.#refetchIntervalId = setInterval(() => {
        if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
          this.#executeFetch();
        }
      }, this.#currentRefetchInterval);
    }
    #updateTimers() {
      this.#updateStaleTimeout();
      this.#updateRefetchInterval(this.#computeRefetchInterval());
    }
    #clearStaleTimeout() {
      if (this.#staleTimeoutId) {
        clearTimeout(this.#staleTimeoutId);
        this.#staleTimeoutId = void 0;
      }
    }
    #clearRefetchInterval() {
      if (this.#refetchIntervalId) {
        clearInterval(this.#refetchIntervalId);
        this.#refetchIntervalId = void 0;
      }
    }
    createResult(query, options) {
      const prevQuery = this.#currentQuery;
      const prevOptions = this.options;
      const prevResult = this.#currentResult;
      const prevResultState = this.#currentResultState;
      const prevResultOptions = this.#currentResultOptions;
      const queryChange = query !== prevQuery;
      const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
      const { state } = query;
      let newState = { ...state };
      let isPlaceholderData = false;
      let data;
      if (options._optimisticResults) {
        const mounted = this.hasListeners();
        const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
        const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
        if (fetchOnMount || fetchOptionally) {
          newState = {
            ...newState,
            ...fetchState(state.data, query.options)
          };
        }
        if (options._optimisticResults === "isRestoring") {
          newState.fetchStatus = "idle";
        }
      }
      let { error, errorUpdatedAt, status } = newState;
      if (options.select && newState.data !== void 0) {
        if (prevResult && newState.data === prevResultState?.data && options.select === this.#selectFn) {
          data = this.#selectResult;
        } else {
          try {
            this.#selectFn = options.select;
            data = options.select(newState.data);
            data = replaceData(prevResult?.data, data, options);
            this.#selectResult = data;
            this.#selectError = null;
          } catch (selectError) {
            this.#selectError = selectError;
          }
        }
      } else {
        data = newState.data;
      }
      if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
        let placeholderData;
        if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
          placeholderData = prevResult.data;
        } else {
          placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
            this.#lastQueryWithDefinedData?.state.data,
            this.#lastQueryWithDefinedData
          ) : options.placeholderData;
          if (options.select && placeholderData !== void 0) {
            try {
              placeholderData = options.select(placeholderData);
              this.#selectError = null;
            } catch (selectError) {
              this.#selectError = selectError;
            }
          }
        }
        if (placeholderData !== void 0) {
          status = "success";
          data = replaceData(
            prevResult?.data,
            placeholderData,
            options
          );
          isPlaceholderData = true;
        }
      }
      if (this.#selectError) {
        error = this.#selectError;
        data = this.#selectResult;
        errorUpdatedAt = Date.now();
        status = "error";
      }
      const isFetching = newState.fetchStatus === "fetching";
      const isPending = status === "pending";
      const isError = status === "error";
      const isLoading = isPending && isFetching;
      const hasData = data !== void 0;
      const result = {
        status,
        fetchStatus: newState.fetchStatus,
        isPending,
        isSuccess: status === "success",
        isError,
        isInitialLoading: isLoading,
        isLoading,
        data,
        dataUpdatedAt: newState.dataUpdatedAt,
        error,
        errorUpdatedAt,
        failureCount: newState.fetchFailureCount,
        failureReason: newState.fetchFailureReason,
        errorUpdateCount: newState.errorUpdateCount,
        isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
        isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
        isFetching,
        isRefetching: isFetching && !isPending,
        isLoadingError: isError && !hasData,
        isPaused: newState.fetchStatus === "paused",
        isPlaceholderData,
        isRefetchError: isError && hasData,
        isStale: isStale(query, options),
        refetch: this.refetch
      };
      return result;
    }
    updateResult(notifyOptions) {
      const prevResult = this.#currentResult;
      const nextResult = this.createResult(this.#currentQuery, this.options);
      this.#currentResultState = this.#currentQuery.state;
      this.#currentResultOptions = this.options;
      if (this.#currentResultState.data !== void 0) {
        this.#lastQueryWithDefinedData = this.#currentQuery;
      }
      if (shallowEqualObjects(nextResult, prevResult)) {
        return;
      }
      this.#currentResult = nextResult;
      const defaultNotifyOptions = {};
      const shouldNotifyListeners = () => {
        if (!prevResult) {
          return true;
        }
        const { notifyOnChangeProps } = this.options;
        const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
        if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
          return true;
        }
        const includedProps = new Set(
          notifyOnChangePropsValue ?? this.#trackedProps
        );
        if (this.options.throwOnError) {
          includedProps.add("error");
        }
        return Object.keys(this.#currentResult).some((key) => {
          const typedKey = key;
          const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
          return changed && includedProps.has(typedKey);
        });
      };
      if (notifyOptions?.listeners !== false && shouldNotifyListeners()) {
        defaultNotifyOptions.listeners = true;
      }
      this.#notify({ ...defaultNotifyOptions, ...notifyOptions });
    }
    #updateQuery() {
      const query = this.#client.getQueryCache().build(this.#client, this.options);
      if (query === this.#currentQuery) {
        return;
      }
      const prevQuery = this.#currentQuery;
      this.#currentQuery = query;
      this.#currentQueryInitialState = query.state;
      if (this.hasListeners()) {
        prevQuery?.removeObserver(this);
        query.addObserver(this);
      }
    }
    onQueryUpdate() {
      this.updateResult();
      if (this.hasListeners()) {
        this.#updateTimers();
      }
    }
    #notify(notifyOptions) {
      notifyManager.batch(() => {
        if (notifyOptions.listeners) {
          this.listeners.forEach((listener) => {
            listener(this.#currentResult);
          });
        }
        this.#client.getQueryCache().notify({
          query: this.#currentQuery,
          type: "observerResultsUpdated"
        });
      });
    }
  };
  function shouldLoadOnMount(query, options) {
    return options.enabled !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
  }
  function shouldFetchOnMount(query, options) {
    return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
  }
  function shouldFetchOn(query, options, field) {
    if (options.enabled !== false) {
      const value = typeof field === "function" ? field(query) : field;
      return value === "always" || value !== false && isStale(query, options);
    }
    return false;
  }
  function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
    return (query !== prevQuery || prevOptions.enabled === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
  }
  function isStale(query, options) {
    return options.enabled !== false && query.isStaleByTime(options.staleTime);
  }
  function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
    if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
      return true;
    }
    return false;
  }

  // node_modules/@tanstack/query-core/build/modern/infiniteQueryObserver.js
  var InfiniteQueryObserver = class extends QueryObserver {
    constructor(client, options) {
      super(client, options);
    }
    bindMethods() {
      super.bindMethods();
      this.fetchNextPage = this.fetchNextPage.bind(this);
      this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
    }
    setOptions(options, notifyOptions) {
      super.setOptions(
        {
          ...options,
          behavior: infiniteQueryBehavior()
        },
        notifyOptions
      );
    }
    getOptimisticResult(options) {
      options.behavior = infiniteQueryBehavior();
      return super.getOptimisticResult(options);
    }
    fetchNextPage(options) {
      return this.fetch({
        ...options,
        meta: {
          fetchMore: { direction: "forward" }
        }
      });
    }
    fetchPreviousPage(options) {
      return this.fetch({
        ...options,
        meta: {
          fetchMore: { direction: "backward" }
        }
      });
    }
    createResult(query, options) {
      const { state } = query;
      const result = super.createResult(query, options);
      const { isFetching, isRefetching } = result;
      const isFetchingNextPage = isFetching && state.fetchMeta?.fetchMore?.direction === "forward";
      const isFetchingPreviousPage = isFetching && state.fetchMeta?.fetchMore?.direction === "backward";
      return {
        ...result,
        fetchNextPage: this.fetchNextPage,
        fetchPreviousPage: this.fetchPreviousPage,
        hasNextPage: hasNextPage(options, state.data),
        hasPreviousPage: hasPreviousPage(options, state.data),
        isFetchingNextPage,
        isFetchingPreviousPage,
        isRefetching: isRefetching && !isFetchingNextPage && !isFetchingPreviousPage
      };
    }
  };

  // node_modules/@tanstack/svelte-query/dist/context.js
  var _contextKey = "$$_queryClient";
  var getQueryClientContext = () => {
    const client = getContext(_contextKey);
    if (!client) {
      throw new Error("No QueryClient was found in Svelte context. Did you forget to wrap your component with QueryClientProvider?");
    }
    return client;
  };
  var setQueryClientContext = (client) => {
    setContext(_contextKey, client);
  };
  var _isRestoringContextKey = "$$_isRestoring";
  var getIsRestoringContext = () => {
    try {
      const isRestoring = getContext(_isRestoringContextKey);
      return isRestoring ? isRestoring : readable(false);
    } catch (error) {
      return readable(false);
    }
  };

  // node_modules/@tanstack/svelte-query/dist/useIsRestoring.js
  function useIsRestoring() {
    return getIsRestoringContext();
  }

  // node_modules/@tanstack/svelte-query/dist/useQueryClient.js
  function useQueryClient(queryClient) {
    if (queryClient)
      return queryClient;
    return getQueryClientContext();
  }

  // node_modules/@tanstack/svelte-query/dist/utils.js
  function isSvelteStore(obj) {
    return "subscribe" in obj && typeof obj.subscribe === "function";
  }

  // node_modules/@tanstack/svelte-query/dist/createBaseQuery.js
  function createBaseQuery(options, Observer, queryClient) {
    const client = useQueryClient(queryClient);
    const isRestoring = useIsRestoring();
    const optionsStore = isSvelteStore(options) ? options : readable(options);
    const defaultedOptionsStore = derived([optionsStore, isRestoring], ([$optionsStore, $isRestoring]) => {
      const defaultedOptions = client.defaultQueryOptions($optionsStore);
      defaultedOptions._optimisticResults = $isRestoring ? "isRestoring" : "optimistic";
      return defaultedOptions;
    });
    const observer = new Observer(client, get_store_value(defaultedOptionsStore));
    defaultedOptionsStore.subscribe(($defaultedOptions) => {
      observer.setOptions($defaultedOptions, { listeners: false });
    });
    const result = derived(isRestoring, ($isRestoring, set) => {
      const unsubscribe = $isRestoring ? () => void 0 : observer.subscribe(notifyManager.batchCalls(set));
      observer.updateResult();
      return unsubscribe;
    });
    const { subscribe: subscribe2 } = derived([result, defaultedOptionsStore], ([$result, $defaultedOptionsStore]) => {
      $result = observer.getOptimisticResult($defaultedOptionsStore);
      return !$defaultedOptionsStore.notifyOnChangeProps ? observer.trackResult($result) : $result;
    });
    return { subscribe: subscribe2 };
  }

  // node_modules/@tanstack/svelte-query/dist/createQuery.js
  function createQuery(options, queryClient) {
    return createBaseQuery(options, QueryObserver, queryClient);
  }

  // node_modules/@tanstack/svelte-query/dist/createInfiniteQuery.js
  function createInfiniteQuery(options, queryClient) {
    return createBaseQuery(options, InfiniteQueryObserver, queryClient);
  }

  // node_modules/@tanstack/svelte-query/dist/QueryClientProvider.svelte
  function create_fragment3(ctx) {
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[2].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[1],
      null
    );
    return {
      c() {
        if (default_slot)
          default_slot.c();
      },
      l(nodes) {
        if (default_slot)
          default_slot.l(nodes);
      },
      m(target, anchor) {
        if (default_slot) {
          default_slot.m(target, anchor);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          2)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[1],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[1]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[1],
                dirty,
                null
              ),
              null
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function instance3($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { client = new QueryClient() } = $$props;
    onMount(() => {
      client.mount();
    });
    setQueryClientContext(client);
    onDestroy(() => {
      client.unmount();
    });
    $$self.$$set = ($$props2) => {
      if ("client" in $$props2)
        $$invalidate(0, client = $$props2.client);
      if ("$$scope" in $$props2)
        $$invalidate(1, $$scope = $$props2.$$scope);
    };
    return [client, $$scope, slots];
  }
  var QueryClientProvider = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance3, create_fragment3, safe_not_equal, { client: 0 });
    }
  };
  var QueryClientProvider_default = QueryClientProvider;

  // utils/fetchData.js
  var fetchDataPagination = async (id, pagination) => {
    const url = window.mesa.tableRegistry.find((table) => table.id === id).url;
    const response = await fetch(`${url}?pageIndex=${pagination.pageIndex}`);
    const data = await response.json();
    return data;
  };
  var fetchDataInfiniteScroll = async (id, { pageParam }) => {
    const url = window.mesa.tableRegistry.find((table) => table.id === id).url;
    const response = await fetch(`${url}?cursor=${pageParam}`);
    const data = await response.json();
    return data;
  };

  // components/MesaServerPagination.svelte
  function get_each_context2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[11] = list[i];
    return child_ctx;
  }
  function get_each_context_12(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[14] = list[i];
    return child_ctx;
  }
  function get_each_context_22(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[17] = list[i];
    return child_ctx;
  }
  function get_each_context_32(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[20] = list[i];
    return child_ctx;
  }
  function create_if_block2(ctx) {
    let th;
    let switch_instance;
    let th_class_value;
    let current;
    var switch_value = flexRender(
      /*header*/
      ctx[20].column.columnDef.header,
      /*header*/
      ctx[20].getContext()
    );
    function switch_props(ctx2, dirty) {
      return {};
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        th = element("th");
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        this.h();
      },
      l(nodes) {
        th = claim_element(nodes, "TH", { class: true });
        var th_nodes = children(th);
        if (switch_instance)
          claim_component(switch_instance.$$.fragment, th_nodes);
        th_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(th, "class", th_class_value = /*resolvedStyleOptions*/
        ctx[1].thClass);
      },
      m(target, anchor) {
        insert_hydration(target, th, anchor);
        if (switch_instance)
          mount_component(switch_instance, th, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*$table*/
        4 && switch_value !== (switch_value = flexRender(
          /*header*/
          ctx2[20].column.columnDef.header,
          /*header*/
          ctx2[20].getContext()
        ))) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, th, null);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && th_class_value !== (th_class_value = /*resolvedStyleOptions*/
        ctx2[1].thClass)) {
          attr(th, "class", th_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(th);
        }
        if (switch_instance)
          destroy_component(switch_instance);
      }
    };
  }
  function create_each_block_32(ctx) {
    let if_block_anchor;
    let current;
    let if_block = !/*header*/
    ctx[20].isPlaceholder && create_if_block2(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      l(nodes) {
        if (if_block)
          if_block.l(nodes);
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert_hydration(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (!/*header*/
        ctx2[20].isPlaceholder) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*$table*/
            4) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block2(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_each_block_22(ctx) {
    let tr;
    let t;
    let tr_class_value;
    let current;
    let each_value_3 = ensure_array_like(
      /*headerGroup*/
      ctx[17].headers
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_3.length; i += 1) {
      each_blocks[i] = create_each_block_32(get_each_context_32(ctx, each_value_3, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        tr = element("tr");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t = space();
        this.h();
      },
      l(nodes) {
        tr = claim_element(nodes, "TR", { class: true });
        var tr_nodes = children(tr);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].l(tr_nodes);
        }
        t = claim_space(tr_nodes);
        tr_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(tr, "class", tr_class_value = /*resolvedStyleOptions*/
        ctx[1].trClass);
      },
      m(target, anchor) {
        insert_hydration(target, tr, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tr, null);
          }
        }
        append_hydration(tr, t);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*resolvedStyleOptions, $table*/
        6) {
          each_value_3 = ensure_array_like(
            /*headerGroup*/
            ctx2[17].headers
          );
          let i;
          for (i = 0; i < each_value_3.length; i += 1) {
            const child_ctx = get_each_context_32(ctx2, each_value_3, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_32(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tr, t);
            }
          }
          group_outros();
          for (i = each_value_3.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && tr_class_value !== (tr_class_value = /*resolvedStyleOptions*/
        ctx2[1].trClass)) {
          attr(tr, "class", tr_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_3.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_12(ctx) {
    let td;
    let switch_instance;
    let td_class_value;
    let current;
    var switch_value = flexRender(
      /*cell*/
      ctx[14].column.columnDef.cell,
      /*cell*/
      ctx[14].getContext()
    );
    function switch_props(ctx2, dirty) {
      return {};
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        td = element("td");
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        this.h();
      },
      l(nodes) {
        td = claim_element(nodes, "TD", { class: true });
        var td_nodes = children(td);
        if (switch_instance)
          claim_component(switch_instance.$$.fragment, td_nodes);
        td_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(td, "class", td_class_value = /*resolvedStyleOptions*/
        ctx[1].tdClass);
      },
      m(target, anchor) {
        insert_hydration(target, td, anchor);
        if (switch_instance)
          mount_component(switch_instance, td, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*$table*/
        4 && switch_value !== (switch_value = flexRender(
          /*cell*/
          ctx2[14].column.columnDef.cell,
          /*cell*/
          ctx2[14].getContext()
        ))) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, td, null);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && td_class_value !== (td_class_value = /*resolvedStyleOptions*/
        ctx2[1].tdClass)) {
          attr(td, "class", td_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(td);
        }
        if (switch_instance)
          destroy_component(switch_instance);
      }
    };
  }
  function create_each_block2(ctx) {
    let tr;
    let t;
    let tr_class_value;
    let current;
    let each_value_1 = ensure_array_like(
      /*row*/
      ctx[11].getVisibleCells()
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_12(get_each_context_12(ctx, each_value_1, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        tr = element("tr");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t = space();
        this.h();
      },
      l(nodes) {
        tr = claim_element(nodes, "TR", { class: true });
        var tr_nodes = children(tr);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].l(tr_nodes);
        }
        t = claim_space(tr_nodes);
        tr_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(tr, "class", tr_class_value = /*resolvedStyleOptions*/
        ctx[1].trClass);
      },
      m(target, anchor) {
        insert_hydration(target, tr, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tr, null);
          }
        }
        append_hydration(tr, t);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*resolvedStyleOptions, $table*/
        6) {
          each_value_1 = ensure_array_like(
            /*row*/
            ctx2[11].getVisibleCells()
          );
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_12(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_12(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tr, t);
            }
          }
          group_outros();
          for (i = each_value_1.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && tr_class_value !== (tr_class_value = /*resolvedStyleOptions*/
        ctx2[1].trClass)) {
          attr(tr, "class", tr_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_1.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_fragment4(ctx) {
    let table_1;
    let thead;
    let thead_class_value;
    let t0;
    let tbody;
    let tbody_class_value;
    let table_1_class_value;
    let t1;
    let div;
    let button0;
    let textContent = "prev";
    let t3;
    let button1;
    let textContent_1 = "next";
    let current;
    let mounted;
    let dispose;
    let each_value_2 = ensure_array_like(
      /*$table*/
      ctx[2].getHeaderGroups()
    );
    let each_blocks_1 = [];
    for (let i = 0; i < each_value_2.length; i += 1) {
      each_blocks_1[i] = create_each_block_22(get_each_context_22(ctx, each_value_2, i));
    }
    const out = (i) => transition_out(each_blocks_1[i], 1, 1, () => {
      each_blocks_1[i] = null;
    });
    let each_value = ensure_array_like(
      /*$table*/
      ctx[2].getRowModel().rows
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
    }
    const out_1 = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        table_1 = element("table");
        thead = element("thead");
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].c();
        }
        t0 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t1 = space();
        div = element("div");
        button0 = element("button");
        button0.textContent = textContent;
        t3 = space();
        button1 = element("button");
        button1.textContent = textContent_1;
        this.h();
      },
      l(nodes) {
        table_1 = claim_element(nodes, "TABLE", { id: true, class: true });
        var table_1_nodes = children(table_1);
        thead = claim_element(table_1_nodes, "THEAD", { class: true });
        var thead_nodes = children(thead);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].l(thead_nodes);
        }
        thead_nodes.forEach(detach);
        t0 = claim_space(table_1_nodes);
        tbody = claim_element(table_1_nodes, "TBODY", { class: true });
        var tbody_nodes = children(tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].l(tbody_nodes);
        }
        tbody_nodes.forEach(detach);
        table_1_nodes.forEach(detach);
        t1 = claim_space(nodes);
        div = claim_element(nodes, "DIV", {});
        var div_nodes = children(div);
        button0 = claim_element(div_nodes, "BUTTON", { ["data-svelte-h"]: true });
        if (get_svelte_dataset(button0) !== "svelte-106yhac")
          button0.textContent = textContent;
        t3 = claim_space(div_nodes);
        button1 = claim_element(div_nodes, "BUTTON", { ["data-svelte-h"]: true });
        if (get_svelte_dataset(button1) !== "svelte-1ra1te0")
          button1.textContent = textContent_1;
        div_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(thead, "class", thead_class_value = /*resolvedStyleOptions*/
        ctx[1].theadClass);
        attr(tbody, "class", tbody_class_value = /*resolvedStyleOptions*/
        ctx[1].tbodyClass);
        attr(
          table_1,
          "id",
          /*id*/
          ctx[0]
        );
        attr(table_1, "class", table_1_class_value = /*resolvedStyleOptions*/
        ctx[1].tableClass);
      },
      m(target, anchor) {
        insert_hydration(target, table_1, anchor);
        append_hydration(table_1, thead);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          if (each_blocks_1[i]) {
            each_blocks_1[i].m(thead, null);
          }
        }
        append_hydration(table_1, t0);
        append_hydration(table_1, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        insert_hydration(target, t1, anchor);
        insert_hydration(target, div, anchor);
        append_hydration(div, button0);
        append_hydration(div, t3);
        append_hydration(div, button1);
        current = true;
        if (!mounted) {
          dispose = [
            listen(button0, "click", function() {
              if (is_function(
                /*$table*/
                ctx[2].previousPage()
              ))
                ctx[2].previousPage().apply(this, arguments);
            }),
            listen(button1, "click", function() {
              if (is_function(
                /*$table*/
                ctx[2].nextPage()
              ))
                ctx[2].nextPage().apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, [dirty]) {
        ctx = new_ctx;
        if (dirty & /*resolvedStyleOptions, $table*/
        6) {
          each_value_2 = ensure_array_like(
            /*$table*/
            ctx[2].getHeaderGroups()
          );
          let i;
          for (i = 0; i < each_value_2.length; i += 1) {
            const child_ctx = get_each_context_22(ctx, each_value_2, i);
            if (each_blocks_1[i]) {
              each_blocks_1[i].p(child_ctx, dirty);
              transition_in(each_blocks_1[i], 1);
            } else {
              each_blocks_1[i] = create_each_block_22(child_ctx);
              each_blocks_1[i].c();
              transition_in(each_blocks_1[i], 1);
              each_blocks_1[i].m(thead, null);
            }
          }
          group_outros();
          for (i = each_value_2.length; i < each_blocks_1.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && thead_class_value !== (thead_class_value = /*resolvedStyleOptions*/
        ctx[1].theadClass)) {
          attr(thead, "class", thead_class_value);
        }
        if (dirty & /*resolvedStyleOptions, $table*/
        6) {
          each_value = ensure_array_like(
            /*$table*/
            ctx[2].getRowModel().rows
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context2(ctx, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block2(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tbody, null);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out_1(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && tbody_class_value !== (tbody_class_value = /*resolvedStyleOptions*/
        ctx[1].tbodyClass)) {
          attr(tbody, "class", tbody_class_value);
        }
        if (!current || dirty & /*id*/
        1) {
          attr(
            table_1,
            "id",
            /*id*/
            ctx[0]
          );
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        2 && table_1_class_value !== (table_1_class_value = /*resolvedStyleOptions*/
        ctx[1].tableClass)) {
          attr(table_1, "class", table_1_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_2.length; i += 1) {
          transition_in(each_blocks_1[i]);
        }
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks_1 = each_blocks_1.filter(Boolean);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          transition_out(each_blocks_1[i]);
        }
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(table_1);
          detach(t1);
          detach(div);
        }
        destroy_each(each_blocks_1, detaching);
        destroy_each(each_blocks, detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance4($$self, $$props, $$invalidate) {
    let resolvedStyleOptions;
    let $pagination;
    let $table;
    let { id } = $$props;
    let { columns = [] } = $$props;
    let { styleOptions = {} } = $$props;
    const pagination = writable({ pageIndex: 1, pageSize: 10 });
    component_subscribe($$self, pagination, (value) => $$invalidate(7, $pagination = value));
    const setPagination = (updater) => {
      if (updater instanceof Function) {
        pagination.set(updater($pagination));
      } else {
        pagination.set(updater);
      }
    };
    const query = createQuery(derived(pagination, ($pagination2) => ({
      queryKey: ["mesa", id, $pagination2],
      queryFn: () => fetchDataPagination(id, $pagination2)
    })));
    const options = derived([query, pagination], ([$query, $pagination2]) => ({
      columns,
      data: $query?.data ?? [],
      getCoreRowModel: getCoreRowModel(),
      pageCount: -1,
      state: { $pagination: $pagination2 },
      onPaginationChange: setPagination,
      manualPagination: true
    }));
    let table = createSvelteTable(options);
    component_subscribe($$self, table, (value) => $$invalidate(2, $table = value));
    registerMesaTable(id, table);
    $$self.$$set = ($$props2) => {
      if ("id" in $$props2)
        $$invalidate(0, id = $$props2.id);
      if ("columns" in $$props2)
        $$invalidate(5, columns = $$props2.columns);
      if ("styleOptions" in $$props2)
        $$invalidate(6, styleOptions = $$props2.styleOptions);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*styleOptions*/
      64) {
        $:
          $$invalidate(1, resolvedStyleOptions = resolveStyleOptions(styleOptions));
      }
    };
    return [id, resolvedStyleOptions, $table, pagination, table, columns, styleOptions];
  }
  var MesaServerPagination = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance4, create_fragment4, safe_not_equal, { id: 0, columns: 5, styleOptions: 6 });
    }
    get id() {
      return this.$$.ctx[0];
    }
    set id(id) {
      this.$$set({ id });
      flush();
    }
    get columns() {
      return this.$$.ctx[5];
    }
    set columns(columns) {
      this.$$set({ columns });
      flush();
    }
    get styleOptions() {
      return this.$$.ctx[6];
    }
    set styleOptions(styleOptions) {
      this.$$set({ styleOptions });
      flush();
    }
  };
  var MesaServerPagination_default = MesaServerPagination;

  // utils/inView.js
  function inView(node, params = {}) {
    let observer;
    const handleIntersect = (e) => {
      const intersecting = e[0].isIntersecting;
      if (intersecting) {
        node.dispatchEvent(new CustomEvent("intersecting"));
      }
    };
    const setObserver = ({ root, top, bottom }) => {
      const marginTop = top ? top * -1 : 0;
      const marginBottom = bottom ? bottom * -1 : 0;
      const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
      const options = { root, rootMargin };
      if (observer)
        observer.disconnect();
      observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(node);
    };
    setObserver(params);
    return {
      update(params2) {
        setObserver(params2);
      },
      destroy() {
        if (observer)
          observer.disconnect();
      }
    };
  }

  // components/MesaServerInfiniteScroll.svelte
  function get_each_context3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[14] = list[i];
    return child_ctx;
  }
  function get_each_context_13(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[17] = list[i];
    return child_ctx;
  }
  function get_each_context_23(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[20] = list[i];
    return child_ctx;
  }
  function get_each_context_33(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[23] = list[i];
    return child_ctx;
  }
  function create_if_block3(ctx) {
    let th;
    let switch_instance;
    let th_class_value;
    let current;
    var switch_value = flexRender(
      /*header*/
      ctx[23].column.columnDef.header,
      /*header*/
      ctx[23].getContext()
    );
    function switch_props(ctx2, dirty) {
      return {};
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        th = element("th");
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        this.h();
      },
      l(nodes) {
        th = claim_element(nodes, "TH", { class: true });
        var th_nodes = children(th);
        if (switch_instance)
          claim_component(switch_instance.$$.fragment, th_nodes);
        th_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(th, "class", th_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx[2].thClass
        ) + " svelte-1pq1vjr");
      },
      m(target, anchor) {
        insert_hydration(target, th, anchor);
        if (switch_instance)
          mount_component(switch_instance, th, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*$table*/
        16 && switch_value !== (switch_value = flexRender(
          /*header*/
          ctx2[23].column.columnDef.header,
          /*header*/
          ctx2[23].getContext()
        ))) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, th, null);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        4 && th_class_value !== (th_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx2[2].thClass
        ) + " svelte-1pq1vjr")) {
          attr(th, "class", th_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(th);
        }
        if (switch_instance)
          destroy_component(switch_instance);
      }
    };
  }
  function create_each_block_33(ctx) {
    let if_block_anchor;
    let current;
    let if_block = !/*header*/
    ctx[23].isPlaceholder && create_if_block3(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      l(nodes) {
        if (if_block)
          if_block.l(nodes);
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert_hydration(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (!/*header*/
        ctx2[23].isPlaceholder) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*$table*/
            16) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block3(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_each_block_23(ctx) {
    let tr;
    let t;
    let tr_class_value;
    let current;
    let each_value_3 = ensure_array_like(
      /*headerGroup*/
      ctx[20].headers
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_3.length; i += 1) {
      each_blocks[i] = create_each_block_33(get_each_context_33(ctx, each_value_3, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        tr = element("tr");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t = space();
        this.h();
      },
      l(nodes) {
        tr = claim_element(nodes, "TR", { class: true });
        var tr_nodes = children(tr);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].l(tr_nodes);
        }
        t = claim_space(tr_nodes);
        tr_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(tr, "class", tr_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx[2].trClass
        ) + " svelte-1pq1vjr");
      },
      m(target, anchor) {
        insert_hydration(target, tr, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tr, null);
          }
        }
        append_hydration(tr, t);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*resolvedStyleOptions, $table*/
        20) {
          each_value_3 = ensure_array_like(
            /*headerGroup*/
            ctx2[20].headers
          );
          let i;
          for (i = 0; i < each_value_3.length; i += 1) {
            const child_ctx = get_each_context_33(ctx2, each_value_3, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_33(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tr, t);
            }
          }
          group_outros();
          for (i = each_value_3.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        4 && tr_class_value !== (tr_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx2[2].trClass
        ) + " svelte-1pq1vjr")) {
          attr(tr, "class", tr_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_3.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_13(ctx) {
    let td;
    let switch_instance;
    let td_class_value;
    let current;
    var switch_value = flexRender(
      /*cell*/
      ctx[17].column.columnDef.cell,
      /*cell*/
      ctx[17].getContext()
    );
    function switch_props(ctx2, dirty) {
      return {};
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        td = element("td");
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        this.h();
      },
      l(nodes) {
        td = claim_element(nodes, "TD", { class: true });
        var td_nodes = children(td);
        if (switch_instance)
          claim_component(switch_instance.$$.fragment, td_nodes);
        td_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(td, "class", td_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx[2].tdClass
        ) + " svelte-1pq1vjr");
      },
      m(target, anchor) {
        insert_hydration(target, td, anchor);
        if (switch_instance)
          mount_component(switch_instance, td, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*$table*/
        16 && switch_value !== (switch_value = flexRender(
          /*cell*/
          ctx2[17].column.columnDef.cell,
          /*cell*/
          ctx2[17].getContext()
        ))) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, td, null);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        4 && td_class_value !== (td_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx2[2].tdClass
        ) + " svelte-1pq1vjr")) {
          attr(td, "class", td_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(td);
        }
        if (switch_instance)
          destroy_component(switch_instance);
      }
    };
  }
  function create_each_block3(ctx) {
    let tr;
    let t;
    let tr_class_value;
    let current;
    let each_value_1 = ensure_array_like(
      /*row*/
      ctx[14].getVisibleCells()
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_13(get_each_context_13(ctx, each_value_1, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        tr = element("tr");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t = space();
        this.h();
      },
      l(nodes) {
        tr = claim_element(nodes, "TR", { class: true });
        var tr_nodes = children(tr);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].l(tr_nodes);
        }
        t = claim_space(tr_nodes);
        tr_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(tr, "class", tr_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx[2].trClass
        ) + " svelte-1pq1vjr");
      },
      m(target, anchor) {
        insert_hydration(target, tr, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tr, null);
          }
        }
        append_hydration(tr, t);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*resolvedStyleOptions, $table*/
        20) {
          each_value_1 = ensure_array_like(
            /*row*/
            ctx2[14].getVisibleCells()
          );
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_13(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_13(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tr, t);
            }
          }
          group_outros();
          for (i = each_value_1.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        4 && tr_class_value !== (tr_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx2[2].trClass
        ) + " svelte-1pq1vjr")) {
          attr(tr, "class", tr_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_1.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_fragment5(ctx) {
    let div2;
    let div0;
    let inView_action;
    let t0;
    let table_1;
    let thead;
    let thead_class_value;
    let t1;
    let tbody;
    let tbody_class_value;
    let table_1_class_value;
    let t2;
    let div1;
    let inView_action_1;
    let current;
    let mounted;
    let dispose;
    let each_value_2 = ensure_array_like(
      /*$table*/
      ctx[4].getHeaderGroups()
    );
    let each_blocks_1 = [];
    for (let i = 0; i < each_value_2.length; i += 1) {
      each_blocks_1[i] = create_each_block_23(get_each_context_23(ctx, each_value_2, i));
    }
    const out = (i) => transition_out(each_blocks_1[i], 1, 1, () => {
      each_blocks_1[i] = null;
    });
    let each_value = ensure_array_like(
      /*$table*/
      ctx[4].getRowModel().rows
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
    }
    const out_1 = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        div2 = element("div");
        div0 = element("div");
        t0 = space();
        table_1 = element("table");
        thead = element("thead");
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].c();
        }
        t1 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t2 = space();
        div1 = element("div");
        this.h();
      },
      l(nodes) {
        div2 = claim_element(nodes, "DIV", { class: true });
        var div2_nodes = children(div2);
        div0 = claim_element(div2_nodes, "DIV", {});
        children(div0).forEach(detach);
        t0 = claim_space(div2_nodes);
        table_1 = claim_element(div2_nodes, "TABLE", { id: true, class: true });
        var table_1_nodes = children(table_1);
        thead = claim_element(table_1_nodes, "THEAD", { class: true });
        var thead_nodes = children(thead);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].l(thead_nodes);
        }
        thead_nodes.forEach(detach);
        t1 = claim_space(table_1_nodes);
        tbody = claim_element(table_1_nodes, "TBODY", { class: true });
        var tbody_nodes = children(tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].l(tbody_nodes);
        }
        tbody_nodes.forEach(detach);
        table_1_nodes.forEach(detach);
        t2 = claim_space(div2_nodes);
        div1 = claim_element(div2_nodes, "DIV", { class: true });
        children(div1).forEach(detach);
        div2_nodes.forEach(detach);
        this.h();
      },
      h() {
        attr(thead, "class", thead_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx[2].theadClass
        ) + " svelte-1pq1vjr");
        attr(tbody, "class", tbody_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx[2].tbodyClass
        ) + " svelte-1pq1vjr");
        attr(
          table_1,
          "id",
          /*id*/
          ctx[0]
        );
        attr(table_1, "class", table_1_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx[2].tableClass
        ) + " svelte-1pq1vjr");
        attr(div1, "class", "mesa-intersector svelte-1pq1vjr");
        attr(div2, "class", "mesa-scroll-container svelte-1pq1vjr");
      },
      m(target, anchor) {
        insert_hydration(target, div2, anchor);
        append_hydration(div2, div0);
        append_hydration(div2, t0);
        append_hydration(div2, table_1);
        append_hydration(table_1, thead);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          if (each_blocks_1[i]) {
            each_blocks_1[i].m(thead, null);
          }
        }
        append_hydration(table_1, t1);
        append_hydration(table_1, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        append_hydration(div2, t2);
        append_hydration(div2, div1);
        ctx[11](div2);
        current = true;
        if (!mounted) {
          dispose = [
            action_destroyer(inView_action = inView.call(null, div0)),
            listen(
              div0,
              "intersecting",
              /*intersecting_handler*/
              ctx[9]
            ),
            action_destroyer(inView_action_1 = inView.call(null, div1)),
            listen(
              div1,
              "intersecting",
              /*intersecting_handler_1*/
              ctx[10]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*resolvedStyleOptions, $table*/
        20) {
          each_value_2 = ensure_array_like(
            /*$table*/
            ctx2[4].getHeaderGroups()
          );
          let i;
          for (i = 0; i < each_value_2.length; i += 1) {
            const child_ctx = get_each_context_23(ctx2, each_value_2, i);
            if (each_blocks_1[i]) {
              each_blocks_1[i].p(child_ctx, dirty);
              transition_in(each_blocks_1[i], 1);
            } else {
              each_blocks_1[i] = create_each_block_23(child_ctx);
              each_blocks_1[i].c();
              transition_in(each_blocks_1[i], 1);
              each_blocks_1[i].m(thead, null);
            }
          }
          group_outros();
          for (i = each_value_2.length; i < each_blocks_1.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        4 && thead_class_value !== (thead_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx2[2].theadClass
        ) + " svelte-1pq1vjr")) {
          attr(thead, "class", thead_class_value);
        }
        if (dirty & /*resolvedStyleOptions, $table*/
        20) {
          each_value = ensure_array_like(
            /*$table*/
            ctx2[4].getRowModel().rows
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context3(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block3(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tbody, null);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out_1(i);
          }
          check_outros();
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        4 && tbody_class_value !== (tbody_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx2[2].tbodyClass
        ) + " svelte-1pq1vjr")) {
          attr(tbody, "class", tbody_class_value);
        }
        if (!current || dirty & /*id*/
        1) {
          attr(
            table_1,
            "id",
            /*id*/
            ctx2[0]
          );
        }
        if (!current || dirty & /*resolvedStyleOptions*/
        4 && table_1_class_value !== (table_1_class_value = null_to_empty(
          /*resolvedStyleOptions*/
          ctx2[2].tableClass
        ) + " svelte-1pq1vjr")) {
          attr(table_1, "class", table_1_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_2.length; i += 1) {
          transition_in(each_blocks_1[i]);
        }
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks_1 = each_blocks_1.filter(Boolean);
        for (let i = 0; i < each_blocks_1.length; i += 1) {
          transition_out(each_blocks_1[i]);
        }
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div2);
        }
        destroy_each(each_blocks_1, detaching);
        destroy_each(each_blocks, detaching);
        ctx[11](null);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance5($$self, $$props, $$invalidate) {
    let resolvedStyleOptions;
    let $query;
    let $table;
    let { id } = $$props;
    let { columns = [] } = $$props;
    let { styleOptions = {} } = $$props;
    let query = createInfiniteQuery({
      queryKey: ["mesa", "infinite"],
      queryFn: (pageParam) => fetchDataInfiniteScroll(id, pageParam),
      initialPageParam: 1,
      getPreviousPageParam: (firstPage) => firstPage.previousCursor,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      placeholderData: keepPreviousData,
      maxPages: 3
    });
    component_subscribe($$self, query, (value) => $$invalidate(3, $query = value));
    let flatData = derived(query, ($query2) => {
      return $query2.data?.pages.flatMap((page) => page.data) ?? [];
    });
    let options = derived(flatData, ($flatData) => {
      return {
        data: $flatData,
        columns,
        getCoreRowModel: getCoreRowModel()
      };
    });
    let table = createSvelteTable(options);
    component_subscribe($$self, table, (value) => $$invalidate(4, $table = value));
    registerMesaTable(id, table);
    let container;
    const intersecting_handler = () => {
      if ($query.hasPreviousPage && !$query.isFetchingPreviousPage) {
        $query.fetchPreviousPage();
        container.scroll({ top: 5 });
      }
    };
    const intersecting_handler_1 = () => {
      if ($query.hasNextPage && !$query.isFetchingNextPage) {
        $query.fetchNextPage();
        container.scroll({ top: container.clientHeight - 10 });
      }
    };
    function div2_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        container = $$value;
        $$invalidate(1, container);
      });
    }
    $$self.$$set = ($$props2) => {
      if ("id" in $$props2)
        $$invalidate(0, id = $$props2.id);
      if ("columns" in $$props2)
        $$invalidate(7, columns = $$props2.columns);
      if ("styleOptions" in $$props2)
        $$invalidate(8, styleOptions = $$props2.styleOptions);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*styleOptions*/
      256) {
        $:
          $$invalidate(2, resolvedStyleOptions = resolveStyleOptions(styleOptions));
      }
    };
    return [
      id,
      container,
      resolvedStyleOptions,
      $query,
      $table,
      query,
      table,
      columns,
      styleOptions,
      intersecting_handler,
      intersecting_handler_1,
      div2_binding
    ];
  }
  var MesaServerInfiniteScroll = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance5, create_fragment5, safe_not_equal, { id: 0, columns: 7, styleOptions: 8 });
    }
  };
  var MesaServerInfiniteScroll_default = MesaServerInfiniteScroll;

  // components/Mesa.svelte
  function create_if_block_2(ctx) {
    let mesaserverpagination;
    let current;
    mesaserverpagination = new MesaServerPagination_default({
      props: {
        id: (
          /*id*/
          ctx[0]
        ),
        columns: (
          /*columns*/
          ctx[1]
        ),
        styleOptions: (
          /*styleOptions*/
          ctx[4]
        )
      }
    });
    return {
      c() {
        create_component(mesaserverpagination.$$.fragment);
      },
      l(nodes) {
        claim_component(mesaserverpagination.$$.fragment, nodes);
      },
      m(target, anchor) {
        mount_component(mesaserverpagination, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const mesaserverpagination_changes = {};
        if (dirty & /*id*/
        1)
          mesaserverpagination_changes.id = /*id*/
          ctx2[0];
        if (dirty & /*columns*/
        2)
          mesaserverpagination_changes.columns = /*columns*/
          ctx2[1];
        if (dirty & /*styleOptions*/
        16)
          mesaserverpagination_changes.styleOptions = /*styleOptions*/
          ctx2[4];
        mesaserverpagination.$set(mesaserverpagination_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(mesaserverpagination.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(mesaserverpagination.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(mesaserverpagination, detaching);
      }
    };
  }
  function create_if_block_1(ctx) {
    let mesaserverinfinitescroll;
    let current;
    mesaserverinfinitescroll = new MesaServerInfiniteScroll_default({
      props: {
        id: (
          /*id*/
          ctx[0]
        ),
        columns: (
          /*columns*/
          ctx[1]
        ),
        styleOptions: (
          /*styleOptions*/
          ctx[4]
        )
      }
    });
    return {
      c() {
        create_component(mesaserverinfinitescroll.$$.fragment);
      },
      l(nodes) {
        claim_component(mesaserverinfinitescroll.$$.fragment, nodes);
      },
      m(target, anchor) {
        mount_component(mesaserverinfinitescroll, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const mesaserverinfinitescroll_changes = {};
        if (dirty & /*id*/
        1)
          mesaserverinfinitescroll_changes.id = /*id*/
          ctx2[0];
        if (dirty & /*columns*/
        2)
          mesaserverinfinitescroll_changes.columns = /*columns*/
          ctx2[1];
        if (dirty & /*styleOptions*/
        16)
          mesaserverinfinitescroll_changes.styleOptions = /*styleOptions*/
          ctx2[4];
        mesaserverinfinitescroll.$set(mesaserverinfinitescroll_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(mesaserverinfinitescroll.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(mesaserverinfinitescroll.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(mesaserverinfinitescroll, detaching);
      }
    };
  }
  function create_if_block4(ctx) {
    let mesaclient;
    let current;
    mesaclient = new MesaClient_default({
      props: {
        id: (
          /*id*/
          ctx[0]
        ),
        columns: (
          /*columns*/
          ctx[1]
        ),
        data: (
          /*data*/
          ctx[2]
        ),
        styleOptions: (
          /*styleOptions*/
          ctx[4]
        )
      }
    });
    return {
      c() {
        create_component(mesaclient.$$.fragment);
      },
      l(nodes) {
        claim_component(mesaclient.$$.fragment, nodes);
      },
      m(target, anchor) {
        mount_component(mesaclient, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const mesaclient_changes = {};
        if (dirty & /*id*/
        1)
          mesaclient_changes.id = /*id*/
          ctx2[0];
        if (dirty & /*columns*/
        2)
          mesaclient_changes.columns = /*columns*/
          ctx2[1];
        if (dirty & /*data*/
        4)
          mesaclient_changes.data = /*data*/
          ctx2[2];
        if (dirty & /*styleOptions*/
        16)
          mesaclient_changes.styleOptions = /*styleOptions*/
          ctx2[4];
        mesaclient.$set(mesaclient_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(mesaclient.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(mesaclient.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(mesaclient, detaching);
      }
    };
  }
  function create_default_slot(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block4, create_if_block_1, create_if_block_2];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (!/*ssrOptions*/
      ctx2[3].useSSR)
        return 0;
      if (
        /*ssrOptions*/
        ctx2[3].useSSR && /*ssrOptions*/
        ctx2[3].useInfiniteScroll
      )
        return 1;
      if (
        /*ssrOptions*/
        ctx2[3].useSSR && /*ssrOptions*/
        ctx2[3].usePagination
      )
        return 2;
      return -1;
    }
    if (~(current_block_type_index = select_block_type(ctx, -1))) {
      if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    }
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      l(nodes) {
        if (if_block)
          if_block.l(nodes);
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].m(target, anchor);
        }
        insert_hydration(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if (~current_block_type_index) {
            if_blocks[current_block_type_index].p(ctx2, dirty);
          }
        } else {
          if (if_block) {
            group_outros();
            transition_out(if_blocks[previous_block_index], 1, 1, () => {
              if_blocks[previous_block_index] = null;
            });
            check_outros();
          }
          if (~current_block_type_index) {
            if_block = if_blocks[current_block_type_index];
            if (!if_block) {
              if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
              if_block.c();
            } else {
              if_block.p(ctx2, dirty);
            }
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          } else {
            if_block = null;
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].d(detaching);
        }
      }
    };
  }
  function create_fragment6(ctx) {
    let queryclientprovider;
    let current;
    queryclientprovider = new QueryClientProvider_default({
      props: {
        client: (
          /*queryClient*/
          ctx[5]
        ),
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(queryclientprovider.$$.fragment);
      },
      l(nodes) {
        claim_component(queryclientprovider.$$.fragment, nodes);
      },
      m(target, anchor) {
        mount_component(queryclientprovider, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const queryclientprovider_changes = {};
        if (dirty & /*$$scope, id, columns, data, styleOptions, ssrOptions*/
        95) {
          queryclientprovider_changes.$$scope = { dirty, ctx: ctx2 };
        }
        queryclientprovider.$set(queryclientprovider_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(queryclientprovider.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(queryclientprovider.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(queryclientprovider, detaching);
      }
    };
  }
  function instance6($$self, $$props, $$invalidate) {
    let { id } = $$props;
    let { columns = [] } = $$props;
    let { data = [] } = $$props;
    let { ssrOptions = {} } = $$props;
    let { styleOptions = {} } = $$props;
    const queryClient = new QueryClient();
    $$self.$$set = ($$props2) => {
      if ("id" in $$props2)
        $$invalidate(0, id = $$props2.id);
      if ("columns" in $$props2)
        $$invalidate(1, columns = $$props2.columns);
      if ("data" in $$props2)
        $$invalidate(2, data = $$props2.data);
      if ("ssrOptions" in $$props2)
        $$invalidate(3, ssrOptions = $$props2.ssrOptions);
      if ("styleOptions" in $$props2)
        $$invalidate(4, styleOptions = $$props2.styleOptions);
    };
    return [id, columns, data, ssrOptions, styleOptions, queryClient];
  }
  var Mesa = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance6, create_fragment6, safe_not_equal, {
        id: 0,
        columns: 1,
        data: 2,
        ssrOptions: 3,
        styleOptions: 4
      });
    }
    get id() {
      return this.$$.ctx[0];
    }
    set id(id) {
      this.$$set({ id });
      flush();
    }
    get columns() {
      return this.$$.ctx[1];
    }
    set columns(columns) {
      this.$$set({ columns });
      flush();
    }
    get data() {
      return this.$$.ctx[2];
    }
    set data(data) {
      this.$$set({ data });
      flush();
    }
    get ssrOptions() {
      return this.$$.ctx[3];
    }
    set ssrOptions(ssrOptions) {
      this.$$set({ ssrOptions });
      flush();
    }
    get styleOptions() {
      return this.$$.ctx[4];
    }
    set styleOptions(styleOptions) {
      this.$$set({ styleOptions });
      flush();
    }
  };
  var Mesa_default = Mesa;

  // bindings/MesaOutputBinding.js
  var MesaOutputBinding = class extends Shiny.OutputBinding {
    constructor() {
      super();
      this.component = Mesa_default;
      this.selector = ".mesa-table";
    }
    initializeComponent(props) {
      this.componentInstance = new this.component({
        target: document.getElementById(`${props.id}-container`),
        props,
        hydrate: true
      });
    }
    find(scope) {
      return document.querySelectorAll(this.selector);
    }
    renderValue(el, data) {
      this.componentInstance.$set(data);
    }
  };

  // index.js
  var Binding2 = new MesaOutputBinding();
  Shiny.outputBindings.register(Binding2, "Mesa");
  Shiny.addCustomMessageHandler("registerMesaData", registerMesaData);
  window.mesa = {
    initMesaComponent,
    tableRegistry: [],
    ShinyBinding: Binding2
  };
})();
/*! Bundled license information:

@tanstack/table-core/build/lib/index.mjs:
  (**
     * table-core
     *
     * Copyright (c) TanStack
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.md file in the root directory of this source tree.
     *
     * @license MIT
     *)

@tanstack/svelte-table/build/lib/index.mjs:
  (**
     * svelte-table
     *
     * Copyright (c) TanStack
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.md file in the root directory of this source tree.
     *
     * @license MIT
     *)
*/
