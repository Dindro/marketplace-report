<template>
    <div class="fraction-summary">
        <div
            v-if="props.fractionSummary.userFractions.length"
            class="fraction-summary__fractions"
        >
            <FractionPatch
                v-for="userFraction in props.fractionSummary.userFractions"
                :key="userFraction.userFraction.id"
                :name="userFraction.userFraction.name"
                :fraction-percent="userFraction.userFraction.fraction"
            />
        </div>

        <div class="fraction-summary__products">
            <div
                v-for="productSummary in props.fractionSummary.products"
                :key="productSummary.product.id.toString()"
                class="product-summary"
            >
                <div class="product">
                    <div class="product__numbers">
                        <div v-if="productSummary.product.article" class="patch">
                            <b>Артикул</b> {{ productSummary.product.article }}
                        </div>
                        <div v-if="productSummary.product.code" class="patch">
                            <b>Код</b> {{ productSummary.product.code }}
                        </div>
                        <div v-if="productSummary.product.hatch" class="patch">
                            <b>ШК</b> {{ productSummary.product.hatch }}
                        </div>
                        <div v-if="productSummary.product.barcode" class="patch">
                            <b>Баркод</b> {{ productSummary.product.barcode }}
                        </div>
                    </div>
                    <p class="product__brand">{{ productSummary.product.brand }}</p>
                    <p class="product__name">
                        <span class="product__category">{{ productSummary.product.category }} / </span>
                        {{ productSummary.product.name }}
                    </p>
                </div>

                <Summary class="product-summary__summary" :summary="productSummary.summary" />
            </div>
        </div>

        <div
            v-if="props.fractionSummary.products.length > 1"
            class="fraction-summary__total fraction-summary-total"
        >
            <div class="fraction-summary-total__delimeter"></div>
            
            <p class="fraction-summary-total__title">Итог</p>

            <Summary :summary="fractionSummary.summary"/>
        </div>

        <div
            v-if="props.fractionSummary.userFractions.length"
            class="fraction-summary__fractions"
        >
            <FractionPatch
                v-for="userFraction in props.fractionSummary.userFractions"
                :key="userFraction.userFraction.id"
                :name="userFraction.userFraction.name"
                :fraction-percent="userFraction.userFraction.fraction"
                :fraction-price="userFraction.price"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { IFractionSummaryReport } from '@/use-cases/GetReportUseCase/IGetReportResponseModel';

    import Summary from '@/components/Report/Summary.vue';
    import FractionPatch from '@/components/Report/FractionPatch.vue';

    const props = defineProps<{
        fractionSummary: IFractionSummaryReport,
    }>();
</script>

<style lang="scss" scoped>
    .fraction-summary {
        background-color: #F5F5F5;
        border-radius: 12px;
        padding: 16px;
        width: 100%;
        max-width: 600px;
        
        & + & {
            margin-top: 40px;
        }

        &__fractions {
            display: flex;
            flex-wrap: wrap;
            margin-top: -8px;
            margin-left: -8px;

            &:first-child {
                margin-bottom: 20px;
            }

            &:last-child {
                margin-top: 24px;
            }

            > * {
                margin-top: 8px;
                margin-left: 8px;
            }
        }
    }

    .fraction-summary-total {
        &__title {
            font-size: 14px;
            line-height: 1.1;
            margin-bottom: 16px;
        }

        &__delimeter {
            background-color: #CFCFCF;
            height: 1px;
            margin-top: 24px;
            margin-bottom: 24px;
        }
    }

    .product-summary {
        & + & {
            margin-top: 40px;
        }

        &__summary {
            margin-top: 16px;
        }
    }

    .product {
        &__numbers {
            display: flex;
            flex-wrap: wrap;
            margin-top: -6px;
            margin-left: -6px;

            > * {
                margin-top: 6px;
                margin-left: 6px;
            }
        }

        &__brand {
            margin-top: 6px;
            font-size: 12px;
            line-height: 1.1;
            color: rgba(black, 0.5);
        }

        &__category {
            color: rgba(black, 0.7);
        }

        &__name {
            margin-top: 4px;
            font-size: 14px;
            line-height: 1.1;
        }
    }

    .patch {
        background-color: #5394F5;
        border-radius: 4px;
        color: white;
        font-size: 12px;
        padding: 0 6px;

        b {
            font-weight: 600;
        }
    }

    .fraction {
        
    }
</style>