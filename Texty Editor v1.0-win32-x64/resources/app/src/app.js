const ipc = require('electron').ipcRenderer;

const scriptInput = document.getElementById("script");
const rowsIndentifier = document.getElementById("rows-indentifier");

const saveButton = document.getElementById("save-btn");

const openFile = document.getElementById("fileOpen");

const fileInput = document.getElementById("fileInput");

const newFileButton = document.getElementById("newFile");

let n = 1;

let k = 0;

let text;

function addNewRow() {
    const newRow = document.createElement("p");

    newRow.innerText = n;
    rowsIndentifier.appendChild(newRow);

    n++;
    scriptInput.rows = n - 1;
}

function removeLastRow() {
    rowsIndentifier.removeChild(rowsIndentifier.lastChild);
    n--;
    scriptInput.rows = n - 1;
    //if (rowsIndentifier.children.length > 1) {
    //
    //}
}

function saveFile() {
    const blob = new Blob([scriptInput.value], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "textFile.txt";
    a.click();
}


document.addEventListener("keydown", e => {
    if (!e.ctrlKey) {
        if (e.key == "Enter") {
            addNewRow();
            k++;
        } 
        else if (e.key == "Backspace" && text[k][0] === undefined && k > 0) {
            removeLastRow();
            k--;
        }
    } else if (e.ctrlKey && e.key == "s") {
        console.log("CTRL + S");
        saveFile();
    } else if (e.ctrlKey && e.key == "o") {
        console.log("CTRL + O");
        fileInput.click();
    } else if (e.ctrlKey && e.key == "n") {
        console.log("CTRL + N");
        ipc.send("create-new-win");
    }
    
}); 

scriptInput.addEventListener("input", () => {
    text = scriptInput.value.split("\n");

    console.log(`Value at line: ${n} is ${text[n]}`);
})

saveButton.addEventListener("click", () => {
    saveFile();
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

            text = fileContent.split("\n");

            for (k = 1; k < text.length; k++) addNewRow();
        };

        reader.readAsText(file);
    }
})

newFileButton.addEventListener("click", () => {
    ipc.send("create-new-win");
})

addNewRow();