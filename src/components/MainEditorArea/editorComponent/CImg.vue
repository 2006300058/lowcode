<template>
    <div
        class="img-box"
        :style="boxStyle"
    >
    </div>
</template>

<script>
    import { onMounted, reactive,computed, toRefs } from 'vue';
    export default {
        props: {
                data: {
                    type: Object,
                    default: null,
                    require: true,
                },          
            },
        components: {},
        setup(props,context) {
            onMounted(() => {});
            const data = reactive({
                options: computed(()=> props.data.data.componentData),
                boxStyle : computed(()=> {
                    const { fourBorderRadius } = data.options;
                    const { left, right, top, bottom } = fourBorderRadius;
                    return {
                        backgroundImg: `url(${data.options.imgUrl})`,
                        backgroundRepeat: `${data.options.showType === 'full' ? 'repeat': 'no-repeat'}`,
                        backgroundSize: `${data.options.showType === 'full' ? 'contain' : 'cover'}`,
                        backgroundRadius: `${top}px ${right}px ${bottom}px ${left}px`
                    }
                })
            });
            return {...toRefs(data)}
        }
       
    }
</script>

<style lang="less" scoped>
    .img-box {
        caret-color: transparent;
        overflow: auto;
        height: 100%;
        width: 100%;
    }
</style>