<template>
    <div class="product-info">
        <input type="file" @change="onChangeFile">

        <div class="product-info__report">
            <p>
                Перечисления:
                <span class="product-info__price-value">{{ price / 100 }}₽</span>
            </p>
            <p>Логистика: {{ delivery / 100 }}₽</p>
            <p>Логистика возврата: {{ returnDelivery / 100 }}₽</p>
        </div>

        <div class="product-info__list">
            <ProductReport
            v-for="productInfo of productInfoList"
                :key="productInfo.product.id"
                class="product-info__item"
                :code="String(productInfo.product.id)"
                :category="productInfo.product.category"
                :name="productInfo.product.name"
                :price="productInfo.price"
                :delivery="productInfo.delivery"
                :state-tax="productInfo.stateTax"
                :fraction="productInfo.fraction"
                :revenue="productInfo.revenue"
                :order-count="productInfo.orderCount"
                :return="productInfo.return"
                :barcode="productInfo.product.barcode"
                :brand="productInfo.product.brand"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import UploadReportUseCase from '@/use-cases/UploadReport/UploadReportUseCase';
import { ReportDetailRepository } from '@/infastructure/ReportDetailRepository';
import type { IProductInfoResponse } from '@/use-cases/UploadReport/IUploadReportResponseModel';

import ProductReport from '@/components/Report/ProductReport.vue';

const productInfoList = ref<IProductInfoResponse[]>([]);
const price = ref<number>(0);
const delivery = ref<number>(0);
const returnDelivery = ref<number>(0);

function onChangeFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = async (event: ProgressEvent<FileReader>) => {
            const data = event.target?.result;
            if (data) {
                getProductActionByFile(data as ArrayBuffer);
            }
        };
        fileReader.readAsBinaryString(file);
    }
};

async function getProductActionByFile(file: ArrayBuffer) {
    const detailRepository = new ReportDetailRepository(file);
    const result = await new UploadReportUseCase(detailRepository).execute();
    productInfoList.value = result.productList;
    price.value = result.price;
    delivery.value = result.delivery;
    returnDelivery.value = result.return;
}
</script>

<style lang="scss" scoped>
.product-info {
    &__report {
        margin-top: 40px;
    }

    &__price-value {
        font-weight: bold;
        font-size: large;
    }

    &__list {
        margin-top: 40px;
    }

    &__item {
        & + & {
            margin-top: 32px;
        }
    }
}
</style>