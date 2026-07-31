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
