// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Can't use LocalVue - Issue: https://github.com/vuetifyjs/vuetify/issues/4068#issuecomment-422406319
Vue.use(Vuetify);

// Components
import USGSHeaderBar from '@/components/USGSHeaderBar.vue'

// Utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

describe('USGSHeaderBar.vue', () => {
    let localVue;
    let vuetify;

    const mountFactory = function (args) {
        return mount(USGSHeaderBar, {
            localVue,
            vuetify,
            ...args
        });
    }

    beforeEach(() => {
        localVue = createLocalVue();
        vuetify = new Vuetify();
        jest.resetModules();
        jest.clearAllMocks();
    });

    it('Renders the station change button when enabled', () => {
        const $config = {STATION_CHANGE_ENABLED: "true"}
        const wrapper = mountFactory({
            mocks: {
                $config
              }
        });

        expect(wrapper.html()).toContain('Monitoring Location Management</span>');
        expect(wrapper.html()).toContain('Station Change</span>');
        expect(wrapper.html()).toContain('Audit Table</span>');
    });

    it('Renders the station change button when enabled', () => {
        const $config = {STATION_CHANGE_ENABLED: "false"}
        const wrapper = mountFactory({
            mocks: {
                $config
              }
        });

        expect(wrapper.html()).toContain('Monitoring Location Management</span>');
        expect(wrapper.html()).not.toContain('Station Change</span>');
        expect(wrapper.html()).toContain('Audit Table</span>');
    });
    
});