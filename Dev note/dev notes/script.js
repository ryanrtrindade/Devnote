// Elementos
const notesContainer = document.querySelector("#notes-container");

const noteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");

const searchInput = document.querySelector("#search-input");

const exportBtn = document.querySelector("#export-notes");


// Funções


//Local Storage Parte 3 

function showNotes(){

    cleanNotes();

    getNotes().forEach((note) => {  // receber uma lista com cada uma das notas
        const noteElement = createNote(note.id, note.content, note.fixed);

        notesContainer.appendChild(noteElement);
    });
}

//parte 5

function cleanNotes(){
    notesContainer.replaceChildren([]) // fazer com que notas seja excluidas da exbição
}
// 1- Parte
function addNote(){

    //Local Storage Parte 3 
    const notes = getNotes();

    // 1- Parte
    const noteObject = {
        id:generatedId(),
        content:noteInput.value,
        fixed:false
    }

    // 2- Parte

    // Criar elemento da nota
    const noteElement = createNote(noteObject.id, noteObject.content)
    
    // 2- Parte
    notesContainer.appendChild(noteElement) // Adiciona as notas ao HTML

    //Local Storage Parte 3 

    notes.push(noteObject) // vai preencher o notes com noteObject

    //Local Storage Parte 3 
    saveNotes(notes) // salvar notas
    

    noteInput.value = ""  // limpar o campo do input pro usuário ter em mão caso add 2 notas
}

function generatedId(){
    return Math.floor(Math.random() * 5000)
}
// 2- Parte
function createNote(id, content, fixed){

    const element = document.createElement("div")

    element.classList.add("note")

    const textarea = document.createElement("textarea")

    textarea.value = content

    textarea.placeholder = "Adicione algum texto..."

    element.appendChild(textarea)

    // PT4
    const pinIcon = document.createElement("i")

    pinIcon.classList.add(...["bi", "bi-pin"])

    element.appendChild(pinIcon)

    // PT5 Duplicar e Excluir

    const deleteIcon = document.createElement("i")

    deleteIcon.classList.add(...["bi", "bi-x-lg"])

    element.appendChild(deleteIcon)


    const duplicateIcon = document.createElement("i")

    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"])

    element.appendChild(duplicateIcon)

    if(fixed){
        element.classList.add("fixed")
    }

   


    // PT6 EDITAR NOTA

    element.querySelector("textarea").addEventListener("keyup", (e)=>{

        const noteContent = e.target.value

        updateNote(id, noteContent)
    })
    //Eventos do elemento PT4
    element.querySelector(".bi-pin").addEventListener("click", ()=>{
        toggleFixNote(id)
    })

    // PT5 DELETAR
    element.querySelector(".bi-x-lg").addEventListener("click", () =>{
        deleteNote(id, element)
    })

    //PT5 COPIAR

    element.querySelector(".bi-file-earmark-plus").addEventListener("click", () =>{
        copyNote(id)
    })

    return element

 
    
}

//PT4 

function toggleFixNote(id){
    const notes = getNotes()

    const targetNote = notes.filter((note) => note.id === id)[0]

    targetNote.fixed = !targetNote.fixed

    saveNotes(notes)

    showNotes()
}
//PT5 DELETAR
function deleteNote(id, element){

    const notes = getNotes().filter((note) => note.id !== id)

    saveNotes(notes)

    notesContainer.removeChild(element)
}
//PT5 COPIAR

function copyNote(id){

    const notes = getNotes()
    const targetNote = notes.filter((note)=> note.id === id)[0]

    const noteObject = {
        id: generatedId,
        content: targetNote.content,
        fixed:false
    }

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed)

    notesContainer.appendChild(noteElement)
    
    //PT5 adicionar ao local storage
    notes.push(noteObject)

    saveNotes(notes)
}
//PT6 

function updateNote(id, newContent){

    const notes = getNotes()

    const targetNote = notes.filter((note)=> note.id === id)[0]

    targetNote.content = newContent

    saveNotes(notes)

}
//Local Storage Parte 3 
function getNotes(){
    const notes = JSON.parse(localStorage.getItem("notes") || "[]") //ou pega as notas, ou array vazio
    //converte string json em objeto javascript


    const orderedNotes = notes.sort((a,b) =>(
        a.fixed > b.fixed ? -1:1
    ))
    return orderedNotes;
}


function saveNotes(notes){
    localStorage.setItem("notes", JSON.stringify(notes)) //  é uma função do JavaScript que converte um objeto JavaScript em uma string no formato JSON
}


function searchNotes(search){
    
    const searchResults = getNotes().filter((note) =>
        note.content.includes(search)
    )

    if(search !==""){
        
        cleanNotes()

        searchResults.forEach((note) =>{
            const noteElement = createNote(note.id, note.content)
            notesContainer.appendChild(noteElement)

        })

        return;
    }

    cleanNotes()

    showNotes()
}

function exportData(){
    const notes = getNotes()

    //separa dado por virgula , quebra linha /n

    const csvString = [
        ["ID", "Conteúdo", "Fixado"],
        ... notes.map((note) => [note.id, note.content, note.fixed])
    ].map((e)=> e.join(",")).join("\n")

    const element = document.createElement("a")

    element.href = "data:text/css;charset=utf-8," + encodeURI(csvString)


    element.target = "_blank"

    element.download = "notes.csv"

    element.click()


}
// Eventos

// 1- Parte
addNoteBtn.addEventListener("click", ()=> addNote())


//PT7 PESQUISAR

searchInput.addEventListener("keyup", (e) =>{

    const search = e.target.value

    searchNotes(search)
})

noteInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        addNote
    }
})

exportBtn.addEventListener("click", () =>{
    exportData()
})

// Inicialização

showNotes();