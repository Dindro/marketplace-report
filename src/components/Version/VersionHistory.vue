<template>
    <div>
        <div v-for="(item, index) in data" :key="index" class="version-history">
            <div class="version-history__header">
                <span class="version-history__date">{{ item.date }}</span>
                <span class="version-history__time">{{ item.time }}</span>
            </div>

            <div v-if="item.points.length" class="version-history__points">
                <p v-for="(point, pointIndex) in item.points" class="version-history__point">
                    {{ pointIndex + 1 }}. {{ point }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    interface IVersion {
        date: string,
        time: string,
        points: string[];
    }

    const data: IVersion[] = [
        {
            date: '01.03.2023',
            time: '00:30',
            points: [
                'Добавил превью изображение рядом с продуктом',
                'Добавил учет в расчетах сторно продаж',
            ],
        },
        {
            date: '28.02.2023',
            time: '17:30',
            points: [
                'Добавил ссылку на страницу товара при нажатии на Код',
                'Добавил ссылку на страницу товара в кабинете поставщика при нажатии на Артикул'
            ],
        },
        {
            date: '28.02.2023',
            time: '17:00',
            points: ['Добавлено история изменений'],
        },
    ];
</script>

<style lang="scss" scoped>
    .version-history {
        font-size: 12px;
        line-height: 1.2;
        background-color: #F5F5F5;
        padding: 16px;
        width: 320px;
        border-radius: 12px;

        &__time {
            margin-left: 8px;
        }

        &__points {
            margin-top: 8px;
        }

        &__point {
            color: rgba(black, 0.5);

            & + & {
                margin-top: 4px;
            }
        }

        & + & {
            margin-top: 12px;
        }
    }
</style>