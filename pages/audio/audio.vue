<template>
    <view>
        <view class="page-body">
            <view class="page-section page-section-gap" style="text-align: center;">
                <audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author" :action="audioAction" controls></audio>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            current: {
                poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
                name: '致爱丽丝',
                author: 'Fred',
                src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3'
            },
            audioAction: {
                method: 'pause'
            }
        };
    },
    methods: {}
};
</script>

<style></style>
