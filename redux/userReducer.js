const initialState = {
  login: "",
  email: "",
  password: "",
  image: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_LOGIN":
      return { ...state, login: action.payload };
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "UPDATE_IMAGE":
      return { ...state, image: action.payload };
    default:
      return state;
  }
};

export default userReducer;
