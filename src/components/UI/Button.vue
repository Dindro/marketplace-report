<template>
    <button type="button" class="button" :class="classes" :disabled="disabled">
        <slot />
    </button>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps<{
        mini?: boolean;
        disabled?: boolean;
        color?: 'red';
        box?: boolean;
    }>();

    const classes = computed(() => {
        const buttonClass = 'button';
        const classes = [];

        if (props.mini) classes.push(`${buttonClass}--mini`);
        if (props.color) classes.push(`${buttonClass}--${props.color}`);
        if (props.box) classes.push(`${buttonClass}--box`);

        return classes;
    });
</script>

<style lang="scss" scoped>
    .button {
        $b: #{&};

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

        &[disabled] {
            cursor: not-allowed;
            background-color: #99bdf3;
        }

        &:active:not([disabled]) {
            background-color: #4582de;
        }

        &--box {
            width: 30px;
            padding-left: 2px !important;
            padding-right: 2px !important;
            flex-shrink: 0;
        }

        &--mini {
            padding: 4px 8px;
            height: 24px;
            font-size: 11px;

            &#{$b}--box {
                width: 24px;
            }
        }

        &--red {
            background-color: #D15C5C;

            &:active:not([disabled]) {
                background-color: #ba4646;
            }

            &[disabled] {
                background-color: #f9a2a2;
            }
        }
    }
</style>

