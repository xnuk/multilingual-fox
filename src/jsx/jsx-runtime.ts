export const jsx = <
  T extends HTMLElement | null,
  P,
  K extends keyof HTMLElementTagNameMap | ((props: P) => T) | (() => T)
>(
  tagname: K,
  props?: P
): T => {
  if (typeof tagname !== 'string') return tagname(props!);

  const element = document.createElement(tagname) as Exclude<T, null>;

  let children: JSX.Children = null;

  if (props != null) {
    for (const [key, value] of Object.entries(props)) {
      if (key === 'style') {
        Object.assign(element.style, value);
      } else if (key === 'children') {
        children = value;
      } else {
        element.setAttribute(key, value);
      }
    }
  }

  if (children == null) return element;
  if (typeof children === 'string') {
    element.appendChild(document.createTextNode(children));
    return element;
  }
  if (children instanceof HTMLElement) {
    element.appendChild(children);
    return element;
  }

  Promise.all(Array.isArray(children) ? children : [children]).then(
    (children) => {
      for (const child of children.flat(42)) {
        if (child == null) continue;
        element.appendChild(
          typeof child === 'string' ? document.createTextNode(child) : child
        );
      }
    }
  );

  return element;
};

export const jsxs = jsx;

export const Fragment = ({
  children = null,
}: {
  children?: JSX.Children;
}): JSX.Children => children;
