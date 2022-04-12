import { jsx } from './jsx-runtime';

export const styled =
  <K extends keyof HTMLElementTagNameMap, T extends HTMLElementTagNameMap[K]>(
    tagname: K
  ) =>
  (style: Partial<T['style']>) =>
  (props?: JSX.IntrinsicElements[K]): T =>
    jsx(
      tagname,
      props == null
        ? undefined
        : {
            style:
              props.style == null ? { ...style } : { ...style, ...props.style },
            ...props,
          }
    );
