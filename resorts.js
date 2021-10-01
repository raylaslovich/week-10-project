//creates the ski runs' of resort, along with difficulty
class Run {
    constructor (name,difficulty) {
    this.name = name;
    this.difficulty = difficulty;
    }
}

//creates Resort name
class Resort {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.runs= [];
    }
    
    addRun(run) {
        this.runs.push(run);
    }

    deleteRun(run) {
        let index = this.runs.indexOf(run);
        this.runs.splice(index,1);
    }
}

let resorts = [];
let runId = 0;

// function when click create Resort name. 
onClick('new-resort', () => {
    resorts.push(new Resort(runId++, getValue('new-resort-name')));
    drawDOM();
});



function drawDOM() {
    let runDiv = document.getElementById('runs');
    clearElement(runDiv);
    for (resort of resorts) {
        let table = createResortTable(resort);
        let title = document.createElement('h2');
        title.innerHTML = resort.name;
        title.appendChild(createDeleteResortButton(resort));
        runDiv.appendChild(title);
        runDiv.appendChild(table);
        for (run of resort.runs) {
            createResortRow(resort, table, run);
        }
    }
}
//function to create row in Resort for run name and difficulty
function createResortRow (resort, table, run) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = run.name;
    row.insertCell(1).innerHTML = run.difficulty;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(resort, run))
}

//function to create button that will delete name of run & difficulty
function createDeleteRowButton(resort, run) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-info';
    btn.innerHTML = "Delete";
    btn.onclick = () => {
        let index = resort.runs.indexOf(run);
        resort.runs.splice(index, 1);
        drawDOM();
    };
    return btn;
};

// function to create button that delete's Resort Name
function createDeleteResortButton(resort) {
    let btn = document.createElement ('button');
    btn.className ='btn btn-info';
    btn.innerHTML ='Delete Resort';
    btn.onclick = () => {
        let index = resorts.indexOf(resort);
        resorts.splice(index, 1);
        drawDOM();
    };
    return btn;
}

// function to create button for name of new Run and difficulty
function createNewRunButton(resort) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-info';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        resort.runs.push(new Run(getValue(`name-input-${resort.id}`), getValue(`difficulty-input-${resort.id}`)))
        drawDOM();
    };
    return btn;
}

//function to create table for Resort Name, with columns Run and difficulty within
function createResortTable(resort) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-bordered');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let difficultyColumn = document.createElement('th');
    nameColumn.innerHTML = "Run Name";
    difficultyColumn.innerHTML = "Difficulty";
    row.appendChild(nameColumn);
    row.appendChild(difficultyColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let difficultyTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${resort.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let difficultyInput = document.createElement('input');
    difficultyInput.setAttribute('id', `difficulty-input-${resort.id}`);
    difficultyInput.setAttribute('type', 'text');
    difficultyInput.setAttribute('class', 'form-control');
    let newRunButton = createNewRunButton(resort);
    nameTh.appendChild(nameInput);
    difficultyTh.appendChild(difficultyInput);
    createTh.appendChild(newRunButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(difficultyTh);
    formRow.appendChild(createTh);
    return table;
}

// create simplifier functions
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action)
    return element; 
};

function getValue(id) {
    return document.getElementById(id).value;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}







