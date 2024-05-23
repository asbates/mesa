// very slightly adapted from
// https://github.com/the-pudding/svelte-starter/blob/main/src/actions/inView.js
export default function inView(node, params = {}) {
  let observer;

  const handleIntersect = (e) => {
    const intersecting = e[0].isIntersecting;
    if (intersecting) {
      node.dispatchEvent(new CustomEvent('intersecting'));
    }
  };

  const setObserver = ({ root, top, bottom }) => {
    const marginTop = top ? top * -1 : 0;
    const marginBottom = bottom ? bottom * -1 : 0;
    const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
    const options = { root, rootMargin };
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(node);
  };

  setObserver(params);

  return {
    update(params) {
      setObserver(params);
    },

    destroy() {
      if (observer) observer.disconnect();
    },
  };
}
