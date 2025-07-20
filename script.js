const darkModeToggle = document.getElementById('dark-mode-toggle');

const habitForm = document.getElementById('habit-form');
const habitList = document.getElementById('habit-list');

darkModeToggle.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.toggle("dark-mode");
});

habitForm.addEventListener('submit', e => {
    e.preventDefault();
    const habitName = document.getElementById('habit-name').value;
    if (!habitName) return;

    const habitItem = document.createElement('div');
    habitItem.className = 'habit';
    habitItem.textContent = habitName;

    habitList.appendChild(habitItem);
    habitForm.reset();
});

