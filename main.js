const todos = document.querySelector("#Todos");

function createNote(titleText, contentText) {
  const aNote = document.createElement("article");
  const title = document.createElement("h2");
  title.textContent = titleText;
  aNote.append(title);
  const content = document.createElement("p");
  content.textContent = contentText;
  aNote.append(content);
  todos.append(aNote);
}

createNote("Hello World", "this is my first post");
createNote("Yawn", "this is my second post");
