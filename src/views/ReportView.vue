<template>
    <div class="container product-info">

        <Form @calculate="onCalculate" />

        <div class="product-info__fast">
            <a href="https://cmp.wildberries.ru/finance/upd" target="_blank">
                <Button>💰 История затрат рекламы</Button>
            </a>
        </div>

        <div v-if="summary" class="product-info__block">
            <p class="product-info__title">Итого</p>
            <div class="product-info__total">
                <Summary visible-sales :summary="summary" />
            </div>
        </div>

        <div v-if="fractions.length" class="product-info__block">
            <p class="product-info__title">По долям</p>
            <FractionSummary
                v-for="(fraction, index) in fractions"
                :key="index"
                :fraction-summary="fraction"
            />
        </div>

        <div class="product-info__block">
            <p class="product-info__title">История изменений</p>
            <VersionHistory />
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';

import GetReportUseCase from '@/use-cases/GetReportUseCase/GetReportUseCase';
import ReportDetailRepository from '@/infastructure/ReportDetailRepository/ReportDetailRepository';
import UserFractionRepository from '@/infastructure/UserFractionRepository/UserFractionRepository';
import UserRepository from '@/infastructure/UserRepository/UserRepository';
import type { ISummaryReport, IFractionSummaryReport } from '@/use-cases/GetReportUseCase/IGetReportResponseModel';
import ProductPictureRepository from '@/infastructure/ProductPictureRepository/ProductPictureRepository';
import AdProductRepository from '@/infastructure/AdProductRepository/AdProductRepository';
import type IAdProductData from '@/infastructure/AdProductRepository/IAdProductData';

import Form, { type IFormStructure } from '@/components/Report/Form.vue';
import FractionSummary from '@/components/Report/FractionSummary.vue';
import Summary from '@/components/Report/Summary.vue';
import VersionHistory from '@/components/Version/VersionHistory.vue';
import ProductId from '@/entities/ProductId';
import StorageProductRepository from '@/infastructure/StorageProductRepository/StorageProductRepository';
import Button from '@/components/UI/Button.vue';

const summary = ref<ISummaryReport>();
const fractions: Ref<IFractionSummaryReport[]> = ref([]);

function onCalculate(form: IFormStructure): void {
    const storage = +(form.storage * 100).toFixed();
    const underpayment = +(form.underpayment * 100).toFixed();
    const commonFines = +(form.commonFines * 100).toFixed();
    
    let ads: IAdProductData[] = [];
    for (const ad of form.ads) {
        ads.push({
            productId: new ProductId(ad.code, '', 0, 0),
            price: +(ad.price * 100).toFixed(),
        });
    }
    
    getProductActionByFile(form.file, ads, storage, underpayment, commonFines);
}

async function getProductActionByFile(file: ArrayBuffer, ads: IAdProductData[], storage: number, underpayment: number, commonFines: number) {
    const detailRepository = new ReportDetailRepository(file);
    const userFractionRepository = new UserFractionRepository();
    const userRepository = new UserRepository();
    const productPictureRepository = new ProductPictureRepository();
    const adProductRepository = new AdProductRepository(ads);
    const storageProductRepository = new StorageProductRepository(storage);
    
    const result = await new GetReportUseCase(
        detailRepository,
        userFractionRepository,
        userRepository,
        productPictureRepository,
        adProductRepository,
        storageProductRepository,
        underpayment,
        commonFines,
    ).execute();

    summary.value = result.summary;
    fractions.value = result.fractions;
}
</script>

<style lang="scss" scoped>
.product-info {
    padding-top: 100px;
    padding-bottom: 100px;

    &__fast {
        margin-top: 16px;
    }

    &__block {
        margin-top: 64px;
    }

    &__title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 12px;
    }

    &__total {
        display: inline-block;
        background-color: #F5F5F5;
        border-radius: 12px;
        padding: 16px;
    }
}
</style>