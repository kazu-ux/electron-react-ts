import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Store from 'electron-store';

import { SearchQuery, WatchWork, WorkData } from '../types/type';

window.storageAPI.getWatchWorks().then((value) => {
  console.log(value);
});

export const countAtom = atom(0);
export const openAtom = atom(false);
export const loadingAtom = atom(false);

export const worksAtom = atom<WorkData[]>([]);
export const blockUsersAtom = atom<string[]>([
  /* '29727051',
  '22033781',
  '35868393',
     '15193250',
  '43534506',
  '703041',
  '30506052', */
]);
export const blockTagsAtom = atom<string[]>([]);
export const favoritesAtom = atom<string[]>([]);
export const searchWordAtom = atom<string>('');
export const searchUrlAtom = atom<string>('');
export const watchWorksAtom = atomWithStorage<WatchWork[]>('watchWorks', []);
export const deleteWatchWorkAtom = atom(
  (get) => get(watchWorksAtom),
  (get, set, watchWorkDelete: WatchWork) => {
    set(
      watchWorksAtom,
      get(watchWorksAtom).filter(
        (watchWork) => watchWork.url !== watchWorkDelete.url
      )
    );
  }
);

export const darkModeAtom = atomWithStorage('darkMode', false);

export const searchQueryAtom = atom<SearchQuery>({
  searchWord: '',
  searchTarget: ['artworks', 'all'],
  searchMethod: 's_tag',
  targetAge: 'safe',
});
