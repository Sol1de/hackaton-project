import { LoginUserInput, RegisterUserInput } from "../schemas/user.schema"
import { User } from "../models/users.model"
import { injectable } from "tsyringe"
import { UtilsService } from "./utils.service"
import { Token } from "../models/tokens.model"
import { TokenInterface } from "../types/token.type"
import { TokenService } from "./token.service"
import { UserError } from "../errors/user.error"
import { TokenError } from "../errors/token.error"

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

        return await User.create(user)
    }

    public async login(userData: LoginUserInput, ipAdress: string, userAgent: string) {
        const user = await User.findOne({ email: userData.email })

        if (!user) {
            throw UserError.invalidCredentials()
        }
        const isPasswordValid = await this.utilsService.comparePassword(userData.password, user.password)

        if (!isPasswordValid) {
            throw UserError.invalidCredentials()
        }

        await Token.deleteMany({ userId: user._id })

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

        return { user, token }
    }

    public async logout(token: string) {
        try {
            const decoded = await this.tokenService.verifyToken(token)

            if (!decoded || !decoded.userId) {
                throw TokenError.invalidToken()
            }

            const hashedToken = this.utilsService.hashToken(token)

            const deletedToken = await Token.findOneAndDelete({
                token: hashedToken
            })

            if (!deletedToken) {
                throw TokenError.tokenNotFound()
            }

        } catch (error) {
            throw UserError.logoutFailed()
        }
    }

    public async getUsers() {
        return User.find()
    }

    public async getUser(userId: string) {
        this.utilsService.validateObjectId(userId)
        const user = await User.findOne({ _id: userId })

        if (!user) {
            throw UserError.userNotFound(userId)
        }

        return user
    }
}