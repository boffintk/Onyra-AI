/* ==========================================================
   ONYRA AI STUDIO
   core.js
   PARTE 8A
   Núcleo principal
========================================================== */

"use strict";


/* ===========================================
   ONYRA CORE
=========================================== */

const OnyraCore = {

    name:"Onyra AI Studio",

    version:"1.0",

    status:"starting",

    modules:{},

    events:{},

    settings:{},

    startTime:Date.now()

};


/* ===========================================
   CONFIGURACIÓN
=========================================== */

OnyraCore.settings={

    theme:"dark",

    language:"es",

    autoSave:true,

    notifications:true,

    tabletMode:true

};


/* ===========================================
   REGISTRAR MÓDULO
=========================================== */

function registerModule(name,module){

    OnyraCore.modules[name]=module;


    console.log(

        "Módulo cargado:",

        name

    );

}


/* ===========================================
   EVENTOS
=========================================== */

function on(event,callback){

    if(!OnyraCore.events[event]){

        OnyraCore.events[event]=[];

    }


    OnyraCore.events[event]

    .push(callback);

}



function emit(event,data){

    if(!OnyraCore.events[event])

        return;


    OnyraCore.events[event]

    .forEach(callback=>{

        callback(data);

    });

}


/* ===========================================
   ESTADO
=========================================== */

function getCoreStatus(){

    return{

        name:

        OnyraCore.name,


        version:

        OnyraCore.version,


        modules:

        Object.keys(

            OnyraCore.modules

        ),


        uptime:

        Date.now()

        -

        OnyraCore.startTime

    };

}


/* ===========================================
   CONEXIÓN
=========================================== */

function connectModules(){

    if(typeof AI!=="undefined"){

        registerModule(

            "AI",

            AI

        );

    }


    if(typeof Editor!=="undefined"){

        registerModule(

            "Editor",

            Editor

        );

    }


    if(typeof FileSystem!=="undefined"){

        registerModule(

            "FileSystem",

            FileSystem

        );

    }


    if(typeof Preview!=="undefined"){

        registerModule(

            "Preview",

            Preview

        );

    }

}


/* ===========================================
   INICIO
=========================================== */

function startCore(){

    connectModules();


    OnyraCore.status="running";


    emit(

        "ready",

        getCoreStatus()

    );


    console.log(

        "Onyra Core iniciado."

    );

}


window.addEventListener(

"load",

()=>{

    startCore();

}

);


/* ===========================================
   EVENTO LISTO
=========================================== */

on(

"ready",

(data)=>{

    console.log(

        "Sistema listo:",

        data

    );

}

);


/* ===========================================
   FINAL
=========================================== */

console.log(

"core.js Parte 8A cargada."

);
/* ==========================================================
   ONYRA AI STUDIO
   core.js
   PARTE 8B
   Sistema de plugins
========================================================== */

"use strict";


/* ===========================================
   PLUGINS
=========================================== */

OnyraCore.plugins = [];


/* ===========================================
   INSTALAR PLUGIN
=========================================== */

function installPlugin(plugin){

    if(!plugin.name){

        console.error(
            "Plugin inválido."
        );

        return false;

    }


    OnyraCore.plugins.push({

        name:plugin.name,

        version:
        plugin.version || "1.0",

        enabled:true,

        author:
        plugin.author || "Unknown",

        start:
        plugin.start || function(){}

    });


    console.log(

        "Plugin instalado:",

        plugin.name

    );


    emit(

        "pluginInstalled",

        plugin

    );


    return true;

}


/* ===========================================
   ACTIVAR
=========================================== */

function enablePlugin(name){

    const plugin =

    OnyraCore.plugins.find(

        p=>p.name===name

    );


    if(!plugin)return;


    plugin.enabled=true;


    plugin.start();


    notify(

        "Plugin activado."

    );

}


/* ===========================================
   DESACTIVAR
=========================================== */

function disablePlugin(name){

    const plugin =

    OnyraCore.plugins.find(

        p=>p.name===name

    );


    if(!plugin)return;


    plugin.enabled=false;


    console.log(

        "Plugin desactivado:",

        name

    );

}


/* ===========================================
   ELIMINAR
=========================================== */

function uninstallPlugin(name){

    OnyraCore.plugins=

    OnyraCore.plugins.filter(

        p=>p.name!==name

    );


    notify(

        "Plugin eliminado."

    );

}


/* ===========================================
   LISTAR
=========================================== */

function listPlugins(){

    return OnyraCore.plugins.map(

        plugin=>({

            name:plugin.name,

            version:plugin.version,

            enabled:plugin.enabled

        })

    );

}


/* ===========================================
   EJEMPLO
=========================================== */

const ExamplePlugin={

    name:"Game Tools",

    version:"1.0",

    author:"Onyra Community",


    start(){

        console.log(

        "Herramientas de juegos activadas."

        );

    }

};


/* ===========================================
   CARGAR EJEMPLO
=========================================== */

installPlugin(

    ExamplePlugin

);


/* ===========================================
   EVENTOS
=========================================== */

on(

"pluginInstalled",

(plugin)=>{

    console.log(

        "Nuevo plugin:",

        plugin.name

    );

}

);


/* ===========================================
   FINAL
=========================================== */

console.log(

"Sistema de plugins cargado."

);
/* ==========================================================
   ONYRA AI STUDIO
   core.js
   PARTE 8C
   Gestión avanzada de plugins
========================================================== */

"use strict";


