<template>
    <div class="ads">
        <div class="ads__header">
            <p class="ads__title">Реклама</p>
            <div class="ads__way">
                <input v-model="productWay" type="checkbox">
                <span>Распределить по продуктам</span>
            </div>
        </div>

        <div class="ads__body">
            <div v-if="productWay" class="ads__product ads-product">
                <div
                    v-for="(ad, index) in ads"
                    :key="index"
                    class="ads-product__row"
                >
                    <input v-model="ad.code" type="text" placeholder="Код товара">
                    <input v-model="ad.price" type="text" placeholder="Сумма ₽">
                    <button v-if="ads.length > 1" type="button" @click="removeAd(index)">Удалить</button>
                </div>
                <button type="button" @click="addAd">Добавить еще</button>
            </div>

            <div v-else class="ads__total">
                <input v-model="price" type="text" placeholder="Сумма ₽">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';

    export interface IAdStructure {
        code: number;
        price: number;
    }

    export interface IAdsStructure {
        productWay: boolean;
        ads: number | IAdStructure[];
    }

    interface IAd {
        code: string;
        price: string;
    }

    const emit = defineEmits<{
        (e: 'update', value: IAdsStructure ): void
    }>();
    

    const productWay = ref(true);
    const ads: Ref<IAd[]> = ref([]);
    const price: Ref<string> = ref('');

    watch(productWay, update);
    watch(price, update);
    watch(ads, update, { deep: true });

    function addAd(): void {
        ads.value.push({ code: '', price: '' });
    }

    function removeAd(index: number): void {
        ads.value = ads.value.filter((ad, adIndex) => adIndex !== index);
    }

    function update(): void {
        let adsResponse;

        if (productWay.value) {
            adsResponse = ads.value
                .filter(ad => ad.code && ad.price)
                .map(ad => ({ code: +ad.code, price: +ad.price }));
        } else {
            adsResponse = +price.value;
        }

        emit('update', {
            productWay: productWay.value,
            ads: adsResponse,
        });
    }

    addAd();
    update();
</script>