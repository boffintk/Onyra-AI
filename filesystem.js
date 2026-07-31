/* ==========================================================
   ONYRA AI STUDIO
   filesystem.js
   PARTE 6A
   Sistema de archivos virtual
========================================================== */

"use strict";

/* ===========================================
   SISTEMA
=========================================== */

const FileSystem={

    version:"1.0",

    root:"Proyecto",

    files:{},

    folders:{},

    trash:[],

    selected:null

};

/* ===========================================
   INICIO
=========================================== */

function startFileSystem(){

    FileSystem.files=project.files;

    FileSystem.folders={

        "assets":[],
        "images":[],
        "audio":[],
        "scripts":[]

    };

    console.log("FileSystem iniciado.");

}

startFileSystem();

/* ===========================================
   CREAR ARCHIVO
=========================================== */

function createFile(name,content=""){

    if(FileSystem.files[name]){

        notify("Ese archivo ya existe.");

        return false;

    }

    FileSystem.files[name]=content;

    refreshExplorer();

    notify("Archivo creado.");

    return true;

}

/* ===========================================
   CREAR CARPETA
=========================================== */

function createFolder(name){

    if(FileSystem.folders[name]){

        notify("La carpeta ya existe.");

        return false;

    }

    FileSystem.folders[name]=[];

    refreshExplorer();

    notify("Carpeta creada.");

    return true;

}

/* ===========================================
   ABRIR
=========================================== */

function openFile(name){

    if(!FileSystem.files[name]){

        notify("Archivo no encontrado.");

        return;

    }

    Editor.currentFile=name;

    codeEditor.value=FileSystem.files[name];

    updatePreview();

    notify("Archivo abierto.");

}

/* ===========================================
   GUARDAR
=========================================== */

function saveFile(){

    FileSystem.files[Editor.currentFile]=

    codeEditor.value;

    notify("Archivo guardado.");

}

/* ===========================================
   RENOMBRAR
=========================================== */

function renameFile(oldName,newName){

    if(!FileSystem.files[oldName]) return;

    FileSystem.files[newName]=

    FileSystem.files[oldName];

    delete FileSystem.files[oldName];

    if(Editor.currentFile===oldName){

        Editor.currentFile=newName;

    }

    refreshExplorer();

}

/* ===========================================
   ELIMINAR
=========================================== */

function deleteFile(name){

    if(!FileSystem.files[name]) return;

    FileSystem.trash.push({

        name:name,

        content:FileSystem.files[name],

        date:new Date()

    });

    delete FileSystem.files[name];

    refreshExplorer();

    notify("Archivo enviado a la papelera.");

}

/* ===========================================
   INFORMACIÓN
=========================================== */

function getFileInfo(name){

    if(!FileSystem.files[name]){

        return null;

    }

    return{

        name:name,

        size:FileSystem.files[name].length,

        extension:name.split(".").pop(),

        created:new Date()

    };

}

/* ===========================================
   LISTAR
=========================================== */

function listFiles(){

    return Object.keys(

        FileSystem.files

    );

}

function listFolders(){

    return Object.keys(

        FileSystem.folders

    );

}

/* ===========================================
   ACTUALIZAR
=========================================== */

function updateExplorer(){

    refreshExplorer();

}

/* ===========================================
   BOTONES
=========================================== */

const newFileBtn=

document.getElementById("newFile");

const newFolderBtn=

document.getElementById("newFolder");

if(newFileBtn){

newFileBtn.onclick=()=>{

const name=

prompt("Nombre del archivo:");

if(name){

createFile(name);

}

};

}

if(newFolderBtn){

newFolderBtn.onclick=()=>{

const name=

prompt("Nombre de la carpeta:");

if(name){

createFolder(name);

}

};

}

/* ===========================================
   FINAL
=========================================== */

