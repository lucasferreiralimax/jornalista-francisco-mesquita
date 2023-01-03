import { config } from '@vue/test-utils';

config.global.mocks.$t = key => key;
config.global.mocks.$tc = key => key;
