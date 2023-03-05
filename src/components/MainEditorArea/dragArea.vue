<template>
    <div>
    </div>
</template>

<script>
//画布区域
import { mapGetters, useStore } from 'vuex';
import VueDraggbleResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import myComponents from './editorComponent/cComponent'
import rightBar from '../rightBar.vue';
import { reactive, onMounted, getCurrentInstance,computed } from 'vue';

    export default {
        props: {
            scaleNum: {
                type: Number,
                require: false
            }
        },
        components:{
            ...myComponents,VueDraggbleResizable,rightBar
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
                }

                


            })
        }
    }
</script>

<style lang="less" scoped>

</style>