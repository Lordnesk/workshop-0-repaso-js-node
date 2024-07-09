class Notes{ // Esta clase sirve para crear las notas
    constructor(id, description, important = false) { // El constructor crea las variables y les da un valor false por defecto que mas adelate sera cambiado
        this.id = id; // Al momento de ingresar información el id tomara un numero y se volvera true
        this.description = description; // aca igual
        this.important = important; // Este cambiara su estado a true cuando se presione el boton de imporante
    }

    toggleImportant(){ // Esta funcion sirve para cambiar el estado de false en important
        this.important = !this.important;
        
    }
}

class NotesManager { // Esta clase sirve para controlar el ingreso, edicion, eliminación y marcado de importante a las notas
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || []; // Esta linea busca dentro del localstore la nota y la carga en la pagina, de lo contrario regresa un objeto vacio
        this.loadNotes();
    }

    addNote(description) { // esta funcion sirve para agregar las notas
        const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1; // esta linea de codigo revisa si notes tiene un contenido, de ser así le agregara un +1 al id, si no lo dejara como está
        const note = new Notes(id,description); // Esta lina hace que se cree una nueva nota con el contenido de la descripcion y un nuevo id
        this.notes.push(note); // en esta linea se agrega la información a la instancia de notas
        this.saveNotes(); // en esta linea se guarda las notas
        this.renderNotes(); // en esta linea se carga la nota en la pagina
    }

    editNote(id) { // Esta funcion sirve para editar las notas
        const note = this.notes.find(note => note.id === id);  // esta linea de codigo, lo que hara es buscar en la estancia de notes una nota que tenga el mismo id que el id elegido
        const description = prompt ('Ingresa una nueva nota', note.description) // aca preguntaremos por ingersar la nota que editara la que habia anteriormente
        try { // este try procuara cumplir con la orden
            if (description) {
                note.description = description;
                this.saveNotes();
                this.renderNotes();
            }
        } catch (error) { // este catch nos mostrara si hubo algun error
            console.error('Se produjo un error', error)
        }
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    toggleNoteImportant(id) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            note.toggleImportant();
            this.saveNotes();
            this.renderNotes();
        }
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        this.renderNotes();
    }
    
    renderNotes() {
        const noteList = document.getElementById('note-list');
        noteList.innerHTML = '';
        this.notes.forEach(note => {
            const item = document.createElement('li');
            item.textContent = note.description;
            item.className = note.important ? 'important' : '';

            const importantButton = document.createElement('button');
            importantButton.textContent = 'Importante';
            importantButton.addEventListener('click', (e) =>{
                e.stopPropagation();
                if (note.id == true) {
                    this.description.value.style.className("important")
                }
                this.toggleNoteImportant(note.id);
                
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editNote(note.id);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteNote(note.id);
            });

            item.appendChild(importantButton);
            item.appendChild(editButton);
            item.appendChild(deleteButton);
            noteList.appendChild(item);
        });
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const noteManager = new NotesManager();

    document.getElementById('add-note').addEventListener('click', () =>{
        const newNote = document.getElementById('new-note').value;
        if (newNote) {
            noteManager.addNote(newNote);
            document.getElementById('new-note').value = '';
        }
    })
});