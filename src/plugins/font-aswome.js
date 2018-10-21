import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add([
  faUser,
]);

Vue.component('font-awesome-icon', FontAwesomeIcon);
