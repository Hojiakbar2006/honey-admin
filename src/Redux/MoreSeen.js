export const reMoreSeen = (state = [], action) => {
  switch (action.type) {
    case "MORESEEN":
      return action.payload;
    default:
      return state;
  }
};

export const acMoreSeen = (arr) => {
  return {
    type: "MORESEEN",
    payload: arr,
  };
};
