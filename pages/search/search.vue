<template>
    <view><zy-search :is-focus="false" :theme="themeClass" :show-want="true" :speechEngine="speechEngine" :hot-list="hotList" @getSearchText="getSearchText"></zy-search>
    <scroll-view scroll-y="true">
    	<block v-for="(item, index) in projectData" :key="index">
    		<uni-card
    			:title="item.name"
    			thumbnail="../../static/project.png"
    			:extra="item.remark"
    			:note="item.codeGitUrl"
    			is-shadow="true"
    			@tap="goFunctionPage(item.id, item.name)"
    		>
    			{{ item.desc }}
    		</uni-card>
    	</block>
    </scroll-view>
    </view>
</template>

<script>
import zySearch from '@/components/zy-search/zy-search.vue';
import { uniCard } from '@dcloudio/uni-ui';
import urlConfig from '@/common/config.js'

export default {
    components: {
        zySearch,
        uniCard
    },

    onLoad() {
    },
    data() {
        return {
            themeClass: 'circle',
            //语音识别引擎
            speechEngine: 'baidu',
            //初始化推荐列表
            hotList: ['百益新生活', '百益云智管'],
            projectData: []
        };
    },
    methods: {
        getSearchText(e) {
            console.log('回调的搜索信息: ' + e)
            this.loadProject(e);
        },
        
        loadProject(name) {
        	uni.request({
        		method: 'GET',
        		url: urlConfig + 'project?name=' + name,
        		dataType: 'JSON',
        		success: res => {
        			let dataObj = JSON.parse(res.data);
                    console.log(dataObj)
        			this.projectData = dataObj.data;
        		},
        		complete() {
        			uni.stopPullDownRefresh();
        		}
        	});
        },
        
        goFunctionPage(projectId, title) {
        	console.log('click');
        	uni.navigateTo({
        		url: '/pages/function/function?id=' + projectId + '&title=' + title + '&onlyMe=false'
        	});
        }
    }
};
</script>

<style></style>
