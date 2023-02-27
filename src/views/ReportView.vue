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

        <div v-if="summary" class="product-info__block">
            <p class="product-info__title">По долям</p>
            <FractionSummary
                v-for="(fraction, index) in fractions"
                :key="index"
                :fraction-summary="fraction"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import GetReportUseCase from '@/use-cases/GetReportUseCase/GetReportUseCase';
import ReportDetailRepository from '@/infastructure/ReportDetailRepository/ReportDetailRepository';
import UserFractionRepository from '@/infastructure/UserFractionRepository/UserFractionRepository';
import type { ISummaryReport, IFractionSummaryReport } from '@/use-cases/GetReportUseCase/IGetReportResponseModel';

import UserRepository from '@/infastructure/UserRepository/UserRepository';

import Summary from '@/components/Report/Summary.vue';
import FractionSummary from '@/components/Report/FractionSummary.vue';

const summary = ref<ISummaryReport>();
const fractions = ref<IFractionSummaryReport[]>([]);

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
    
    const result = await new GetReportUseCase(detailRepository, userFractionRepository, userRepository).execute();
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