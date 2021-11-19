import Home from '@/views/Home.vue';
import MusicList from '@/components/home/MusicList.vue';
import Track from '@/components/home/Track.vue';
import { shallowMount } from '@vue/test-utils';

describe('Home.vue', () => {
  test('renders list of songs', () => {
    const songs = [
        {
          "_id": {
            "$oid": "6192b2088b68dc4017cfc716"
          },
          "name": "Ezhel Bul Beni.mp3",
          "path": "/songs/EzhelBul Beni.mp3",
        },
    ];  

    const homecomponent = shallowMount(Home, {
      data() {
        return {
          songs,
        };
      },
    });
    
    const musiclistcomponent = homecomponent.find(MusicList);

    const trackcomponents = musiclistcomponent.findAllComponents(Track);

    expect(trackcomponents).toHaveLength(songs.length);
  });
});
