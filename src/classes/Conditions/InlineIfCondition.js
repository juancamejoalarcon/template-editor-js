import ConditionComponent from '@/components/ConditionComponent.svelte'
import { getConditionContainers, onRemoveObserver } from '@/services/condition.service'

export class IfConditionInline {
    static get isInline() {
        return true;
    }

    constructor() {
        this.button = null;
        this.state = false;
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.classList.add('ce-inline-tool')
        this.button.classList.add('add-condition-button')
        this.button.classList.add('add-condition-button-if')

        return this.button;
    }

    surround(range) {


        const randomId = 'condition-id-' + (Math.random() + 1).toString(36).substring(7);
        const selectedText = range.extractContents();

        const { ifConditionContainer, endifConditionContainer } = getConditionContainers(randomId)

        range.insertNode(ifConditionContainer);

        function insertAfter(newNode, existingNode) {
            existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
        }

        insertAfter(endifConditionContainer, ifConditionContainer)
        insertAfter(selectedText, ifConditionContainer)

        onRemoveObserver(ifConditionContainer, randomId)
    }

   
    checkState(selection) {

    }
}