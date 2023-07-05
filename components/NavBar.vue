<template>
    <div>
        <NuxtLink to="/">Home</NuxtLink> |
        <NuxtLink to="/products">Products</NuxtLink>

        <div v-if="auth">
            <NuxtLink to="/profile">
                <img
                    :src="data?.user?.image || ''"
                    alt="pfp"
                    width="50"
                    height="50"
                />

                <span>{{ data?.user?.name }}'s Profile</span>
            </NuxtLink>
            |
            <a @click="logout">Logout</a>
        </div>
        <div v-else>
            <a @click="signIn('auth0')">Login</a> |
            <a @click="signIn('auth0')">Register</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { signIn, signOut, status, data } = useAuth();

const auth = computed(() => status.value === "authenticated");
const logout = async () => {
    if (confirm("Are you sure?")) {
        await signOut({
            redirect: true,
            callbackUrl: "/",
        });
    }
};
</script>
