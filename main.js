var vm = new Vue({
  el: "#app",
  data: {
    currentProjectId: 0,
    currentStatusId: 1,
    editTodoId: 0,
    editProjectId: 0,
    editTodoName: "",
    todoItemProjectId: 0,
    todoItemText: "",
    newProjectName: "",
    showbyProject: true,
    showByStatus: false,
    apiURL: "http://localhost:1337/graphql",
    projects: [],
    todos: [
      { 
        id: 0, 
        name: "", 
        status: { id: 0 },
        project: { id: 0 }
      }
    ]
  },
  methods: {
    findStatusId: function(todoId) {
      return this.todos.find(x => x.id === todoId).status.id

    },
    findProjectName: function (projectId) {
      return this.projects.find(x => x.id === projectId).name
    },
    findEditTodoName: function(todoId) {
      return this.todos.find(x => x.id === todoId).name
    },
    selectProject: function (projectId) {
      this.currentProjectId = projectId;
    },
    changeStatus: function (statusId) {
      this.currentStatusId = statusId;
    },
    editTodo: function (todoId, projectId) {
      this.editTodoId = todoId;
      this.editProjectId = projectId;
      this.editTodoName = this.findEditTodoName(todoId);
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
                    project: ${this.todoItemProjectId}
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
        this.todos.push(
          { 
            id: 0, 
            name: this.todoItemText, 
            status: { id: 1 },
            project: { id: this.todoItemProjectId }
          }
        )
        this.todoItemText = "";
      } catch (error) {
        console.error(error);
      }
    },     
    async createProject() {
      try {
        await axios({
          method: "POST",
          url: this.apiURL,
          data: {
            query: `
            mutation {
              createProject(input: {
                data: {
                  name: "${this.newProjectName}",
                }
              }) {
                project {
                  id
                  name
                }
              }
            }
            `
          }
        });
        this.getProjects();
        this.newProjectName = "";
      } catch (error) {
        console.error(error);
      }
    },     
    async updateTodo() {
      try {
        await axios({
          method: "POST",
          url: this.apiURL,
          data: {
            query: `
              mutation {
                updateTodo(input: {
                  where: {
                    id: ${this.editTodoId}
                  },
                  data: {
                    name: "${this.editTodoName}"
                    project: ${this.editProjectId}
                  }
                }) {
                  todo {
                    id
                    name
                    project {
                      id
                      name
                    }
                  }
                }
              }
            `
          }
        });
        this.getTodos();
        this.editTodoId = 0;
      } catch (error) {
        console.error(error);
      }
    }, 
    async deleteTodo(todoId) {
      try {
        await axios({
          method: "POST",
          url: this.apiURL,
          data: {
            query: `
              mutation {
                deleteTodo(input: {
                  where: {
                    id: ${todoId}
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
      } catch (error) {
        console.error(error);
      }
    },   
    async toggleStatus(todoId) {
      let statusId = this.findStatusId(todoId)
      statusId = statusId == "1" ? "2" : "1"

      try {
        await axios({
          method: "POST",
          url: this.apiURL,
          data: {
            query: `
              mutation {
                updateTodo(input: {
                  where: {
                    id: ${todoId}
                  },
                  data: {
                    status: ${statusId}
                  }
                }) {
                  todo {
                    id
                    name
                    status {
                      id
                      name
                    }
                  }
                }
              }
            `
          }
        });
        this.getTodos();
      } catch (error) {
        console.error(error);
      }
    },    
  },
  computed: {
    currentData: function () {
      if (this.currentProjectId == 0) {
        return this.todos
      }

      return this.todos.filter(
        item => item.project.id == this.currentProjectId 
      )
    }
  },
  created() {
    this.getProjects()
    this.getTodos()
  }
})