<template>
    <div class="product-report">
        <div class="product-report__product product-info">
            <div class="product-info__header">
                <span class="product-info__code">{{ code }}</span>
                <span class="product-info__code product-info__code--red">ШК {{ barcode }}</span>
                <span class="product-info__brand">{{ brand }}</span>
                <template v-if="brand"> / </template>
                <span class="product-info__category">{{ category }}</span>
            </div>
            <p class="product-info__name">{{ name }}</p>
        </div>
        <div class="product-report__fraction-list">
            <span class="product-report__product-fraction">{{ fraction }}%</span>
        </div>
        <p class="product-report__price">
            {{ price / 100 }}₽
            <span class="product-report__revenue">
                Без учета налога
                <span class="product-report__revenue-value">{{ revenue / 100 }}₽</span>
            </span>
        </p>
        <div class="product-report__cost">
            <table>
                <tr v-for="cost in costs" :key="cost.name">
                    <td>{{ cost.name }}</td><td>{{ cost.value }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
    code: string,
    category: string,
    name: string,
    fraction?: number,
    price: number;
    delivery: number,
    stateTax: number,
    orderCount: number,
    return: number;
    revenue: number;
    barcode: number;
    brand: string;
}>();

const costs = computed(() => ([
    { name: 'Кол-во заказов', value: props.orderCount },
    { name: 'Логистика', value: `${props.delivery / 100}₽` },
    { name: 'Логистика возврата', value: `${props.return / 100}₽` },
    { name: 'Налог', value: `${props.stateTax / 100}₽` },
]));
</script>

<style lang="scss" scoped>
.product-report {
    &__price {
        font-size: larger;
        font-weight: bold;
    }

    &__fraction-list {
        position: relative;
    }

    &__product-fraction {
        position: absolute;
        right: calc(100% + 8px);
        font-size: small;
        opacity: 0.5;
    }

    &__revenue {
        padding: 4px 6px;
        border-radius: 4px;
        background-color: #c6edbc;
        color: black;
        font-size: small;
        margin-left: 8px;
    }

    &__revenue-value {
        font-size: large;
        font-weight: bold;
    }

    &__cost {
        font-size: small;

        table {
            border-spacing: 0;
        }

        td:nth-child(1) {
            opacity: 0.5;
        }

        td:nth-child(2) {
            padding-left: 8px;
            font-weight: bold;
        }
    }
}

.product-info {
    &__code {
        & + & {
            margin-left: 4px;
        }

        background-color: #f0f5c1;
        border-radius: 4px;
        color: black;
        padding: 2px 4px;
        font-size: small;

        &--red {
            background-color: #efb8b8;
        }
    }

    &__brand {
        font-weight: bold;
        margin-left: 8px;
    }

    &__category {
        font-size: small;
        opacity: 0.5;
    }
}
</style>