
<template>
    <!-- 编辑栏 -->
    <div class="editor" ref="imageTofile">
        <div class="editor-header">
             <div :class="header-undo"
                @click="handleUndo"
             >
                <icon-font
                    size="18"
                    title="撤回操作"
                    code="&#xe617;"
                    :class="`${canUndo ? '': 'disable-btn'}`"
                />               
             </div>
             <div :class="header-redo"
                @click="handleRedo"
             >
                <icon-font
                    size="18"
                    title="前进操作"
                    code="&#xe619;"
                    :class="`${canRedo ? '' : 'disable-btn'}`"                  
                />
                
             </div>    
        </div>

        <div class="editor-container">
            <DragArea :scale-num="scaleNum">
                
            </DragArea>
        </div>

    </div>
</template>

<script>

import { reactive, toRefs, getCurrentInstance, computed} from 'vue';
import { useStore } from 'vuex';
import DragArea from './MainEditorArea/dragArea.vue';
    export default {
        props:{

        },
        components: {
    DragArea,
    
},
        setup(props,context){
            const { proxy } = getCurrentInstance();
            const store = useStore()
            const data = reactive({

                scaleOption: 1,

                executeOpearation: computed(()=> {return store.getters.executeOpearation}),

                executeIndex: computed(()=> {return store.getters.executeIndex}),

                canUndo: computed(()=> data.executeIndex ),

                canRedo: computed(() => data.executeIndex < data.executeOpearation.length - 1 ),

                handleAddorSubScale: function(type) {
                    console.log(type)
                    if (type=== 'sub') {
                        this.scaleOption -= 0.1
                    }
                    else {
                        this.scaleOption += 0.1;
                    }
                },
                /**  放大比例
                 */
                scaleTipStyle: function(val) {
                    return `${Math.floor(val * 100)}%`
                },
                /**  撤回
                 */
                handleUndo: function() {
                    if(!this.canUndo) return;
                    store.commit('undo')  
                },

                handleRedo: function() {
                    if(!this.canRedo) return;
                    store.commit('redo')
                },

            })
            return {...toRefs(data)}
        }
    }
</script>

<style lang="less" scoped>
    
</style>