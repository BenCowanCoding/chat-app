const darkModeToggle = document.getElementById('dark-mode-toggle');

const habitForm = document.getElementById('habit-form');
const habitList = document.getElementById('habit-list');

let habits = [];

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('habits');
    if (saved) {
        habits = JSON.parse(saved);
        habits.forEach(habit => {
            addHabitToDOM(habit);
        });
    }
});

darkModeToggle.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.toggle("dark-mode");
});

habitForm.addEventListener('submit', e => {
    e.preventDefault();
    const habitName = document.getElementById('habit-name').value;
    if (!habitName) return;

    habits.push(habitName);
    localStorage.setItem('habits', JSON.stringify(habits));
    addHabitToDOM(habitName);
    habitForm.reset();
});

function addHabitToDOM(habitName) {
  const habitItem = document.createElement('div');
  habitItem.className = 'habit';
  habitItem.textContent = habitName;
  habitList.appendChild(habitItem);
}

