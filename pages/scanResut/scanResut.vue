<template>
    <view>
        <uni-list><uni-list-item title="条码类型" :note="type"></uni-list-item></uni-list>
        <uni-list><uni-list-item title="条码内容" :note="result"></uni-list-item></uni-list>
    </view>
</template>

<script>
import { uniList, uniListItem } from '@dcloudio/uni-ui';
export default {
    components: {
    	uniList,
    	uniListItem
    },
    data() {
        return {
            type: '',
            result: ''
        };
    },
    onLoad(option) {
        this.type = option.type;
        this.result = option.result;
    },
    methods: {}
};
</script>

<style></style>
