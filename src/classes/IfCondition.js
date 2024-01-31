import logicIcon from '../assets/icons/logic-icon.svg?raw'
import IfConditionComponent from '../components/IfConditionComponent.svelte'

import state from '../services/state.service';

export class IfCondition {

    static get toolbox() {
        return {
            title: "IF",
            icon: logicIcon,
        };
    }

    constructor({ api, data = { skipEndBlock: false } }) {
        this.api = api

        this.skipEndBlock = data.skipEndBlock
    }

    render() {
        const target = document.createElement("div");
        const app = new IfConditionComponent({
            target,
            props: {
                conditionChanged: (condition) => {
                    this.condition = condition
                },
                onRemove: () => {
                    console.log('--remove condition--')
                }
            }
        })
        this.addEndBlock()
        return target;
    }

    addEndBlock() {
        if (this.skipEndBlock) return
        const index = this.api.blocks.getCurrentBlockIndex() + 1
        this.api.blocks.insert("IfEndCondition", {}, {}, index, true);
    }

    destroy() {
        if (state.preventDestroyFunctToFireFlag) return
        setTimeout(() => {
            this.deleteNextEndBlock(), 0
        })
    }

    deleteNextEndBlock() {
        state.setPreventDestroyFunctToFire(true)
        const index = this.getNextEndBlockIndex()
        if (Number.isInteger(index)) this.api.blocks.delete(index)
        state.setPreventDestroyFunctToFire(false)
    }

    getNextEndBlockIndex() {
        const blockCount = this.api.blocks.getBlocksCount();
        for (let i = 0; i < blockCount; i++) {
            const block = this.api.blocks.getBlockByIndex(i);
            if (block?.name === 'IfEndCondition') return i
        }
    }

    save() {
        return {
            type: 'IF',
            condition: this.condition
        };
    }

}