import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTwitter, faInstagram, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

library.add(faTwitter, faInstagram, faGithub, faYoutube);
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
