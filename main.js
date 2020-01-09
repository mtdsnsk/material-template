new Vue({
  el: "#app",
  data: {
    currentProjectId: 0,
    currentStatusId: 1,
    editTodoId: 0,
    todoItemProjectId: 1,
    todoItemText: "",
    apiURL: "http://localhost:1337/graphql",
    projects: [],
    todos: [
      { 
        id: 0, 
        name: "", 
        status: {id: 0},
        project: {id: 0}
      }
    ]
  },
  methods: {
    findProjectName: function (project_id) {
      return this.projects.find(x => x.id === project_id).name
    },
    select: function (project_id) {
      this.currentProjectId = project_id;
    },
    changeStatus: function (status_id) {
      this.currentStatusId = status_id;
    },
    checkStatus: function (status_id) {
      if (this.currentStatusId == 0) return true;
      return (status_id == this.currentStatusId)
    },
    // addTodo: function () {
    //   this.todos.push({
    //     id: 1,
    //     name: this.todoItemText,
    //     project: {id: this.currentProjectId},
    //     status_id: 1
    //   })
    // },
    editTodo: function (todoId) {
      this.editTodoId = todoId;
    },
    editTodoSave: function () {
      let item = this.todos.find((todo) => todo.id == this.editTodoId);
      item.text = this.todoItemText;
    },
    async getProjects() {
      try {
        const response = await axios({
          method: "POST",
          url: this.apiURL,
          data: {
            query: `
              query getProjects {
                projects {
                  id
                  name
                }
              }
            `
          }
        });
        this.projects = response.data.data.projects;
      } catch (error) {
        console.error(error);
      }
    },
    async getTodos() {
      try {
        const response = await axios({
          method: "POST",
          url: this.apiURL,
          data: {
            query: `
              query getTodos {
                todos {
                  id
                  name
                  status {
                    id
                  }
                  project {
                    id
                  }
                }
              }
            `
          }
        });
        console.log(response)
        this.todos = response.data.data.todos;
      } catch (error) {
        console.error(error);
      }
    },     
    async createTodo() {
      console.log(this.todoItemText);
      console.log(this.todoItemProjectId);
      try {
        await axios({
          method: "POST",
          url: this.apiURL,
          data: {
            query: `
              mutation {
                createTodo(input: {
                  data: {
                    name: "${this.todoItemText}",
                    project: 1
                    status: 1
                  }
                }) {
                  todo {
                    id
                    name
                  }
                }
              }
            `
          }
        });
        this.getTodos();
        this.todoItemText = "";
      } catch (error) {
        console.error(error);
      }
    },     
  },
  computed: {
    currentData: function () {
      return this.todos.filter(
        item => item.project.id == this.currentProjectId &&
          this.checkStatus(item.status.id)
      )
    }
  },
  created() {
    this.getProjects()
    this.getTodos()
  }
})