const user = JSON.parse(
  localStorage.getItem("admin") || sessionStorage.getItem("admin") || "{}"
);

export const reAdmin = (state = user, action) => {
  switch (action.type) {
    case "ADMIN":
      return action.payload;

    default:
      return state;
  }
};

export const acAdmin = (user) => ({
  type: "ADMIN",
  payload: user,
});
