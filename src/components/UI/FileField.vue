<template>
    <label class="file-field">
        <input
            class="file-field__input"
            type="file"
            :accept="accept"
            @change="onChange"
        >
        <Button tag="span">{{ actionText }}</Button>
    </label>
</template>

<script setup lang="ts">
    import { computed, ref, type Ref, type ComputedRef } from 'vue';

    import Button from '@/components/UI/Button.vue';

    const props = defineProps<{
        action: string;
        accept?: string;
    }>();

    const emit = defineEmits<{
        (e: 'change', value: ArrayBuffer): void;
    }>();

    const selectedFile: Ref<string> = ref('');
    const actionText: ComputedRef<string> = computed(() => selectedFile.value || props.action);

    function onChange(event: Event): void {
        const target = event.target as HTMLInputElement;

        if (!target.files?.length) return;
        const targetFile = target.files[0];
        const fileReader = new FileReader();
        selectedFile.value = targetFile.name;

        fileReader.onload = (event: ProgressEvent<FileReader>) => {
            const data = event.target?.result;
            if (data) emit('change', data as ArrayBuffer);
        };
        fileReader.readAsBinaryString(targetFile);
    }
</script>

<style lang="scss" scoped>
    .file-field {
        &__input {
            position: absolute;
            z-index: -1;
            opacity: 0;
            display: block;
            width: 0;
            height: 0;
        }
    }
</style>