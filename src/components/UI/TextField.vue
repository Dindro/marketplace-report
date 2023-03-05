<template>
    <div class="text-field">
        <p v-if="props.label" class="text-field__label">{{ props.label }}</p>
        <input
            class="text-field__input"
            :value="props.modelValue"
            :type="type"
            :placeholder="props.placeholder"
            @input="onInput"
        >
        <p v-if="props.sub" class="text-field__sub">{{ props.sub }}</p>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps<{
        modelValue: string;
        placeholder?: string;
        label?: string;
        sub?: string;
        number?: boolean;
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();

    const type = computed(() => props.number ? 'number' : 'text');

    function onInput(event: Event): void {
        emit('update:modelValue', (event.target as HTMLInputElement).value);
    }
</script>

<style lang="scss" scoped>
    .text-field {
        &__label {
            font-size: 12px;
            line-height: 1.1;
            margin-bottom: 4px;
            color: rgba(black, 0.5);
        }

        &__input {
            height: 30px;
            padding-left: 8px;
            border-radius: 4px;
            border: 1px solid #E1E1E1;
            font-size: 12px;
            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

            &[type=number]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }

        &__sub {
            font-size: 11px;
            line-height: 1.1;
            margin-top: 6px;
            color: rgba(black, 0.5);
        }
    }
</style>