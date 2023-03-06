<template>
    <div :style="dragAreaOutStyle">
        <div
            ref="dragArea"
            class="dragArea"
            :style="scaleStyle"
            @dragover.prevent
            @drop="(e)=> addComponent(e)"
            @click="clearListener()"      
        >
            <VueDraggableResizable
                v-for="item in editorLayout"
                :id="item.id"
                :key="item.id"
                :x="item.x"
                :y="item.y"
                :w="item.width"
                :h="item.height"
                :parent="true"
                 :active="item.active"   
                :is-conflict-check="true"  
                :prevent-deactivation="true"
                @activated="onActivated(item)"
                @deactivated="onDeactivated(item)"
                @resizing="(x, y, w, h) => handleResize(item, x, y, w, h)"
                @dragging="(x, y, w, h) => handleDrag(item, x, y, w, h)"
                @dragstop="stopDrag"
                class="resize-box-class"
                class-name-active="active"
            >
                <div
                    style="width: 100%; height: 100%;"
                    @click="clearListener()"
                    @contextmenu.prevent="(e) => handleShowRightBar(e ,item)"
                >
                    <component
                        :is="`c-${item.data.type}`"
                        :data="item"
                    >                  
                    </component>
                </div>
            </VueDraggableResizable>
            <rightBar
                :right-context-config="rightContextConfig"
                :right-context-style="rightContextStyle"
                @handleDeleteCompoent="handleDeleteCompoent"
                @handleCopyCompoent="handleCopyCompoent"
                @handleTopComponent="handleTopComponent"
                @handleBottomComponent="handleBottomComponent"        
            />
            
            <div
                v-for="item in showRefrenceList['x']"
                :key="item"
                class="vertical-refrence"
                :style=" `left: ${item}px` "
            >
            </div>
            <div
                v-for="item in showRefrenceList['y']"
                :key="item"
                class="horizontal-refrence"
                :style=" `top: ${item}px` "
            >
            </div>          
        </div>
    </div>
</template>

