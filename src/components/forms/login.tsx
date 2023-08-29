import { FormEventHandler, useReducer } from 'react';

type State = {
  email:    string;
  password: string;
  errorMsg: string;
};

type Action = 
    | { type: 'SET_EMAIL',          payload: string }
    | { type: 'SET_PASSWORD',       payload: string }
    | { type: 'VALIDATE_FIELDS' };

const initialState : State = {
    email:      '',
    password:   '',
    errorMsg:   ''
}

const reducer = ( state: State, actions: Action ) : State => {
    switch (actions.type) {
        case 'SET_EMAIL':       return { ...state, email:       actions.payload };
        case 'SET_PASSWORD':    return { ...state, password:    actions.payload };
        case 'VALIDATE_FIELDS': {
            const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            let errorMsg = !state.email ? 'Email is required' : !emailPattern.test(state.email) ? 'Invalid email address' : '';
            errorMsg = !state.password ? 'Password is required' : state.password.length < 8 ? 'Password must have at least 8 characters' : '';
            return { ...state, errorMsg: errorMsg };
        }
        default: return state;
    }
}

export const LoginForm: React.FC = () => {

    const [ state, dispatch ] = useReducer(reducer, initialState );

    const handleSubmit = ( e:React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        dispatch({ type: 'VALIDATE_FIELDS', })

        if (!state.errorMsg) {
            // handle login
            console.log(state);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 space-y-8 bg-white w-96 rounded-md shadow-md">
                <h1 className="text-2xl font-semibold">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="form-email" className="block text-sm font-medium text-gray-700">
                            {"Email Address"}
                        </label>
                        <input
                            id          = "form-email"
                            name        = "email"
                            type        = "email"
                            value       = {state.email}
                            onChange    = {e => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                            className   = "mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="form-password" className="block text-sm font-medium text-gray-700">
                            {"Password"}
                        </label>
                        <input
                            id          = "form-password"
                            name        = "password"
                            type        = "password"
                            value       = {state.password}
                            onChange    = {e => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
                            className   = "mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div>
                        <button
                        type="submit"
                        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {"Log in"}
                        </button>
                    </div>
                </form>
                {state.errorMsg && <p className="text-red-500 text-xs">{state.errorMsg}</p>}
            </div>
        </div>
    );
}
