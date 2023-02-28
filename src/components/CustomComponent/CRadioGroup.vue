<template>
    <!-- 三单选框 -->
    <el-radio-group
        v-model="curValue"
        @change="handleChangeVal"
        v-bind="$attrs"
    >
        <el-radio-button
            v-for="item in options"
            :key="item.key"
            :label="item.key"
        >
            {{ item.label }}
        </el-radio-button>
    </el-radio-group>
</template>

<script>
import { reactive, toRefs } from 'vue';

    export default {
        props: {
            value:{
                type: String,
                default: null,
                require: true,
            },
            options: {
                type: Array,
                default: null,
                require: false,
            }
        },
        setup(props,context){
            const data = reactive({
                curValue: props.value,
                handleChangeVal: function(val) {
                    context.emit('input', val)
                }
            })
            return {...toRefs(data)}
        }
    }
</script>

<style>

</style>