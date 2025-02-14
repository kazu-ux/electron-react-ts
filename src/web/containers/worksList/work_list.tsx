import { useCallback, useEffect, useRef } from 'react';
import './work_list.css';

import { useAtom } from 'jotai';
import { filteredWorksAtom } from '../../atoms/atom';
import WorkCard from './work_card';
import classNames from 'classnames';

import getWatchWorkId from '../../utils/getWatchWorkId';
import useMutationObserver from '../../customHooks/useMutationObserver';
import { useLocation } from 'react-router-dom';

export default function WorkList() {
  const [workData] = useAtom(filteredWorksAtom);
  const currentURL = useLocation();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    ref.current
      ?.querySelectorAll('.viewed')
      .forEach((element) => element.classList.add('hidden'));
  }, [currentURL.pathname]);

  const mutationObserverCallback = useCallback(
    (records: MutationRecord[]) => {
      const watchWorkId = getWatchWorkId();
      if (!watchWorkId) return;

      // const viewedWorkIds = records
      //   .map((record) => record.target as HTMLElement)
      //   .filter((element) => element.classList.contains('viewed'))
      //   .filter((element) => !element.classList.contains('hidden'))
      //   .map((element) => element.id);
      // if (!viewedWorkIds.length) return;

      // updateViewedWork(watchWorkId, viewedWorkIds);
    },
    [workData]
  );

  useMutationObserver(ref, mutationObserverCallback, {
    attributes: true,
    characterData: false,
    childList: true,
    subtree: false,
  });

  return (
    <div
      ref={ref}
      className='grid_container'
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridTemplateRows: 'auto',
      }}
    >
      {workData.map((data) => (
        <div
          key={data.id}
          id={data.id}
          className={classNames({
            viewed: data.isWatched,
            hidden: data.isBlocked,
          })}
        >
          <WorkCard workData={data}></WorkCard>
        </div>
      ))}
    </div>
  );
}
