---
日志
---

<Timeline>
    <TimelineItem v-for="(item,i) in data" :key="i" :color="item.color">
        <Card hoverable :bodyStyle="{
            padding: '0px 16px'
        }">
            <template #title>
                <div :class="$style['item-title']">
                    <div>{{item.title}}</div>
                    <div class="date-title">{{item.date}}</div>
                </div>
            </template>
            <ol>
                <li v-for="c,idx in item.list" :key="idx">{{ c.text }}</li>
            </ol>
        </Card>
    </TimelineItem>
</Timeline>

<script setup lang="ts">
import { Timeline,TimelineItem,Card } from 'ant-design-vue'
import data from './data';

</script>
<!-- md 推荐用法 -->
<style module>
.item-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
}
.date-title{
    font-weight: bold;
    font-size: 16px;
}

</style>
