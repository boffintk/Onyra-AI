/* ==========================================================
   ONYRA AI
   editor.js
   PARTE 5A
   Núcleo del editor
========================================================== */

"use strict";

/* ===========================================
   EDITOR
=========================================== */

const Editor={

    currentFile:"index.html",

    openedFiles:[],

    changed:false,

    cursorLine:1,

    cursorColumn:1,

    language:"html"

};

/* ===========================================
   INICIO
=========================================== */

function startEditor(){

    Editor.openedFiles.push("index.html");

    updateEditorStatus();

}

startEditor();

/* ===========================================
   ABRIR
=========================================== */

function openEditorFile(name){

    if(project.files[name]==undefined){

        return;

    }

    Editor.currentFile=name;

    codeEditor.value=project.files[name];

    updatePreview();

    updateLanguage();

    addConsole(name+" abierto.");

}

/* ===========================================
   GUARDAR
=========================================== */

function saveEditorFile(){

    project.files[Editor.currentFile]=

    codeEditor.value;

    Editor.changed=false;

    notify("Archivo guardado.");

}

/* ===========================================
   LENGUAJE
=========================================== */

function updateLanguage(){

    if(Editor.currentFile.endsWith(".html")){

        Editor.language="html";

    }

    else if(Editor.currentFile.endsWith(".css")){

        Editor.language="css";

    }

    else if(Editor.currentFile.endsWith(".js")){

        Editor.language="javascript";

    }

}

/* ===========================================
   CURSOR
=========================================== */

function updateCursor(){

    const start=

    codeEditor.selectionStart;

    const text=

    codeEditor.value.substring(0,start);

    const lines=text.split("\n");

    Editor.cursorLine=lines.length;

    Editor.cursorColumn=

    lines[lines.length-1].length+1;

}

/* ===========================================
   ESTADO
=========================================== */

function updateEditorStatus(){

    statusBar.innerHTML=

    `
    <div>${Editor.currentFile}</div>
    <div>${Editor.language}</div>
    <div>Línea ${Editor.cursorLine}</div>
    <div>Columna ${Editor.cursorColumn}</div>
    `;

}

/* ===========================================
   EVENTOS
=========================================== */

codeEditor.addEventListener("keyup",()=>{

    updateCursor();

    updateEditorStatus();

});

codeEditor.addEventListener("click",()=>{

    updateCursor();

    updateEditorStatus();

});

codeEditor.addEventListener("input",()=>{

    Editor.changed=true;

});

/* ===========================================
   CAMBIO DE PESTAÑAS
=========================================== */

document.querySelectorAll(".tab")

.forEach(tab=>{

tab.onclick=()=>{

openEditorFile(

tab.textContent.trim()

);

};

});

/* ===========================================
   NUEVA PESTAÑA
=========================================== */

function addTab(name){

    if(

    Editor.openedFiles.includes(name)

    ){

        return;

    }

    Editor.openedFiles.push(name);

}

/* ===========================================
   CERRAR PESTAÑA
=========================================== */

function closeTab(name){

    Editor.openedFiles=

    Editor.openedFiles.filter(

    file=>file!==name

    );

}

/* ===========================================
   ESTADÍSTICAS
=========================================== */

function editorStats(){

return{

file:Editor.currentFile,

language:Editor.language,

opened:

Editor.openedFiles.length,

changed:

Editor.changed

};

}

console.log(editorStats());

/* ==========================================================
   FIN PARTE 5A
========================================================== *//* ==========================================================
   ONYRA AI
   editor.js
   PARTE 5B
   Autocompletado y motor de sintaxis
========================================================== */

"use strict";

/* ===========================================
   PALABRAS CLAVE
=========================================== */

const Syntax={

html:[
"html","head","body","title","meta",
"link","script","div","span","p",
"h1","h2","h3","button","canvas",
"img","audio","video","style"
],

css:[
"color","background","display","position",
"width","height","margin","padding",
"border","font-size","overflow",
"flex","grid","animation"
],

javascript:[
"function","const","let","var","if",
"else","for","while","return",
"class","new","async","await",
"console","document","window"
]

};

/* ===========================================
   AUTOCOMPLETADO
=========================================== */

function getSuggestions(word){

    let list=[];

    const lang=Editor.language;

    if(Syntax[lang]){

        list=Syntax[lang].filter(item=>

            item.startsWith(word)

        );

    }

    return list;

}

/* ===========================================
   OBTENER PALABRA
=========================================== */

function currentWord(){

    const pos=codeEditor.selectionStart;

    const left=

    codeEditor.value.substring(0,pos);

    const match=

    left.match(/[a-zA-Z0-9-]+$/);

    return match?match[0]:"";

}

/* ===========================================
   PANEL
=========================================== */

function showSuggestions(){

    const word=currentWord();

    const result=getSuggestions(word);

    console.log(

        "Sugerencias:",

        result

    );

}

/* ===========================================
   AUTO CIERRE
=========================================== */

