class StickyNotes {
  constructor() {
    this.stickyNotes = [];
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.notes = document.querySelector("#Notes");
  }

  getNotesLocalStorage() {
    localStorage.getItem("notes")
      ? (this.stickyNotes = JSON.parse(localStorage.getItem("notes")))
      : "";
  }

  renderNotes() {
    // REMOVE CHILD NODES
    this.notes.innerHTML = "";
    // ADDING THIS INSIDE MAP FUNCTION!!!
    this.stickyNotes.map(function(note) {
      const newNote = new Note(
        note.title,
        note.content,
        note.noteID,
        this.updateNote,
        this.deleteNote
      );
      newNote.renderNote();
    }, this);
  }
  addNewNote(e) {
    e.preventDefault();
    const newNoteTitle = document.querySelector("#newNoteTitle");
    const newNoteContent = document.querySelector("#newNoteContent");
    this.stickyNotes.push({
      noteID: new Date().getTime(),
      title: newNoteTitle.value,
      content: newNoteContent.value
    });
    this.renderNotes();
  }

  updateNote(title, content, noteID) {
    const noteToUpdate = this.stickyNotes.find(function(note) {
      return note.noteID === noteID;
    });
    noteToUpdate.title = title;
    noteToUpdate.content = content;
    console.log(noteToUpdate);
  }
  deleteNote(noteID) {
    const indexOfNoteToDelete = this.stickyNotes.findIndex(function(note) {
      return note.noteID === noteID;
    });
    this.stickyNotes.splice(indexOfNoteToDelete, 1);
    this.renderNotes();
  }
}

class Note {
  constructor(titleContent, textContent, ID, updateNote, deleteNote) {
    this.titleContent = titleContent;
    this.textContent = textContent;
    this.ID = ID;
    this.article = document.createElement("article");
    this.title = document.createElement("textarea");
    this.content = document.createElement("textarea");
    this.editButton = document.createElement("button");
    this.deleteButton = document.createElement("button");
    this.notes = document.querySelector("#Notes");
    this.updateNote = updateNote;
    this.deleteNote = deleteNote;
  }
  renderNote() {
    this.article.ID = this.ID;
    this.title.textContent = this.titleContent;
    this.title.readOnly = true;
    this.article.append(this.title);
    this.content.textContent = this.textContent;
    this.content.readOnly = true;
    this.article.append(this.content);
    this.editButton.textContent = "edit";
    this.editNoteMode = this.editNoteMode.bind(this);
    this.editButton.addEventListener("click", this.editNoteMode);
    this.article.append(this.editButton);
    this.deleteButton.textContent = "delete";
    this.removeNote = this.removeNote.bind(this);
    this.deleteButton.addEventListener("click", this.removeNote);
    this.article.append(this.deleteButton);
    this.notes.append(this.article);
  }
  editNoteMode() {
    this.editButton.textContent = "save";
    this.editButton.removeEventListener("click", this.editNoteMode);
    this.saveNote = this.saveNote.bind(this);
    this.editButton.addEventListener("click", this.saveNote);
    this.title.readOnly = false;
    this.content.readOnly = false;
  }
  saveNote() {
    if (this.title.value !== "" && this.content.value !== "") {
      this.updateNote(this.title.value, this.content.value, this.ID);
      this.editButton.textContent = "edit";
      this.editButton.removeEventListener("click", this.saveNote);
      this.editButton.addEventListener("click", this.editNoteMode);
      this.title.readOnly = true;
      this.content.readOnly = true;
    }
  }
  removeNote() {
    this.deleteNote(this.ID);
  }
}

const stickynotes = new StickyNotes();

(function setup() {
  stickynotes.getNotesLocalStorage();
  stickynotes.renderNotes();
})();

const addNewNoteForm = document.querySelector("#addNewNoteForm");
addNewNoteForm.addEventListener("submit", function(e) {
  stickynotes.addNewNote(e);
});

// add validation???
