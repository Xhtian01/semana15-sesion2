import axios from 'axios';
import './style.css';

/*VARIABLES*/
const nameTask = document.getElementById('nameTask');
const nameAuthor = document.getElementById('nameAuthor');
const nameDate = document.getElementById('nameDate');
const formTask = document.getElementById('formTask');

const taskList = document.getElementById('taskList');

let dataTask = {
  nameTask: '',
  nameAuthor: '',
  nameDate: '',
};

initApp();

/*LISTENERS*/
function initApp() {
  /*console.log('Iniciando App... ');*/

  document.addEventListener('DOMContentLoaded', readTask);

  nameTask.addEventListener('blur', readFields);
  nameAuthor.addEventListener('blur', readFields);
  nameDate.addEventListener('blur', readFields);
  formTask.addEventListener('submit', createTask);

  /*formTask.addEventListener('blur', createTask);*/
}

/*FUNCIONES*/

function readFields(e) {
  dataTask[e.target.name] = e.target.value;
}

async function createTask(e) {
  /*e.preventDefault();*/

  //Enviar Data
  const response = await axios.post('http://localhost:3000/task', dataTask);
  console.log(response);

  /*  if (dataTask.nameTask === '') {
    showError();
    return;
  }*/

  console.log(dataTask);
}

async function readTask() {
  /*  await fetch('http://localhost:3000/task')
    .then((data) => {
      return data.json();
    })
    .then((task) => console.log(task));*/

  const data = await axios.get('http://localhost:3000/task');
  console.log(data);
  /* console.log(data.data[0].nameAuthor);*/

  printData(data);
}

function printData(data) {
  data.data.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${task.nameAuthor}</span> - 
    <span>${task.nameDate}</span>
    <button class="btnEliminar" data-id="${task.id}">Eliminar</button>
    `;

    taskList.appendChild(li);
  });

  const btnDelete = document.querySelectorAll('.btnEliminar');
  btnDelete.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idAuthor = e.target.getAttribute('data-id');
      deleteTask(idAuthor);
      /*      console.log(idAuthor);*/
    });
  });
}

async function deleteTask(idAuthor) {
  await axios.delete(`http://localhost:3000/task/${idAuthor}`);
  location.reload();

  /*console.log(borrar);*/
}

/*function showError() {
  alert('Debes completar los campos');
}*/

/*function readName(e) {
  const username = e.target.value;
  dataTask.name = username;
}

function readAuthor(e) {
  const authorname = e.target.value;
  dataTask.author = authorname;
}

function readDate(e) {
  const datetask = e.target.value;
  dataTask.date = datetask;
}*/

/*import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';*/

/*document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;*/

/*setupCounter(document.querySelector('#counter'))*/
