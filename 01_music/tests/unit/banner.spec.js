import Banner from '@/components/home/Banner.vue';
import { shallowMount } from '@vue/test-utils';

describe('Banner.vue', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(Banner);
    
    expect(wrapper.text()).toContain('Selam');
  });
});
