type DisplayStates = {
  idle: string;
  loading: string;
  success: string;
  error: string;
  initial?: string;
};

export const requestStates: DisplayStates = {
  idle: "IDLE",
  loading: "LOADING",
  success: "SUCCESS",
  error: "ERROR",
};

// 状態を管理
