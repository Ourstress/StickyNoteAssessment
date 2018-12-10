const notes = document.querySelector("#Notes");

const notesArray = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : [
      {
        noteID: new Date().getTime(),
        title: "hello world",
        content: "your content goes here"
      }
    ];

function createNote(titleText, contentText, timeNow = new Date().getTime()) {
  const aNote = document.createElement("article");
  aNote.id = `id${timeNow}`;
  const title = document.createElement("h2");
  title.textContent = titleText;
  aNote.append(title);
  const content = document.createElement("textarea");
  content.textContent = contentText;
  content.readOnly = true;
  aNote.append(content);
  const editButton = document.createElement("button");
  editButton.textContent = "edit";
  editButton.addEventListener("click", function(e) {
    e.preventDefault();
    editNote(`id${timeNow}`, content);
  });
  aNote.append(editButton);
  notes.append(aNote);
}

function addNote(titleText, contentText) {
  const timeNow = new Date().getTime();
  if (titleText !== "" && contentText !== "") {
    createNote(titleText, contentText, timeNow);
    notesArray.push({
      noteID: `id${timeNow}`,
      title: titleText,
      content: contentText
    });
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }
}

function editNote(articleKey, content) {
  const article = document.querySelector(`#${articleKey}`);
  content.readOnly = false;
}

function onPageLoad() {
  notesArray.map(function(note) {
    createNote(note.title, note.content, note.noteID);
  });
}

onPageLoad();

const addNewNoteForm = document.querySelector("#addNewNoteForm");
const newNoteTitle = document.querySelector("#newNoteTitle");
const newNoteContent = document.querySelector("#newNoteContent");
addNewNoteForm.addEventListener("submit", function(e) {
  e.preventDefault();
  addNote(newNoteTitle.value, newNoteContent.value);
});
