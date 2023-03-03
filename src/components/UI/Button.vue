<template>
    <button type="button" class="button" :class="classes" :disabled="disabled">
        <slot />
    </button>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps<{
        mini?: boolean,
        disabled?: boolean,
        color?: 'red',
    }>();

    const classes = computed(() => {
        const buttonClass = 'button';
        const classes = [];

        if (props.mini) classes.push(`${buttonClass}--mini`);
        if (props.color) classes.push(`${buttonClass}--${props.color}`);

        return classes;
    });
</script>

<style lang="scss" scoped>
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        border-radius: 4px;
        background-color: #5394F5;
        border: none;
        padding: 8px 16px;
        color: white;
        font-size: 12px;
        font-weight: 600;
        line-height: 1;
        cursor: pointer;
        height: 30px;

        &:active {
            background-color: #4582de;
        }

        &--mini {
            padding: 4px 8px;
            height: 24px;
            font-size: 11px;
        }

        &--red {
            background-color: #D15C5C;

            &:active {
                background-color: #ba4646;
            }
        }
    }
</style>

