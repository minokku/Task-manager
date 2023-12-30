const app = new Vue({
    el: '#app',
    data: {
        // User-related data
        user: null,
        username: '',
        password: '',
        
        // Task-related data
        tasks: [],
        taskText: '',
        filter: 'all',
        editingTask: null,
        
        // Random number data
        randomNumbers: [],
        
        // Error message handling
        showErrorMessage: false,
        
        // Date-related data
        currentDate: '',
        
        // Modal control
        showModal: false,
    },
    
    computed: {
        // Computed property to filter tasks based on the selected filter
        filteredTasks() {
            if (this.filter === 'completed') {
                return this.tasks.filter(task => task.completed);
            } else if (this.filter === 'active') {
                return this.tasks.filter(task => !task.completed);
            } else {
                return this.tasks;
            }
        },
        
        // Computed property to calculate the sum of random numbers
        sumOfRandomNumbers() {
            return this.randomNumbers.reduce((sum, number) => sum + number, 0);
        },
    },
    methods: {
        // Signup method
        signup() {
            if (this.username && this.password) {
                this.user = { username: this.username };
                this.clearAuthForm();
            } else {
                this.showErrorMessage = true;
            }
        },
        
        // Login method
        login() {
            if (this.username && this.password) {
                this.user = { username: this.username };
                this.clearAuthForm();
                this.fetchTasks();
            } else {
                this.showErrorMessage = true;
            }
        },
        
        // Logout method
        logout() {
            this.user = null;
        },
        
        // Add task method
        addTask() {
            if (this.taskText) {
                const newTask = { id: Date.now(), text: this.taskText, completed: false };
                this.tasks.push(newTask);
                this.taskText = '';
            } else {
                this.showErrorMessage = true;
            }
        },
        
        // Update task method
        updateTask(taskId, completed) {
            const taskToUpdate = this.tasks.find(task => task.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.completed = completed;
            }
        },
        
        // Delete task method
        deleteTask(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
        },
        
        // Edit task method
        editTask(taskId) {
            this.editingTask = taskId;
            const taskToEdit = this.tasks.find(task => task.id === taskId);
            if (taskToEdit) {
                this.taskText = taskToEdit.text;
            }
        },
        
        // Save edited task method
        saveEditedTask() {
            const taskToEdit = this.tasks.find(task => task.id === this.editingTask);
            if (taskToEdit && this.taskText) {
                taskToEdit.text = this.taskText;
                this.cancelEdit();
            } else {
                this.showErrorMessage = true;
            }
        },
        
        // Cancel edit method
        cancelEdit() {
            this.editingTask = null;
            this.taskText = '';
        },
        
        // Clear completed tasks method
        clearCompletedTasks() {
            this.tasks = this.tasks.filter(task => !task.completed);
        },
        
        // Fetch tasks from the server method
        fetchTasks() {
            fetch('https://657ffc936ae0629a3f540ebd.mockapi.io/api/v111/:endpoint')
                .then(response => response.json())
                .then(data => {
                    this.tasks = data;
                })
                .catch(error => console.error('Error fetching tasks:', error));
        },
        
        // Clear the authentication form method
        clearAuthForm() {
            this.username = '';
            this.password = '';
            this.showErrorMessage = false;
        },
        
        // Generate random numbers method
        generateRandomNumbers() {
            this.randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
        },
        
        // Double random numbers method
        doubleRandomNumbers() {
            this.randomNumbers = this.randomNumbers.map(number => number * 2);
        },
        
        // Reset random numbers method
        resetRandomNumbers() {
            this.randomNumbers = [];
        },
        
        // Get current date method
        getCurrentDate() {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.currentDate = now.toLocaleDateString('en-US', options);
        },
        
        // Toggle modal method
        toggleModal() {
            this.showModal = !this.showModal;
        },
    },
    created() {
        // Call the method to get the current date when the Vue instance is created
        this.getCurrentDate();
    },
});
