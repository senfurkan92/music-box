import Song from '@/components/manage/Song.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

describe('Song.vue', () => {
  test('renders song.name', () => {
    const index =1;
    const song = {
      name: 'YerliPlaka.mp3',
      genre: 'rap',
      title: 'eski',
      path: 'songs/ceza/yerliPlaka.mp3',
    };
    const wrapper = shallowMount(Song, {
      propsData: {
        index,
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    const compositionName = wrapper.find('.name')

    //expect(wrapper.text()).toContain(song.name);
    expect(compositionName.text()).toBe(`${index+1}. ${song.name}`);
  });
});
