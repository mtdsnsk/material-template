Vue.component('template-todo-list', {
  props: ['todoItems'],
  template: `
  <ul>
    <li v-for="item in todoItems"> 
      <div>
      {{ item.title }}
      </div>
      <div>
      {{ item.description }}
      </div>
    </li>
  </ul>
  `
})