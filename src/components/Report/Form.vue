<template>
    <div class="form">
        <div class="form__step">
            <div class="form__counter">1</div>
            <div class="form__controls">
                <input type="file" @change="onChangeFile" />
            </div>
        </div>
        <div class="form__step">
            <div class="form__counter">2</div>
            <div class="form__controls">
                <div class="form__storage">
                    <input v-model="storage" type="text" placeholder="Хранение ₽" />
                </div>
                <div class="form__underpayment">
                    <input v-model="underpayment" type="text" placeholder="Недоплата ₽" />
                </div>
                <div class="form__ads">
                    <FormAds @update="onUpdateFormAds" />
                </div>
            </div>
        </div>
        <div class="form__footer">
            <button type="button" @click="calculate">Вычислить</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch, type Ref } from 'vue';

    import FormAds, { type IAdsStructure } from '@/components/Report/FormAds.vue';
    import type { Maybe } from '@/types/common';

    export interface IFormStructure {
        file: ArrayBuffer;
        storage: number;
        underpayment: number;
        ads: IAdsStructure;
    }

    const emit = defineEmits<{
        (e: 'calculate', value: IFormStructure ): void
    }>();
    
    const file: Ref<Maybe<ArrayBuffer>> = ref(null);
    const storage: Ref<string> = ref('');
    const underpayment: Ref<string> = ref('');
    let ads: Maybe<IAdsStructure> = null;

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

    function onUpdateFormAds(value: IAdsStructure): void {
        ads = value;
    }

    function calculate(): void {
        if (!file.value) return;

        emit('calculate', {
            file: file.value,
            storage: 0,
            underpayment: 0,
            ads: ads as IAdsStructure,
        });
    }
</script>