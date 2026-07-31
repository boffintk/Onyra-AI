/* ==========================================================
   ONYRA AI
   ai.js
   PARTE 4A
   Núcleo de la IA
========================================================== */

"use strict";

/* ==========================================================
   CONFIGURACIÓN
========================================================== */

const AI = {

    name: "Onyra AI",

    version: "1.0",

    developer: "Usuario",

    mood: "normal",

    initialized: false,

    typing: false,

    memory: [],

    commands: [],

    responses: []

};

/* ==========================================================
   INICIO
========================================================== */

function startAI(){

    AI.initialized = true;

    console.log(AI.name + " iniciada.");

}

startAI();

/* ==========================================================
   MEMORIA
========================================================== */

function remember(question,answer){

    AI.memory.push({

        question:question,

        answer:answer,

        date:new Date()

    });

}

function searchMemory(question){

    for(let item of AI.memory){

        if(item.question.toLowerCase()==question.toLowerCase()){

            return item.answer;

        }

    }

    return null;

}

/* ==========================================================
   RESPUESTAS
========================================================== */

AI.responses = [

{

keywords:["hola","hola w"],

answer:"¡Hola! Soy Onyra AI."

},

{

keywords:["adios"],

answer:"Hasta luego."

},

{

keywords:["gracias"],

answer:"¡De nada!"

},

{

keywords:["quien eres"],

answer:"Soy Onyra AI, una inteligencia artificial para crear proyectos."

}

];

/* ==========================================================
   COMANDOS
========================================================== */

AI.commands = [

"crear html",

"crear css",

"crear javascript",

"crear juego",

"crear pagina",

"crear app",

"guardar proyecto",

"abrir proyecto",

"exportar proyecto",

"limpiar editor"

];

/* ==========================================================
   ANALIZADOR
========================================================== */

function analyze(text){

    text=text.toLowerCase();

    const memory=searchMemory(text);

    if(memory){

        return memory;

    }

    for(let response of AI.responses){

        for(let key of response.keywords){

            if(text.includes(key)){

                remember(text,response.answer);

                return response.answer;

            }

        }

    }

    if(text.includes("crear html")){

        return "Generando archivo HTML...";

    }

    if(text.includes("crear css")){

        return "Generando archivo CSS...";

    }

    if(text.includes("crear javascript")){

        return "Generando archivo JavaScript...";

    }

    if(text.includes("crear juego")){

        return "Preparando un nuevo juego...";

    }

    if(text.includes("crear app")){

        return "Creando aplicación...";

    }

    return "No entendí esa solicitud todavía.";

}

/* ==========================================================
   CHAT
========================================================== */

function askAI(message){

    AI.typing=true;

    const answer=analyze(message);

    AI.typing=false;

    return answer;

}

/* ==========================================================
   ESCRITURA
========================================================== */

function typeEffect(text,callback){

    let i=0;

    let output="";

    const timer=setInterval(()=>{

        output+=text.charAt(i);

        i++;

        if(i>=text.length){

            clearInterval(timer);

            if(callback){

                callback(output);

            }

        }

    },15);

}

/* ==========================================================
   ESTADO
========================================================== */

function getAIInfo(){

    return{

        name:AI.name,

        version:AI.version,

        memory:AI.memory.length,

        commands:AI.commands.length

    };

}

console.log(getAIInfo());

/* ==========================================================
   FIN PARTE 4A
========================================================== */
/* ==========================================================
   ONYRA AI
   ai.js
   PARTE 4B
   Generador de código
========================================================== */

"use strict";

/* ===========================================
   GENERADORES
=========================================== */

