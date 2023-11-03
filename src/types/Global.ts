export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// cred: https://stackoverflow.com/a/66605669
export type Only<T, U> = { [P in keyof T]: T[P] } & Omit<
  { [P in keyof U]?: never },
  keyof T
>;

export type Either<T, U> = Only<T, U> | Only<U, T>;
