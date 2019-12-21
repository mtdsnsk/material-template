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