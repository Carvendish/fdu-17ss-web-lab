let firstDiv = document.getElementsByTagName("div")[0];
let secondDiv = document.getElementsByTagName("div")[1];

let firstSelect = document.getElementsByTagName("select")[0];
let secondSelect = document.getElementsByTagName("select")[1];

let selectOne = document.getElementById("selectOne");
let createTable = document.getElementById("createTable");
let addRow = document.getElementById("addRow");
let deleteRow = document.getElementById("deleteRow");
let deleteTable = document.getElementById("deleteTable");

let attrBox = document.createElement("div");
let newTables = new Array(0);


function firstChange(){
    if(firstSelect.options[firstSelect.selectedIndex].value === "selectOne"){
        resetFirstDiv();
    }
    if(firstSelect.options[firstSelect.selectedIndex].value === "createTable"){
        resetFirstDiv();
        CreateTable();
    }
    if(firstSelect.options[firstSelect.selectedIndex].value === "addRow"){
        resetFirstDiv();
        AddRow();
    }
    if(firstSelect.options[firstSelect.selectedIndex].value === "deleteRow"){
        resetFirstDiv();
        DeleteRow();
    }
    if(firstSelect.options[firstSelect.selectedIndex].value === "deleteTable"){
        resetFirstDiv();
        DeleteTable();
    }
}

function secondChange(){
//    取到当前option的值可以对应newTables里面的对象，然后把里面的对象取出来
    alert(secondSelect.selectedIndex);
     resetSecondDiv();
     secondDiv.appendChild(newTables[secondSelect.selectedIndex]);
}

function resetFirstDiv(){
    while(firstDiv.hasChildNodes()){
        firstDiv.removeChild(firstDiv.firstChild);
    }
}

function resetSecondDiv(){
    while(secondDiv.hasChildNodes()){
        secondDiv.removeChild(secondDiv.firstChild);
    }
}

function CreateTable(){
    let tableName = document.createElement("input");
    let columnsNumber = document.createElement("input");

    tableName.type = "text";
    columnsNumber.type = "number";
    tableName.id = "tableName";
    columnsNumber.id = "columnsNumber";
    tableName.placeholder = "Table Name";
    columnsNumber.placeholder = "Columns Number";
    firstDiv.appendChild(tableName);
    firstDiv.appendChild(columnsNumber);

    let commit = document.createElement("button");
    let ndCommit = document.createTextNode("commit");

    $(function(){
        $('#columnsNumber').bind('input propertychange',function (){
            while(attrBox.hasChildNodes()){
                attrBox.removeChild(attrBox.firstChild);
            }

            let number = $('#columnsNumber').val();
            if(number > 0){
                let attr = new Array(number);
                for(let i = 0;i < number;i ++){
                    attr[i] = document.createElement("input");
                    attr[i].type = "text";
                    attr[i].id = "attr" + i;
                    attr[i].placeholder = "Attribute";
                    attrBox.appendChild(attr[i]);
                }
                commit.appendChild(ndCommit);
                commit.onclick = function(){
                    let newName = document.createElement("option");
                    let ndNewName = document.createTextNode(tableName.value);
                    newName.appendChild(ndNewName);
                    newName.selected = true;
                    secondSelect.options.add(newName);

                    let table = document.createElement("table");
                    let thead = document.createElement("thead");
                    let tr = document.createElement("tr");
                    let th = new Array(number);
                    let ndTh = new Array(number);
                    let attribute = new Array(number);
                    for(let j = 0;j < number;j ++){
                        th[j] = document.createElement("th");
                        ndTh[j] = document.createTextNode(attr[j].value);
                        th[j].appendChild(ndTh[j]);
                        tr.appendChild(th[j]);
                        attribute[j] = ndTh[j].wholeText;
                    }
                    resetSecondDiv();
                    thead.appendChild(tr);
                    table.appendChild(thead);
                    secondDiv.appendChild(table);

                    newTables.push(table);
                };
                firstDiv.appendChild(attrBox);
                firstDiv.appendChild(commit);
            }
        });
    })
}

function AddRow(){
    let inputNum = newTables[secondSelect.selectedIndex].rows[0].cells.length;
    let attributes = new Array(inputNum);
    for(let i = 0;i < inputNum;i ++){
        attributes[i] = document.createElement("input");
        attributes[i].type = "text";
        attributes[i].placeholder = "Attr" + (i + 1);
        firstDiv.appendChild(attributes[i]);
    }

    let commit = document.createElement("button");
    let ndCommit = document.createTextNode("commit");
    commit.style.display = "block";
    commit.style.margin = "auto";
    commit.appendChild(ndCommit);
    firstDiv.appendChild(commit);

    commit.onclick = function (){
        let thisTable = newTables[secondSelect.selectedIndex];
        let addRow = thisTable.insertRow(thisTable.rows.length);
        let addTd = new Array(inputNum);
        for(let j = 0;j < inputNum;j ++){
            addTd[j] = addRow.insertCell(j);
            addTd[j].innerHTML = attributes[j].value;
        }
    }
}

function DeleteRow(){
    let inputNum = newTables[secondSelect.selectedIndex].rows[0].cells.length;
    let attributes = new Array(inputNum);
    let rowNum = newTables[secondSelect.selectedIndex].rows.length;
    let correctNums = new Array(0);
    for(let i = 0;i < inputNum;i ++){
        attributes[i] = document.createElement("input");
        attributes[i].type = "text";
        attributes[i].placeholder = "Attr" + (i + 1);
        firstDiv.appendChild(attributes[i]);
    }

    let commit = document.createElement("button");
    let ndCommit = document.createTextNode("commit");
    commit.style.display = "block";
    commit.style.margin = "auto";
    commit.appendChild(ndCommit);
    firstDiv.appendChild(commit);

    commit.onclick = function (){
        let correctNum = 0;
        let thisTable = newTables[secondSelect.selectedIndex];
        for(let j = 0;j < rowNum;j ++){
            for(let k = 0;k < inputNum;k ++){
                alert(attributes[k].value === "");
                if(attributes[k].value === ""){
                    continue;
                }
                if(thisTable.rows[j].cells[k].innerHTML === attributes[k].value){
                    correctNum ++;
                }
                if(thisTable.rows[j].cells[k].innerHTML !== attributes[k].value){
                    correctNum = 0;
                }
            }
            correctNums.push(correctNum);
        }
        let largeRow = correctNums.indexOf(Math.max.apply(Math , correctNums));
        alert(largeRow);
        thisTable.deleteRow(largeRow);
    }
}

function DeleteTable(){
    let warningBox = document.createElement("div");
    let warning = document.createTextNode("WARNING: You cannot undo this action!");
    warningBox.appendChild(warning);
    firstDiv.appendChild(warningBox);

    let commit = document.createElement("button");
    let ndCommit = document.createTextNode("commit");
    commit.appendChild(ndCommit);
    firstDiv.appendChild(commit);

    commit.onclick = function (){
        resetSecondDiv();
        let selectedIndex = secondSelect.selectedIndex;
        secondSelect.options.remove(selectedIndex);
        newTables.splice(selectedIndex,1);
        if(secondSelect.length > 0){
            secondDiv.appendChild(newTables[0]);
            secondSelect.options[0].selected = true;
        }
        if(secondSelect.length === 0){
            let defaultTable = document.createElement("option");
            let ndDefaultTable = document.createTextNode("SELECT (default: last created)");
            defaultTable.appendChild(ndDefaultTable);

            secondSelect.options.add(defaultTable);
            defaultTable.selected = true;
        }
    }
}