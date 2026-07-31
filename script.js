/* ==========================================================
   ONYRA AI STUDIO
   script.js
   PARTE 3A (25%)
   Inicio del sistema e interfaz
   ========================================================== */

"use strict";

/* ===========================================
   VARIABLES
=========================================== */

const app = document.getElementById("app");

const loadingScreen = document.getElementById("loadingScreen");
const loadingProgress = document.getElementById("loadingProgress");

const codeEditor = document.getElementById("codeEditor");
const previewFrame = document.getElementById("previewFrame");

const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");

const consoleOutput = document.getElementById("consoleOutput");

const statusBar = document.getElementById("statusBar");

const tabs = document.querySelectorAll(".tab");

const notificationArea = document.getElementById("notifications");

/* ===========================================
   CONFIGURACIÓN
=========================================== */

const Onyra = {

    version: "1.0",

    projectName: "Nuevo Proyecto",

    language: "es",

    autoSave: true,

    darkMode: true,

    previewAutoReload: true,

    initialized: false

};

/* ===========================================
   CARGA
=========================================== */

window.addEventListener("load", () => {

    let value = 0;

    const timer = setInterval(() => {

        value++;

        loadingProgress.style.width = value + "%";

        if (value >= 100) {

            clearInterval(timer);

            setTimeout(() => {

                loadingScreen.style.display = "none";

                Onyra.initialized = true;

                addConsole("Onyra AI Studio iniciado correctamente.");

                notify("Bienvenido a Onyra AI Studio");

                updatePreview();

            }, 350);

        }

    }, 15);

});

/* ===========================================
   CONSOLA
=========================================== */

function addConsole(text){

    const line = document.createElement("div");

    line.className = "consoleLine";

    line.textContent = "> " + text;

    consoleOutput.appendChild(line);

    consoleOutput.scrollTop = consoleOutput.scrollHeight;

}

/* ===========================================
   NOTIFICACIONES
=========================================== */

function notify(text){

    const div = document.createElement("div");

    div.className = "notification";

    div.textContent = text;

    notificationArea.appendChild(div);

    setTimeout(()=>{

        div.remove();

    },3500);

}

/* ===========================================
   CAMBIAR PESTAÑAS
=========================================== */

tabs.forEach(tab=>{

    tab.addEventListener("click",()=>{

        tabs.forEach(t=>{

            t.classList.remove("active");

        });

        tab.classList.add("active");

        addConsole("Pestaña abierta: " + tab.textContent);

    });

});

/* ===========================================
   VISTA PREVIA
=========================================== */

function updatePreview(){

    if(!previewFrame)return;

    const doc = previewFrame.contentWindow.document;

    doc.open();

    doc.write(codeEditor.value);

    doc.close();

}

/* ===========================================
   ACTUALIZACIÓN AUTOMÁTICA
=========================================== */

codeEditor.addEventListener("input",()=>{

    if(Onyra.previewAutoReload){

        updatePreview();

    }

});

/* ===========================================
   CONTADOR
=========================================== */

codeEditor.addEventListener("keyup",()=>{

    const text = codeEditor.value;

    const lines = text.split("\n").length;

    const chars = text.length;

    statusBar.innerHTML = `
    <div>Líneas: ${lines}</div>
    <div>Caracteres: ${chars}</div>
    <div>UTF-8</div>
    <div>${Onyra.projectName}</div>
    `;

});

/* ===========================================
   BOTÓN EJECUTAR
=========================================== */

const ejecutarBtn = document.getElementById("ejecutarBtn");

if(ejecutarBtn){

    ejecutarBtn.onclick = ()=>{

        updatePreview();

        notify("Vista previa actualizada");

        addConsole("Proyecto ejecutado.");

    };

}

/* ===========================================
   MENSAJE INICIAL
=========================================== */

setTimeout(()=>{

    if(chatMessages){

        chatMessages.innerHTML += `
        <div class="aiMessage">

        <span class="botName">

        Onyra AI

        </span>

        <p>

        Hola 👋 Estoy lista para ayudarte a crear juegos, aplicaciones y páginas web.

        </p>

        </div>
        `;

    }

},800);/* ==========================================================
   ONYRA AI STUDIO
   script.js
   PARTE 3B (50%)
   Chat de Onyra AI y administración de archivos
   ========================================================== */

