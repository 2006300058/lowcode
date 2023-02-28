<template>
    <!-- 颜色组件 -->
    <div class="color-picker">
        <el-popover
            v-model="showPickColor"
            placement="bottom"
            trigger="manual"
            popper-class="color-popover"
        >
            <sketch-pick
                :value="currentColor"
                :preset-colors="presetColors"
                @input="handleChangeColor"
            >              
            </sketch-pick>
            <span
                v-slot="reference"
                @click="handleShowColorPicker"
                class="color-preview" :style="`backgroundColor:${currentColor}`"
            >
            </span>
        </el-popover>
    </div>
</template>

<script>
import {Sketch} from 'vue-color'
import {reactive,toRefs} from 'vue'
    export default {
        components: {
            'sketch-pick': Sketch
        },
        props: {
            //接受外部组件传来的数据
            value: {
                type: String,
                require: true,
                default: null,
            },
        },
        setup(props,context) {
            const data = reactive({
                currentColor : props.value,
                showPickColor: false,
                presetColors: ['#D20000', '#FF0000', '#FFA200', '#EBDF00', '#7ED332', '#00B442', '#010192', '#fff192'],

                handleShowColorPicker: function(e){
                    e.stopPropagation();
                    data.showPickColor = true;
                    document.addEventListener('click',()=>{
                        data.showPickColor = false;
                    })
                },
                handleChangeColor: function(color){
                    const { hex8 } = color;
                    data.currentColor = hex8;
                    context.emit('input', hex8);
                },         
            })
            return {...toRefs(data)}
        }
    }
</script>

<style lang="less" >
    .color-popover {
        padding: 0px;
    }
    .color-preview {
        display: block;
        width: 80px;
        height: 20px;
        border: 2px solid rgba(102, 102, 102, 0.747);
        caret-color: transparent;
    }
</style>