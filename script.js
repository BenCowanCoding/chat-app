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

  const habitText = document.createElement('span');
  habitText.textContent = habitName;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    // Remove from DOM
    habitItem.remove();

    // Remove from array
    habits = habits.filter(h => h !== habitName);
    localStorage.setItem('habits', JSON.stringify(habits));
  });

  habitItem.appendChild(habitText);
  habitItem.appendChild(deleteBtn);
  habitList.appendChild(habitItem);
}

