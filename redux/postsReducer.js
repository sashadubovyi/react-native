const initialState = {
  comments: "",
  image: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_COMMENTS":
      return { ...state, comments: action.payload };
    case "UPDATE_IMAGE":
      return { ...state, image: action.payload };
    default:
      return state;
  }
};

export default userReducer;
