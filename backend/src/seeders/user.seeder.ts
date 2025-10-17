import { UserInterface } from "../types/user.type"
import {injectable} from "tsyringe"
import {UserService} from "../services/user.service"

@injectable()
export class UserSeeder {
    constructor(private userService: UserService) {}
    async createUser(user: UserInterface) {
        return this.userService.createUser(user)
    }
}