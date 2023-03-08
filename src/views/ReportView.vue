<template>
    <div class="container product-info">

        <Form @calculate="onCalculate" />

        <div class="product-info__fast">
            <a href="https://seller.wildberries.ru/suppliers-mutual-settlements/reports-implementations/reports-weekly" target="_blank">
                <Button tag="span">📈 Финансовые отчеты</Button>
            </a>
            <a href="https://cmp.wildberries.ru/finance/upd" target="_blank">
                <Button tag="span">💰 История затрат рекламы</Button>
            </a>
            <a href="https://seller.wildberries.ru/analytics/acceptance-report" target="_blank">
                <Button tag="span">📦 Платная приемка</Button>
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
import RetentionRepository from '@/infastructure/RetentionRepository/RetentionRepository';
import type IRetentionData from '@/infastructure/RetentionRepository/IRetentionData';

import Form, { type IFormStructure } from '@/components/Report/Form.vue';
import FractionSummary from '@/components/Report/FractionSummary.vue';
import Summary from '@/components/Report/Summary.vue';
import VersionHistory from '@/components/Version/VersionHistory.vue';
import ProductId from '@/entities/ProductId';
import StorageProductRepository from '@/infastructure/StorageProductRepository/StorageProductRepository';
import Button from '@/components/UI/Button.vue';
import type IReceptionProductData from '@/infastructure/ReceptionProductRepository/IReceptionProductData';
import ReceptionProductRepository from '@/infastructure/ReceptionProductRepository/ReceptionProductRepository';

const summary = ref<ISummaryReport>();
const fractions: Ref<IFractionSummaryReport[]> = ref([]);

function onCalculate(form: IFormStructure): void {
    const storage = +(form.storage * 100).toFixed();
    const underpayment = +(form.underpayment * 100).toFixed();
    const commonRetention = +(form.commonRetention * 100).toFixed();

    const retentions: IRetentionData[] = form.retentions.map(retention => ({
        productId: new ProductId(retention.code, '', 0, 0),
        price: +(retention.price * 100).toFixed(),
    }));

    const paidReсeptions: IReceptionProductData[] = form.paidReсeptions.map(reception => ({
        productId: new ProductId(reception.code, '', 0, 0),
        price: +(reception.price * 100).toFixed(),
    }));
    
    getProductActionByFile(form.file, retentions, storage, underpayment, commonRetention, paidReсeptions);
}

async function getProductActionByFile(file: ArrayBuffer, retentions: IRetentionData[], storage: number, underpayment: number, commonRetention: number, paidReсeptions: IReceptionProductData[]) {
    const detailRepository = new ReportDetailRepository(file);
    const userFractionRepository = new UserFractionRepository();
    const userRepository = new UserRepository();
    const productPictureRepository = new ProductPictureRepository();
    const retentionRepository = new RetentionRepository(retentions);
    const storageProductRepository = new StorageProductRepository(storage);
    const receptionProductRepository = new ReceptionProductRepository(paidReсeptions);
    
    const result = await new GetReportUseCase(
        detailRepository,
        userFractionRepository,
        userRepository,
        productPictureRepository,
        retentionRepository,
        storageProductRepository,
        receptionProductRepository,
        underpayment,
        commonRetention,
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
        margin-top: 8px;
        margin-left: -8px;
        display: flex;
        flex-wrap: wrap;

        > * {
            margin-top: 8px;
            margin-left: 8px;
        }
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