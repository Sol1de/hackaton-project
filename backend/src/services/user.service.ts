import {injectable, singleton} from "tsyringe";
import { RegisterUserInput } from "../schemas/user.schema";
import { User } from "../models/users.model";

@singleton()
export class UserService {
    constructor() {}

    public async createUser(userData: RegisterUserInput) {
        const user = {
            email: userData.email,
            password: userData.password,
            firstname: userData.firstname,
            lastname: userData.lastname,
            avatar: userData.avatar,
            description: userData.description,
        };

        return await User.create(user);
    }
}