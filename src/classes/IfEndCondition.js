import IfEndConditionComponent from '../components/IfEndConditionComponent.svelte'

import state from '../services/state.service';

export class IfEndCondition {

    constructor({ api }) {
        this.api = api
    }

    render() {
        const target = document.createElement("div");
        const app = new IfEndConditionComponent({ target })

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
            if (block?.name === 'IfCondition') return i
        }
    }

    save() {
        return {
            type: 'ENDIF',
        };
    }

}