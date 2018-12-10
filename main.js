class StickyNotes {
  constructor() {
    this.stickyNotes = [];
    this.updateNote = this.updateNote.bind(this);
  }

  getNotesLocalStorage() {
    localStorage.getItem("notes")
      ? (this.stickyNotes = JSON.parse(localStorage.getItem("notes")))
      : "";
  }

  renderNotes() {
    // ADDING THIS INSIDE MAP FUNCTION!!!
    this.stickyNotes.map(function(note) {
      const newNote = new Note(
        note.title,
        note.content,
        note.noteID,
        this.updateNote
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
    console.log(this.stickyNotes);
    this.stickyNotes.find(function(note) {
      return note.noteID === noteID;
    });
  }
}

class Note {
  constructor(titleContent, textContent, ID, updateNote) {
    this.titleContent = titleContent;
    this.textContent = textContent;
    this.ID = ID;
    this.article = document.createElement("article");
    this.title = document.createElement("textarea");
    this.content = document.createElement("textarea");
    this.editButton = document.createElement("button");
    this.notes = document.querySelector("#Notes");
    this.updateNote = updateNote;
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

// const notes = document.querySelector("#Notes");

// const notesArray = localStorage.getItem("notes")
//   ? JSON.parse(localStorage.getItem("notes"))
//   : [
//       {
//         noteID: new Date().getTime(),
//         title: "hello world",
//         content: "your content goes here"
//       }
//     ];

// function createNote(titleText, contentText, timeNow = new Date().getTime()) {
//   const aNote = document.createElement("article");
//   aNote.id = `id${timeNow}`;
//   const title = document.createElement("textarea");
//   title.textContent = titleText;
//   title.readOnly = true;
//   aNote.append(title);
//   const content = document.createElement("textarea");
//   content.textContent = contentText;
//   content.readOnly = true;
//   aNote.append(content);
//   const editButton = document.createElement("button");
//   editButton.textContent = "edit";
//   editButton.addEventListener("click", function(e) {
//     e.preventDefault();
//     editNote(
//       `id${timeNow}`,
//       title,
//       content,
//       titleText,
//       contentText,
//       editButton
//     );
//   });
//   aNote.append(editButton);
//   notes.append(aNote);
// }

// function addNote(titleText, contentText) {
//   const timeNow = new Date().getTime();
//   if (titleText !== "" && contentText !== "") {
//     createNote(titleText, contentText, timeNow);
//     notesArray.push({
//       noteID: `id${timeNow}`,
//       title: titleText,
//       content: contentText
//     });
//     localStorage.setItem("notes", JSON.stringify(notesArray));
//   }
// }

// function editNote(
//   articleKey,
//   title,
//   content,
//   titleText,
//   contentText,
//   editButton
// ) {
//   content.readOnly = false;
//   title.readOnly = false;
//   editButton.textContent = "save";
//   // remove event listener on editButton
//   editButton.addEventListener("click", function(e) {
//     e.preventDefault();
//     saveNote(articleKey, title, content, titleText, contentText, editButton);
//   });
// }

// function saveNote(
//   articleKey,
//   title,
//   content,
//   titleText,
//   contentText,
//   editButton
// ) {
//   content.value !== contentText ? console.log("content changed") : "";
//   title.value !== titleText ? console.log("title changed") : "";
// }

// function onPageLoad() {
//   notesArray.map(function(note) {
//     createNote(note.title, note.content, note.noteID);
//   });
// }

// onPageLoad();

// const addNewNoteForm = document.querySelector("#addNewNoteForm");
// addNewNoteForm.addEventListener("submit", function(e) {
//   e.preventDefault();
// const newNoteTitle = document.querySelector("#newNoteTitle");
// const newNoteContent = document.querySelector("#newNoteContent");
//   addNote(newNoteTitle.value, newNoteContent.value);
// });
