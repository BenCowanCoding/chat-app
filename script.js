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
  const habitName = document.getElementById('habit-name').value.trim();
  if (!habitName) return;

  const newHabit = {
    name: habitName,
    completed: false
  };

  habits.push(newHabit);
  localStorage.setItem('habits', JSON.stringify(habits));
  addHabitToDOM(newHabit);
  habitForm.reset();
});

function addHabitToDOM(habit) {
  const habitItem = document.createElement('div');
  habitItem.className = 'habit';

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = habit.completed;
  checkBox.addEventListener('change', () => {
    habit.completed = checkBox.checked;
    localStorage.setItem('habits', JSON.stringify(habits));
  });

  const habitText = document.createElement('span');
  habitText.textContent = habit.name;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    habitItem.remove();
    habits = habits.filter(h => h !== habit);
    localStorage.setItem('habits', JSON.stringify(habits));
  });

  habitItem.appendChild(checkBox);
  habitItem.appendChild(habitText);
  habitItem.appendChild(deleteBtn);
  habitList.appendChild(habitItem);
}