"use strict";

/* ===========================================
   REFERENCIAS
=========================================== */

const sendMessageButton = document.getElementById("sendMessage");
const clearChatButton = document.getElementById("clearChat");

const fileTree = document.getElementById("fileTree");

const newFileButton = document.querySelector(".newFile");
const newFolderButton = document.querySelector(".newFolder");

/* ===========================================
   PROYECTO
=========================================== */

const project = {

    files:{
        "index.html":"<!DOCTYPE html>\n<html>\n<head>\n<title>Nuevo Proyecto</title>\n</head>\n<body>\n\n</body>\n</html>",

        "style.css":"",

        "script.js":""

    },

    folders:["assets"]

};

/* ===========================================
   MENSAJE CHAT
=========================================== */

function addChat(sender,text){

    const box=document.createElement("div");

    box.className="aiMessage";

    box.innerHTML=`
        <span class="botName">${sender}</span>
        <p>${text}</p>
    `;

    chatMessages.appendChild(box);

    chatMessages.scrollTop=chatMessages.scrollHeight;

}

/* ===========================================
   RESPUESTA IA
=========================================== */

function answerAI(message){

    const msg=message.toLowerCase();

    if(msg.includes("hola")){

        addChat("Onyra AI","¡Hola! ¿Qué proyecto vamos a crear hoy?");

        return;

    }

    if(msg.includes("crear index") || msg.includes("index.html")){

        codeEditor.value=project.files["index.html"];

        updatePreview();

        addConsole("index.html generado.");

        notify("Archivo index.html listo.");

        addChat("Onyra AI","He preparado un archivo index.html básico.");

        return;

    }

    if(msg.includes("crear css")){

        codeEditor.value="body{\n\n    margin:0;\n\n}";

        addConsole("style.css generado.");

        addChat("Onyra AI","He creado un archivo CSS inicial.");

        return;

    }

    if(msg.includes("crear javascript")){

        codeEditor.value='console.log("Hola Onyra AI");';

        addConsole("script.js generado.");

        addChat("Onyra AI","Archivo JavaScript creado.");

        return;

    }

    if(msg.includes("limpiar")){

        codeEditor.value="";

        updatePreview();

        addChat("Onyra AI","Editor limpiado.");

        return;

    }

    addChat(

        "Onyra AI",

        "Todavía estoy aprendiendo esa función. La agregaré en futuras versiones."

    );

}

/* ===========================================
   ENVIAR MENSAJE
=========================================== */

function sendChat(){

    const text=chatInput.value.trim();

    if(text==="") return;

    addChat("Tú",text);

    chatInput.value="";

    setTimeout(()=>{

        answerAI(text);

    },350);

}

if(sendMessageButton){

    sendMessageButton.onclick=sendChat;

}

chatInput.addEventListener("keydown",e=>{

    if(e.key==="Enter" && !e.shiftKey){

        e.preventDefault();

        sendChat();

    }

});

/* ===========================================
   LIMPIAR CHAT
=========================================== */

if(clearChatButton){

    clearChatButton.onclick=()=>{

        chatMessages.innerHTML="";

        notify("Chat limpiado.");

    };

}

/* ===========================================
   NUEVO ARCHIVO
=========================================== */

if(newFileButton){

    newFileButton.onclick=()=>{

        const name=prompt("Nombre del archivo");

        if(!name) return;

        project.files[name]="";

        refreshExplorer();

        notify("Archivo creado.");

    };

}

/* ===========================================
   NUEVA CARPETA
=========================================== */

if(newFolderButton){

    newFolderButton.onclick=()=>{

        const folder=prompt("Nombre de la carpeta");

        if(!folder) return;

        project.folders.push(folder);

        refreshExplorer();

    };

}

/* ===========================================
   EXPLORADOR
=========================================== */

function refreshExplorer(){

    let html="<ul>";

    html+="<li>📁 Proyecto<ul>";

    for(const file in project.files){

        html+=`<li class="fileItem">${file}</li>`;

    }

    project.folders.forEach(folder=>{

        html+=`<li>📂 ${folder}</li>`;

    });

    html+="</ul></li></ul>";

    fileTree.innerHTML=html;

    document.querySelectorAll(".fileItem").forEach(item=>{

        item.onclick=()=>{

            const name=item.textContent;

            codeEditor.value=project.files[name];

            updatePreview();

            addConsole(name+" abierto.");

        };

    });

}

