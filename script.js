// Display "Today" section and hide others
function showToday() {
    document.getElementById('todaySection').style.display = 'block';
    document.getElementById('mustSection').style.display = 'none';
    document.getElementById('wishSection').style.display = 'none';
}

// Display "Must" section and hide others
function showMust() {
    document.getElementById('todaySection').style.display = 'none';
    document.getElementById('mustSection').style.display = 'block';
    document.getElementById('wishSection').style.display = 'none';
}

// Display "Wish" section and hide others
function showWish() {
    document.getElementById('todaySection').style.display = 'none';
    document.getElementById('mustSection').style.display = 'none';
    document.getElementById('wishSection').style.display = 'block';
}

// Add task to the relevant section
function addTask(section) {
    let input, list;
    if (section === 'today') {
        input = document.getElementById('todayInput').value;
        list = document.getElementById('todayList');
    } else if (section === 'must') {
        input = document.getElementById('mustInput').value;
        list = document.getElementById('mustList');
    } else if (section === 'wish') {
        input = document.getElementById('wishInput').value;
        list = document.getElementById('wishList');
    }

    if (input.trim() !== '') {
        let li = document.createElement('li');
        li.textContent = input;
        list.appendChild(li);
    }
}

