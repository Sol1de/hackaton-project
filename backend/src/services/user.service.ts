import { LoginUserInput, RegisterUserInput } from "../schemas/user.schema"
import { User } from "../models/users.model"
import { injectable } from "tsyringe"
import { UtilsService } from "./utils.service"
import { Token } from "../models/tokens.model"
import { TokenInterface } from "../types/token.type"
import { TokenService } from "./token.service"
import { UserError } from "../errors/user.error"
import { TokenError } from "../errors/token.error"
import {DeleteUserInterface, UpdateUserInterface, UserInterface} from "../types/user.type";
import {Post} from "../models/posts.model";
import {PostError} from "../errors/post.error";

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

    public async updateUser(userData: UpdateUserInterface) {
        this.utilsService.validateObjectId(userData._id)

        if (!userData.email && !userData.firstname && !userData.lastname && !userData.avatar && !userData.description) {
            throw UserError.invalidUserData({
                message: "At least one field must be provided"
            })
        }

        const user = await User.findById(userData._id)

        if (!user) {
            throw UserError.userNotFound(userData._id)
        }

        if (user._id.toString() !== userData.userId.toString()) {
            throw UserError.unauthorizedAccess()
        }

        const updateData: Partial<UserInterface> = {
            email: userData.email,
            firstname: userData.firstname,
            lastname: userData.lastname,
            avatar: userData.avatar,
            description: userData.description
        }

        return User.findByIdAndUpdate(userData._id, updateData, { new: true })
    }

    public async deleteUser(userData: DeleteUserInterface) {
        this.utilsService.validateObjectId(userData._id)

        const user = await User.findById(userData._id)

        if (!user) {
            throw UserError.userNotFound(userData._id)
        }

        if (user._id.toString() !== userData.userId.toString()) {
            throw UserError.unauthorizedAccess()
        }

        return User.findByIdAndDelete(userData._id)
    }
}