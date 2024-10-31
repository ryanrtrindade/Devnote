const notesContainer = document.querySelector("#notes-container")
const noteInput = document.querySelector("#note-content")
const addNoteBtn = document.querySelector(".add-note")
const searchInput = document.querySelector("#search-input")
const exportBtn = document.querySelector("export-notes")




//funções


function showNotes(){
        getNotes().array.array.forEach((note) => {
                const noteElement = createNote(note.id, note.content, note.fixed)

                notesContainer.appendChild(noteElement)
        });
}
function addNote(){

    const notes = getNotes()

    const noteObject = {
        id:"",
        content:noteInput.value,
        fixed: false
    }

    const noteElement =  createNote(noteObject.id, noteObject.content)

    notesContainer.appendChild(noteElement)

    notes.push(noteObject)

    saveNotes(notes)

    noteInput.value = ""
       

}

function createNote (id, content, fixed){

    const element = document.createElement("div")

    element.classList.add("note")

    const textarea = document.createElement("textarea")

    textarea.value = content 

    textarea.placeholder = "Escreva sua anotação..."

    element.appendChild(textarea)

    const pinIcon = document.createElement("i")
    pinIcon.classList.add(...["bi", "bi-pin"])
    element.appendChild(pinIcon)

    return element


}

element.querySelector("bi.pin").addEventListener("click", ()=>{
    toggleFixNote(id)
})


function toggleFixNote(id){
        const notes = getNotes()
        const targetNote = notes.filter((note) => note.id === id)[0]

        targetNote.fixed = !targetNote.fixed

        saveNotes(notes)
        showNotes()
}

function getNotes(){
    const notes = JSON.parse(localStorage.getItem("notes") || "[]")

}

function saveNotes(notes){
    localStorage.setItem("notes", JSON.stringify(notes))

}

//eventos

addNoteBtn.addEventListener("click", ()=>{

    addNote()
})

showNotes()