export type UserTypes = {
    email   : string;
    username: string;
    password: string;
};

export type LoginFormTypes = UserTypes;

export type SignUpFormTypes = UserTypes & {
    email?: string;
    confirmPassword?: string;
};