/* ===========================================
   GUARDAR PLUGINS
=========================================== */

function savePlugins(){

    localStorage.setItem(

        "OnyraPlugins",

        JSON.stringify(

            OnyraCore.plugins

        )

    );

}


/* ===========================================
   CARGAR PLUGINS
=========================================== */

function loadPlugins(){

    const data =

    localStorage.getItem(

        "OnyraPlugins"

    );


    if(!data)return;


    OnyraCore.plugins=

    JSON.parse(data);


    console.log(

        "Plugins restaurados."

    );

}


/* ===========================================
   CONFIGURACIÓN
=========================================== */

function setPluginConfig(

    name,

    config

){

    const plugin =

    OnyraCore.plugins.find(

        p=>p.name===name

    );


    if(!plugin)return;


    plugin.config=config;


    savePlugins();

}


/* ===========================================
   OBTENER CONFIG
=========================================== */

function getPluginConfig(name){

    const plugin=

    OnyraCore.plugins.find(

        p=>p.name===name

    );


    if(!plugin)return null;


    return plugin.config || {};

}


/* ===========================================
   PERMISOS
=========================================== */

function setPluginPermissions(

    name,

    permissions

){

    const plugin=

    OnyraCore.plugins.find(

        p=>p.name===name

    );


    if(!plugin)return;


    plugin.permissions=

    permissions;


    savePlugins();

}


/* ===========================================
   COMPROBAR PERMISO
=========================================== */

function hasPermission(

    name,

    permission

){

    const plugin=

    OnyraCore.plugins.find(

        p=>p.name===name

    );


    if(!plugin)return false;


    return plugin.permissions &&

    plugin.permissions.includes(

        permission

    );

}


/* ===========================================
   IMPORTAR PLUGIN
=========================================== */

function importPluginFile(file){

    const reader=

    new FileReader();


    reader.onload=function(e){

        try{

            const plugin=

            JSON.parse(

                e.target.result

            );


            installPlugin(plugin);


            savePlugins();


        }

        catch{

            console.error(

            "Plugin inválido."

            );

        }

    };


    reader.readAsText(file);

}


/* ===========================================
   ACTUALIZAR PLUGIN
=========================================== */

function updatePlugin(

    name,

    newVersion

){

    const plugin=

    OnyraCore.plugins.find(

        p=>p.name===name

    );


    if(!plugin)return;


    plugin.version=

    newVersion;


    savePlugins();


    notify(

        "Plugin actualizado."

    );

}


/* ===========================================
   SOBRECARGAR INSTALACIÓN
=========================================== */

const oldInstallPlugin=

installPlugin;


installPlugin=function(plugin){

    const result=

    oldInstallPlugin(plugin);


    if(result){

        savePlugins();

    }


    return result;

};


/* ===========================================
   INICIO
=========================================== */

loadPlugins();


console.log(

"Gestor avanzado de plugins cargado."

);
/* ==========================================================
   ONYRA AI STUDIO
   core.js
   PARTE 8D
   Administrador final de plugins
========================================================== */

"use strict";


/* ===========================================
   TIENDA DE PLUGINS
=========================================== */

const PluginStore=[

    {
        name:"Game Builder",
        version:"1.0",
        category:"Games",
        description:
        "Herramientas para crear juegos."
    },

    {
        name:"UI Designer",
        version:"1.0",
        category:"Design",
        description:
        "Crea interfaces modernas."
    },

    {
        name:"Code Helper",
        version:"1.0",
        category:"Programming",
        description:
        "Ayuda con código."
    }

];


/* ===========================================
   BUSCAR PLUGINS
=========================================== */

function searchPlugins(text){

    return PluginStore.filter(plugin=>

        plugin.name

        .toLowerCase()

        .includes(

            text.toLowerCase()

        )

    );

}


/* ===========================================
   INSTALAR DESDE TIENDA
=========================================== */

function installStorePlugin(name){

    const plugin=

    PluginStore.find(

        p=>p.name===name

    );


    if(!plugin)return;


    installPlugin({

        name:plugin.name,

        version:plugin.version,


        start(){

            console.log(

            plugin.name+

            " iniciado."

            );

        }

    });

}


/* ===========================================
   PANEL
=========================================== */

function pluginManager(){

    return{

        installed:

        listPlugins(),

        available:

        PluginStore.length

    };

}


/* ===========================================
   CARGA DINÁMICA
=========================================== */

function runPlugin(name){

    const plugin=

    OnyraCore.plugins.find(

        p=>p.name===name

    );


    if(

        !plugin ||

        !plugin.enabled

    ){

        return;

    }


    plugin.start();

}


/* ===========================================
   REINICIAR SISTEMA
=========================================== */

function restartCore(){

    OnyraCore.status=

    "restarting";


    setTimeout(()=>{

        OnyraCore.status=

        "running";


        emit(

            "ready",

            getCoreStatus()

        );


    },500);

}


/* ===========================================
   REPORTE
=========================================== */

function systemReport(){

    return{

        system:

        OnyraCore.name,


        version:

        OnyraCore.version,


        status:

        OnyraCore.status,


        modules:

        Object.keys(

            OnyraCore.modules

        ),


        plugins:

        OnyraCore.plugins.length

    };

}


/* ===========================================
   INICIO FINAL
=========================================== */

console.log(

"================================"

);

console.log(

" ONYRA CORE v1.0 "

);

console.log(

" Todos los módulos conectados."

);

console.log(

systemReport()

);

console.log(

"================================"

);
