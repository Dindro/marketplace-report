<template>
    <div class="summary">
        <p v-if="props.summary.unkownCount" class="summary__warning">
            <b>Внимание!</b> Имеется неизвестный вид оплаты.
            <br>
            Расчет может быть не правильным.
        </p>

        <div class="summary__group">
            <div class="summary__item summary-item">
                <p class="summary-item__title">Продажа</p>
                <p class="summary-item__value">{{ (props.summary.price / 100).toLocaleString() }} ₽</p>
            </div>
            <div v-if="props.summary.buyCorrect" class="summary__item summary-item">
                <p class="summary-item__title">Корректная продажа</p>
                <p class="summary-item__value">
                    {{ (props.summary.buyCorrect / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.buyCorrectCount }}</span>
                    <span class="info">Учитывается в расчетах</span>
                </p>
            </div>
            <div v-if="props.summary.marriage" class="summary__item summary-item">
                <p class="summary-item__title">Оплата брака</p>
                <p class="summary-item__value">
                    {{ (props.summary.marriage / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.marriageCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.lost" class="summary__item summary-item">
                <p class="summary-item__title">Оплата потерянного</p>
                <p class="summary-item__value">
                    {{ (props.summary.lost / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.lostCount }}</span>
                </p>
            </div>
        </div>

        <div class="summary__group">
            <div class="summary__item summary-item">
                <p class="summary-item__title">Логистика</p>
                <p class="summary-item__value">
                    {{ (props.summary.delivery / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.deliveryCount" class="snap">{{ props.summary.deliveryCount }}</span>
                </p>
            </div>
            <div class="summary__item summary-item">
                <p class="summary-item__title">Обратная логистика</p>
                <p class="summary-item__value">
                    {{ (props.summary.deliveryReturn / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.deliveryReturnCount" class="snap">{{ props.summary.deliveryReturnCount }}</span>
                </p>
            </div>
            <div class="summary__item summary-item">
                <p class="summary-item__title">Возврат</p>
                <p class="summary-item__value">
                    {{ (props.summary.return / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.returnCount" class="snap">{{ props.summary.returnCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.reversal" class="summary__item summary-item">
                <p class="summary-item__title">Сторно продаж</p>
                <p class="summary-item__value">
                    {{ (props.summary.reversal / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.reversalCount" class="snap">{{ props.summary.reversalCount }}</span>
                    <span class="info">Учитывается в расчетах</span>
                </p>
            </div>
            <div v-if="props.summary.fines" class="summary__item summary-item summary-item--warning">
                <p class="summary-item__title">Штрафы</p>
                <p class="summary-item__value">
                    {{ (props.summary.fines / 100).toLocaleString() }} ₽
                    <span
                        class="snap snap--warning"
                        :title="finesTitle"
                    >
                        {{ props.summary.finesCount }}
                    </span>
                </p>
            </div>
        </div>
        
        <div class="summary__group">
            <div class="summary__item summary-item">
                <p class="summary-item__title">К переводу</p>
                <p class="summary-item__value">{{ (props.summary.revenue / 100).toLocaleString() }} ₽</p>
            </div>
            <div class="summary__item summary-item">
                <p class="summary-item__title">НДС</p>
                <p class="summary-item__value">
                    {{ (props.summary.tax / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.tax" class="snap snap--minor">{{ props.summary.taxPercent }}% от {{ (props.summary.taxSource / 100).toLocaleString() }} ₽</span>
                </p>
            </div>
            <div class="summary__item summary-item">
                <p class="summary-item__title">К переводу без НДС</p>
                <p class="summary-item__value">{{ (props.summary.revenueWithoutTax / 100).toLocaleString() }} ₽</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';

    import type { ISummaryReport } from '@/use-cases/GetReportUseCase/IGetReportResponseModel';

    const props = defineProps<{ summary: ISummaryReport }>();

    const finesTitle = computed(() => {
        if (!props.summary.finesDescription.length) return '';
        else if (props.summary.finesDescription.length === 1) return props.summary.finesDescription.join();
        else return props.summary.finesDescription.map((description, index) => `${index + 1}. ${description}`).join('\n');
    });
</script>

<style lang="scss" scoped>
    .summary {
        font-size: 12px;
        line-height: 1.1;

        &__warning {
            color: #D15C5C;
            margin-bottom: 16px;

            b {
                font-weight: bold;
            }
        }

        &__group {
            & + & {
                margin-top: 16px;
            }
        }

        &__item {
            & + & {
                margin-top: 4px;
            }
        }
    }

    .summary-item {
        $b: #{&};

        display: flex;

        &__title {
            color: rgba(black, 0.5);
            width: 150px;
        }

        &__value {
            display: flex;
            align-items: center;

            .snap,
            .info {
                margin-left: 4px;
            }
        }

        &--warning {
            &,
            #{$b}__title {
                color: #D15C5C;
            }
        }
    }

    .snap {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #5394F5;
        color: white;
        font-weight: bold;
        font-size: 10px;
        border-radius: 10px;
        padding: 0 3px;
        min-width: 13px;
        height: 13px;

        &--warning {
            background-color: #D15C5C;
        }

        &--minor {
            background-color: #808080;
        }

        &[title] {
            cursor: help;
        }
    }

    .info {
        color: rgba(black, 0.5);
        font-size: 11px;
        line-height: 1.1;
    }
</style>