import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add([
  faUser,
  faUserPlus,
]);

Vue.component('font-awesome-icon', FontAwesomeIcon);
