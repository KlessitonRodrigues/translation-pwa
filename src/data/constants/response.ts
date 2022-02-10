export type ResponseType<T = any> = {
  success: boolean;
  data: T;
  msg: string;
};

export const responseMock: ResponseType = {
  success: false,
  data: null,
  msg: "Couldn't complete this operation",
};
