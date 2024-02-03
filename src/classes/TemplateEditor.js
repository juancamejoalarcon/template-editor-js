import EditorJS from '@editorjs/editorjs';
import DragDrop from 'editorjs-drag-drop';
import Header from '@editorjs/header';
import ColorPlugin from 'editorjs-text-color-plugin'
import List from "@editorjs/list";
import Table from './Table'
import Columns from './Columns'
import Image from './Image'
import ConditionTune from './Conditions/ConditionTune'
import { Condition } from './Conditions/Condition';
import { ElseCondition } from './Conditions/ElseCondition';
import { EndCondition } from './Conditions/EndCondition';
import { InlineCondition } from './Conditions/InlineCondition';
import { InsertVariable } from './InsertVariable';

import { indentConditions, reapplyConditionsToBlocks } from '../services/condition.service'
import { onSelectionChanged } from '../services/selection.service'
import state from '@/services/state.service'; 


export class TemplateEditor {

    constructor({
        holder,
        placeholder,
        onReady = () => { },
        onChange = () => { },
        tools = {},
        data = {}
    } = {}) {

        if (!holder) throw new Error('Missing holder container')

        this.init({ holder, placeholder, onReady, onChange, tools, data })

        return this.editor
    }

    init({ holder, placeholder, onReady = () => { }, onChange = () => { }, tools = {}, data }) {
        this.editor = new EditorJS({
            holder,
            placeholder,
            data,
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

                setTimeout(() => {
                    indentConditions(state.api)
                    reapplyConditionsToBlocks(state.api)
                }, 50);

                onReady()
            },
            onChange: (API) => {
                if (!this.api) this.api = API
                onChange()
            },
            tunes: ['IfConditionTune', 'ForConditionTune'],
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: true,
                    config: {
                        placeholder: 'Enter a header',
                        levels: [2, 3, 4],
                        defaultLevel: 3
                    }
                },
                table: {
                    class: Table,
                    inlineToolbar: true,
                    config: {
                        rows: 2,
                        cols: 3,
                    },
                },
                Color: {
                    class: ColorPlugin,
                    config: {
                        colorCollections: ['#000000', '#EC7878', '#9C27B0', '#673AB7', '#3F51B5', '#0070FF', '#03A9F4', '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39', '#FFF'],
                        defaultColor: '#000000',
                        type: 'text',
                        customPicker: true // add a button to allow selecting any colour  
                    }
                },
                Marker: {
                    class: ColorPlugin,
                    config: {
                        defaultColor: '#FFBF00',
                        type: 'marker',
                        icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                If: {
                    class: InlineCondition,
                    config: {
                        type: 'if'
                    }
                },
                For: {
                    class: InlineCondition,
                    config: {
                        type: 'for'
                    }
                },
                IfConditionTune: {
                    class: ConditionTune,
                    config: {
                        type: 'if'
                    }
                },
                ForConditionTune: {
                    class: ConditionTune,
                    config: {
                        type: 'for'
                    }
                },
                IfCondition: {
                    class: Condition,
                    config: {
                        type: 'if'
                    },
                    toolbox: {
                        title: 'IF',
                    }
                },
                ElseCondition,
                ForCondition: {
                    class: Condition,
                    config: {
                        type: 'for'
                    },
                    toolbox: {
                        title: 'FOR',
                    }
                },
                IfEndCondition: {
                    class: EndCondition,
                    config: {
                        type: 'ENDIF'
                    },
                },
                ForEndCondition: {
                    class: EndCondition,
                    config: {
                        type: 'ENDFOR'
                    },
                },
                image: Image,
                // Columns,
                InsertVariable,
                ...tools
            },
        })
    }

}