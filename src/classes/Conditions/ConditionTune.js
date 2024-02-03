/**
 * Build styles
 */

import logicIcon from '@/assets/icons/logic-icon.svg?raw'

export default class ConditionTune {

    constructor({ api, config }) {
        this.api = api;

        this.type = config.type
    }

    static get isTune() {
        return true;
    }

    render() {
        let wrapper = document.createElement('div');
        const ifConditionButton = document.createElement('div');
        ifConditionButton.classList.add('ce-popover-item')

        ifConditionButton.innerHTML = `
            <div class="ce-popover-item__icon">
                ${logicIcon}
            </div>
            <div class="ce-popover-item__title">
                ${this.type === 'if' ? 'IF' : 'FOR'}
            </div>
            `
        ifConditionButton.addEventListener('click', () => {
            const index = this.api.blocks.getCurrentBlockIndex()
            const blockName = this.type === 'if' ? "IfCondition" : "ForCondition"
            this.api.blocks.insert(blockName, { skipEndBlock: true }, {}, index, true);
            setTimeout(() => {
                const endBlockName = this.type === 'if' ? "IfEndCondition" : "ForEndCondition"
                this.api.blocks.insert(endBlockName, {}, {}, index + 2, true)
            }, 10);
        })


        wrapper.appendChild(ifConditionButton)

        return wrapper;
        // const button = document.createElement('button');

        // button.classList.add(this.api.styles.button);
        // button.textContent = 'H';
    
        // return button; 
    }
}