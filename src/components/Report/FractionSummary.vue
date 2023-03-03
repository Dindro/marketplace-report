<template>
    <div class="fraction-summary">
        <div class="fraction-summary__header">
            <div class="fraction-summary__fractions">
                <template v-if="props.fractionSummary.userFractions.length">
                    <FractionPatch
                        v-for="userFraction in props.fractionSummary.userFractions"
                        :key="userFraction.userFraction.id"
                        :name="userFraction.userFraction.name"
                        :fraction-percent="userFraction.userFraction.fraction"
                    />
                </template>
                <FractionPatch v-else name="Без доли" />
            </div>

            <button
                type="button"
                class="fraction-summary__collapse-action"
                :class="{ 'fraction-summary__collapse-action--collapsed': collapsed }"
                @click="collapsed = !collapsed"
            />
        </div>

        <div v-show="collapsed" class="fraction-summary__body">
            <div class="fraction-summary__products">
                <div
                    v-for="productSummary in props.fractionSummary.products"
                    :key="productSummary.product.id.toString()"
                    class="product-summary"
                >
                    <div class="product">
                        <div class="product__header">
                            <div v-if="productSummary.product.picture && productSummary.product.picture.preview" class="product__picture">
                                <img
                                    class="product__preview"
                                    :src="productSummary.product.picture.preview"
                                    :alt="String(productSummary.product.code)"
                                >
                            </div>
                            <div class="product__info">
                                <div class="product__numbers">
                                    <a
                                        v-if="productSummary.product.article"
                                        class="patch"
                                        :href="getSiteByArticle(productSummary.product.article)" 
                                        target="_blank"
                                        title="Открыть страницу в кабинете поставщика"
                                    >
                                        <b>Артикул</b> {{ productSummary.product.article }}
                                    </a>
                                    <div
                                        v-if="productSummary.product.code"
                                        class="patch patch--copy"
                                        title="Нажмите чтобы скопировать"
                                        @click="copy(String(productSummary.product.code))"
                                    >
                                        <b>Код</b> {{ productSummary.product.code }}
                                    </div>
                                    <div
                                        v-if="productSummary.product.hatch"
                                        class="patch patch--copy"
                                        title="Нажмите чтобы скопировать"
                                        @click="copy(String(productSummary.product.hatch))"
                                    >
                                        <b>ШК</b> {{ productSummary.product.hatch }}
                                    </div>
                                    <div
                                        v-if="productSummary.product.barcode"
                                        class="patch patch--copy"
                                        title="Нажмите чтобы скопировать"
                                        @click="copy(String(productSummary.product.barcode))"
                                    >
                                        <b>Баркод</b> {{ productSummary.product.barcode }}
                                    </div>
                                </div>
                                <p class="product__brand">{{ productSummary.product.brand }}</p>
                                <p class="product__name">
                                    <span class="product__category">{{ productSummary.product.category }} / </span>
                                    {{ productSummary.product.name }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Summary class="product-summary__summary" :summary="productSummary.summary" />
                </div>
            </div>

            <div
                v-if="props.fractionSummary.products.length > 1"
                class="fraction-summary__total fraction-summary-total"
            >
                <div class="fraction-summary-total__delimeter"></div>
                
                <p class="fraction-summary-total__title">Итого</p>

                <Summary :summary="fractionSummary.summary"/>
            </div>

            <div v-if="props.fractionSummary.userFractions.length" class="fraction-summary__footer">
                <div class="fraction-summary__fractions">
                    <FractionPatch
                        v-for="userFraction in props.fractionSummary.userFractions"
                        :key="userFraction.userFraction.id"
                        :name="userFraction.userFraction.name"
                        :fraction-percent="userFraction.userFraction.fraction"
                        :fraction-price="userFraction.price"
                    />
                </div>

                <button
                    type="button"
                    class="fraction-summary__collapse-action"
                    :class="{ 'fraction-summary__collapse-action--collapsed': collapsed }"
                    @click="collapsed = !collapsed"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, type Ref } from 'vue';

    import type { IFractionSummaryReport } from '@/use-cases/GetReportUseCase/IGetReportResponseModel';

    import Summary from '@/components/Report/Summary.vue';
    import FractionPatch from '@/components/Report/FractionPatch.vue';

    const props = defineProps<{
        fractionSummary: IFractionSummaryReport,
    }>();

    const collapsed: Ref<boolean> = ref(true);

    function getSiteByCode(code: number): string {
        return `https://www.wildberries.ru/catalog/${code}/detail.aspx`;
    }

    function getSiteByArticle(article: string): string {
        return `https://seller.wildberries.ru/new-goods/new-product-card?vendorCode=${article}`;
    }

    function copy(text: string) {
        if (text) window.navigator.clipboard.writeText(text);
    }
</script>

<style lang="scss" scoped>
    .fraction-summary {
        background-color: #F5F5F5;
        border-radius: 12px;
        padding: 16px;
        width: 100%;
        max-width: 670px;
        
        & + & {
            margin-top: 40px;
        }

        &__header {
            display: flex;
        }

        &__body {
            margin-top: 20px;
        }

        &__footer {
            display: flex;
            margin-top: 24px;
        }

        &__collapse-action {
            flex-shrink: 0;
            position: relative;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            margin-left: 16px;
            border: none;
            background-color: #D9D9D9;
            padding: 0;
            cursor: pointer;

            &:hover {
                background-color: #5394F5;

                &::after,
                &::before {
                    background-color: white;
                }
            }

            &::after,
            &::before {
                position: absolute;
                content: '';
                display: block;
            
                border-radius: 2px;
                background-color: rgba(black, 0.7);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            &::after {
                height: 2px;
                width: 65%;
            }

            &::before {
                height: 65%;
                width: 2px;
            }

            &--collapsed {
                &::before {
                    display: none;
                }
            }

            &:first-child {
                margin-left: auto;
            }
        }

        &__fractions {
            display: flex;
            flex: 1;
            flex-wrap: wrap;
            margin-top: -8px;
            margin-left: -8px;

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
            font-weight: 500;
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
        &__header {
            display: flex;
        }

        &__info {
            &:not(:first-child) {
                margin-left: 10px;
            }
        }

        &__picture {
            font-size: 0;
        }

        &__preview {
            border-radius: 4px;
            height: 58px
        }

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
            color: rgba(black, 0.5);
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
        white-space: nowrap;
        text-decoration: none;

        b {
            font-weight: 600;
        }

        &[href] {
            &:hover {
                background-color: #3f7fdd;
            }
        }

        &--copy {
            cursor: copy;
        }
    }
</style>