const pairs={

"(" : ")",

"{" : "}",

"[" : "]",

'"' : '"',

"'" : "'",

"<" : ">"

};

codeEditor.addEventListener(

"keydown",

function(e){

if(pairs[e.key]){

e.preventDefault();

const start=

codeEditor.selectionStart;

const end=

codeEditor.selectionEnd;

const value=

codeEditor.value;

codeEditor.value=

value.substring(0,start)+

e.key+

pairs[e.key]+

value.substring(end);

codeEditor.selectionStart=

start+1;

codeEditor.selectionEnd=

start+1;

}

}

);

/* ===========================================
   TAB
=========================================== */

codeEditor.addEventListener(

"keydown",

function(e){

if(e.key==="Tab"){

e.preventDefault();

const start=

codeEditor.selectionStart;

const value=

codeEditor.value;

codeEditor.value=

value.substring(0,start)+

"    "+

value.substring(start);

codeEditor.selectionStart=

start+4;

codeEditor.selectionEnd=

start+4;

}

}

);

/* ===========================================
   ENTER
=========================================== */

codeEditor.addEventListener(

"keydown",

function(e){

if(e.key==="Enter"){

const start=

codeEditor.selectionStart;

const before=

codeEditor.value.substring(0,start);

const spaces=

before.match(/(^|\n)([ ]*)[^\n]*$/);

if(spaces){

setTimeout(()=>{

const indent=

spaces[2];

const pos=

codeEditor.selectionStart;

codeEditor.setRangeText(

indent,

pos,

pos,

"end"

);

},0);

}

}

});

/* ===========================================
   ACTUALIZAR
=========================================== */

codeEditor.addEventListener(

"keyup",

()=>{

showSuggestions();

}

);

/* ===========================================
   HTML
=========================================== */

function autoHTML(){

if(Editor.language!=="html") return;

const value=

codeEditor.value;

if(

value.includes("<html") &&

!value.includes("</html>")

){

console.warn(

"Falta </html>"

);

}

}

/* ===========================================
   CSS
=========================================== */

function autoCSS(){

if(Editor.language!=="css") return;

if(

codeEditor.value.includes("{") &&

!codeEditor.value.includes("}")

){

console.warn(

"Falta }"

);

}

}

/* ===========================================
   JS
=========================================== */

function autoJS(){

if(Editor.language!=="javascript") return;

if(

codeEditor.value.includes("(") &&

!codeEditor.value.includes(")")

){

console.warn(

"Falta )"

);

}

}

/* ===========================================
   MOTOR
=========================================== */

setInterval(()=>{

autoHTML();

autoCSS();

autoJS();

},1500);

console.log(

"Motor de autocompletado cargado."

);/* ==========================================================
   ONYRA AI
   editor.js
   PARTE 5C
   Herramientas de edición
========================================================== */

"use strict";

/* ===========================================
   HISTORIAL
=========================================== */

Editor.undoStack = [];
Editor.redoStack = [];

function saveEditorState(){

    Editor.undoStack.push(codeEditor.value);

    if(Editor.undoStack.length > 100){

        Editor.undoStack.shift();

    }

    Editor.redoStack = [];

}

codeEditor.addEventListener("input", saveEditorState);

/* ===========================================
   DESHACER
=========================================== */

function undo(){

    if(Editor.undoStack.length === 0) return;

    Editor.redoStack.push(codeEditor.value);

    codeEditor.value = Editor.undoStack.pop();

    updatePreview();

}

/* ===========================================
   REHACER
=========================================== */

function redo(){

    if(Editor.redoStack.length === 0) return;

    Editor.undoStack.push(codeEditor.value);

    codeEditor.value = Editor.redoStack.pop();

    updatePreview();

}

/* ===========================================
   BUSCAR
=========================================== */

function findText(text){

    if(!text) return;

    const pos = codeEditor.value.indexOf(text);

    if(pos === -1){

        notify("Texto no encontrado.");

        return;

    }

    codeEditor.focus();

    codeEditor.setSelectionRange(

        pos,

        pos + text.length

    );

}

/* ===========================================
   REEMPLAZAR
=========================================== */

function replaceText(find, replace){

    codeEditor.value =

    codeEditor.value.split(find).join(replace);

    updatePreview();

}

/* ===========================================
   IR A LÍNEA
=========================================== */

function goToLine(number){

    const lines = codeEditor.value.split("\n");

    if(number < 1 || number > lines.length){

        notify("Línea inválida.");

        return;

    }

    let position = 0;

    for(let i=0;i<number-1;i++){

        position += lines[i].length + 1;

    }

    codeEditor.focus();

    codeEditor.setSelectionRange(position,position);

}

/* ===========================================
   DUPLICAR LÍNEA
=========================================== */

function duplicateCurrentLine(){

    const lines = codeEditor.value.split("\n");

    const line = Editor.cursorLine - 1;

    lines.splice(line,0,lines[line]);

    codeEditor.value = lines.join("\n");

}

/* ===========================================
   ELIMINAR LÍNEA
=========================================== */

