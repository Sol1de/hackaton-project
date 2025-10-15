export interface UserInterface {
    _id?: string;
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    avatar?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}