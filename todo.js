// ul要素
const ul = document.getElementById('todo-list');

const addTask = () => {
  const inputText = document.getElementById('input-todo');
  if (!inputText.value) return;

  const li = document.createElement('li');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  // チェックボックス、ラベルの作成
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'me-2');
  input.setAttribute('onchange', 'taskState()');
  label.innerHTML = inputText.value;
  
  // 編集ボタンの作成
  editButton.setAttribute('class', 'btn btn-warning btn-sm ms-3');
  editButton.innerHTML = '編集';
  editButton.addEventListener('click', (event) => {
    editTask(event, editButton, deleteButton);
  })
  
  // 削除ボタンの作成
  deleteButton.setAttribute('class', 'btn btn-danger btn-sm ms-2');
  deleteButton.innerHTML = '削除';
  deleteButton.addEventListener('click', (event) => {
    deleteTask(event);
  })
  
  // li要素の作成
  li.setAttribute('class', 'my-1 d-flex align-items-center')
  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  ul.appendChild(li);
  inputText.value = '';
  taskState();
}

const editTask = (event, editButton, deleteButton) => {
  const targetLi = event.target.parentNode;
  const label = targetLi.querySelector('label');
  const task = label.innerHTML;
  
  // ラベル、ボタンの非表示
  label.style.display = 'none';
  editButton.style.display = 'none';
  deleteButton.style.display = 'none';

  // 編集フォームの作成
  const editForm = document.createElement('input');
  editForm.setAttribute('class', 'form-control')
  editForm.setAttribute('style', 'width: 30%')
  editForm.setAttribute('id', 'editText')
  editForm.value = task;
  
  // 保存ボタンの作成
  const saveButton = document.createElement('button');
  saveButton.setAttribute('class', 'btn btn-success btn-sm ms-3');
  saveButton.innerHTML = '保存';
  saveButton.addEventListener('click', (event) => {
    saveTask(event, label, saveButton, editButton, deleteButton);
  })

  targetLi.appendChild(editForm);
  targetLi.appendChild(saveButton);
}

const saveTask = (event, label, saveButton, editButton, deleteButton) => {
  const targetLi = event.target.parentNode;
  const editForm = targetLi.querySelector('#editText')

  // フォームからラベルの書き換え
  label.innerHTML = editForm.value;
  label.style.display = '';
  
  targetLi.removeChild(editForm);
  targetLi.removeChild(saveButton);
  
  // ボタンの再表示
  editButton.style.display = '';
  deleteButton.style.display = '';
}

const deleteTask = (event) => {
  result = confirm("本当によろしいですか？");
  if (result) {
    ul.removeChild(event.target.parentNode);
    taskState();
  }
}

// タスクの状態を表示
const taskState = () => {
  const stateInfo = document.getElementById('task-state')

  const checkboxList = ul.querySelectorAll('li')
  let complete = 0;
  for(element of checkboxList) {
    const is_checked = element.querySelector(`input`).checked;
    if(is_checked) complete++;
  }

  const all = ul.childElementCount;
  const incomplete = all - complete;
  stateInfo.innerHTML = `全てのタスク:${all} 完了済み:${complete} 未完了:${incomplete}`
}
