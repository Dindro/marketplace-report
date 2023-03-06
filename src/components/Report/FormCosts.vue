<template>
    <div class="cost">
        <Button v-if="!settingVisible" @click="settingVisible = true">{{ firstActionTitle }}</Button>
        <template v-else>
            <div class="cost__header">
                <p class="cost__title">{{ props.title }}</p>
            </div>

            <div class="cost__body">
                <div class="cost__product ads-product">
                    <div
                        v-for="(cost, index) in costs"
                        :key="index"
                        class="cost-product__row"
                    >
                        <img v-if="cost.preview" class="cost-product__image" :src="cost.preview">
                        <TextField
                            v-model="cost.code"
                            class="cost-product__code"
                            placeholder="Код товара"
                            @input="onCodeChange(index)"
                        />
                        <TextField v-model="cost.price" class="cost-product__price" number placeholder="Сумма ₽" />
                        <Button
                            v-if="costs.length > 1"
                            class="cost-product__remove"
                            mini
                            color="red"
                            @click="removeCost(index)"
                        >
                            Удалить
                        </Button>
                    </div>
                    <div class="cost-product__footer">
                        <div class="cost-product__footer-add">
                            <Button class="cost-product__add" mini @click="addCost">Добавить еще</Button>
                        </div>
                        <p class="cost-product__footer-price">Общая сумма: {{ commonPrice.toLocaleString() }} ₽</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch, computed, type Ref } from 'vue';

    import ProductPictureRepository from '@/infastructure/ProductPictureRepository/ProductPictureRepository';
    import GetProductPicture from '@/use-cases/GetProductPicture/GetProductPicture';

    import Button from '@/components/UI/Button.vue';
    import TextField from '@/components/UI/TextField.vue';

    export interface ICostStructure {
        code: number;
        price: number;
    }

    interface ICost {
        code: string;
        price: string;
        preview?: string;
    }

    const props = defineProps<{
        title: string;
        /** Показывать изначально кнопку для показа настроек */
        firstAction?: boolean;
        firstActionTitle: string;
    }>();

    const emit = defineEmits<{
        (e: 'update', value: ICostStructure[] ): void
    }>();

    const productPictureRepository = new ProductPictureRepository();
    const getProductPicture = new GetProductPicture(productPictureRepository);
    
    const settingVisible: Ref<boolean> = ref(!props.firstAction);
    const costs: Ref<ICost[]> = ref([]);
    watch(costs, update, { deep: true });

    const commonPrice = computed(() => {
        return costs.value.map(cost => +cost.price).reduce((sum, price) => sum + price, 0);
    });

    async function onCodeChange(costIndex: number): Promise<void> {
        const cost = costs.value[costIndex];
        if (cost) {
            if (!cost.code) cost.preview = '';
            else {
                const picture = await getProductPicture.execute(cost.code);
                cost.preview = picture.preview;
            }
        }
    }

    function addCost(): void {
        costs.value.push({ code: '', price: '' });
    }

    function removeCost(index: number): void {
        costs.value = costs.value.filter((cost, costIndex) => costIndex !== index);
    }

    function update(): void {
        const costsResponse = costs.value
            .filter(cost => cost.code && cost.price)
            .map(cost => ({ code: +cost.code, price: +cost.price }));

        emit('update', costsResponse);
    }

    addCost();
    update();
</script>

<style lang="scss" scoped>
    .cost {
        &__header {
            margin-bottom: 4px;
        }

        &__title {
            font-size: 12px;
            line-height: 1.1;
            color: rgba(black, 0.5);
        }
    }

    .cost-product {
        &__row {
            display: flex;
            align-items: center;
            position: relative;

            & + & {
                margin-top: 4px;
            }
        }

        &__image {
            height: 30px;
            position: absolute;
            border-radius: 2px;
            right: calc(100% + 8px);
            top: 0;
        }

        &__price {
            margin-left: 8px;
        }

        &__remove {
            margin-left: 8px;
        }
        
        &__footer {
            display: flex;
            align-items: center;
            margin-top: 8px;
        }

        &__footer-add {
            width: 152px;
        }

        &__footer-price {
            font-size: 11px;
            line-height: 1.1;
            color: rgba(black, 0.5);
        }
    }
</style>