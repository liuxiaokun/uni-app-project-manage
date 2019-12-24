<template>
    <view><zy-search :is-focus="false" :theme="themeClass" :show-want="true" :speechEngine="speechEngine" :hot-list="hotList" @getSearchText="getSearchText"></zy-search></view>
</template>

<script>
import zySearch from '@/components/zy-search/zy-search.vue';
export default {
    components: {
        zySearch
    },

    onLoad(option) {
        console.log(option.value);
    },
    data() {
        return {
            themeClass: 'circle',
            //语音识别引擎
            speechEngine: 'baidu',
            //初始化推荐列表
            hotList: ['百益新生活', '百益云智管', '百益项目管制']
        };
    },
    methods: {
        getSearchText(e) {
            uni.showToast({
                title: '回调的搜索信息: ' + e,
                icon: 'none'
            });
        }
    }
};
</script>

<style></style>
