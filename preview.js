/* ==========================================================
   ONYRA AI STUDIO
   preview.js
   PARTE 7A
   Motor de Vista Previa
========================================================== */

"use strict";

/* ===========================================
   PREVIEW
=========================================== */

const Preview = {

    iframe: document.getElementById("preview"),

    autoReload: true,

    device: "tablet",

    zoom: 1,

    fullscreen: false,

    lastUpdate: 0

};

/* ===========================================
   ACTUALIZAR
=========================================== */

function updatePreview(){

    if(!Preview.iframe) return;

    const html =
        project.files["index.html"] || "";

    const css =
        project.files["style.css"] || "";

    const js =
        project.files["script.js"] || "";

    const page = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
${css}
</style>
</head>

<body>

${html}

<script>
${js}
<\/script>

</body>
</html>
`;

    Preview.iframe.srcdoc = page;

    Preview.lastUpdate = Date.now();

}

/* ===========================================
   AUTO RECARGA
=========================================== */

function setAutoReload(state){

    Preview.autoReload = state;

}

/* ===========================================
   EVENTO DEL EDITOR
=========================================== */

if(typeof codeEditor !== "undefined"){

    codeEditor.addEventListener("input",()=>{

        if(Preview.autoReload){

            updatePreview();

        }

    });

}

/* ===========================================
   RECARGA MANUAL
=========================================== */

function reloadPreview(){

    updatePreview();

    notify("Vista previa actualizada.");

}

/* ===========================================
   LIMPIAR
=========================================== */

function clearPreview(){

    if(!Preview.iframe) return;

    Preview.iframe.srcdoc = "";

}

/* ===========================================
   ESTADO
=========================================== */

function previewInfo(){

    return{

        device:Preview.device,

        autoReload:Preview.autoReload,

        zoom:Preview.zoom,

        fullscreen:Preview.fullscreen,

        lastUpdate:Preview.lastUpdate

    };

}

console.table(previewInfo());

/* ===========================================
   INICIO
=========================================== */

updatePreview();

console.log("Preview Engine iniciado.");
/* ==========================================================
   ONYRA AI STUDIO
   preview.js
   PARTE 7B
   Simulador de dispositivos
========================================================== */

"use strict";

/* ===========================================
   DISPOSITIVOS
=========================================== */

const Devices={

    mobile:{
        width:390,
        height:844
    },

    tablet:{
        width:800,
        height:1280
    },

    desktop:{
        width:1366,
        height:768
    }

};

/* ===========================================
   CAMBIAR DISPOSITIVO
=========================================== */

function setDevice(device){

    if(!Devices[device]) return;

    Preview.device=device;

    Preview.iframe.style.width=
        Devices[device].width+"px";

    Preview.iframe.style.height=
        Devices[device].height+"px";

    notify("Vista: "+device);

}

/* ===========================================
   ROTAR
=========================================== */

function rotateDevice(){

    const w=Preview.iframe.style.width;
    const h=Preview.iframe.style.height;

    Preview.iframe.style.width=h;
    Preview.iframe.style.height=w;

    notify("Dispositivo rotado.");

}

/* ===========================================
   ZOOM
=========================================== */

function setZoom(value){

    Preview.zoom=value;

    Preview.iframe.style.transform=
        "scale("+value+")";

    Preview.iframe.style.transformOrigin=
        "top center";

}

/* ===========================================
   PANTALLA COMPLETA
=========================================== */

function toggleFullscreen(){

    if(!document.fullscreenElement){

        Preview.iframe.requestFullscreen();

        Preview.fullscreen=true;

    }else{

        document.exitFullscreen();

        Preview.fullscreen=false;

    }

}

/* ===========================================
   RESOLUCIÓN PERSONALIZADA
=========================================== */

function customResolution(width,height){

    Preview.iframe.style.width=
        width+"px";

    Preview.iframe.style.height=
        height+"px";

}

/* ===========================================
   ATAJOS
=========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="F11"){

        e.preventDefault();

        toggleFullscreen();

    }

});

/* ===========================================
   INICIO
=========================================== */

setDevice("tablet");

console.log("Simulador de dispositivos cargado.");
/* ==========================================================
   ONYRA AI STUDIO
   preview.js
   PARTE 7C
   Consola y depuración
========================================================== */

"use strict";

/* ===========================================
   CONSOLA INTERNA
=========================================== */

const PreviewConsole = {

    logs: [],

    errors: [],

    warnings: []

};


/* ===========================================
   AGREGAR LOG
=========================================== */

function addPreviewLog(message){

    PreviewConsole.logs.push({

        type:"log",

        message:message,

        time:new Date().toLocaleTimeString()

    });

    updateConsolePanel();

}


/* ===========================================
   ERROR
=========================================== */

function addPreviewError(message){

    PreviewConsole.errors.push({

        type:"error",

        message:message,

        time:new Date().toLocaleTimeString()

    });

    updateConsolePanel();

}


/* ===========================================
   WARNING
=========================================== */

function addPreviewWarning(message){

    PreviewConsole.warnings.push({

        type:"warning",

        message:message,

        time:new Date().toLocaleTimeString()

    });

    updateConsolePanel();

}


/* ===========================================
   LIMPIAR
=========================================== */

function clearPreviewConsole(){

    PreviewConsole.logs=[];

    PreviewConsole.errors=[];

    PreviewConsole.warnings=[];

    updateConsolePanel();

}


/* ===========================================
   PANEL
=========================================== */

function updateConsolePanel(){

    const panel =
    document.getElementById(
        "consolePanel"
    );

    if(!panel) return;


    panel.innerHTML="";


    const all=[

        ...PreviewConsole.logs,

        ...PreviewConsole.warnings,

        ...PreviewConsole.errors

    ];


    all.forEach(item=>{

        const line=document.createElement("div");

        line.textContent=

        "["+item.type+"] "+item.message;

        panel.appendChild(line);

    });

}


/* ===========================================
   DETECTOR HTML
=========================================== */

function checkHTML(){

    const html =
    project.files["index.html"] || "";


    if(
        html.includes("<html") &&
        !html.includes("</html>")
    ){

        addPreviewError(
            "Falta cerrar la etiqueta html."
        );

    }


    if(
        html.includes("<script") &&
        !html.includes("</script>")
    ){

        addPreviewWarning(
            "Script sin cerrar."
        );

    }

}


/* ===========================================
   DETECTOR CSS
=========================================== */

function checkCSS(){

    const css =
    project.files["style.css"] || "";


    const open =
    (css.match(/{/g)||[]).length;


    const close =
    (css.match(/}/g)||[]).length;


    if(open!==close){

        addPreviewError(
            "Llaves CSS desbalanceadas."
        );

    }

}


/* ===========================================
   DETECTOR JS
=========================================== */

function checkJS(){

    const js =
    project.files["script.js"] || "";


    if(
        js.includes("function") &&
        !js.includes("}")
    ){

        addPreviewError(
            "Posible función sin cerrar."
        );

    }

}


/* ===========================================
   ANALIZADOR
=========================================== */

function analyzePreview(){

    clearPreviewConsole();

    checkHTML();

    checkCSS();

    checkJS();


    if(
        PreviewConsole.errors.length===0
    ){

        addPreviewLog(
            "No se encontraron errores básicos."
        );

    }

}


/* ===========================================
   INTERCEPTAR CONSOLA
=========================================== */

const oldLog = console.log;

console.log=function(message){

    addPreviewLog(message);

    oldLog(message);

};


/* ===========================================
   AUTO ANÁLISIS
=========================================== */

setInterval(()=>{

    analyzePreview();

},10000);


/* ===========================================
   INICIO
=========================================== */

console.log(
"Sistema de depuración iniciado."
);
/* ==========================================================
   ONYRA AI STUDIO
   preview.js
   PARTE 7D
   Final del sistema Preview
========================================================== */

"use strict";


/* ===========================================
   CAPTURA
=========================================== */

function capturePreview(){

    if(!Preview.iframe){

        return;

    }


    const canvas =
    document.createElement("canvas");


    const ctx =
    canvas.getContext("2d");


    canvas.width =
    Preview.iframe.offsetWidth;


    canvas.height =
    Preview.iframe.offsetHeight;


    ctx.fillStyle="#ffffff";

    ctx.fillRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    const image =
    canvas.toDataURL(
        "image/png"
    );


    const link =
    document.createElement("a");


    link.href=image;

    link.download=
    "OnyraPreview.png";


    link.click();


    notify(
        "Captura creada."
    );

}


/* ===========================================
   MODO PRESENTACIÓN
=========================================== */

Preview.presentation=false;


function presentationMode(){

    Preview.presentation =
    !Preview.presentation;


    if(Preview.presentation){

        Preview.iframe.style.width=
        "100vw";

        Preview.iframe.style.height=
        "100vh";


        notify(
            "Modo presentación."
        );


    }else{

        setDevice(
            Preview.device
        );


        notify(
            "Modo normal."
        );

    }

}


/* ===========================================
   ACTUALIZACIÓN INTELIGENTE
=========================================== */

let lastCode="";


function smartUpdate(){

    const current =

    JSON.stringify(
        project.files
    );


    if(current!==lastCode){

        updatePreview();

        lastCode=current;

    }

}


/* ===========================================
   HISTORIAL DE PREVIEW
=========================================== */

Preview.history=[];


function savePreviewState(){

    Preview.history.push({

        html:
        project.files["index.html"],

        css:
        project.files["style.css"],

        js:
        project.files["script.js"],

        date:
        new Date()

    });


    if(
        Preview.history.length>20
    ){

        Preview.history.shift();

    }

}


/* ===========================================
   RESTAURAR
=========================================== */

function restorePreview(index){

    const data =
    Preview.history[index];


    if(!data)return;


    project.files["index.html"]
    =data.html;


    project.files["style.css"]
    =data.css;


    project.files["script.js"]
    =data.js;


    updatePreview();


    notify(
        "Vista restaurada."
    );

}


/* ===========================================
   ATAJOS
=========================================== */

document.addEventListener(
"keydown",
(e)=>{


    if(e.ctrlKey && e.key==="p"){

        e.preventDefault();

        capturePreview();

    }


    if(e.ctrlKey && e.key==="m"){

        e.preventDefault();

        presentationMode();

    }


});


/* ===========================================
   AUTO SISTEMA
=========================================== */

setInterval(()=>{

    smartUpdate();

},2000);


/* ===========================================
   INICIO
=========================================== */

savePreviewState();


console.log(
"================================"
);

console.log(
" ONYRA PREVIEW ENGINE v1.0 "
);

console.log(
" Sistema finalizado."
);

console.log(
"================================"
);