refreshExplorer();

/* ===========================================
   GUARDAR CAMBIOS
=========================================== */

codeEditor.addEventListener("input",()=>{

    const active=document.querySelector(".tab.active");

    if(active){

        const file=active.textContent.trim();

        if(project.files[file]!=undefined){

            project.files[file]=codeEditor.value;

        }

    }

});/* ==========================================================
   ONYRA AI STUDIO
   script.js
   PARTE 3C (75%)
   Generador de proyectos, guardado y exportación
   ========================================================== */

"use strict";

/* ===========================================
   ALMACENAMIENTO
=========================================== */

function saveProject(){

    const data = JSON.stringify(project);

    localStorage.setItem("onyra_project", data);

    notify("Proyecto guardado.");

    addConsole("Proyecto guardado correctamente.");

}

function loadProject(){

    const data = localStorage.getItem("onyra_project");

    if(!data){

        notify("No hay proyectos guardados.");

        return;

    }

    const loaded = JSON.parse(data);

    project.files = loaded.files;
    project.folders = loaded.folders;

    refreshExplorer();

    notify("Proyecto cargado.");

    addConsole("Proyecto cargado.");

}

window.addEventListener("beforeunload",()=>{

    if(Onyra.autoSave){

        saveProject();

    }

});

/* ===========================================
   BOTONES
=========================================== */

const guardarProyecto =
document.getElementById("guardarProyecto");

const abrirProyecto =
document.getElementById("abrirProyecto");

const nuevoProyecto =
document.getElementById("nuevoProyecto");

const exportarProyecto =
document.getElementById("exportarProyecto");

if(guardarProyecto){

    guardarProyecto.onclick=saveProject;

}

if(abrirProyecto){

    abrirProyecto.onclick=loadProject;

}

if(nuevoProyecto){

    nuevoProyecto.onclick=()=>{

        if(confirm("¿Crear un nuevo proyecto?")){

            project.files={

                "index.html":"",

                "style.css":"",

                "script.js":""

            };

            project.folders=["assets"];

            refreshExplorer();

            codeEditor.value="";

            notify("Proyecto nuevo creado.");

        }

    };

}

/* ===========================================
   EXPORTAR
=========================================== */

if(exportarProyecto){

    exportarProyecto.onclick=()=>{

        let contenido="";

        for(const archivo in project.files){

            contenido+=
            "========== "+archivo+" ==========\n\n";

            contenido+=project.files[archivo];

            contenido+="\n\n";

        }

        const blob=new Blob([contenido],{

            type:"text/plain"

        });

        const url=URL.createObjectURL(blob);

        const a=document.createElement("a");

        a.href=url;

        a.download="Onyra-Proyecto.txt";

        a.click();

        URL.revokeObjectURL(url);

        notify("Proyecto exportado.");

    };

}

/* ===========================================
   GENERADOR DE PROYECTOS
=========================================== */

function createWebsite(){

project.files["index.html"]=`
<!DOCTYPE html>
<html>
<head>
<title>Mi Página</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<h1>Hola Mundo</h1>

<script src="script.js"></script>

</body>
</html>`;

project.files["style.css"]=`
body{

margin:0;

font-family:Arial;

background:#111;

color:white;

}`;

project.files["script.js"]=`
console.log("Proyecto iniciado");
`;

refreshExplorer();

codeEditor.value=project.files["index.html"];

updatePreview();

notify("Página creada.");

}

function createGame(){

project.files["index.html"]=`
<!DOCTYPE html>
<html>
<head>

<title>Juego</title>

<style>

body{

margin:0;

background:black;

overflow:hidden;

}

canvas{

display:block;

}

</style>

</head>

<body>

<canvas id="game"></canvas>

<script>

const canvas=document.getElementById("game");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

ctx.fillStyle="red";

ctx.fillRect(120,120,80,80);

</script>

</body>

</html>`;

refreshExplorer();

codeEditor.value=project.files["index.html"];

updatePreview();

notify("Juego generado.");

}

/* ===========================================
   IA
=========================================== */

const originalAnswer = answerAI;

