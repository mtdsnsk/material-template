Vue.component('todo-modal', {
  template: `
    <div class="modal fade" id="newTodoModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">TODOを追加</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <select v-model="todoItemProjectId" class="form-control selectpicker" data-style="btn btn-link"
                id="exampleFormControlSelect1">
                <option value="0">プロジェクトを選択</option>
                <option v-for="project in projects" v-bind:value="project.id">{{ project.name }}</option>
              </select>
              <input v-model="todoItemText" class="form-control" placeholder="TODOのコンテンツ">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
            <button v-on:click="createTodo()" :disabled='isAddTodoDisabled' type="button" class="btn btn-primary">保存</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
      todoItemText: "",
      todoItemProjectId: "",
      projects: []
    }
  },
  methods: {
    createTodo: function(todoId) {
      // return this.todos.find(x => x.id === todoId).status.id
    },
    isAddTodoDisabled: function () {
      
    }
  }
})

