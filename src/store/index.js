import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        title: 'MY TO DO LIST',
        todoList : [],
    },
    mutations:{
        readTheTasks(state){
            let data = localStorage.getItem('todos');
            if(data != null){
                state.todoList = JSON.parse(data);
            }
        },
        writeTheTasks(){
            localStorage.setItem('todos', JSON.stringify(store.state.todoList));
        }
    },
    getters:{
        getTitle(state){
            return state.title;
        },
        hideCompletedTasks(state){
            return state.todoList.filter(t=>!t.done);
        },
        showCompletedTasks(state){
            return state.todoList.filter(t=>t.done);
        },
    },
    actions:{
        read(state){
            state.commit('readTheTasks');
        },
        write(state){
            state.commit('writeTheTasks');
        }
    },
});
export default store