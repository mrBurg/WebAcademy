const oauthMiddleware = () => (next: any) => (action: any) => {
  next(action);
};

export const oauthMiddlewares = [oauthMiddleware];
