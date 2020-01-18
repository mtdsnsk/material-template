Vue.component('project-modal', {
  template: `
    <div class="modal fade" id="newProjectModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">プロジェクトの追加</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input v-model="newProjectName" class="form-control" placeholder="プロジェクト名">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
            <button v-on:click="createProject" :disabled='isAddProjectDisabled' type="button" class="btn btn-primary">保存</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
      newProjectName: "",
      isAddProjectDisabled: ""
    }
  },
  methods: {
    createProject: function(todoId) {
      // return this.todos.find(x => x.id === todoId).status.id
    }
  }
})
