export interface IUser {
    user_metadata: any; //need a proper type
    id?: string | undefined;
    name: string;
    surname: string;
    email: string;
    password: string;
}
