import logicIcon from '@/assets/icons/logic-icon.svg?raw'
import ConditionComponent from '@/components/ConditionComponent.svelte'

export class ElseCondition {

    static get toolbox() {
        return {
            title: "ELSE",
            icon: logicIcon,
        };
    }

    constructor({ api, data = { condition: '' } }) {
        this.api = api

        this.condition = data.condition || this.getDefaultCondition()
    }

    getDefaultCondition() {
        return 'condicion == resultado'
    }

    render() {
        const target = document.createElement("div");
        const app = new ConditionComponent({
            target,
            props: {
                statement: 'ELSE',
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

        return target;
    }

    moved(event) {
        const { fromIndex, toIndex } = event.detail

        const blockCount = this.api.blocks.getBlocksCount();
        let indexOfFirstIfCondition = null
        for (let i = 0; i < blockCount; i++) {
            const block = this.api.blocks.getBlockByIndex(i);
            if (block?.name === 'IfCondition') {
                indexOfFirstIfCondition = i
                break
            }
        }
        if (indexOfFirstIfCondition && indexOfFirstIfCondition > toIndex) {
            setTimeout(() => {
                this.api.blocks.move(fromIndex, toIndex)
            }, 10);
            return
        }

        let indexOfLastEndIfCondition = null

        for(let i = blockCount - 1; i >= 0; i--) {
            const block = this.api.blocks.getBlockByIndex(i);
            if (block?.name === 'IfEndCondition') {
                indexOfLastEndIfCondition = i
                break
            }
        }
        if (indexOfLastEndIfCondition && indexOfLastEndIfCondition < toIndex) {
            setTimeout(() => {
                this.api.blocks.move(fromIndex, toIndex)
            }, 10);
            return
        }

    }

    destroy() {
    }

    save() {
        return {
            type: 'ELSE',
            condition: this.condition
        };
    }

}