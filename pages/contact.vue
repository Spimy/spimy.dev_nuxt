<template>
  <main id="contact">
    <h1>Get in touch!</h1>
    <p>I'll get back you as soon as possible.</p>
    <div class="container">
      <IllustrationsContact id="illustration" />
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
        <button @click.prevent="submit">Send</button>
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
  'If you need to contact Spimy, this is where you should head to. Fill in the form and an email will be forwarded. You can expect a response within a few days.';

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
#contact {
  margin: 6rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  text-align: center;

  @media screen and (max-width: 900px) {
    margin: 10rem 2rem;
    display: block;
  }

  h1 {
    margin: 0 6rem;

    @media screen and (max-width: 900px) {
      margin: 0;
    }
  }

  p:first-of-type {
    margin-top: 0;
  }

  .disclaimer {
    font-size: 1rem;
  }

  .container {
    display: flex;
    background-color: theme(secondary, 1);
    padding: 2rem 5rem;
    border-radius: 0.5rem;

    .light-mode & {
      background-color: theme(secondary, 2);
    }

    @media screen and (max-width: 900px) {
      padding: 0;
    }

    #illustration {
      width: 40rem;
      height: auto;
      transform: translate(-50%, 20%);

      @media screen and (max-width: 900px) {
        display: none;
      }

      @media screen and (max-width: 1300px) {
        width: 20rem;
        transform: translate(-60%, 35%);
      }
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: theme(backgroundColor, 1);
      border-radius: 0.5rem;
      padding: 2rem;
      gap: 1rem;
      width: 100%;
      transition: all $default-animation-time ease-in-out;

      .light-mode & {
        background-color: theme(backgroundColor, 2);
      }

      @media screen and (max-width: 900px) {
        padding: 0;
      }

      button {
        align-self: center;
        width: 100%;
        background-color: transparent;
        border: 0.15rem solid theme(accentColor, 1);
        color: theme(color, 1);
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: bold;
        padding: 0.8rem;
        transition: all $default-animation-time ease-in-out;
        cursor: pointer;

        .light-mode & {
          color: theme(color, 2);
          border: 0.15 solid theme(accentColor, 2);
        }

        &:hover,
        &:focus {
          background-color: theme(accentColor, 1);

          .light-mode & {
            color: theme(color, 1);
            background-color: theme(accentColor, 2);
          }
        }
      }

      .input {
        border: 0.1rem solid theme(color, 1);
        border-radius: 0.5rem;
        display: flex;
        transition: all $default-animation-time ease-in-out;

        .light-mode & {
          border: 0.1rem solid theme(color, 2);
        }

        &:focus-within {
          border: 0.1rem solid theme(accentColor, 1);
          .light-mode & {
            border: 0.1rem solid theme(accentColor, 2);
          }
        }

        .icon {
          font-size: 1.5rem;
          padding: 1rem;
          padding-right: 0;
        }

        input {
          width: 100%;
          border: none;
        }

        textarea {
          width: 100%;
          height: 10rem;
          resize: none;
          border: none;
        }

        input,
        textarea {
          background-color: theme(backgroundColor, 1);
          color: theme(color, 1);
          font-size: 1rem;
          padding: 1rem;
          outline: none;
          transition: all $default-animation-time ease-in-out;

          .light-mode & {
            background-color: theme(backgroundColor, 2);
            color: theme(color, 2);
          }
        }
      }
    }
  }
}
</style>
