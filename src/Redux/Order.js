export const reOrder = (state = [], action) => {
  switch (action.type) {
    case "ORDER":
      return action.payload;
    default:
      return state;
  }
};


export const acOrder =(arr)=>{
    return {
        type : "ORDER",
        payload :arr
    }
}