import EditorJS from '@editorjs/editorjs';
import DragDrop from 'editorjs-drag-drop';
// import Table from '@editorjs/table'
import Table from 'editorjs-table'
// import Table from './Table'

// import { ShowIfPlugin } from '../plugins/show-if';
import { IfCondition } from './IfCondition';
import { IfElseCondition } from './IfElseCondition';
import { IfEndCondition } from './IfEndCondition';
import { IfConditionInline } from './IfConditionInline';
import { InsertVariable } from './InsertVariable';

import { indentConditions } from '../services/condition.service'
import { onSelectionChanged } from '../services/selection.service'

export class TemplateEditor {

    constructor({
        holder,
        placeholder,
        onReady = () => { },
        onChange = () => { },
        tools = {}
    } = {}) {

        if (!holder) throw new Error('Missing holder container')

        this.init({ holder, placeholder, onReady, onChange, tools })

        return this.editor
    }

    init({ holder, placeholder, onReady = () => { }, onChange = () => { }, tools = {} }) {
        this.editor = new EditorJS({
            holder,
            placeholder,
            onReady: () => {
                this.editor.on('block changed', ({ event }) => {
                    const { type } = event
                    if (type === 'block-moved' || type === 'block-removed' || type === 'block-added') {
                        if (this.api) indentConditions(this.api)
                    }
                })
                new DragDrop(this.editor);

                document.addEventListener("mouseup", () => {
                    onSelectionChanged(this.api)
                }, false);

                onReady()
            },
            onChange: (API) => {
                if (!this.api) this.api = API
                onChange()
            },
            tools: {
                IfCondition,
                IfEndCondition,
                IfConditionInline,
                IfElseCondition,
                InsertVariable,
                table: {
                    class: Table,
                    inlineToolbar: true,
                    config: {
                        rows: 2,
                        cols: 3,
                    },
                },
                ...tools
            },
        })
    }

}