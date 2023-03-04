<template>
    <div class="form">
        <div class="form__step">
            <div class="form__counter">1</div>
            <div class="form__controls">
                <input type="file" accept=".xls,.xlsx" @change="onChangeFile" />
            </div>
        </div>
        <div class="form__step">
            <div class="form__counter">2</div>
            <div class="form__controls">
                <div class="form__storage">
                    <TextField
                        v-model="storage"
                        label="Хранение ₽"
                        sub="Хранение распределяется пропорционально по количеству продаж"
                        placeholder="0"
                    />
                </div>
                <div class="form__underpayment">
                    <TextField
                        v-model="underpayment"
                        label="Недоплата ₽"
                        sub="Недоплата распределяется пропорционально по сумме перечисления по продукту"
                        placeholder="0"
                    />
                </div>
                <div class="form__ads">
                    <FormAds @update="onUpdateFormAds" />
                </div>
            </div>
        </div>
        <div class="form__footer">
            <p class="form__footer-info">После ввода значений нажмите на&nbsp;«Вычислить»</p>
            <Button :disabled="!file" @click="calculate">Вычислить</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';

    import type { Maybe } from '@/types/common';

    import Button from '@/components/UI/Button.vue';
    import TextField from '@/components/UI/TextField.vue';
    import FormAds, { type IAdStructure } from '@/components/Report/FormAds.vue';

    export interface IFormStructure {
        file: ArrayBuffer;
        storage: number;
        underpayment: number;
        ads: IAdStructure[];
    }

    const emit = defineEmits<{
        (e: 'calculate', value: IFormStructure): void;
    }>();
    
    const file: Ref<Maybe<ArrayBuffer>> = ref(null);
    const storage: Ref<string> = ref('');
    const underpayment: Ref<string> = ref('');
    let ads: IAdStructure[] = [];

    watch(file, calculate);

    function onChangeFile(event: Event): void {
        const target = event.target as HTMLInputElement;

        if (!target.files?.length) return;
        const targetFile = target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event: ProgressEvent<FileReader>) => {
            const data = event.target?.result;
            if (data) file.value = data as ArrayBuffer;
        };
        fileReader.readAsBinaryString(targetFile);
    }

    function onUpdateFormAds(value: IAdStructure[]): void {
        ads = value;
    }

    function calculate(): void {
        if (!file.value) return;

        emit('calculate', {
            file: file.value,
            storage: +storage.value,
            underpayment: +underpayment.value,
            ads,
        });
    }
</script>

<style lang="scss">
    .form {
        background-color: #F5F5F5;
        border-radius: 12px;
        padding: 16px;
        max-width: 447px;

        &__step {
            display: flex;

            & + & {
                margin-top: 16px;
            }
        }

        &__counter {
            font-size: 12px;
            font-weight: 600;
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center ;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            background-color: #d8d4d4;
            margin-right: 16px;
        }

        &__footer {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 16px;
            padding-left: 46px;
        }

        &__footer-info {
            margin-right: 16px;
            font-size: 11px;
            line-height: 1.1;
            color: rgba(black, 0.5);
        }

        &__controls {
            display: flex;
            flex-wrap: wrap;

            margin: -12px;

            > * {
                padding: 12px;
            }
        }

        &__storage,
        &__underpayment {
            width: 50%;
        }
    }
</style>