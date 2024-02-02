import ConditionComponent from '@/components/ConditionComponent.svelte'

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
        new ConditionComponent({ 
            target: ifConditionContainer, 
            props: {
                statement: 'IF',
                inline: true,
            } 
        })
        ifConditionContainer.setAttribute('contenteditable', 'false')

        const endifConditionContainer = document.createElement('span');
        new ConditionComponent({ 
            target: endifConditionContainer, 
            props: {
                statement: 'ENDIF',
                inline: true,
                isEnd: true
            } 
        })
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