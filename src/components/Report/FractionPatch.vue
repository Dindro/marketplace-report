<template>
    <div class="fraction-patch">
        <div class="fraction-patch__border">
            {{ props.name }}
            <template v-if="fractionPercent">
                – {{ props.fractionPercent }}%
            </template>
        </div>
        <p
            v-if="props.fractionPrice"
            class="fraction-patch__price"
        >
            {{ (props.fractionPrice / 100).toLocaleString() }} ₽
        </p>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        name: string,
        fractionPercent?: number,
        fractionPrice?: number,
    }>();
</script>

<style lang="scss" scoped>
    .fraction-patch {
        &__border {
            background-color: #D9D9D9;
            border-radius: 4px;
            font-size: 14px;
            line-height: 1.1;
            padding: 6px 10px;
        }

        &__price {
            margin-top: 4px;
            font-size: 12px;
            line-height: 1.1;
            color: rgba(black, 0.5);
        }
    }
</style>