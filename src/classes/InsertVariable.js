import VariableComponent from '../components/VariableComponent.svelte'

export class InsertVariable {
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
        this.button.classList.add('add-variable-button')

        return this.button;
    }

    surround(range) {


        const selectedText = range.extractContents();

        const ifConditionContainer = document.createElement('span');
        new VariableComponent({ target: ifConditionContainer, props: { text: selectedText } })


        range.insertNode(ifConditionContainer);

    }

   
    checkState(selection) {

    }
}