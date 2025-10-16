import {LoginUserInput, RegisterUserInput} from "../schemas/user.schema"
import { User } from "../models/users.model"
import {injectable} from "tsyringe"
import {UtilsService} from "./utils.service"
import {Token} from "../models/tokens.model";
import {TokenInterface} from "../types/token.type";
import {TokenService} from "./token.service";

@injectable()
export class UserService {
    constructor(
        private utilsService: UtilsService,
        private tokenService: TokenService
    ) {}

    public async createUser(userData: RegisterUserInput) {
        const hashedPassword = await this.utilsService.hashPassword(userData.password)
        const user = {
            email: userData.email,
            password: hashedPassword,
            firstname: userData.firstname,
            lastname: userData.lastname,
            avatar: userData.avatar,
            description: userData.description,
        };

        return await User.create(user)
    }

    public async loginUser(userData: LoginUserInput) {
        const user = await User.findOne({ email: userData.email })

        if (!user) {
            throw new Error("User not found")
        }

        const isPasswordValid = await this.utilsService.comparePassword(userData.password, user.password)

        if (!isPasswordValid) {
            throw new Error("Invalid password")
        }

        const generatedToken = this.tokenService.generateToken(user._id)
        const token: TokenInterface = {
            token: generatedToken,
            userId: user._id,
            expiresAt: new Date(Date.now() + 3600000)
        }
        await Token.create(token)

        return { user, token };
    }
}