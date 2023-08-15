<template>
    <div>
        <article class="prose m-auto">
            <ContentDoc :head="false" path="/faq" />
        </article>

        <div class="text-center mt-10">
            <NuxtLink
                to="/about"
                class="btn btn-outline-primary md:w-[50%] w-full"
            >
                Back
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: "margin" });
useHead({ title: useTitle("Frequently Asked Questions") });
</script>
