const scriptInput = document.getElementById("script");
const rowsIndentifier = document.getElementById("rows-indentifier");

let n = 1;

let text = [];

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

addNewRow();


document.addEventListener("keydown", e => {
    if (e.key == "Enter") addNewRow();
    else if (e.key == "Backspace" && e.data == null) removeLastRow();
    console.log(scriptInput.rows);
});


/*
scriptInput.addEventListener("input", e => {
    if (e.key == "Enter") addNewRow();
    else if (e.key == "Backspace" && e.data == null) removeLastRow();
})
*/


/*
console.log(scriptInput.cols);
console.log(scriptInput.rows);
*/
