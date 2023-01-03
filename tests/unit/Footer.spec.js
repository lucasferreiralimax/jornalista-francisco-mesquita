import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  it('renders repo srting in footer', () => {
    const wrapper = shallowMount(Footer);
    expect(wrapper.text()).toMatch('repo');
  });
});
