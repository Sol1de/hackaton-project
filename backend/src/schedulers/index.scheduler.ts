import { injectable } from 'tsyringe'
import {TokenScheduler} from "./token.scheduler"

@injectable()
export class Scheduler {
    constructor(private tokenScheduler: TokenScheduler) {}

    public start() {
        console.log('Démarrage des schedulers...')
        this.tokenScheduler.cleanExpiredTokensScheduler()
    }
}