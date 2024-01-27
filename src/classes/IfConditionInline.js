import IfConditionComponent from '../components/IfConditionComponent.svelte'
import IfEndConditionComponent from '../components/IfEndConditionComponent.svelte'

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

        return this.button;
    }

    surround(range) {


        const selectedText = range.extractContents();

        const ifConditionContainer = document.createElement('span');
        new IfConditionComponent({ target: ifConditionContainer, props: { inline: true } })
        ifConditionContainer.setAttribute('contenteditable', 'false')

        const endifConditionContainer = document.createElement('span');
        new IfEndConditionComponent({ target: endifConditionContainer, props: { inline: true } })
        endifConditionContainer.setAttribute('contenteditable', 'false')

        range.insertNode(ifConditionContainer);

        function insertAfter(newNode, existingNode) {
            existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
        }

        insertAfter(endifConditionContainer, ifConditionContainer)
        insertAfter(selectedText, ifConditionContainer)
    }

   
    checkState(selection) {

    }
}