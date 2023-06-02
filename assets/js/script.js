window.addEventListener("DOMContentLoaded", () => {
  
  let tasks = [];
  
  const historyContainer = document.querySelector('.history-container');
  const inputResult = document.querySelector('.input-big');
  const input = document.querySelector('.input-medium');
  
  const buttonValue = document.querySelectorAll('.btn-value');
  buttonValue.forEach(button => {
    button.addEventListener('click', function() {
      input.value += this.dataset.value.trim();
    });
  });
  
  const btnEqual = document.querySelector('.btn-equal');
  btnEqual.addEventListener('click', calculate);
  
  function calculate() {
    const value = input.value.trim();
    if (!value) return alerts('error', 'Input is empty!');
    inputResult.value = eval(value);
    setHistory();
  }
  
  function alerts(icon, text) {
    swal.fire ({
      icon: icon,
      title: 'Alert',
      text: text
    });
  }
  
  function setHistory() {
    const value = input.value.trim();
    const data = { value: value, result: eval(value) };
    tasks.unshift(data);
    setLocalstorage('calculator', tasks);
    loadData();
  }
  
  function setLocalstorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }
  
  function showUI(data) {
    const result = renderElement(data);
    historyContainer.insertAdjacentHTML('beforeend', result);
  }
  
  function renderElement({ value, result }) {
    return `
      <div class="list">
        <span class="value-text">${value}</span>
        <span class="result-text">=${result}</span>
      </div>
    `;
  }
  
  function loadData() {
    historyContainer.innerHTML = '';
    const data = localStorage.getItem('calculator');
    tasks = (data) ? JSON.parse(data) : [];
    tasks.forEach(task => showUI(task));
  }
  
  loadData();
  
  const modals = document.querySelectorAll('.modal');
  document.addEventListener('click', (event) => {
    if (event.target.dataset.modal) {
      const type = event.target.dataset.modal.toLowerCase();
      modals.forEach(modal => {
        const modalType = modal.dataset.modal.toLowerCase();
        if (type === modalType) return modal.classList.add('active');
        return modal.classList.remove('active');
      });
    }
  });
  
  document.addEventListener('click', event => {
    if (event.target.classList.contains('btn-close')) {
      modals.forEach(modal => modal.classList.remove('active'));
    }
  });
  
  const btnDeleteHistory = document.querySelector('.btn-del-history');
  btnDeleteHistory.addEventListener('click', () => {
    if (tasks.length < 1) return alerts('error', 'No data history!');
    return deleteHistory();
  });
  
  function deleteHistory() {
    swal.fire ({
      icon: 'info',
      title: 'are you sure?',
      text: 'do you want to delete all data history?',
      showCancelButton: true
    })
    .then(response => {
      if (response.isConfirmed) {
        tasks = [];
        setLocalstorage('calculator', tasks);
        alerts('success', 'Data history has been deleted!');
        loadData();
      }
    });
  }
  
  const btnClear = document.querySelector('.btn-clear');
  btnClear.addEventListener('click', clear);
  
  function clear() {
    inputResult.value = '';
    input.value = '';
  }
  
  const btnDelete = document.querySelector('.btn-delete');
  btnDelete.addEventListener('click', () => {
    const value = input.value;
    input.value = value.substring(0, value.length - 1);
  });
  
});