<template>
  <div id="app">
    <h1>{{appName}}</h1>
<div v-if='!show'>
    <button type='button' @click="getTheTasks">SHOW TASKS</button>
</div>
    
<div v-else>
    <div id='col1'><h4>Tasks</h4></div>
    <div id='col2'><h4>Done</h4></div>
    <div v-for='t in getIncompleteTasks' v-bind:key='t.task' id='undone'>
      <div id='col1'>{{t.task}}</div>
      <div id='col2'>
        <input type='checkbox' v-model='t.done' @click="updateCompletedTask(t)"/>
        {{t.done}}
      </div>
    </div>
  <div id='newTask'>
    <input type='text' v-model='newTaskAdded' id='textbox'/>
    <button type='button' id='add' @click='addNewTask'>ADD</button>
    <br/><br/>
  </div>

    <!--Show or hide completed tasks-->
    <div id='completedTasks' class='complete'>
      <label id='show' for='new'>Show Completed Tasks</label>
      <input type='checkbox' id='new col2' class='select' />
      <div class='box' v-for='t in getCompletedTasks' v-bind:key='t.task'>
        <div id='col1'>{{t.task}}</div>
        <div id='showingcol2'>
          <input type='checkbox' v-model='t.done' />
          {{t.done}}
        </div>
        <div id='showingcol3'>
          <!--Div for the delete button-->
          <button type='button' class='delete' @click='deleteTask(t)'>DELETE</button>
        </div>
      </div>
    </div>
</div>
  </div>
</template>

<script>
import store from './store/index'
export default {
  name: 'App', 
  data(){
    return {
      newTaskAdded: '',
      show: false,
    }
  },
  computed:{
    appName(){
      return store.getters.getTitle;
    },
    getIncompleteTasks(){
      return store.getters.hideCompletedTasks;
    },
    getCompletedTasks(){
      return store.getters.showCompletedTasks;
    }
    
  },
  methods:{
    updateCompletedTask(value){
      for(let t of store.state.todoList.filter(job=>!job.done)){
        if((t.task)===(value.task)){
          t.done=true;
        }
      }
      let data = localStorage.getItem('todos');
      if(data != null){
        let list = JSON.parse(data);
        let index = list.findIndex(x => x.task ===value.task);
        store.state.todoList.splice(index, 1);
        JSON.parse(data).splice(index, 1);
        store.state.todoList.push({task:value.task, done:true});
        this.storeTheData();
      }
    },
    addNewTask(){
      if(this.newTaskAdded.length!==0){
        store.state.todoList.push({task:this.newTaskAdded, done:false});
        this.storeTheData();
        this.newTaskAdded='';
      }
    },
    getTheTasks(){
      this.show = true;
      store.dispatch('read');
    },
    deleteTask(value){
      let data = localStorage.getItem('todos');
      if(data != null){
        let list = JSON.parse(data);
        let index = list.findIndex(x => x.task ===value.task);
        store.state.todoList.splice(index, 1);
        JSON.parse(data).splice(index, 1);
        this.storeTheData();
      }
    },
    storeTheData(){
      store.dispatch('write');
    }
  },
}
</script>
<style>
body{
    margin: 0 auto;
    padding-left: 5%;
    padding-right: 5%;
    background: #45e586;
  }
  h1{
    background-color: darkSeaGreen;
  }
  #app {
    width: 90vw;
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    background-color: #fb0;
    font-size: 1vw/vh;
  }
  #col1{
    width: 50%;
    display: inline-block;
  }
  #col2{
    width: 50%;
    display: inline-block;
  }
  #show{
    margin: 0;
    text-align: left;
    font-size: 180%;
    margin: 0 auto;
    width: 50%;
    display: inline-block;
  }
  #completedTasks{
    background: darkSeaGreen;
  }
  .box{
    display: none;
  }
  .complete .select:checked~.box{
    width: 100%;
    background: #19f;
    display: block;
    padding-top: 1%;
    padding-bottom: 1%;
  }
  #undone{
    padding-top: 1%;
    padding-bottom: 1%;
  }
  #textbox{
    font-size: 140%;
    float: left;
    clear: left;
    margin-left: 10%;
    width: 40%;
  }
  button{
    background: #19f;
    clear:left;
    display: inline-block;
    border-radius: 2vh;
    font-size: 10vw/vh;
    font-weight: bold;
  }
  #showingcol2,#showingcol3{
    width: 25%;
    display: inline-block;
  }
  .delete{
    background: rgb(252, 0, 0);
  }
</style>