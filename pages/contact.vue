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
          <label for="name">
            <FontAwesomeIcon class="icon" icon="fa-solid fa-user" />
          </label>
          <input required type="text" name="name" placeholder="Name" id="name" v-model="formData.name" />
        </div>
        <div class="input">
          <label for="email">
            <FontAwesomeIcon class="icon" icon="fa-solid fa-envelope" />
          </label>
          <input required type="text" name="email" placeholder="Email" id="email" v-model="formData.email" />
        </div>
        <div class="input">
          <label for="message">
            <FontAwesomeIcon class="icon" icon="fa-solid fa-message" />
          </label>
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
      :sitekey="config.public.hcaptcha_sitekeys.contact"
      :theme="$colorMode.value"
      size="invisible"
      @verify="hcaptchaHandler.onVerify"
      @expired="hcaptchaHandler.onExpire"
      @challengeExpired="hcaptchaHandler.onExpire"
      @error="hcaptchaHandler.onError"
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
const config = useRuntimeConfig();

// -- Data definition --
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

// -- Handlers --
const { messageConfig, showMessage } = new MessageHandler();
const hcaptchaHandler = new HCaptchaHandler(hCaptcha, () => {
  const { data, error } = useFetch('/api/contact', {
    method: 'POST',
    body: { formData: { ...formData }, hCaptcha: { ...hCaptcha } }
  });
  showMessage('Attemping to email your message...', 'inprogress');

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
});

// -- Methods --
const resetForm = () => {
  formData.name = '';
  formData.email = '';
  formData.message = '';
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
  margin-bottom: 1rem;

  .title {
    h1 {
      font-size: clamp(3.125rem, 3.0274rem + 0.411vw, 5rem);
      margin-bottom: 0;
    }

    h2 {
      font-size: clamp(1.25rem, 1.1849rem + 0.274vw, 2.5rem);
      font-weight: normal;
    }

    h1,
    h2 {
      margin-top: 0;
      text-align: center;
    }
  }

  .contact {
    display: flex;
    font-size: 1.25rem;
    width: 100%;

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
        border: 0.1em solid var(--border-clr);
        border-radius: 1em;

        .icon {
          padding-block: 0.25em;
          cursor: pointer;
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
          color: var(--text-clr);
          outline: none;
          width: 100%;
        }

        input,
        textarea,
        .icon {
          font-size: 1em;
        }

        &:focus-within {
          border-color: var(--primary-clr);

          .icon {
            color: var(--primary-clr);
          }
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
      background-color: var(--secondary-clr);
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
        background-color: var(--background-clr);
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
