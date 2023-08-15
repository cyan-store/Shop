<template>
    <div>
        <article class="prose m-auto">
            <ContentDoc :head="false" />
        </article>

        <div class="text-center mt-10">
            <NuxtLink to="/" class="btn btn-outline-primary md:w-[50%] w-full">
                Home
            </NuxtLink>
        </div>
        <div class="text-center mt-2">
            <NuxtLink
                to="/about/faq"
                class="btn btn-outline-secondary md:w-[50%] w-full"
            >
                FAQ
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: "margin" });
useHead({ title: useTitle("About") });
</script>
