<template>
    <div class="block">
        <div>
            <div class="float-left inline-block">
                <img
                    :src="data?.user?.image || ''"
                    class="rounded-lg mx-4"
                    width="100"
                    alt="avatar"
                />

                <a
                    class="link link-primary text-center block mt-2 text-sm max-md:hidden"
                    @click="logout"
                >
                    Sign Out
                </a>
            </div>
        </div>

        <div>
            <h2 class="text-3xl font-bold overflow-hidden">
                {{ data?.user?.name }}
            </h2>

            <h4 class="text-content2 my-2 text-sm overflow-hidden">
                {{ data?.user?.email }}
            </h4>

            <h4 class="text-content2 my-2 text-sm overflow-hidden">
                Signed in for {{ $moment(data?.expires).fromNow() }}
            </h4>
        </div>
    </div>

    <hr class="my-4" />
</template>

<script lang="ts" setup>
const { $moment } = useNuxtApp();
const { data, signOut } = useAuth();

const logout = () => {
    if (confirm("Are you sure?")) {
        signOut();
    }
};
</script>
