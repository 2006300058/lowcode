<template>
    <!-- 选择框 -->
    <el-select
        v-model="curValue"
        @change="handleChangeVal"
        v-bind="$attrs"
    >
        <el-option 
            v-for="item in options"
            :key="item.key"
            :value="item.key"
            :label="item.label"
        />
        
    </el-select>
</template>

<script>
import { toRefs, reactive } from 'vue';

    export default {
        props: {
            value: {
                type: String,
                require: true,
                default: null,
            },
            options: {
                type: Array,
                require: false,
                default: null,
            }
        },
        setup(props,context) {
             const data = reactive({
                curValue: props.value,
                handleChangeVal(val) {
                    context.emit('input', val);
                    
                }
             })
             return {...toRefs(data), props}
        }
    }
</script>

<style>

</style>