class StickyNotes {
  constructor() {
    this.stickyNotes = [];
  }

  getNotesLocalStorage() {
    localStorage.getItem("notes")
      ? (this.stickyNotes = JSON.parse(localStorage.getItem("notes")))
      : (this.stickyNotes = [
          {
            ID: new Date().getTime(),
            title: "hello world",
            content: "your content goes here"
          }
        ]);
  }

  renderNotes() {
    this.stickyNotes.map(function(note) {
      const newNote = new Note(note.title, note.content, note.noteID);
      newNote.renderNote();
    });
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
}

class Note {
  constructor(titleContent, textContent, ID) {
    this.titleContent = titleContent;
    this.textContent = textContent;
    this.ID = ID;
    this.article = document.createElement("article");
    this.title = document.createElement("textarea");
    this.content = document.createElement("textarea");
    this.editButton = document.createElement("button");
    this.notes = document.querySelector("#Notes");
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
    this.article.append(this.editButton);
    this.notes.append(this.article);
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
