const scriptInput = document.getElementById("script");
const rowsIndentifier = document.getElementById("rows-indentifier");

const saveButton = document.getElementById("save-btn");

const openFile = document.getElementById("fileOpen");

const fileInput = document.getElementById("fileInput");

let n = 1;

let text;

function addNewRow() {
    const newRow = document.createElement("p");

    newRow.innerText = n;
    rowsIndentifier.appendChild(newRow);

    n++;
    scriptInput.rows = n - 1;
}

function removeLastRow() {
    if (rowsIndentifier.children.length > 1) {
        rowsIndentifier.removeChild(rowsIndentifier.lastChild);
        n--;
        scriptInput.rows = n - 1;
    }
}

scriptInput.addEventListener("change", () => {
    text = scriptInput.value.split("\n");
})


document.addEventListener("keydown", e => {
    if (e.key == "Enter") addNewRow();
    else if (e.key == "Backspace" && e.data == null) removeLastRow();
    console.log(scriptInput.rows);
}); 

saveButton.addEventListener("click", () => {
    const blob = new Blob([scriptInput.value], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "textFile.txt";
    a.click();
})

openFile.addEventListener("click", () => {
    fileInput.click();
})

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
            
        reader.onload = function(e) {
            const fileContent = e.target.result;
            scriptInput.value = fileContent;

            const lines = fileContent.split("\n");

            for (let i = 1; i < lines.length; i++) addNewRow();
        };

        reader.readAsText(file);
    }
})

addNewRow();