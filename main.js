"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var StickyNotes = (function() {
  function StickyNotes() {
    _classCallCheck(this, StickyNotes);

    this.stickyNotes = [];
    this.filteredStickies = [];
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.renderFilteredNotes = this.renderFilteredNotes.bind(this);
    this.searchBarEventListener = this.searchBarEventListener.bind(this);
    this.notes = document.querySelector("#Notes");
    this.searchBar = document.querySelector("#searchBar");
  }

  _createClass(StickyNotes, [
    {
      key: "getNotesLocalStorage",
      value: function getNotesLocalStorage() {
        localStorage.getItem("notes")
          ? (this.stickyNotes = JSON.parse(localStorage.getItem("notes")))
          : "";
      }
    },
    {
      key: "searchBarEventListener",
      value: function searchBarEventListener() {
        var searchBarValue = this.searchBar.value.toLowerCase();
        this.filteredStickies = this.stickyNotes.filter(function(note) {
          return note.title.toLowerCase().includes(searchBarValue);
        });
        this.renderFilteredNotes();
      }
    },
    {
      key: "renderNotes",
      value: function renderNotes() {
        this.notes.innerHTML = "";
        this.stickyNotes.map(function(note) {
          var newNote = new Note(
            note.title,
            note.content,
            note.noteID,
            this.updateNote,
            this.deleteNote
          );
          newNote.renderNote();
        }, this);
        localStorage.setItem("notes", JSON.stringify(this.stickyNotes));
      }
    },
    {
      key: "renderFilteredNotes",
      value: function renderFilteredNotes() {
        this.notes.innerHTML = "";
        this.filteredStickies.map(function(note) {
          var newNote = new Note(
            note.title,
            note.content,
            note.noteID,
            this.updateNote,
            this.deleteNote
          );
          newNote.renderNote();
        }, this);
      }
    },
    {
      key: "setup",
      value: function setup() {
        this.getNotesLocalStorage();
        this.renderNotes();
        this.searchBar.addEventListener("input", this.searchBarEventListener);
      }
    },
    {
      key: "addNewNote",
      value: function addNewNote(e) {
        e.preventDefault();
        var newNoteTitle = document.querySelector("#newNoteTitle");
        var newNoteContent = document.querySelector("#newNoteContent");
        if (newNoteTitle.value !== "") {
          this.stickyNotes.push({
            noteID: new Date().getTime(),
            title: newNoteTitle.value,
            content: newNoteContent.value
          });
          newNoteTitle.value = "";
          newNoteContent.value = "";
          localStorage.setItem("notes", JSON.stringify(this.stickyNotes));
          this.renderNotes();
        }
      }
    },
    {
      key: "updateNote",
      value: function updateNote(title, content, noteID) {
        var noteToUpdate = this.stickyNotes.find(function(note) {
          return note.noteID === noteID;
        });
        noteToUpdate.title = title;
        noteToUpdate.content = content;
        this.renderNotes();
      }
    },
    {
      key: "deleteNote",
      value: function deleteNote(noteID) {
        var indexOfNoteToDelete = this.stickyNotes.findIndex(function(note) {
          return note.noteID === noteID;
        });
        this.stickyNotes.splice(indexOfNoteToDelete, 1);
        this.renderNotes();
      }
    }
  ]);

  return StickyNotes;
})();

var Note = (function() {
  function Note(titleContent, textContent, ID, updateNote, deleteNote) {
    _classCallCheck(this, Note);

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

  _createClass(Note, [
    {
      key: "renderNote",
      value: function renderNote() {
        this.article.ID = this.ID;
        this.title.textContent = this.titleContent;
        this.title.classList.add("title");
        this.title.readOnly = true;
        this.article.append(this.title);
        this.content.textContent = this.textContent;
        this.content.classList.add("content");
        this.content.readOnly = true;
        this.article.append(this.content);
        this.editNoteMode = this.editNoteMode.bind(this);
        this.editButton.addEventListener("click", this.editNoteMode);
        this.editButton.classList.add("editButton");
        this.article.append(this.editButton);
        this.deleteButton.classList.add("deleteButton");
        this.removeNote = this.removeNote.bind(this);
        this.deleteButton.addEventListener("click", this.removeNote);
        this.article.append(this.deleteButton);
        this.notes.append(this.article);
        this.content.style.height = this.content.scrollHeight + "px";
      }
    },
    {
      key: "editNoteMode",
      value: function editNoteMode() {
        this.editButton.classList.remove("editButton");
        this.editButton.classList.add("saveButton");
        this.editButton.removeEventListener("click", this.editNoteMode);
        this.saveNote = this.saveNote.bind(this);
        this.editButton.addEventListener("click", this.saveNote);
        this.title.readOnly = false;
        this.content.readOnly = false;
      }
    },
    {
      key: "saveNote",
      value: function saveNote() {
        if (this.title.value !== "" && this.content.value !== "") {
          this.updateNote(this.title.value, this.content.value, this.ID);
          this.editButton.classList.add("editButton");
          this.editButton.classList.remove("saveButton");
          this.editButton.removeEventListener("click", this.saveNote);
          this.editButton.addEventListener("click", this.editNoteMode);
          this.title.readOnly = true;
          this.content.readOnly = true;
        }
      }
    },
    {
      key: "removeNote",
      value: function removeNote() {
        this.deleteNote(this.ID);
      }
    }
  ]);

  return Note;
})();

var stickynotes = new StickyNotes();
stickynotes.setup();

var addNewNoteForm = document.querySelector("#addNewNoteForm");
addNewNoteForm.addEventListener("submit", function(e) {
  stickynotes.addNewNote(e);
});