<script>
//画布区域
import { mapGetters, useStore } from 'vuex';
import VueDraggbleResizable, { VueDraggableResizable } from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import myComponents from './editorComponent/cComponent'
import rightBar from '../rightBar.vue';
import { reactive, onMounted, getCurrentInstance,computed, toRefs } from 'vue';

    export default {
        props: {
            scaleNum: {
                type: Number,
                require: false
            }
        },
        components:{
            ...myComponents,
            VueDraggbleResizable,
            rightBar,   
        },
        setup(props,context){
            const { proxy } = getCurrentInstance();
            const store = useStore();
            onMounted(()=> {
                //全部置为非活跃状态
                proxy.$refs.dragArea.addEventListener('click', (e)=> {
                    e.stopPropagation();
                    const c = e.target.getAttribute('class');
                    if(c === 'dragArea') {
                        data.editorLayout.forEach((e) => {
                            e.active = false;
                        })
                    }
                })
            });
            
            const data = reactive({
                 editorLayout: computed(()=> store.getters.editorLayout), 
                 scaleStyle: computed(()=> {
                    return `
                        transform: scale(${props.scaleNum})
                        left: ${props.scaleNum < 0.5 ? `${200 * (2 - props.scaleNum)}px` : `100px`};
                        top: ${props.scaleNum < 0.5 ? `${200 * (2 - props.scaleNum)}px` : `100px`};
                    `;
                 }),
                 //位置
                 rightContextStyle: computed(() => {
                    const { location } = data.rightContextConfig;
                    return {
                        left: `${location.x}px`,
                        top: `${location.y}px`
                    }
                 }),
                 //画布大小
                 dragAreaOutStyle: computed(() => {
                    const left = props.scaleNum < 0.5 ? `${300 * (1 - props.scaleNum)}` : 100;
                    const top = props.scaleNum < 0.5 ? `${340 * (1 - props.scaleNum)}` : 100;
                    return `
                        width: ${props.scaleNum * 1920 + 2 * left}px;
                        height: ${props.scaleNum * 1080 + 2 * top}px;
                    `;
                 }),
                 //当前组件信息
                 rightContextConfig : {
                    showRightContextId: '',
                    location: {
                        x: 0, y: 0
                    }
                },
                //参照线
                showRefrenceList: {
                    x: [], y: []
                },
                
                addComponent: function(e) {
                    //e.dataTransfer是被拖拽的元素
                    const componentName = e.dataTransfer.getData('componentId');
                    const { offsetX, offsetY } = e;
                    store.dispatch('handleAddComponent',{
                        componentName,
                        x: offsetX,
                        y: offsetY
                    })
                },
                //
                handleDeleteCompoent: function() {
                    const { showRightContextId } = this.rightContextConfig;
                    if(!showRightContextId) {
                        return;
                    }
                    //传输
                    store.dispatch('handleDeleteComponent', { id: showRightContextId });
                    //删除后活跃前面一个组件
                    if(this.editorLayout.length > 0) {
                        this.editorLayout[this.editorLayout.length-1].active = true;
                    }
                },
                //
                handleCopyCompoent: (()=>{
                    const { showRightContextId } = data.rightContextConfig;
                    if(!showRightContextId) { return; }
                    store.dispatch('handleCopyCompoent',{ id: showRightContextId })
                    if(data.editorLayout.length > 0) {
                        data.editorLayout[data.editorLayout.length - 1].active = true;
                    }
                }),
                //
                handleTopComponent: function() {
                    const { showRightContextId } = this.rightContextConfig;
                    if (!showRightContextId) { return; }
                    store.dispatch('handleTopComponent',{ id: showRightContextId })
                },
                //
                handleBottomComponent: function() {
                    const { showRightContextId } = this.rightContextConfig;
                    if (!showRightContextId) { return ;}
                    store.dispatch('handleBottomComponent', { id: showRightContextId })
                },
                //选中活跃
                onActivated: function(e) {
                    data.editorLayout.forEach((element) => {
                        const { id } = element;
                        if(id === e.id) {
                            element.active = true;
                        } else {
                            element.active = false;
                        }
                    })
                    e.active = true;
                },

                onDeactivated: function(e) {
                    console.log(e);
                },
                //停止拖拽
                stopDrag: function() {
                    this.showRefrenceList = {
                        x: [], y: []
                    }
                },
                //处理拖拽
                handleDrag: function(e, x, y) {
                    let finalX = x;
                    let finalY = y;
                    const showXList = [];  //收集移动路径
                    const showYList = [];
                    const getRefrenceLines = (item) => {
                        //获取参考线
                        let curX = [];
                        let curY = [];
                        for (let i = 0; i < this.editorLayout.length; i+= 1) {
                            if(item.id === this.editorLayout[i].id) {
                                continue;
                            }
                            const {
                                x: X, y: Y, width, height,
                            } = this.editorLayout[i];
                            curX = curX.concat(X, X + width);
                            curY = curY.concat(Y, Y + height);
                        }
                        return { 
                            x: [960, ...curX],
                            y: [540, ...curY],                          
                        }
                    };
                    //获取当前的组件位置等。。。
                    const currentRefrenceList = getRefrenceLines(e);

                    for (let i = 0; i < currentRefrenceList.x.length; i += 1) {
                        const cur = currentRefrenceList.y[i];
                        if (finalY === cur) {
                            return;
                        }
                        if(Math.abs(finalY - cur) <= 30) {
                            showYList.push(cur);
                            finalY = cur;
                        }
                    }

                    this.showRefrenceList = {
                        x: showXList, y: showYList
                    };

                    for (let i = 0; i < this.editorLayout.length; i += 1) {
                        const element = this.editorLayout[i];
                        const { id } = element;
                        if (id === e.id) {
                        element.x = finalX;
                        element.y = finalY;
                        }
                    }
                },
                //处理组件缩放
                handleResize: function(e, x, y, w, h) {
                    for(let i = 0; i < this.editorLayout.length; i += 1) {
                        const element = this.editorLayout[i];
                        const { id } = element;
                        if (id === e.id) {
                            element.x = x;
                            element.y = y;
                            element.width = w;
                            element.height = h;
                        }
                    }
                },
                //右键菜单在哪里显示
                handleShowRightBar: function(e , item) {
                    const { offsetX, offsetY } = e;
                    const { id, x, y } = item;
                    this.rightContextConfig = {
                        showRightContextId: id,
                        location: {
                            //元素位置加上相对元素偏移量
                            x: offsetX + x,
                            y: offsetY + y,
                        }
                    };
                },
                //点击空白区域
                clearListener: function() {
                    this.rightContextConfig.showRightContextId = '';
                }
            })
            return {...toRefs(data)}
        }
    }
</script>

<style lang="less" scoped>
    .dragArea {
        width: 1920px;
        height: 1080px;
        background: rgba(255, 255, 255, 0.747);
        position: relative;
        transform-origin: 0px 0px;
        transition: all 0.2s ease 0s;
        .resize-box-class {
            border: 1px solid transparent;
        }
        .active {
            border: 1px solid #000;
        }
        .resize {
            border: 1px solid transparent;
            cursor: move;
        }
        .active-resize {
            border: 1px solid #000;
        }
        .horizontal-refrence {
            width: 100%;
            height: 1px;
            background-color: rgba(255, 0, 0, 0.5);
            position: absolute;
        }
        .vertical-refrence {
            height: 100%;
            width: 1px;
            background-color: rgba(255, 0, 0, 0.5);
            position: absolute;
        }
    }

</style>