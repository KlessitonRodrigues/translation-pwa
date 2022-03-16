export type ResponseType<T = any> =
  | { success: true; data: T; msg: string }
  | { success: false; data?: T; msg: string };

export const responseMock: ResponseType = {
  success: false,
  data: null,
  msg: "Couldn't complete this operation",
};
