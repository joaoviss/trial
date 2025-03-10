const url = 'https://my-api-g8he.onrender.com/medidas';
const blackBox = document.querySelector('#black-box');
const radios = document.querySelectorAll('.radio');
const template = document.querySelector('#template');
const [homeTab, uploadTab] = document.querySelectorAll('.tab');
const [table, table2] = template.content.querySelectorAll('table');
const [thead, tbody, tfoot] = table.children;
const [headersRow, row, fileRow, createRow, saveRow] = table2.querySelectorAll('tr');
let objects = date = press = freq = null;

addEventListener('DOMContentLoaded', async () => {
    await home();
    // upload();
});

radios.forEach(radio => {
    radio.addEventListener('change', ({target}) => {
        let fn = `${target.id.slice(0, -6)}()`;
        eval(fn);   
    });        
});        

function clear() {
    thead.innerHTML = '';
    tbody.innerHTML = '';
    tfoot.innerHTML = '';
}

async function home() {
    blackBox.classList.add('on');
    let response = await fetch(url);
    let {data} = await response.json();
    clear();
    thead.appendChild(headersRow);
    data.forEach(object => {
        tbody.appendChild(fillRow(object));
    });    
    tfoot.appendChild(createRow);
    tfoot.appendChild(saveRow);
    homeTab.appendChild(table);
    [date, press, freq] = document.querySelectorAll('.create');
    blackBox.classList.remove('on');
}    

function upload() {
    blackBox.classList.add('on');
    clear();
    thead.appendChild(fileRow); 
    uploadTab.appendChild(table);
    blackBox.classList.remove('on');
    
    const fileInput = document.querySelector('#file-input');
    const fileSpan = document.querySelector('#file-span');
    
    fileInput.addEventListener('change', ({target}) => {
        let file = target.files[0];
        fileSpan.innerText = file.name;
        let reader = new FileReader();
        thead.appendChild(headersRow);
        tfoot.appendChild(saveRow);
        reader.onload = ({target}) => {
            objects = textToObjects(target.result);
            objects.forEach(objects => {
                tbody.appendChild(fillRow(objects));
            });
        }
        reader.readAsText(file);
    });
}

function fillRow(object) {
    let row = Object.entries(object).reduce((text, [key, value]) => {
        return text.replace(`#[${key}]`, value);
    }, table2.outerHTML);
    return new DOMParser().parseFromString(row, 'text/html').querySelectorAll('tr')[0];
}

function textToObjects(text) {
    let array = text.split('\n').map(line => {
        return line.split(',');
    });
    let keys = array.shift();
    return array.map(arr => {
        return arr.reduce((object, value, id) => {
            object[keys[id]] = value;
            return object;''
        }, {});
    });
}

async function save(object) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    });
    console.log(response.json());
}