/**
 * Build styles
 */

import logicIcon from '@/assets/icons/logic-icon.svg?raw'

export default class IfConditionTune {

    constructor({ api }) {
        this.api = api;
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
                IF
            </div>
            `
        ifConditionButton.addEventListener('click', () => {
            const index = this.api.blocks.getCurrentBlockIndex()
            this.api.blocks.insert("IfCondition", { skipEndBlock: true }, {}, index, true);
            setTimeout(() => {
                this.api.blocks.insert("EndCondition", {}, {}, index + 2, true)
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