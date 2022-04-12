declare namespace JSX {
  type Element = HTMLElement;

  type IntrinsicElements = {
    [key in keyof HTMLElementTagNameMap]: {
      style?: Partial<HTMLElement['style']>;
      children?: JSX.Children | JSX.Child;
    } & { readonly [key: string]: string };
  };

  type Child = JSX.Element | string | null;
  type AsyncChildren = Promise<Child | Child[]>;
  type Children = Child | AsyncChildren | Child[] | AsyncChildren[];
}

declare function jsx<
  T extends HTMLElement | null,
  P,
  K extends (props: P) => T
>(comp: K, props: P): T;

declare function jsx<T extends HTMLElement | null, P, K extends () => T>(
  comp: K
): T;

declare function jsx<
  T extends HTMLElementTagNameMap[K],
  P extends JSX.IntrinsicElements[K],
  K extends keyof HTMLElementTagNameMap
>(comp: K, props?: P): T;

declare const jsxs: typeof jsx;

declare function Fragment(props: { children?: JSX.Children }): JSX.Children;
