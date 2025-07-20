const darkModeToggle = document.getElementById('dark-mode-toggle');
const habitForm = document.getElementById('habit-form');
const habitList = document.getElementById('habit-list');

let habits = [];

// Load habits from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('habits');
  const today = getToday();

  if (saved) {
    habits = JSON.parse(saved);

    habits.forEach(habit => {
      // Reset completed status if lastCompleted isn't today
      if (habit.lastCompleted !== today) {
        habit.completed = false;
      }

      addHabitToDOM(habit);
    });

    localStorage.setItem('habits', JSON.stringify(habits));
  }
});

// Toggle dark mode
darkModeToggle.addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.toggle("dark-mode");
});

// Handle new habit submission
habitForm.addEventListener('submit', e => {
  e.preventDefault();
  const habitName = document.getElementById('habit-name').value.trim();
  if (!habitName) return;

  const newHabit = {
    name: habitName,
    completed: false,
    streak: 0,
    lastCompleted: null
  };

  habits.push(newHabit);
  localStorage.setItem('habits', JSON.stringify(habits));
  addHabitToDOM(newHabit);
  habitForm.reset();
});

//Daily reset logic
function getToday() {
    return new Date().toISOString().split("T")[0];
}

// Render one habit onto the page
function addHabitToDOM(habit) {
  const habitItem = document.createElement('div');
  habitItem.className = 'habit';

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = habit.completed;

  const habitText = document.createElement('span');
  habitText.textContent = habit.name;

  const streakBadge = document.createElement('span');
  streakBadge.textContent = `Streak: ${habit.streak}`;
  streakBadge.style.marginLeft = "1rem";

  checkBox.addEventListener('change', () => {
    const today = new Date().toISOString().split("T")[0];
    habit.completed = checkBox.checked;

    if (checkBox.checked) {
      if (habit.lastCompleted) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yDate = yesterday.toISOString().split("T")[0];

        if (habit.lastCompleted === yDate) {
          habit.streak += 1;
        } else if (habit.lastCompleted !== today) {
          habit.streak = 1;
        }
      } else {
        habit.streak = 1;
      }

      habit.lastCompleted = today;
    }

    streakBadge.textContent = `Streak: ${habit.streak}`;
    localStorage.setItem('habits', JSON.stringify(habits));
  });

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
  habitItem.appendChild(streakBadge);
  habitItem.appendChild(deleteBtn);
  habitList.appendChild(habitItem);
}