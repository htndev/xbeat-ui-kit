import '@/assets/styles/colors.less';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

import Quasar, { Notify } from 'quasar';
import Vue from 'vue';

import * as Components from './components';

export default (): void => {
  Vue.use(Quasar, {
    config: {},
    plugins: {
      Notify
    }
  });

  Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name as keyof typeof Components]);
  });
};
