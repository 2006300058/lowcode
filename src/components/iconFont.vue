<template>
    <i
        class="iconfont"
        :title="title"
        :style="mStyle"
        v-html="code"
    />
</template>

<script>
import { computed } from 'vue';
    export default {
        props: {
            title: {
                type:String,
                require: false,
            }
        },
        setup(){
            const mStyle = computed(()=>{
                const _style = {};
                if (mStyle.value.color) {
                    _style.color = this.color;
                }
                if (mStyle.value.size) {
                    _style.fontSize = `${this.size.toString()}px`;
                }
                return _style;
            })
        }
    }
</script>

<style lang="less" scoped>
    
</style>