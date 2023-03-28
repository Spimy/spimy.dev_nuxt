<template>
  <div class="authenticator">
    <form>
      <h1 class="title">Login to Dashboard</h1>
      <div class="input">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="formData.email" />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="formData.password" />
      </div>
      <div class="controller">
        <button type="submit" class="btn" @click.prevent="submit">Login</button>
        <NuxtLink to="https://account.spimy.dev/forgot-password" rel="external" target="_blank"
          >Forgot Password</NuxtLink
        >
      </div>
    </form>

    <VueHcaptcha
      ref="captcha"
      :sitekey="config.public.hcaptcha_sitekeys.login"
      :theme="$colorMode.value"
      size="invisible"
      @verify="onVerify"
      @expired="onExpire"
      @challengeExpired="onExpire"
      @error="onError"
    />

    <Message :show="messageConfig.show" :message="messageConfig.message" :type="messageConfig.type" />
  </div>
</template>

<script lang="ts" setup>
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { LoginResponse } from '@/utils/types/responses';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});
const config = useRuntimeConfig();

// -- Data definitions --
const captcha = ref<VueHcaptcha | null>(null);
const formData = reactive({
  email: '',
  password: ''
});

// -- Methods --
const submit = () => {
  if (captcha.value) {
    console.log('Submitting hCaptcha and contact form...');
    captcha.value.execute();
  }
};

// -- Handlers --
const { messageConfig, showMessage } = new MessageHandler();
const { hCaptcha, onError, onExpire, onVerify } = new HCaptchaHandler(() => {
  useAuthFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { ...formData, captcha: hCaptcha, service: 'Portfolio Admin Dashboard' }
  }).then((response) => {
    formData.email = '';
    formData.password = '';

    if (response.status === 200) {
      localStorage.setItem('accessToken', response._data!.tokens.access);
      localStorage.setItem('refreshToken', response._data!.tokens.refresh);
      localStorage.setItem('sessionId', response._data!.sessionId);

      // Only allow admin users to be logged in
      if (response._data?.user.role === 'admin') {
        const { setUserData } = useUser();
        setUserData(response._data!.user);

        showMessage(response._data!.message, 'success', 1);
        return setTimeout(() => navigateTo('/admin'), 1 * 1000);
      }

      // If the user is not admin, log them out and delete their session
      logout();
      return showMessage('Please login with an admin account.', 'error', 3);
    }

    showMessage(response._data!.message, 'error', 3);
  });
});
</script>

<style lang="scss" scoped>
.authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: 100svh;
  margin: -6rem 2rem;

  form {
    font-size: 1rem;
    background-color: var(--secondary-clr);
    padding: 2em;
    border-radius: 1em;
    max-width: 30em;
    width: 100%;

    .title {
      font-size: 1.5em;
      margin-bottom: 1em;
      margin-top: 0;
    }

    .input {
      display: flex;
      gap: 0.5em;
      margin-bottom: 2em;
      border: 0.1em solid var(--border-clr);
      border-radius: 1em;
      padding: 0.5em;

      label {
        border-right: 0.1em solid;
        border-color: inherit;
        padding-right: 0.5em;
      }

      input {
        font-size: 1em;
        background-color: transparent;
        border: none;
        color: var(--text-clr);
        outline: none;
        width: 100%;
      }

      &:focus-within {
        border-color: var(--primary-clr);
      }
    }

    .controller {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn {
        // width: 100%;
        border-radius: 1em;
        font-weight: bold;
      }

      a {
        font-size: 0.9em;
        text-decoration: none;

        &:hover,
        &:focus {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
