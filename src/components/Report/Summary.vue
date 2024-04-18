<template>
    <div class="summary">
        <p v-if="props.summary.unkownCount" class="summary__warning">
            <b>Внимание!</b> Имеется неизвестный вид оплаты.
            <br>
            Расчет может быть не правильным.
        </p>

        <div v-if="visibleSales" class="summary__group">
            <div class="summary__item summary-item">
                <p class="summary-item__title">Реализовали товар</p>
                <p class="summary-item__value">
                    {{ (props.summary.buyerPaid / 100).toLocaleString() }} ₽
                    <span class="info">В отчете «Продажа»</span>
                </p>
            </div>
            <div class="summary__item summary-item">
                <p class="summary-item__title">Перевод за продажи</p>
                <p class="summary-item__value">
                    {{ (props.summary.transferredForProducts / 100).toLocaleString() }} ₽
                    <span class="info">В отчете «К перечислению за товар»</span>
                </p>
            </div>
        </div>

        <div class="summary__group">
            <div class="summary__item summary-item">
                <p class="summary-item__title">Продажи</p>
                <p class="summary-item__value">
                    {{ (props.summary.sale / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.saleCount" class="snap">{{ props.summary.saleCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.saleCorrect" class="summary__item summary-item">
                <p class="summary-item__title">Корректная продажа</p>
                <p class="summary-item__value">
                    {{ (props.summary.saleCorrect / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.saleCorrectCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.reversalReturn" class="summary__item summary-item">
                <p class="summary-item__title">Сторно возвратов</p>
                <p class="summary-item__value">
                    {{ (props.summary.reversalReturn / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.reversalReturnCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.marriage" class="summary__item summary-item">
                <p class="summary-item__title">Оплата брака</p>
                <p class="summary-item__value">
                    {{ (props.summary.marriage / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.marriageCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.partialMarriage" class="summary__item summary-item">
                <p class="summary-item__title">Частичная опл. брака</p>
                <p class="summary-item__value">
                    {{ (props.summary.partialMarriage / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.partialMarriageCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.lost" class="summary__item summary-item">
                <p class="summary-item__title">Оплата потерянного</p>
                <p class="summary-item__value">
                    {{ (props.summary.lost / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.lostCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.withoutMovement" class="summary__item summary-item">
                <p class="summary-item__title">Оплата без движения</p>
                <p class="summary-item__value">
                    {{ (props.summary.withoutMovement / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.withoutMovementCount" class="snap">{{ props.summary.withoutMovementCount }}</span>
                    <span class="info">Авансовая оплата за товар без движения</span>
                </p>
            </div>
            <div v-if="props.summary.paymentShippingCost" class="summary__item summary-item">
                <p class="summary-item__title">Издержки перевозки</p>
                <p class="summary-item__value">
                    {{ (props.summary.paymentShippingCost / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.paymentShippingCostCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.compensationReplacement" class="summary__item summary-item">
                <p class="summary-item__title">Оплата за подмен</p>
                <p class="summary-item__value">
                    {{ (props.summary.compensationReplacement / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.compensationReplacementCount }}</span>
                </p>
            </div>
        </div>

        <div class="summary__group">
            <div class="summary__item summary-item">
                <p class="summary-item__title">Общая логистика</p>
                <p class="summary-item__value">
                    {{ (props.summary.deliveryCommon / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.deliveryCommonCount" class="snap" :title="deliveryTitle">{{ props.summary.deliveryCommonCount }}</span>
                    <span v-if="visibleSales" class="info">В отчете «Стоимость логистики»</span>
                </p>
            </div>

            <div class="summary__item summary-item summary-item--sub">
                <p class="summary-item__title">Логистика</p>
                <p class="summary-item__value">
                    {{ (props.summary.delivery / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.deliveryCount" class="snap snap--minor">{{ props.summary.deliveryCount }}</span>
                </p>
            </div>
            <div class="summary__item summary-item summary-item--sub">
                <p class="summary-item__title">Обратная логистика</p>
                <p class="summary-item__value">
                    {{ (props.summary.deliveryReturn / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.deliveryReturnCount" class="snap snap--minor">{{ props.summary.deliveryReturnCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.deliveryCorrect" class="summary__item summary-item summary-item--sub">
                <p class="summary-item__title">Коррект. логистика</p>
                <p class="summary-item__value">
                    {{ (props.summary.deliveryCorrect / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.deliveryCorrectCount" class="snap snap--minor">{{ props.summary.deliveryCorrectCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.deliveryReversal" class="summary__item summary-item summary-item--sub">
                <p class="summary-item__title">Логистика сторно</p>
                <p class="summary-item__value">
                    {{ (props.summary.deliveryReversal / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.deliveryReversalCount" class="snap snap--success">{{ props.summary.deliveryReversalCount }}</span>
                </p>
            </div>
        </div>

        <div class="summary__group">
            <div class="summary__item summary-item">
                <p class="summary-item__title">Возврат</p>
                <p class="summary-item__value">
                    {{ (props.summary.return / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.returnCount" class="snap">{{ props.summary.returnCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.returnMarriage" class="summary__item summary-item">
                <p class="summary-item__title">Возврат оплаты брака</p>
                <p class="summary-item__value">
                    {{ (props.summary.returnMarriage / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.returnMarriageCount" class="snap">{{ props.summary.returnMarriageCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.returnPartialMarriage" class="summary__item summary-item">
                <p class="summary-item__title">Частичный возв. брака</p>
                <p class="summary-item__value">
                    {{ (props.summary.returnPartialMarriage / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.returnPartialMarriageCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.returnLostProduct" class="summary__item summary-item">
                <p class="summary-item__title">Возврат потерянного</p>
                <p class="summary-item__value">
                    {{ (props.summary.returnLostProduct / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.returnLostProductCount" class="snap">{{ props.summary.returnLostProductCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.returnCorrect" class="summary__item summary-item">
                <p class="summary-item__title">Корректный возврат</p>
                <p class="summary-item__value">
                    {{ (props.summary.returnCorrect / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.returnCorrectCount" class="snap">{{ props.summary.returnCorrectCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.reversal" class="summary__item summary-item">
                <p class="summary-item__title">Сторно продаж</p>
                <p class="summary-item__value">
                    {{ (props.summary.reversal / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.reversalCount" class="snap">{{ props.summary.reversalCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.returnWithoutMovement" class="summary__item summary-item">
                <p class="summary-item__title">Возврат без движения</p>
                <p class="summary-item__value">
                    {{ (props.summary.returnWithoutMovement / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.returnWithoutMovementCount" class="snap">{{ props.summary.returnWithoutMovementCount }}</span>
                    <span class="info">Авансовая оплата за товар без движения</span>
                </p>
            </div>
            <div v-if="props.summary.returnCompensationReplacement" class="summary__item summary-item">
                <p class="summary-item__title">Возврат за подмен</p>
                <p class="summary-item__value">
                    {{ (props.summary.returnCompensationReplacement / 100).toLocaleString() }} ₽
                    <span class="snap">{{ props.summary.returnCompensationReplacementCount }}</span>
                </p>
            </div>
            <div v-if="props.summary.storage" class="summary__item summary-item">
                <p class="summary-item__title">Хранение</p>
                <p class="summary-item__value">
                    {{ (props.summary.storage / 100).toLocaleString() }} ₽
                    <span v-if="false" class="snap snap--minor" title="1 шт = 12,45 ₽">99 шт от 406 шт</span>
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
            <div
                v-if="props.summary.underpayment"
                class="summary__item summary-item"
                :class="props.summary.underpayment < 0 ? 'summary-item--success' : 'summary-item--warning'"
            >
                <p class="summary-item__title">Недоплата</p>
                <p class="summary-item__value">
                    {{ (props.summary.underpayment / 100).toLocaleString() }} ₽
                    <span v-if="false" class="snap snap--warning" title="8.123% – доля от общей продажи">8.123% от {{ (94560 / 100).toLocaleString() }} ₽</span>
                </p>
            </div>
            <div v-if="props.summary.paidReception"
                class="summary__item summary-item"
                :class="props.summary.paidReception < 0 ? 'summary-item--success' : 'summary-item--warning'"
            >
                <p class="summary-item__title">Платная приемка</p>
                <p class="summary-item__value">
                    {{ (props.summary.paidReception / 100).toLocaleString() }} ₽
                    <span v-if="visibleSales" class="info">В отчете «Стоимость платной приемки»</span>
                </p>
            </div>
            <div
                v-if="props.summary.retentionTotal"
                class="summary__item summary-item"
                :class="props.summary.retentionTotal < 0 ? 'summary-item--success' : 'summary-item--warning'"
            >
                <p class="summary-item__title">Прочие удержания</p>
                <p class="summary-item__value">
                    {{ (props.summary.retentionTotal / 100).toLocaleString() }} ₽
                    <span class="snap" :class="props.summary.retentionTotal < 0 ? 'snap--success' : 'snap--warning'" title="Удержания за товар + Общие удержания">?</span>
                    <span v-if="visibleSales" class="info">В отчете «Прочие удержания»</span>
                </p>
            </div>
             <div
                v-if="props.summary.retention"
                class="summary__item summary-item summary-item--sub"
                :class="props.summary.retention < 0 ? 'summary-item--success' : 'summary-item--warning'"
            >
                <p class="summary-item__title">За товар</p>
                <p class="summary-item__value">
                    {{ (props.summary.retention / 100).toLocaleString() }} ₽
                    <span v-if="props.summary.retentionCount" class="snap" :class="props.summary.retention < 0 ? 'snap--success' : 'snap--warning'">{{ props.summary.retentionCount }}</span>
                </p>
            </div>
            <div
                v-if="props.summary.retentionCommon"
                class="summary__item summary-item summary-item--sub"
                :class="props.summary.retentionCommon < 0 ? 'summary-item--success' : 'summary-item--warning'"
            >
                <p class="summary-item__title">Общие</p>
                <p class="summary-item__value">
                    {{ (props.summary.retentionCommon / 100).toLocaleString() }} ₽
                </p>
            </div>
        </div>
        
        <div class="summary__group">
            <div class="summary__item summary-item">
                <p class="summary-item__title">К переводу</p>
                <p class="summary-item__value">
                    {{ (props.summary.revenue / 100).toLocaleString() }} ₽
                    <span v-if="visibleSales" class="info">В отчете «Итого к оплате»</span>
                </p>
            </div>
            <div class="summary__item summary-item">
                <p class="summary-item__title">УСН</p>
                <p class="summary-item__value">
                    <span class="copy" v-clipboard="convertPriceToCopy(props.summary.tax)">{{ (props.summary.tax / 100).toLocaleString() }} ₽</span>
                    <span
                        v-if="props.summary.tax"
                        class="snap snap--minor"
                        :title="taxTitle"
                    >
                        {{ props.summary.taxPercent }}% от {{ (props.summary.taxSource / 100).toLocaleString() }} ₽
                    </span>
                </p>
            </div>
            <div class="summary__item summary-item">
                <p class="summary-item__title">К переводу без УСН</p>
                <p class="summary-item__value">
                    <span class="copy" v-clipboard="convertPriceToCopy(props.summary.revenueWithoutTax)">
                        {{ (props.summary.revenueWithoutTax / 100).toLocaleString() }} ₽
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';

    import type { ISummaryReport } from '@/use-cases/GetReportUseCase/IGetReportResponseModel';

    const props = defineProps<{
        summary: ISummaryReport,
        visibleSales?: boolean,
    }>();

    const finesTitle = computed(() => {
        if (!props.summary.finesDescription.length) return '';
        else if (props.summary.finesDescription.length === 1) return props.summary.finesDescription.join();
        else return props.summary.finesDescription.map((description, index) => `${index + 1}. ${description}`).join('\n');
    });

    const deliveryTitle = computed(() => {
        let title = 'Логистика + Обратная логистика';
        if (props.summary.deliveryReversal) title += ' - Логистика сторно';

        return title;
    });

    const taxTitle = computed(() => {
        return `${(props.summary.taxSource / 100).toLocaleString()} ₽ = Реализовали товар`;
    });

    function convertPriceToCopy(price: number): string {
        return (price / 100).toLocaleString().replaceAll(' ', '');
    }
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
            flex-shrink: 0;
        }

        &__value {
            display: flex;
            align-items: center;

            .snap,
            .snap + .info {
                margin-left: 4px;
            }

            .info {
                margin-left: 8px;
            }
        }

        &--warning {
            &,
            #{$b}__title {
                color: #D15C5C;
            }
        }

        &--success {
            &,
            #{$b}__title {
                color: #13a310;
            }
        }

        &--sub {
            #{$b}__title {
                opacity: 0.7;
                padding-left: 12px;
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

        &--success {
            background-color: #13a310;
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