import { IDsModule, DsModule } from '../Core'
import { TargetNotFoundError, TargetedMessage } from './Targets'

/**
 * Sends a targeted message to the correct target.
 */
export class Switch<MsgType = any, TrgtType = any> extends DsModule<TargetedMessage<MsgType, TrgtType>> {
    private targets = new Map<TrgtType, IDsModule<MsgType> | ((message: MsgType) => void)>()
    constructor(
        sources: IDsModule<any, TargetedMessage<MsgType, TrgtType>>[],
        private getTarget?: (target: TrgtType) => IDsModule<MsgType> | ((message: MsgType) => void)
    ) {
        super(sources)
    }
    receive(message: TargetedMessage<MsgType, TrgtType>) {
        let target = this.targets.get(message.target)
        if (!target && this.getTarget) {
            target = this.getTarget(message.target)
        }
        if (!target) {
            throw new TargetNotFoundError('Switch')
        }
        if (typeof target === 'function') {
            return target(message.message)
        }
        return target.receive(message.message)
    }
    public setTarget(identifier: TrgtType, mod: IDsModule<MsgType> | ((message: MsgType) => void)) {
        this.targets.set(identifier, mod)
        let deleted = false
        return () => {
            if (deleted) {
                return
            }
            deleted = true
            this.targets.delete(identifier)
        }
    }
    public targetPiper(target: TrgtType): IDsModule<any, MsgType> {
        return {
            pipe: (mod: IDsModule<MsgType> | ((message: MsgType) => void)) => {
                return this.setTarget(target, mod)
            }
        } as any
    }
}