const Generator = {

    html(title="Nuevo Proyecto"){

        return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<h1>${title}</h1>

<script src="script.js"></script>
</body>
</html>`;
    },

    css(){

        return `body{

margin:0;
padding:0;
font-family:Arial,sans-serif;
background:#111;
color:white;

}`;

    },

    javascript(){

        return `console.log("Proyecto iniciado");`;

    }

};

/* ===========================================
   CREAR PROYECTO
=========================================== */

function createProject(name){

    project.files["index.html"]=Generator.html(name);

    project.files["style.css"]=Generator.css();

    project.files["script.js"]=Generator.javascript();

    refreshExplorer();

    codeEditor.value=project.files["index.html"];

    updatePreview();

    notify("Proyecto creado.");

    addConsole("Proyecto "+name+" generado.");

}

/* ===========================================
   PLANTILLAS
=========================================== */

const Templates={

landing(){

return `
<section>

<h1>Bienvenido</h1>

<p>Creado con Onyra AI</p>

</section>
`;

},

canvas(){

return `
<canvas id="game"></canvas>
`;

},

menu(){

return `
<nav>

<button>Inicio</button>

<button>Opciones</button>

</nav>
`;

}

};

/* ===========================================
   GENERADOR HTML
=========================================== */

function generateHTML(type){

    switch(type){

        case "landing":

            codeEditor.value=Generator.html("Landing Page");

            codeEditor.value+=Templates.landing();

            break;

        case "canvas":

            codeEditor.value=Generator.html("Canvas");

            codeEditor.value+=Templates.canvas();

            break;

        default:

            codeEditor.value=Generator.html();

    }

    updatePreview();

}

/* ===========================================
   IA GENERADORA
=========================================== */

function generateByPrompt(prompt){

    prompt=prompt.toLowerCase();

    if(prompt.includes("pagina")){

        createProject("Mi Página");

        return "Página creada.";

    }

    if(prompt.includes("landing")){

        generateHTML("landing");

        return "Landing Page creada.";

    }

    if(prompt.includes("canvas")){

        generateHTML("canvas");

        return "Proyecto Canvas creado.";

    }

    if(prompt.includes("juego")){

        createGame();

        return "Juego creado.";

    }

    if(prompt.includes("html")){

        codeEditor.value=Generator.html();

        updatePreview();

        return "HTML generado.";

    }

    if(prompt.includes("css")){

        codeEditor.value=Generator.css();

        return "CSS generado.";

    }

    if(prompt.includes("javascript")){

        codeEditor.value=Generator.javascript();

        return "JavaScript generado.";

    }

    return null;

}

/* ===========================================
   MEJORAR ANALIZADOR
=========================================== */

const oldAnalyze=analyze;

analyze=function(message){

    const result=generateByPrompt(message);

    if(result){

        remember(message,result);

        return result;

    }

    return oldAnalyze(message);

};

/* ===========================================
   AUTO NOMBRE
=========================================== */

function randomProjectName(){

    const list=[

        "Galaxy Runner",

        "Zombie World",

        "Dark Escape",

        "Dream Studio",

        "Pixel Engine",

        "Space Adventure",

        "Ocean Explorer",

        "Neon Survival"

    ];

    return list[Math.floor(Math.random()*list.length)];

}

/* ===========================================
   CREAR RÁPIDO
=========================================== */

function quickProject(){

    createProject(

        randomProjectName()

    );

}

/* ===========================================
   FINAL
=========================================== */

console.log(

"Generador de código cargado."

);
/* ==========================================================
   ONYRA AI
   ai.js
   PARTE 4C
   Generador avanzado de proyectos
========================================================== */

"use strict";

/* ===========================================
   PLANTILLAS AVANZADAS
=========================================== */

const AdvancedTemplates={

game2D(){

return {

html:`<!DOCTYPE html>
<html>
<head>
<title>Juego 2D</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<canvas id="game"></canvas>

<script src="script.js"></script>

</body>
</html>`,

css:`body{

margin:0;
overflow:hidden;
background:#111;

}

canvas{

display:block;

}`,

js:`const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

ctx.fillStyle="red";
ctx.fillRect(100,100,80,80);`

};

},

website(){

return{

html:Generator.html("Mi Sitio Web"),

css:Generator.css(),

js:Generator.javascript()

};

},

app(){

return{

html:Generator.html("Mi Aplicación"),

css:Generator.css(),

js:`console.log("App iniciada");`

};

}

};

/* ===========================================
   CREAR DESDE PLANTILLA
=========================================== */

function generateTemplate(type){

let temp;

switch(type){

case "game":

temp=AdvancedTemplates.game2D();

break;

case "website":

temp=AdvancedTemplates.website();

break;

case "app":

temp=AdvancedTemplates.app();

break;

default:

return false;

}

project.files["index.html"]=temp.html;
project.files["style.css"]=temp.css;
project.files["script.js"]=temp.js;

refreshExplorer();

codeEditor.value=temp.html;

updatePreview();

notify(type+" creado.");

return true;

}

/* ===========================================
   IA
=========================================== */

const analyzeOld=analyze;

analyze=function(text){

const msg=text.toLowerCase();

if(msg.includes("juego 2d")){

generateTemplate("game");

return "Proyecto Juego 2D generado.";

}

if(msg.includes("sitio web")){

generateTemplate("website");

return "Sitio web generado.";

}

if(msg.includes("aplicacion")){

generateTemplate("app");

return "Aplicación creada.";

}

return analyzeOld(text);

};

/* ===========================================
   SUGERENCIAS
=========================================== */

const suggestions=[

"Crear un juego 2D",

"Crear un sitio web",

"Crear una aplicación",

"Crear un editor",

"Crear una IA",

"Crear una calculadora",

"Crear un chat",

"Crear un reproductor"

];

function randomSuggestion(){

return suggestions[

Math.floor(

Math.random()*suggestions.length

)

];

}

/* ===========================================
   AYUDA
=========================================== */

function showHelp(){

return`

Comandos:

• Crear juego 2D

• Crear sitio web

• Crear aplicación

• Crear HTML

• Crear CSS

• Crear JavaScript

`;

}

console.log("Generador avanzado cargado.");
/* ==========================================================
   ONYRA AI
   ai.js
   PARTE 4D
   Sistema avanzado
========================================================== */

"use strict";

/* ===========================================
   PERFIL
=========================================== */

AI.profile = {

    language: "es",

    favoriteTheme: "oscuro",

    projectsCreated: 0,

    lastProject: "",

    totalRequests: 0

};

/* ===========================================
   ANALIZADOR DE CÓDIGO
=========================================== */

function analyzeCode(code){

    const report=[];

    if(code.includes("console.log")){

        report.push("Se encontró console.log().");

    }

    if(code.length<100){

        report.push("El archivo parece muy pequeño.");

    }

    if(code.includes("<img") && !code.includes("alt=")){

        report.push("Las imágenes deberían tener atributo alt.");

    }

    if(report.length===0){

        report.push("No se encontraron problemas básicos.");

    }

    return report;

}

/* ===========================================
   OPTIMIZADOR
=========================================== */

function optimizeCode(code){

    return code

    .replace(/\n{3,}/g,"\n\n")

    .replace(/[ ]{2,}/g," ");

}

/* ===========================================
   ESTILOS
=========================================== */

const ProjectStyles=[

"Moderno",

"Pixel Art",

"Dreamcore",

"Terror",

"Neón",

"Minimalista",

"Retro",

"Futurista"

];

function getStyles(){

    return ProjectStyles;

}

/* ===========================================
   ESTADÍSTICAS
=========================================== */

function registerProject(name){

    AI.profile.projectsCreated++;

    AI.profile.lastProject=name;

}

/* ===========================================
   PETICIONES
=========================================== */

function registerRequest(){

    AI.profile.totalRequests++;

}

/* ===========================================
   INFORMACIÓN
=========================================== */

function AIInformation(){

    return{

        version:AI.version,

        projects:AI.profile.projectsCreated,

        requests:AI.profile.totalRequests,

        memory:AI.memory.length

    };

}

/* ===========================================
   EXPORTAR PERFIL
=========================================== */

function exportAIProfile(){

    return JSON.stringify(

        AIInformation(),

        null,

        4

    );

}

/* ===========================================
   COMANDO ESPECIAL
=========================================== */

const previousAnalyze = analyze;

analyze=function(message){

    registerRequest();

    const msg=message.toLowerCase();

    if(msg==="info"){

        return JSON.stringify(

            AIInformation(),

            null,

            4

        );

    }

    if(msg.includes("optimizar")){

        codeEditor.value=

        optimizeCode(

            codeEditor.value

        );

        updatePreview();

        return "Código optimizado.";

    }

    if(msg.includes("analizar codigo")){

        return analyzeCode(

            codeEditor.value

        ).join("\n");

    }

    if(msg.includes("estilos")){

        return getStyles().join(", ");

    }

    return previousAnalyze(message);

};

/* ===========================================
   INICIO
=========================================== */

console.log("================================");
console.log("     ONYRA AI CORE v1.0");
console.log("================================");
console.log("Motor iniciado correctamente.");
console.log("Sistema listo.");
console.log("================================");