answerAI=function(message){

const msg=message.toLowerCase();

if(msg.includes("crear pagina") ||

msg.includes("crear página")){

createWebsite();

addChat(

"Onyra AI",

"Proyecto web creado."

);

return;

}

if(msg.includes("crear juego")){

createGame();

addChat(

"Onyra AI",

"Juego generado correctamente."

);

return;

}

if(msg.includes("guardar")){

saveProject();

addChat(

"Onyra AI",

"Proyecto guardado."

);

return;

}

if(msg.includes("abrir")){

loadProject();

addChat(

"Onyra AI",

"Proyecto abierto."

);

return;

}

originalAnswer(message);

};

/* ===========================================
   ATAJOS
=========================================== */

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="s"){

e.preventDefault();

saveProject();

}

if(e.ctrlKey && e.key==="o"){

e.preventDefault();

loadProject();

}

if(e.ctrlKey && e.key==="n"){

e.preventDefault();

notify("Nuevo proyecto.");

}

});/* ==========================================================
   ONYRA AI STUDIO
   script.js
   PARTE 3D (100%)
   Herramientas avanzadas y finalización
   ========================================================== */

"use strict";

/* ===========================================
   ESTADÍSTICAS
=========================================== */

function updateProjectStats(){

    let totalFiles = Object.keys(project.files).length;
    let totalFolders = project.folders.length;

    let totalLines = 0;
    let totalCharacters = 0;

    for(const file in project.files){

        totalLines += project.files[file].split("\n").length;
        totalCharacters += project.files[file].length;

    }

    Onyra.stats = {

        files: totalFiles,
        folders: totalFolders,
        lines: totalLines,
        characters: totalCharacters

    };

}

setInterval(updateProjectStats,1000);

/* ===========================================
   HISTORIAL
=========================================== */

const history=[];

function addHistory(action){

    history.unshift({

        date:new Date().toLocaleTimeString(),

        action

    });

    if(history.length>100){

        history.pop();

    }

}

/* ===========================================
   BUSCADOR
=========================================== */

function searchText(text){

    if(!text) return;

    const editor=codeEditor.value;

    const position=editor.indexOf(text);

    if(position==-1){

        notify("Texto no encontrado.");

        return;

    }

    codeEditor.focus();

    codeEditor.setSelectionRange(

        position,

        position+text.length

    );

}

/* ===========================================
   CAMBIO DE TEMA
=========================================== */

function toggleTheme(){

    document.body.classList.toggle("lightTheme");

    Onyra.darkMode=!Onyra.darkMode;

    notify("Tema cambiado.");

}

/* ===========================================
   AUTOGUARDADO
=========================================== */

setInterval(()=>{

    if(Onyra.autoSave){

        saveProject();

    }

},60000);

/* ===========================================
   IA MEJORADA
=========================================== */

const aiMemory=[];

function remember(question,answer){

    aiMemory.push({

        question,

        answer

    });

}

function getMemory(question){

    for(const item of aiMemory){

        if(item.question===question){

            return item.answer;

        }

    }

    return null;

}

/* ===========================================
   PANEL IA
=========================================== */

function aiStatus(){

    addConsole("Modelo: Onyra Core");

    addConsole("Versión: "+Onyra.version);

    addConsole("Proyecto: "+Onyra.projectName);

}

/* ===========================================
   COMANDOS
=========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="f"){

        e.preventDefault();

        const word=prompt("Buscar");

        searchText(word);

    }

    if(e.key==="F5"){

        e.preventDefault();

        updatePreview();

        notify("Vista previa actualizada.");

    }

});

/* ===========================================
   BIENVENIDA
=========================================== */

const welcome=document.getElementById("welcomeScreen");

const startNow=document.getElementById("startNow");

if(startNow){

    startNow.onclick=()=>{

        welcome.style.display="none";

        notify("¡Bienvenido!");

    };

}

/* ===========================================
   INICIO
=========================================== */

updateProjectStats();

aiStatus();

addHistory("Proyecto iniciado");

notify("Onyra AI Studio listo.");

console.log(

"%cOnyra AI Studio",

"font-size:24px;color:#5d8bff;font-weight:bold;"

);

console.log(

"Versión:",

Onyra.version

);

console.log(

"Inicialización completada."

);

/* ==========================================================
   FIN DEL SCRIPT.JS
   ONYRA AI STUDIO v1.0
   ========================================================== */
