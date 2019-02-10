const networkMiddleware = ({ dispatch }) => next => (action) => {
  if (typeof action === 'object' && action.payload instanceof Request) {
    const { payload: request, meta } = action;

    // Dispatch onRequest if any
    if (meta && meta.onRequest) {
      meta.onRequest(request, dispatch);
    }

    fetch(request).then((response) => {
      // Dispatch onResponseActions if any
      if (meta && meta.onResponse) {
        meta.onResponse(response, dispatch);
      }
    }).catch((error) => {
      // Dispatch onErrorActions if any
      if (meta && meta.onError) {
        meta.onError(error, dispatch);
      }
    });
  }

  return next(action);
};

export default networkMiddleware();
