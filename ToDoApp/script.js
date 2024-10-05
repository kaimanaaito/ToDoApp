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
    taskElement.style.textDecoration = checkbox.checked ? "line-through" : "none";
    updateProgressBar(); // 完了時に進捗バーを更新
}


function deleteCompletedTasks() {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            task.remove(); // 完了したタスクを削除
        }
    });
    updateProgressBar(); // 削除後に進捗バーを更新
}

function deleteTask(taskId) {
    const taskElement = document.getElementById(taskId);
    if (taskElement && !taskElement.id.startsWith('task-default-')) {
        taskElement.remove(); // タスクを削除
        updateProgressBar(); // 削除後に進捗バーを更新
    } else if (taskElement) {
        alert("このタスクは削除できません。");
    }
}


// デフォルトタスクの配列を作成
const defaultTasks = [
    { id: "task-default-1", text: "Prepare presentation", dueDate: "2024-10-10", quadrant: "urgent-important" },
    { id: "task-default-2", text: "Read a book", dueDate: "2024-10-15", quadrant: "not-urgent-important" },
    { id: "task-default-3", text: "Respond to emails", dueDate: "2024-10-05", quadrant: "urgent-not-important" },
    { id: "task-default-4", text: "Watch a movie", dueDate: "2024-10-20", quadrant: "not-urgent-not-important" }
];

function loadDefaultTasks() {
    defaultTasks.forEach(task => {
        addTaskToQuadrant(task.id, task.text, task.dueDate, task.quadrant);
    });
    updateProgressBar(); // 初期タスク読み込み後に進捗バーを更新
}


// タスクをクワドラントに追加する関数
function addTaskToQuadrant(id, text, dueDate, quadrantId) {
    const taskElement = document.createElement("div");
    taskElement.id = id;
    taskElement.className = "task";
    taskElement.draggable = true;
    taskElement.ondragstart = (event) => event.dataTransfer.setData("text", id);

    taskElement.innerHTML = `
        <input type="text" value="${text}" onchange="updateTask('${id}', this.value)">
        <input type="datetime-local" value="${dueDate}" onchange="updateDueDate('${id}', this.value)">
        <input type="checkbox" onchange="markAsCompleted(this)">
        <button onclick="deleteTask('${id}')">Delete</button>
    `;

    document.getElementById(`tasks-${quadrantId}`).appendChild(taskElement);
}

// タスクのテキストを更新する関数
function updateTask(id, newText) {
    const taskElement = document.getElementById(id);
    const textInput = taskElement.querySelector('input[type="text"]');
    textInput.value = newText;
}

// タスクの期日を更新する関数
function updateDueDate(id, newDate) {
    const taskElement = document.getElementById(id);
    const dateInput = taskElement.querySelector('input[type="datetime-local"]');
    dateInput.value = newDate;
}

function updateProgressBar() {
    const tasks = document.querySelectorAll('.task');
    const completedTasks = document.querySelectorAll('.task input[type="checkbox"]:checked');
    
    const totalTasks = tasks.length;
    const completedCount = completedTasks.length;

    // 達成率を計算
    const progress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

    // プログレスバーを更新
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    progressBar.value = progress;
    progressText.textContent = Math.round(progress) + '%';
}
function updateAchievementBar() {
    const allTasks = document.querySelectorAll('.task');
    const completedTasks = document.querySelectorAll('.task input[type="checkbox"]:checked');
    const currentDate = new Date();

    let totalTasks = 0;
    let completedOnTime = 0;

    allTasks.forEach(task => {
        totalTasks++;
        const dateInput = task.querySelector('input[type="datetime-local"]');
        const dueDate = new Date(dateInput.value);

        if (task.querySelector('input[type="checkbox"]').checked && dueDate >= currentDate) {
            completedOnTime++;
        }
    });

    const achievementRate = totalTasks > 0 ? (completedOnTime / totalTasks) * 100 : 0;

    // 達成率バーを更新
    const achievementBar = document.getElementById('achievementBar');
    const achievementText = document.getElementById('achievementText');
    
    achievementBar.value = achievementRate;
    achievementText.textContent = Math.round(achievementRate) + '%';

    // 達成率が50％を超えたら色を変える
    if (achievementRate > 50) {
        achievementBar.style.backgroundColor = 'green'; // 緑色
    } else {
        achievementBar.style.backgroundColor = 'red'; // 赤色
    }
}
 // 各クワドラントにタスクを追加
 document.querySelector("#urgent-important .tasks").appendChild(taskElement);
 document.getElementById("taskInput").value = ""; // 入力欄をクリア
 document.getElementById("dueDate").value = ""; // 日付入力欄をクリア

 // 達成率バーを更新
 updateAchievementBar();
}

