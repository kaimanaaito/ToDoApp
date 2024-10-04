function allowDrop(event) {
    event.preventDefault(); // デフォルトの動作を防ぐ
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const taskElement = document.getElementById(taskId);
    event.target.querySelector('.tasks').appendChild(taskElement);
}

function addTasks() {
    const taskInput = document.getElementById("taskInput").value;
    const dueDate = document.getElementById("dueDate").value;

    if (taskInput.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    const taskId = `task-${Date.now()}`; // ユニークなIDを生成
    const taskElement = document.createElement("div");
    taskElement.id = taskId;
    taskElement.className = "task";
    taskElement.draggable = true; // ドラッグ可能にする
    taskElement.ondragstart = (event) => event.dataTransfer.setData("text", taskId);

    taskElement.innerHTML = `
        <span>${taskInput} (Due: ${dueDate})</span>
        <input type="checkbox" onchange="markAsCompleted(this)">
        <button onclick="deleteTask('${taskId}')">Delete</button>
    `;

    // 各クワドラントにタスクを追加
    document.querySelector("#urgent-important .tasks").appendChild(taskElement);
    document.getElementById("taskInput").value = ""; // 入力欄をクリア
    document.getElementById("dueDate").value = ""; // 日付入力欄をクリア
}

function markAsCompleted(checkbox) {
    const taskElement = checkbox.parentElement;
    if (checkbox.checked) {
        taskElement.style.textDecoration = "line-through"; // 完了したタスクに取り消し線を引く
    } else {
        taskElement.style.textDecoration = "none"; // 取り消し線を解除
    }
}

function deleteCompletedTasks() {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            task.remove(); // 完了したタスクを削除
        }
    });
}

function deleteTask(taskId) {
    const taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.remove(); // 指定したタスクを削除
    }
}

