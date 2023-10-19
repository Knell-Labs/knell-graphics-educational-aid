export type UserType = {
    email   : string;
    username: string;
    password: string;
};

export type LoginFormType = UserType;

export type SignUpFormType = UserType & {
    email?: string;
    confirmPassword?: string;
};
