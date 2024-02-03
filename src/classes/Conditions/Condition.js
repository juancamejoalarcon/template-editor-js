import logicIcon from '@/assets/icons/logic-icon.svg?raw'
import ConditionComponent from '@/components/ConditionComponent.svelte'
import state from '@/services/state.service';


export class Condition {


    constructor({ api, data = { skipEndBlock: false, type: '', condition: '' }, config = { type: 'if' }}) {
        this.api = api

        if (!state.api) state.setApi(api)

        this.skipEndBlock = data.skipEndBlock || data.type
        
        this.type = config.type 
        this.condition = data.condition || this.getDefaultCondition()
    }

    static get toolbox() {
        return {
            icon: logicIcon,
        };
    }

    getDefaultCondition() {
        if (this.type === 'if') return 'condicion == resultado'
        if (this.type === 'for') return 'item in items'
    }

    render() {
        const target = document.createElement("div");
        const app = new ConditionComponent({
            target,
            props: {
                statement: this.type.toUpperCase(),
                condition: this.condition,
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
        const type = this.type === 'if' ? 'IfEndCondition' : 'ForEndCondition'

        this.api.blocks.insert(type, { type: this.type === 'if' ? 'ENDIF' : 'ENDFOR'  }, { }, index, true);
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
            const endBlockName = this.type === 'if' ? 'IfEndCondition' : 'ForEndCondition'
            if (block?.name === endBlockName) return i
            if (this.type === 'if' && block?.name === 'ElseCondition') this.api.blocks.delete(i)
        }
    }

    save() {
        return {
            type: this.type.toUpperCase(),
            condition: this.condition
        };
    }

}