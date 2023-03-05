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
                        number
                        label="Хранение ₽"
                        sub="Хранение распределяется по количествам продаж"
                        placeholder="0"
                    />
                </div>
                <div class="form__common-retention">
                    <TextField
                        v-model="commonRetention"
                        number
                        label="Общие удержания ₽"
                        sub="Общие удержания распределяются по сумме перечисления по товарам"
                        placeholder="0"
                    />
                </div>
                <div class="form__underpayment">
                    <TextField
                        v-model="underpayment"
                        number
                        label="Недоплата ₽"
                        sub="Недоплата распределяется по сумме перечисления по товарам"
                        placeholder="0"
                    />
                </div>
                <div class="form__retention">
                    <FormCosts
                        title="Прочие удержания"
                        first-action-title="💰 Добавить прочие удержания"
                        @update="onUpdateRetention"
                    />
                </div>
                <div class="form__paid-reсeptions">
                    <FormCosts
                        title="Платная приемка"
                        first-action
                        first-action-title="📦 Добавить платную приемку"
                        @update="onUpdatePaidReсeptions"
                    />
                </div>
            </div>
        </div>
        <div class="form__footer">
            <p class="form__footer-info">После ввода значений нажмите на&nbsp;«Вычислить»</p>
            <Button :disabled="!file" @click="calculate">Вычислить</Button>
            <Button
                disabled
                title="Будет реализовано в будущем"
                box
                @click="exports"
            >
                ⬇️
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';

    import type { Maybe } from '@/types/common';

    import Button from '@/components/UI/Button.vue';
    import TextField from '@/components/UI/TextField.vue';
    import FormCosts, { type ICostStructure } from '@/components/Report/FormCosts.vue';

    export interface IFormStructure {
        file: ArrayBuffer;
        storage: number;
        underpayment: number;
        commonRetention: number;
        retention: ICostStructure[];
        paidReсeptions: ICostStructure[];
    }

    const emit = defineEmits<{
        (e: 'calculate', value: IFormStructure): void;
        (e: 'export'): void;
    }>();
    
    const file: Ref<Maybe<ArrayBuffer>> = ref(null);
    const storage: Ref<string> = ref('');
    const underpayment: Ref<string> = ref('');
    const commonRetention: Ref<string> = ref('');
    let retention: ICostStructure[] = [];
    let paidReсeptions: ICostStructure[] = [];

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

    function onUpdateRetention(value: ICostStructure[]): void {
        retention = value;
    }

    function onUpdatePaidReсeptions(value: ICostStructure[]): void {
        paidReсeptions = value;
    }

    function calculate(): void {
        if (!file.value) return;

        emit('calculate', {
            file: file.value,
            storage: +storage.value,
            underpayment: +underpayment.value,
            commonRetention: +commonRetention.value,
            retention,
            paidReсeptions,
        });
    }

    function exports(): void {
        emit('export');
    }
</script>

<style lang="scss">
    .form {
        background-color: #F5F5F5;
        border-radius: 12px;
        padding: 16px;
        max-width: 580px;

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
            align-items: center;
            margin-top: 16px;
            padding-left: 46px;

            .button + .button {
                margin-left: 8px;
            }
        }

        &__footer-info {
            margin-right: 16px;
            font-size: 11px;
            line-height: 1.1;
            color: rgba(black, 0.5);
            margin-right: auto;
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
        &__underpayment,
        &__common-retention {
            width: calc(100% / 3);
        }

        &__retention,
        &__paid-reсeptions {
            width: 100%;
        }
    }
</style>