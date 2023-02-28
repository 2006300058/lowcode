<template>
    <div
        class="text-box"
        :style="boxStyle"
    >
        <div>{{ options.text }}</div>
    </div>
</template>

<script>
import { computedAsync } from '@vueuse/core';
import { reactive, toRefs, onMounted, computed } from 'vue';

    export default {
        props: {
            data: {
                type: Object,
                default: null,
                require: true
            }
        },
        components: {},
        setup(props,context) {

            onMounted(()=>{});

            const data = reactive({
                options: computed(()=>{
                    return props.data.data.comopentData;
                }),
                boxStyle: computed(()=>{
                    const {
                        fontSize,
                        textAlign,
                        fontNormal,
                        fourBorderRadius
                    } = data.options;
                    const {
                        bold, italic, underLine,
                    } = fontNormal;
                    const {
                        bgcolor
                    } = props.data;
                    const {
                        left, top, right, bottom
                    } = fourBorderRadius;
                    return {
                        fontSize: `${fontSize}px`,
                        fontWeight: bold ? 'bold' : 'normal',
                        fontStyle: italic ? 'italic' : 'normal',
                        textDecoration: underLine ? 'underLine' : 'none',
                        textAlign,
                        backgroundColor: bgcolor,
                        borderRadius: `${top}px ${right}px ${bottom}px ${left}px`
                    }
                })

            });
            return {...toRefs(data)}
        }
    }
</script>

<style lang="less" scoped>
.text-box {
    caret-color: transparent;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

</style>