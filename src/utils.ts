type GetHttpOrigin<T> = T extends `http://${infer U}/${string}`
  ? `http://${U extends '' ? never : U}`
  : T extends `https://${infer U}/${string}`
  ? `https://${U extends '' ? never : U}`
  : never;

export const origin = <T extends `http${string}`>(url: T) =>
  new URL(url).origin as GetHttpOrigin<T>;
