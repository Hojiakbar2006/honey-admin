export const reGuest = (state = [], action) => {
  switch (action.type) {
    case "GUEST":
      return action.payload;
    default:
      return state;
  }
};

export const acGuest = (arr) => {
  return {
    type: "GUEST",
    payload: arr,
  };
};
