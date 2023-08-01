---
日志
---

<Timeline>
    <TimelineItem v-for="(item,i) in data" :key="i" :color="item.color">
        <Card hoverable :bodyStyle="{
            padding: '0px 16px',
            fontSize: '15px'
        }">
            <template #title>
                <div :class="$style['item-title']">
                    <div>{{item.title}}</div>
                    <div class="date-title">{{item.date}}</div>
                </div>
            </template>
            <ul>
                <li v-for="c,idx in item.list" :key="idx">
                    <div>
                        {{typeMap[c.type]}} {{ c.text }}
                    </div>
                    <template v-if="c.images">
                        <div v-for="img in c.images" :key="img" style="margin-top: 10px;">
                            <img :src="img" style="height: 150px"/>
                        </div>
                    </template>
                </li>
            </ul>
        </Card>
    </TimelineItem>
</Timeline>

<script setup lang="ts">
import { Timeline,TimelineItem,Card } from 'ant-design-vue'
import data from './data';
import {typeMap} from './data';

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