function markAsCompleted(checkbox) {
 const taskElement = checkbox.parentElement;
 taskElement.style.textDecoration = checkbox.checked ? "line-through" : "none";
 
 // 達成率バーを更新
 updateAchievementBar();
}

function deleteCompletedTasks() {
 const tasks = document.querySelectorAll('.task');
 tasks.forEach(task => {
     const checkbox = task.querySelector('input[type="checkbox"]');
     if (checkbox.checked) {
         task.remove(); // 完了したタスクを削除
     }
 });

 // 達成率バーを更新
 updateAchievementBar();
}

function deleteTask(taskId) {
 const taskElement = document.getElementById(taskId);
 if (taskElement && !taskElement.id.startsWith('task-default-')) {
     taskElement.remove(); // タスクを削除
     
     // 達成率バーを更新
     updateAchievementBar();
 } else if (taskElement) {
     alert("このタスクは削除できません。");
 }
}
function allowDrop(event) {
    event.preventDefault(); // デフォルトの動作を防ぐ
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const taskElement = document.getElementById(taskId);
    const targetQuadrant = event.target.closest('.quadrant'); // ドロップ先のクワドラントを取得

    if (targetQuadrant) {
        // ドロップ先のタスクリストにタスクを追加
        targetQuadrant.querySelector('.tasks').appendChild(taskElement);
        
        // 移動元のタスクを削除
        const originalQuadrant = document.querySelector(`#tasks-${taskElement.dataset.quadrant}`);
        if (originalQuadrant) {
            taskElement.remove(); // 元のクワドラントからタスクを削除
        }
        
        // 移動先のクワドラントを更新
        taskElement.dataset.quadrant = targetQuadrant.id.split('-')[1]; // 新しいクワドラントを設定
    }
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
    taskElement.dataset.quadrant = "urgent-important"; // 初期のクワドラントを設定
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

// その他の関数は省略（markAsCompleted, deleteTask など）

function loadDefaultTasks() {
    defaultTasks.forEach(task => {
        addTaskToQuadrant(task.id, task.text, task.dueDate, task.quadrant);
    });
    updateProgressBar(); // 初期タスク読み込み後に進捗バーを更新
}

// タスクをクワドラントに追加する関数
function addTaskToQuadrant(id, text, dueDate, quadrantId) {
    const taskElement = document.createElement("div");
    taskElement.id = id;
    taskElement.className = "task";
    taskElement.draggable = true;
    taskElement.dataset.quadrant = quadrantId; // クワドラントを設定
    taskElement.ondragstart = (event) => event.dataTransfer.setData("text", id);

    taskElement.innerHTML = `
        <input type="text" value="${text}" onchange="updateTask('${id}', this.value)">
        <input type="datetime-local" value="${dueDate}" onchange="updateDueDate('${id}', this.value)">
        <input type="checkbox" onchange="markAsCompleted(this)">
        <button onclick="deleteTask('${id}')">Delete</button>
    `;

    document.getElementById(`tasks-${quadrantId}`).appendChild(taskElement);
}

// その他の関数は省略（updateTask, updateDueDate など）

// タスクの初期化
loadDefaultTasks();


// タスクの初期化
loadDefaultTasks();

