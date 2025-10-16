import {LoginUserInput, RegisterUserInput} from "../schemas/user.schema"
import { User } from "../models/users.model"
import {injectable} from "tsyringe"
import {UtilsService} from "./utils.service"
import {Token} from "../models/tokens.model";
import {TokenInterface} from "../types/token.type";
import {TokenService} from "./token.service";
import { UserError } from "../errors/user.error";
import { EmailError } from "../errors/email.error";

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
        }

        return await User.create(user);
    }

    public async loginUser(userData: LoginUserInput, ipAdress: string, userAgent: string) {
        const user = await User.findOne({ email: userData.email })

        if (!user) {
            throw UserError.invalidCredentials();
        }
        const isPasswordValid = await this.utilsService.comparePassword(userData.password, user.password)

        if (!isPasswordValid) {
            throw UserError.invalidCredentials();
        }

        const token = this.tokenService.generateToken(user._id, ipAdress, userAgent)
        const hashedToken = this.utilsService.hashToken(token)
        const generatedToken: TokenInterface = {
            token: hashedToken,
            userId: user._id,
            expiresAt: new Date(Date.now() + 3600000),
            ipAdress: ipAdress,
            userAgent: userAgent,
        }
        await Token.create(generatedToken)

        return { user, token };
    }
}