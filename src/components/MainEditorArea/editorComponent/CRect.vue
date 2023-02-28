<template>
    <div
        class="btn-box"
        :style="boxStyle"
    >
    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';

    export default {
        props: {
            data: {
                type: Object,
                require: true,
                default: null,
            }
        },
        components: {},
        setup(props,context) {
            const data = reactive({
                options: computed(()=> props.data.data.componentData),
                boxStyle : computed(() => {
                    const { fourBorderRadius } = data.options;
                    const { left, right, top, bottom } = fourBorderRadius;
                    const { bgcolor } = props.data;
                    return {
                        backgroundColor: bgcolor,
                        fourBorderRadius: `${top}px ${right}px ${bottom}px ${left}px`,
                    }
                }),
            })
            return { ...toRefs(data)}
        }
    }
</script>

<style lang="less" scoped>
    .btn-box {
        height: 100%;
        width: 100%;
        caret-color: transparent;
        overflow: hidden;
    }
</style>