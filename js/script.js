const url = 'https://my-api-g8he.onrender.com/medidas';
const blackBox = document.querySelector('#black-box');
const radios = document.querySelectorAll('.radio');
const template = document.querySelector('#template');
const [homeTab, uploadTab] = document.querySelectorAll('.tab');
const [table, table2] = template.content.querySelectorAll('table');
const tbody = table.querySelector('tbody');

addEventListener('DOMContentLoaded', async () => {
    await home();
});

radios.forEach(radio => {
    radio.addEventListener('change', ({target}) => {
        let fn = `${target.id.slice(0, -6)}()`;
        eval(fn);
    });
});

async function home() {
    blackBox.classList.add('on');
    let response = await fetch(url);
    let {data} = await response.json();
    tbody.innerHTML = '';
    data.forEach(object => {
           tbody.appendChild(createRows(object));
    });
    homeTab.appendChild(table);
    blackBox.classList.remove('on');
}

function upload() {

}

function createRows(object) {
    let row = Object.entries(object).reduce((text, [key, value]) => {
        return text.replace(`#[${key}]`, value);
    }, table2.outerHTML);
    return new DOMParser().parseFromString(row, 'text/html').querySelectorAll('tr')[0];
}