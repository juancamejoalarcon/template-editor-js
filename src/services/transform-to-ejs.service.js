import edjsHTML from 'editorjs-html'

function IfCondition({data}){
    return `<% if (${data.condition}) { %>`
}

function ElseCondition({data}){
    return `<% } else if (${data.condition}) { %>`
}

function EndCondition({data}){
    return `<% } %>`
}


export const transformToEjs = (blocksData) => {

    const edjsParser2 = edjsHTML({
        IfCondition,
        ElseCondition,
        EndCondition
    });

    const parsed = edjsParser2.parse(blocksData);

    

    console.log(parsed.join());

}