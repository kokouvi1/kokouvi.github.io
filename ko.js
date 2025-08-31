document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");
  const clearAll = document.getElementById("clearAll");

  // Charger les tâches depuis localStorage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach(task => {
      addTaskToDOM(task);
    });
  };

  // Sauvegarder les tâches dans localStorage
  const saveTasks = () => {
    const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Ajouter une tâche dans le DOM
  const addTaskToDOM = (taskText) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${taskText}</span>
      <button>❌</button>
    `;
    
    li.querySelector("button").onclick = () => {
      li.remove();
      saveTasks();
    };

    taskList.appendChild(li);
  };

  // Ajouter une tâche
  const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Veuillez entrer une tâche !");
    
    addTaskToDOM(taskText);
    taskInput.value = "";
    saveTasks();
  };

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  clearAll.addEventListener("click", () => {
    if (confirm("Supprimer toutes les tâches ?")) {
      taskList.innerHTML = "";
      saveTasks();
    }
  });

  // Charger les tâches au démarrage
  loadTasks();
});