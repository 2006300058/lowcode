<template>
    <div>
    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';

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
        const data = reactive({
            options: computed(()=> props.data.data.componentData),
            boxStyle: function() {
                const { fourBorderRadius } = data.options;
                const {left,right,top,bottom} = fourBorderRadius;
                return { 
                    borderRadius: `${top}px ${right}px ${bottom}px ${left}px`
                }
            },
        });
        return {...toRefs(data)}
    }
}
</script>