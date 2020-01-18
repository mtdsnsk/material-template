Vue.component('my-footer', {
  template: `
  <footer class="footer">
    <div class="container-fluid">
      <nav class="float-left"><ul><li><a href="#">Creative Tim</a></li></ul></nav>
      <div class="copyright float-right"><a href="#" target="_blank">Creative Tim</a> for a better web.</div>
      <!-- your footer here -->
    </div>
  </footer>
  `
})

Vue.component('drop-down', {
  template: `
  <div class="dropdown show">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ステータスを絞り込む</a>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item" href="#">進行中</a>
      <a class="dropdown-item" href="#">完了</a>
    </div>
  </div>
  `
})

Vue.component('todo-card', {
  template: `
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">{{ todoItem.name }}</h4>
      <p class="category">{{ findProjectName(todoItem.project.id) }}</p>
      <a class="btn" v-on:click="editTodo(todoItem.id, todoItem.project.id)" data-toggle="modal"
        data-target="#editModal">
        <i class="material-icons">edit</i>
      </a>
      <a class="btn" v-on:click="deleteTodo(todoItem.id)">
        <i class="material-icons">delete</i>
      </a>
      <a class="btn" v-on:click="toggleStatus(todoItem.id)">
        <i class="material-icons">check</i>
      </a>
    </div>
  </div>
  `
})

Vue.component('todo-status-button', {
  template: `
  <div class="dropdown show">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ステータスで絞り込む</a>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a v-on:click="filterTodosByStatus(0)" class="dropdown-item">全て</a>
    <a v-on:click="filterTodosByStatus(1)" class="dropdown-item">進行中</a>
    <a v-on:click="filterTodosByStatus(2)" class="dropdown-item">完了</a>
  </div>
  `
})

Vue.component('todo-side-bar', {
  props: ['projects'],
  template: `
  <div class="sidebar" data-color="azure" data-background-color="white">
    <div class="logo">
      <a href="#" class="simple-text logo-normal">
        ToDoリスト
      </a>
    </div>
    <div class="sidebar-wrapper">
      <ul class="nav">
        <li class="nav-item text-center">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newProjectModal">
            プロジェクトを追加
          </button>
        </li>
        <hr>
        <li class="nav-item active">
          <a v-on:click="selectProject(0)" class="nav-link" href="#0">
            <i class="material-icons">dashboard</i>
            <p>全てのTodo</p>
          </a>
        </li>
        <li v-for="project in projects" class="nav-item active">
          <a v-on:click="selectProject(project.id)" class="nav-link" href="#0">
            <i class="material-icons">dashboard</i>
            <p>{{ project.name }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
  `
})
