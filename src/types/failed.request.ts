export type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};
