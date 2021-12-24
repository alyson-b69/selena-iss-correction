import { ISS_IS_HERE } from "./actionISS";

const reducerISS = (
  state = {
    iss: {
      message: "",
      timestamp: "",
      iss_position: { latitude: "", longitude: "" },
    },
  },
  action
) => {
  switch (action.type) {
    case ISS_IS_HERE:
      return { ...state, iss: action.iss };
    default:
      return state;
  }
};

export default reducerISS;
