import cron from 'node-cron'
import { injectable } from 'tsyringe'
import {TokenService} from "../services/token.service"

@injectable()
export class TokenScheduler {
    constructor(private tokenService: TokenService) {}

    public cleanExpiredTokensScheduler() {
        cron.schedule('0 0 * * *', async () => {
            try {
                console.log('Cleaning expired tokens')
                await this.tokenService.cleanExpiredTokens()
            } catch (error) {
                console.error('Erreur cron cleanExpiredTokens:', error)
            }
        })
    }
}