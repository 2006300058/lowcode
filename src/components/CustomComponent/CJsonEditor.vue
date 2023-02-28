<template>
    <vue-json-editor
        :show-btns="false"
        @json-save="onJsonChange"
        :expandedOnStart="false"
        mode="mode"
        v-model="curValue"
        

    >
    </vue-json-editor>
</template>

<script>
import { reactive, toRefs } from 'vue';
import vueJsonEditor from 'vue-json-editor'
export default {
    components:{ vueJsonEditor },
    props: {
        value: {
            default: null,
            require: true,
            type: Array,
        },
        options : {
            default: null,
            type: Array,
            require: false,
        }
    },
    setup(props,context) {
        const data = reactive({
            curValue: props.value,
            onJsonChange: function(val) {
                context.emit('input', val);
            }
        });
        return {...toRefs(data)}
    }
}
</script>

<style>
</style>