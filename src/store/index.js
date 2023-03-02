import {createStore} from 'vuex'
import { uuid } from 'uuidv4'
import * as Config from './component-config'

export default createStore ({
    state: {
        editorLayout: [], //当前的所有组件
        componentLists: [],
        executeOpearation: [ 
            []
        ],  //每次操作后的所有组件
        executeIndex: 0,
    },
    mutations: {
        set_editorLayout: (state, payload) => {
            state.editorLayout = payload.editorLayout;
        },
        addComponent: (state, payload) => { //添加组件
            state.editorLayout.push(payload);
        },
        deleteComponent: (state, payload) => {
            state.editorLayout = state.editorLayout.filter((component) => payload !== component.id );
        },
        undo : (state) => { //撤回操作
            if(state.executeIndex <= 0) {  //判断是否可以撤回
                return;
            }
            state.executeIndex -= 1;  //组件-1
            const preState = state.executeOpearation[state.executeIndex]; //回退到前一个组件
            state.editorLayout = preState; //跟着回退
        },
        redo : (state) => { //反向撤回操作，方法和撤回类似
            if(state.executeIndex >= state.executeOpearation.length) return; //判断是否超过所有的组件
            state.executeIndex += 1;
            const preState = state.executeOpearation[state.executeIndex];
            state.editorLayout = preState; 
        },
        record: (state) => { //记录操作
            let curExecute = JSON.parse(JSON.stringify(state.executeOpearation));
            state.executeIndex += 1;
            curExecute = curExecute.slice(0, state.executeIndex);
            curExecute.push(JSON.parse(JSON.stringify(state.editorLayout)));
            state.executeOpearation = curExecute;
        }

    },
    actions: {
        handleAddComponent({commit, state}, {componentName, x, y}) {
            if( !componentName ) {
                return;
            }
            const newObject = JSON.parse(JSON.stringify(Config[componentName.toUpperCase()])); //这样是深拷贝二者相互影响
            const component = {
                ...newObject,
                name: `新建图层${state.editorLayout.length+1}`,
                x: x || 10,
                y: y || 10,
                width: newObject.width || 400,
                height: newObject.height || 400,
                bgcolor: newObject.bgcolor || '#fff',
                active: false,
                id: uuid().replace(/-/g , ''),
            };
            commit('addComponent', component);
            commit('record');
        },
        handleDeleteComponent({ commit },{ id }) {
            commit('deleteComponent', id);
            commit('record');
        },
        handleCopyComponent({commit, state},{ id }) {
            let component = {};
            state.editorLayout.forEach((v) => {
                if(v.id === id) {
                    component = JSON.parse(JSON.stringify(v));
                }
            });
            component = {
                ...component,
                active: true,
                name: `${component.name}(复制)`,
                x: 10,
                y: 10,
                id: uuid(),
            };
            commit('addComponent', component);
        },
        handleTopcomponent({ commit, state }, { id }) {
            //将当前操作元素放在队尾
            const layout = state.editorLayout;
            const index = layout.findIndex((item) => item.id === id);
            const cur = layout.splice(index, 1);
            layout.push(cur[0]);
            commit('set_editorLayout', {
                editorLayout: layout,
            });
        },
        handleBottomComponent({ commit, state}, { id }) {
            //放队头
            const layout = state.editorLayout;
            const index = layout.findIndex((item) => item.id === id);
            const cur = layout.splice(index , 1);
            layout.unshift(cur[0]);
            commit('set_editorLayout', {
                editorLayout: layout,
            });
        }
    },
    getters: {
        editorLayout: (state) => state.editorLayout,
        //选择活跃组件
        selectComponent: (state) => state.editorLayout.find((v) => v.active === true),
        executeIndex: (state) => state.executeIndex,
        executeOpearation: (state) => state.executeOpearation,
    }

})