const url = 'https://my-api-g8he.onrender.com/medidas';
const blackBox = document.querySelector('#black-box');
const radios = document.querySelectorAll('.radio');
const template = document.querySelector('#template');
const [homeTab, uploadTab] = document.querySelectorAll('.tab');
const [table, table2] = template.content.querySelectorAll('table');
const [thead, tbody, tfoot] = table.children;
const [row, createRow, saveRow] = table2.querySelectorAll('tr');


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
    for (let part in [tbody, tfoot]) {
        part.innerHTML = '';
    }
    homeTab.appendChild(table);
    data.forEach(async (object) => {
        tbody.appendChild(await fillRow(object));
    });
    tfoot.appendChild(createRow);
    tfoot.appendChild(saveRow);
    blackBox.classList.remove('on');
}

function upload() {}

function fillRow(object) {
    return new Promise((resolve, reject) => {
        let row = Object.entries(object).reduce((text, [key, value]) => {
            return text.replace(`#[${key}]`, value);
        }, table2.outerHTML);
        let tr = new DOMParser().parseFromString(row, 'text/html').querySelectorAll('tr')[0];
        resolve(tr);
    });
}
