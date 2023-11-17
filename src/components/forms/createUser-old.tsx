import { FormEventHandler, useReducer } from "react";

type State = {
  username: string;
  email: string;
  password: string;
  confirmPass: string;
  errorMsg: string;
};

type Action =
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "VALIDATE_FIELDS" };

const initialState: State = {
  username: "",
  email: "",
  password: "",
  confirmPass: "",
  errorMsg: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPass: action.payload };
    case "VALIDATE_FIELDS": {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      let errorMsg = !state.username
        ? "Username is required"
        : !state.email
          ? "Email is required"
          : !emailPattern.test(state.email)
            ? "Invalid email address"
            : !state.password
              ? "Password is required"
              : state.password.length < 8
                ? "Password must have at least 8 characters"
                : state.password !== state.confirmPass
                  ? "Passwords do not match"
                  : "";
      return { ...state, errorMsg: errorMsg };
    }
    default:
      return state;
  }
};

const CreateUserForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "VALIDATE_FIELDS" });

    if (!state.errorMsg) {
      // handle user creation
      console.log(state);
    }
  };

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">Create a new account</h1>
      <p
        className={`text-red-500 text-xs opacity-0 ${
          state.errorMsg ? "opacity-100" : ""
        }`}
      >
        &#x26A3; {state.errorMsg}
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="form-username"
            className="block text-sm font-medium text-gray-700"
          >
            {"Username"}
          </label>
          <input
            id="form-username"
            name="username"
            type="text"
            value={state.username}
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="form-email"
            className="block text-sm font-medium text-gray-700"
          >
            {"Email Address"}
          </label>
          <input
            id="form-email"
            name="email"
            type="email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="form-password"
            className="block text-sm font-medium text-gray-700"
          >
            {"Password"}
          </label>
          <input
            id="form-password"
            name="password"
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="form-confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            {"Confirm Password"}
          </label>
          <input
            id="form-confirm-password"
            name="confirm-password"
            type="password"
            value={state.confirmPass}
            onChange={(e) =>
              dispatch({
                type: "SET_CONFIRM_PASSWORD",
                payload: e.target.value,
              })
            }
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {"Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
