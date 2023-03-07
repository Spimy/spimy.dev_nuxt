<template>
  <main class="container">
    <div class="title">
      <h1>Get in touch!</h1>
      <h2>I'll get back you as soon as possible.</h2>
    </div>
    <div class="contact">
      <IllustrationsContact class="illustration" />
      <form>
        <div class="input">
          <FontAwesomeIcon class="icon" icon="fa-solid fa-user" />
          <input required type="text" name="name" placeholder="Name" id="name" v-model="formData.name" />
        </div>
        <div class="input">
          <FontAwesomeIcon class="icon" icon="fa-solid fa-envelope" />
          <input required type="text" name="email" placeholder="Email" id="email" v-model="formData.email" />
        </div>
        <div class="input">
          <FontAwesomeIcon class="icon" icon="fa-solid fa-message" />
          <textarea
            required
            name="message"
            id="message"
            placeholder="Message"
            cols="1"
            rows="1"
            v-model="formData.message"
          />
        </div>
        <button class="btn" @click.prevent="submit">Send</button>
      </form>
    </div>
    <p class="disclaimer">
      This site is protected by hCaptcha and its
      <NuxtLink rel="external" target="_blank" href="https://www.hcaptcha.com/privacy">Privacy Policy</NuxtLink> and
      <NuxtLink rel="external" target="_blank" href="https://www.hcaptcha.com/terms">Terms of Service</NuxtLink>
      apply.
    </p>
    <VueHcaptcha
      ref="captcha"
      :sitekey="config.public.hcaptcha_sitekey"
      :theme="$colorMode.value"
      size="invisible"
      @verify="onVerify"
      @expired="onExpire"
      @challengeExpired="onExpire"
      @error="onError"
    />
    <Message :show="messageConfig.show" :message="messageConfig.message" :type="messageConfig.type" />
  </main>
</template>

<script lang="ts" setup>
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

onMounted(() => {
  window.scrollTo(0, 0);
});

const formData = reactive({
  name: '',
  email: '',
  message: ''
});

const captcha = ref<VueHcaptcha | null>(null);
const hCaptcha = reactive({
  verified: false,
  expired: false,
  token: '',
  eKey: '',
  error: new Error()
});

type MessageType = 'success' | 'error' | 'inprogress';
const messageConfig = reactive({
  show: false,
  message: '',
  type: 'inprogress' as MessageType
});

const config = useRuntimeConfig();

// Delay in seconds
const showMessage = (message: string, type: MessageType, delay: number) => {
  messageConfig.message = message;
  messageConfig.show = true;
  messageConfig.type = type;
  setTimeout(() => {
    messageConfig.show = false;
  }, delay * 1000);
};

const resetForm = () => {
  formData.name = '';
  formData.email = '';
  formData.message = '';
};

const onVerify = (token: string, ekey: string) => {
  hCaptcha.verified = true;
  hCaptcha.token = token;
  hCaptcha.eKey = ekey;

  const { data, error } = useFetch('/api/contact', {
    method: 'POST',
    body: { formData: { ...formData }, hCaptcha: { ...hCaptcha } }
  });
  showMessage('Attemping to email your message...', 'inprogress', 10);

  watch(data, (newData) => {
    if (newData !== null) {
      resetForm();
      showMessage(newData.message, 'success', 3);
    }
  });

  watch(error, (newError) => {
    if (newError !== null) {
      resetForm();
      showMessage(newError.data.message, 'error', 3);
    }
  });
};

const onExpire = () => {
  hCaptcha.verified = false;
  hCaptcha.token = '';
  hCaptcha.eKey = '';
  hCaptcha.expired = true;
  console.log('hCaptcha has expired...');
};

const onError = (err: Error) => {
  hCaptcha.token = '';
  hCaptcha.eKey = '';
  hCaptcha.error = err;
  console.log(`Error submitting hCaptcha: ${err}`);
};

const submit = async () => {
  if (!formData.email || !formData.message || !formData.name) {
    return showMessage('Empty Fields - Please fill in all fields in the form.', 'error', 3);
  }
  if (captcha.value) {
    console.log('Submitting hCaptcha and contact form...');
    captcha.value.execute();
  }
};

// Setup meta for SEO
const title = 'Contact';
const description =
  'If you need to contact me, this is where you should head to. Fill in the form and an email will be forwarded. You can expect a response within a few days.';

useHead({
  title
});

useServerSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: `${useRoute().fullPath}`,
  twitterTitle: title,
  twitterDescription: description
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    h1 {
      font-size: clamp(3.125rem, 3.0274rem + 0.411vw, 5rem);
      margin-bottom: 0;
    }

    h2 {
      font-size: clamp(1.25rem, 1.1849rem + 0.274vw, 2.5rem);
      font-weight: normal;
      margin-top: 0;
    }

    h1,
    h2 {
      text-align: center;
    }
  }

  .contact {
    display: flex;
    font-size: 1.25rem;
    width: 100%;
    margin-top: 2em;

    .illustration {
      display: none;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1em;
      width: 100%;

      .input {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        padding: 1em;
        border: 0.1em solid theme(color, 1);
        border-radius: 1em;

        .icon {
          padding-block: 0.25em;
        }

        textarea {
          min-height: 10em;
          resize: none;
        }

        input,
        textarea {
          font-size: 1em;
          background-color: transparent;
          border: none;
          color: theme(color, 1);
          outline: none;
          width: 100%;
        }

        input,
        textarea,
        .icon {
          font-size: 1em;
        }

        &:focus-within {
          border-color: theme(accentColor, 1);
        }
      }
    }

    .btn {
      font-weight: bold;
      font-size: 1em;
      border-radius: 1em;
    }

    @media (min-width: 70em) {
      width: auto;
      border-radius: 1em;
      background-color: theme(secondary, 1);
      padding: 1em 5vw;
      justify-content: space-between;
      position: relative;

      .illustration {
        display: inline;
        width: 100%;
        height: 100%;
        position: sticky;
        bottom: 0;
        transform: translate(-7vw, 15%);
      }

      form {
        font-size: 0.8em;
        background-color: theme(backgroundColor, 1);
        padding: 2em;
        border-radius: inherit;
      }
    }
  }

  .disclaimer {
    z-index: 9999;
  }
}
</style>
