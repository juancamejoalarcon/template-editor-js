import ConditionComponent from '@/components/ConditionComponent.svelte'

import state from '@/services/state.service';

export class EndCondition {

    constructor({ data, api, config}) {
        this.api = api
        this.type = data.type || config.type
    }

    render() {
        const target = document.createElement("div");
        const app = new ConditionComponent({ 
            target,
            props: {
                statement: this.type,
                isEnd: true
            }
        })

        return target;
    }

    destroy() {
        if (state.preventDestroyFunctToFireFlag) return
        setTimeout(() => this.deletePreviousStartBlock(), 0)
    }

    deletePreviousStartBlock() {
        state.setPreventDestroyFunctToFire(true)
        const index = this.getPreviousStartBlockIndex()
        if (Number.isInteger(index)) this.api.blocks.delete(index)
        state.setPreventDestroyFunctToFire(false)
    }

    getPreviousStartBlockIndex() {
        const blockCount = this.api.blocks.getBlocksCount();
        for (let i = 0; i < blockCount; i++) {
            const block = this.api.blocks.getBlockByIndex(i);

            const blockName = this.type === 'ENDIF' ? 'IfCondition' : 'ForCondition'
            if (block?.name === blockName) return i
        }
    }

    save() {
        return {
            type: 'ENDIF',
        };
    }

}