const oauthMiddleware = () => (next: any) => (action: any) => {
  next(action);
};

export const middlewares = [oauthMiddleware];
