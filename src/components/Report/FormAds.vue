<template>
    <div class="ads">
        <div class="ads__header">
            <p class="ads__title">Реклама</p>
        </div>

        <div class="ads__body">
            <div class="ads__product ads-product">
                <div
                    v-for="(ad, index) in ads"
                    :key="index"
                    class="ads-product__row"
                >
                    <TextField v-model="ad.code" class="ads-product__code" placeholder="Код товара" />
                    <TextField v-model="ad.price" class="ads-product__price" placeholder="Сумма ₽" />
                    <Button
                        v-if="ads.length > 1"
                        class="ads-product__remove"
                        mini
                        color="red"
                        @click="removeAd(index)"
                    >
                        Удалить
                    </Button>
                </div>
                <Button class="ads-product__add" mini @click="addAd">Добавить еще</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';

    import Button from '@/components/UI/Button.vue';
    import TextField from '@/components/UI/TextField.vue';

    export interface IAdStructure {
        code: number;
        price: number;
    }

    interface IAd {
        code: string;
        price: string;
    }

    const emit = defineEmits<{
        (e: 'update', value: IAdStructure[] ): void
    }>();
    
    const ads: Ref<IAd[]> = ref([]);

    watch(ads, update, { deep: true });

    function addAd(): void {
        ads.value.push({ code: '', price: '' });
    }

    function removeAd(index: number): void {
        ads.value = ads.value.filter((ad, adIndex) => adIndex !== index);
    }

    function update(): void {
        const adsResponse = ads.value
            .filter(ad => ad.code && ad.price)
            .map(ad => ({ code: +ad.code, price: +ad.price }));

        emit('update', adsResponse);
    }

    addAd();
    update();
</script>

<style lang="scss" scoped>
    .ads {
        &__header {
            margin-bottom: 4px;
        }

        &__title {
            font-size: 12px;
            line-height: 1.1;
            color: rgba(black, 0.5);
        }
    }

    .ads-product {
        &__row {
            display: flex;
            align-items: center;

            & + & {
                margin-top: 4px;
            }
        }

        &__price {
            margin-left: 8px;
        }

        &__remove {
            margin-left: 8px;
        }

        &__add {
            margin-top: 8px;
        }
    }
</style>