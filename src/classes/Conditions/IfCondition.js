import logicIcon from '@/assets/icons/logic-icon.svg?raw'
import ConditionComponent from '@/components/ConditionComponent.svelte'

import state from '@/services/state.service';

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
        const app = new ConditionComponent({
            target,
            props: {
                statement: 'IF',
                conditionChanged: (condition) => {
                    this.condition = condition
                },
                onRemove: () => {
                    const index = this.api.blocks.getCurrentBlockIndex()
                    this.api.blocks.delete(index)
                }
            }
        })
        this.addEndBlock()
        return target;
    }

    addEndBlock() {
        if (this.skipEndBlock) return
        const index = this.api.blocks.getCurrentBlockIndex() + 1
        this.api.blocks.insert("EndCondition", {}, {}, index, true);
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
            if (block?.name === 'EndCondition') return i
            if (block?.name === 'ElseCondition') this.api.blocks.delete(i)
        }
    }

    save() {
        return {
            type: 'IF',
            condition: this.condition
        };
    }

}