console.log(

"filesystem.js Parte 6A cargada."

);
/* ==========================================================
   ONYRA AI STUDIO
   filesystem.js
   PARTE 6B
   Importación, exportación y administración
========================================================== */

"use strict";

/* ===========================================
   CLIPBOARD
=========================================== */

FileSystem.clipboard = null;

/* ===========================================
   IMPORTAR
=========================================== */

function importFiles(fileList){

    const files = Array.from(fileList);

    files.forEach(file=>{

        const reader = new FileReader();

        reader.onload = function(event){

            FileSystem.files[file.name] = event.target.result;

            refreshExplorer();

            notify(file.name + " importado.");

        };

        if(file.type.startsWith("image/")){

            reader.readAsDataURL(file);

        }

        else if(file.type.startsWith("audio/")){

            reader.readAsDataURL(file);

        }

        else if(file.type.startsWith("video/")){

            reader.readAsDataURL(file);

        }

        else{

            reader.readAsText(file);

        }

    });

}

/* ===========================================
   EXPORTAR
=========================================== */

function exportFile(name){

    if(!FileSystem.files[name]) return;

    const blob = new Blob(

        [FileSystem.files[name]],

        {type:"text/plain"}

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = name;

    link.click();

    URL.revokeObjectURL(url);

}

/* ===========================================
   COPIAR
=========================================== */

function copyFile(name){

    if(!FileSystem.files[name]) return;

    FileSystem.clipboard = {

        name:name,

        content:FileSystem.files[name]

    };

    notify(name + " copiado.");

}

/* ===========================================
   PEGAR
=========================================== */

function pasteFile(){

    if(!FileSystem.clipboard) return;

    const newName =

    "Copia_" +

    FileSystem.clipboard.name;

    FileSystem.files[newName] =

    FileSystem.clipboard.content;

    refreshExplorer();

    notify(newName + " creado.");

}

/* ===========================================
   MOVER
=========================================== */

function moveFile(file,folder){

    if(!FileSystem.files[file]) return;

    if(!FileSystem.folders[folder]) return;

    FileSystem.folders[folder].push(file);

    notify(file + " movido.");

}

/* ===========================================
   RECURSOS
=========================================== */

function getImages(){

    return Object.keys(FileSystem.files)

    .filter(file=>

        file.endsWith(".png") ||

        file.endsWith(".jpg") ||

        file.endsWith(".jpeg") ||

        file.endsWith(".gif") ||

        file.endsWith(".webp")

    );

}

function getAudio(){

    return Object.keys(FileSystem.files)

    .filter(file=>

        file.endsWith(".mp3") ||

        file.endsWith(".wav") ||

        file.endsWith(".ogg")

    );

}

function getVideos(){

    return Object.keys(FileSystem.files)

    .filter(file=>

        file.endsWith(".mp4") ||

        file.endsWith(".webm") ||

        file.endsWith(".mov")

    );

}

/* ===========================================
   PREVISUALIZACIÓN
=========================================== */

function previewResource(name){

    if(!FileSystem.files[name]) return;

    const ext =

    name.split(".").pop().toLowerCase();

    if(["png","jpg","jpeg","gif","webp"]

    .includes(ext)){

        window.open(FileSystem.files[name]);

        return;

    }

    if(["mp3","wav","ogg"]

    .includes(ext)){

        const audio = new Audio(

            FileSystem.files[name]

        );

        audio.play();

        return;

    }

    if(["mp4","webm","mov"]

    .includes(ext)){

        window.open(FileSystem.files[name]);

        return;

    }

}

/* ===========================================
   BUSCADOR
=========================================== */

function searchFiles(text){

    return Object.keys(FileSystem.files)

    .filter(file=>

        file.toLowerCase()

        .includes(text.toLowerCase())

    );

}

/* ===========================================
   ESTADÍSTICAS
=========================================== */

function storageInfo(){

    return{

        files:Object.keys(FileSystem.files).length,

        folders:Object.keys(FileSystem.folders).length,

        images:getImages().length,

        audio:getAudio().length,

        videos:getVideos().length

    };

}

console.table(

    storageInfo()

);

console.log(

"filesystem.js Parte 6B cargada."

);
/* ==========================================================
   ONYRA AI STUDIO
   filesystem.js
   PARTE 6C
   Guardado de proyectos y copias de seguridad
========================================================== */

"use strict";

/* ===========================================
   PROYECTOS
=========================================== */

FileSystem.projects = {};

FileSystem.backups = [];

/* ===========================================
   GUARDAR PROYECTO
=========================================== */

function saveProject(name){

    if(!name){

        name = Onyra.projectName || "Proyecto";

    }

    FileSystem.projects[name] = {

        files: JSON.parse(JSON.stringify(FileSystem.files)),

        folders: JSON.parse(JSON.stringify(FileSystem.folders)),

        date: new Date().toLocaleString()

    };

    localStorage.setItem(

        "OnyraProjects",

        JSON.stringify(FileSystem.projects)

    );

    notify("Proyecto guardado.");

}

/* ===========================================
   CARGAR PROYECTO
=========================================== */

function loadProject(name){

    const data = localStorage.getItem("OnyraProjects");

    if(!data){

        notify("No hay proyectos.");

        return;

    }

    FileSystem.projects = JSON.parse(data);

    if(!FileSystem.projects[name]){

        notify("Proyecto no encontrado.");

        return;

    }

    FileSystem.files =

    JSON.parse(

        JSON.stringify(

            FileSystem.projects[name].files

        )

    );

    FileSystem.folders =

    JSON.parse(

        JSON.stringify(

            FileSystem.projects[name].folders

        )

    );

    project.files = FileSystem.files;

    refreshExplorer();

    notify("Proyecto cargado.");

}

/* ===========================================
   BACKUP
=========================================== */

function createBackup(){

    FileSystem.backups.push({

        date:new Date().toLocaleString(),

        files:JSON.parse(

            JSON.stringify(

                FileSystem.files

            )

        )

    });

    if(FileSystem.backups.length>20){

        FileSystem.backups.shift();

    }

    notify("Copia creada.");

}

/* ===========================================
   RESTAURAR
=========================================== */

function restoreBackup(index){

    if(

        !FileSystem.backups[index]

    ){

        notify("Backup inválido.");

        return;

    }

    FileSystem.files=

    JSON.parse(

        JSON.stringify(

            FileSystem.backups[index].files

        )

    );

    project.files=

    FileSystem.files;

    refreshExplorer();

    notify("Backup restaurado.");

}

/* ===========================================
   EXPORTAR PROYECTO
=========================================== */

function exportProject(){

    const blob=new Blob(

        [

            JSON.stringify({

                files:FileSystem.files,

                folders:FileSystem.folders

            },null,4)

        ],

        {

            type:"application/json"

        }

    );

    const url=

    URL.createObjectURL(blob);

    const a=

    document.createElement("a");

    a.href=url;

    a.download="OnyraProject.json";

    a.click();

    URL.revokeObjectURL(url);

}

/* ===========================================
   IMPORTAR PROYECTO
=========================================== */

function importProject(file){

    const reader=

    new FileReader();

    reader.onload=function(e){

        try{

            const data=

            JSON.parse(

                e.target.result

            );

            FileSystem.files=

            data.files;

            FileSystem.folders=

            data.folders;

            project.files=

            FileSystem.files;

            refreshExplorer();

            notify("Proyecto importado.");

        }

        catch{

            notify("Archivo inválido.");

        }

    };

    reader.readAsText(file);

}

/* ===========================================
   LISTAR
=========================================== */

function listProjects(){

    return Object.keys(

        FileSystem.projects

    );

}

/* ===========================================
   AUTO BACKUP
=========================================== */

setInterval(()=>{

    createBackup();

},300000);

/* ===========================================
   AUTO SAVE
=========================================== */

setInterval(()=>{

    saveProject(

        Onyra.projectName

    );

},120000);

/* ===========================================
   ESTADÍSTICAS
=========================================== */

function projectInfo(){

    return{

        projects:

        Object.keys(

            FileSystem.projects

        ).length,

        backups:

        FileSystem.backups.length,

        files:

        Object.keys(

            FileSystem.files

        ).length

    };

}

console.table(

    projectInfo()

);

console.log(

"filesystem.js Parte 6C cargada."

);
/* ==========================================================
   ONYRA AI STUDIO
   filesystem.js
   PARTE 6D (100%)
   Administrador de proyectos
========================================================== */

"use strict";

/* ===========================================
   FAVORITOS
=========================================== */

FileSystem.favorites = [];

function addFavorite(name){

    if(!FileSystem.files[name]) return;

    if(FileSystem.favorites.includes(name)) return;

    FileSystem.favorites.push(name);

    notify("Añadido a favoritos.");

}

function removeFavorite(name){

    FileSystem.favorites =

    FileSystem.favorites.filter(

        file => file !== name

    );

}

/* ===========================================
   PAPELERA
=========================================== */

function restoreTrash(index){

    const item = FileSystem.trash[index];

    if(!item) return;

    FileSystem.files[item.name] = item.content;

    FileSystem.trash.splice(index,1);

    refreshExplorer();

    notify("Archivo restaurado.");

}

function emptyTrash(){

    FileSystem.trash = [];

    notify("Papelera vaciada.");

}

/* ===========================================
   INFORMACIÓN
=========================================== */

function projectSize(){

    let total = 0;

    Object.values(FileSystem.files)

    .forEach(file=>{

        total += file.length;

    });

    return total;

}

function projectDetails(){

    return{

        files:Object.keys(FileSystem.files).length,

        folders:Object.keys(FileSystem.folders).length,

        favorites:FileSystem.favorites.length,

        trash:FileSystem.trash.length,

        size:projectSize()+" bytes"

    };

}

/* ===========================================
   BUSCADOR
=========================================== */

function quickSearch(text){

    return Object.keys(FileSystem.files)

    .filter(file=>

        file.toLowerCase()

        .includes(text.toLowerCase())

    );

}

/* ===========================================
   ORDENAR
=========================================== */

function sortFiles(){

    const ordered={};

    Object.keys(FileSystem.files)

    .sort()

    .forEach(file=>{

        ordered[file]=

        FileSystem.files[file];

    });

    FileSystem.files=ordered;

}

/* ===========================================
   LIMPIAR
=========================================== */

function cleanProject(){

    sortFiles();

    refreshExplorer();

    notify("Proyecto optimizado.");

}

/* ===========================================
   EXPORTAR DATOS
=========================================== */

function exportProjectInfo(){

    const data = JSON.stringify(

        projectDetails(),

        null,

        4

    );

    console.log(data);

    return data;

}

/* ===========================================
   COMPROBACIÓN
=========================================== */

function verifyProject(){

    let errors = [];

    if(!FileSystem.files["index.html"]){

        errors.push("Falta index.html");

    }

    if(!FileSystem.files["style.css"]){

        errors.push("Falta style.css");

    }

    if(!FileSystem.files["script.js"]){

        errors.push("Falta script.js");

    }

    if(errors.length===0){

        notify("Proyecto correcto.");

    }

    return errors;

}

/* ===========================================
   ACTUALIZACIÓN
=========================================== */

setInterval(()=>{

    console.table(

        projectDetails()

    );

},10000);

/* ===========================================
   INICIO
=========================================== */

console.log("================================");
console.log(" ONYRA FILE SYSTEM v1.0");
console.log("================================");
console.log("Administrador listo.");
console.log("Explorador listo.");
console.log("Sistema preparado.");
console.log("================================");
