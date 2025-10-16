import { User } from "../models/users.model"
import { UserInterface } from "../types/user.type"

export class UserSeeder {
    async createUser(user: UserInterface) {
        return await User.create(user);
    }
}