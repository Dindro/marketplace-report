<template>
    <div class="container product-info">

        <p class="product-info__title">Загрузите отчет</p>
        <input type="file" @change="onChangeFile">

        <div v-if="summary" class="product-info__block">
            <p class="product-info__title">Итого</p>
            <div class="product-info__total">
                <Summary :summary="summary" />
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

import Summary from '@/components/Report/Summary.vue';
import FractionSummary from '@/components/Report/FractionSummary.vue';
import VersionHistory from '@/components/Version/VersionHistory.vue';
import ProductPictureRepository from '@/infastructure/ProductPictureRepository/ProductPictureRepository';

const summary = ref<ISummaryReport>();
const fractions: Ref<IFractionSummaryReport[]> = ref([]);

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
    const userFractionRepository = new UserFractionRepository();
    const userRepository = new UserRepository();
    const productPictureRepository = new ProductPictureRepository();
    
    const result = await new GetReportUseCase(detailRepository, userFractionRepository, userRepository, productPictureRepository).execute();
    summary.value = result.summary;
    fractions.value = result.fractions;
}
</script>

<style lang="scss" scoped>
.product-info {
    padding-top: 100px;
    padding-bottom: 100px;

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