function deleteCurrentLine(){

    const lines = codeEditor.value.split("\n");

    lines.splice(Editor.cursorLine-1,1);

    codeEditor.value = lines.join("\n");

}

/* ===========================================
   FORMATEAR
=========================================== */

function formatCode(){

    codeEditor.value =

    codeEditor.value

    .replace(/\t/g,"    ")

    .replace(/\n{3,}/g,"\n\n");

    updatePreview();

}

/* ===========================================
   ATAJOS
=========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="z"){

        e.preventDefault();

        undo();

    }

    if(e.ctrlKey && e.key==="y"){

        e.preventDefault();

        redo();

    }

    if(e.ctrlKey && e.key==="f"){

        e.preventDefault();

        const word = prompt("Buscar:");

        findText(word);

    }

    if(e.ctrlKey && e.key==="h"){

        e.preventDefault();

        const oldWord = prompt("Buscar:");

        const newWord = prompt("Reemplazar por:");

        replaceText(oldWord,newWord);

    }

    if(e.ctrlKey && e.key==="l"){

        e.preventDefault();

        const line = parseInt(

            prompt("Ir a la línea:")

        );

        goToLine(line);

    }

});

/* ===========================================
   FINAL
=========================================== */

console.log(

"Herramientas avanzadas del editor cargadas."

);/* ==========================================================
   ONYRA AI
   editor.js
   PARTE 5D (100%)
   Finalización del editor
========================================================== */

"use strict";

/* ===========================================
   CONFIGURACIÓN
=========================================== */

Editor.settings = {

    wordWrap: true,

    lineNumbers: true,

    autoSave: true,

    miniMap: true,

    fontSize: 16,

    tabSize: 4,

    theme: "Dark"

};

/* ===========================================
   TEMAS
=========================================== */

const EditorThemes = {

    Dark: {
        background: "#0d1117",
        color: "#ffffff"
    },

    Light: {
        background: "#ffffff",
        color: "#000000"
    },

    Neon: {
        background: "#10131a",
        color: "#5dffb2"
    }

};

function applyEditorTheme(name){

    if(!EditorThemes[name]) return;

    const theme = EditorThemes[name];

    codeEditor.style.background = theme.background;
    codeEditor.style.color = theme.color;

    Editor.settings.theme = name;

    notify("Tema: " + name);

}

/* ===========================================
   TAMAÑO DE LETRA
=========================================== */

function setEditorFontSize(size){

    codeEditor.style.fontSize = size + "px";

    Editor.settings.fontSize = size;

}

/* ===========================================
   AJUSTE DE LÍNEAS
=========================================== */

function toggleWordWrap(){

    Editor.settings.wordWrap = !Editor.settings.wordWrap;

    codeEditor.style.whiteSpace =
        Editor.settings.wordWrap
        ? "pre-wrap"
        : "pre";

}

/* ===========================================
   MINI MAPA (BASE)
=========================================== */

function updateMiniMap(){

    if(!Editor.settings.miniMap) return;

    console.log(
        "MiniMap actualizado (modo básico)."
    );

}

/* ===========================================
   ESTADÍSTICAS
=========================================== */

function updateEditorInfo(){

    const info = {

        file: Editor.currentFile,

        language: Editor.language,

        characters: codeEditor.value.length,

        lines: codeEditor.value.split("\n").length,

        theme: Editor.settings.theme

    };

    console.table(info);

}

/* ===========================================
   EXPORTAR ARCHIVO
=========================================== */

function exportCurrentFile(){

    const blob = new Blob(

        [codeEditor.value],

        {type:"text/plain"}

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = Editor.currentFile;

    link.click();

    URL.revokeObjectURL(url);

}

/* ===========================================
   IMPORTAR ARCHIVO
=========================================== */

function importFile(file){

    const reader = new FileReader();

    reader.onload = function(e){

        codeEditor.value = e.target.result;

        project.files[Editor.currentFile] =
            codeEditor.value;

        updatePreview();

        notify("Archivo importado.");

    };

    reader.readAsText(file);

}

/* ===========================================
   ATAJOS
=========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="1"){

        e.preventDefault();

        applyEditorTheme("Dark");

    }

    if(e.ctrlKey && e.key==="2"){

        e.preventDefault();

        applyEditorTheme("Light");

    }

    if(e.ctrlKey && e.key==="3"){

        e.preventDefault();

        applyEditorTheme("Neon");

    }

    if(e.ctrlKey && e.key==="e"){

        e.preventDefault();

        exportCurrentFile();

    }

});

/* ===========================================
   ACTUALIZACIÓN
=========================================== */

setInterval(()=>{

    updateMiniMap();

    updateEditorInfo();

},5000);

/* ===========================================
   INICIO
=========================================== */

applyEditorTheme("Dark");

setEditorFontSize(16);

console.log("Editor.js cargado correctamente.");

/* ==========================================================
   FIN DE editor.js
   ONYRA AI Studio Editor v1.0
========================================================== */
