export const reLoading = (state = false, action) => {
  switch (action.type) {
    case "LOADING":
      return action.payload;
    default:
      return state;
  }
};

export const acLoading = (booling) => {
  return {
    type: "LOADING",
    payload: booling,
  };
};
export const reUpload = (
  state = { jami: 0, yuklandi: 0, start: false },
  action
) => {
  switch (action.type) {
    case "UPLOAD":
      return action.payload;
    default:
      return state;
  }
};

export const acUpload = (object) => {
  return {
    type: "UPLOAD",
    payload: object,
  };
};
