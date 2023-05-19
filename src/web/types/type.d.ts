type UserData = { userId: string; userName: string };
type RequestFlag = { requestFlag: boolean };

export type WorkData = {
  id: string;
  title: string;
  illustType?: number;
  xRestrict: number;
  restrict: number;
  sl?: number;
  url: string;
  description: string;
  tags: Array<string>;
  userId: string;
  userName: string;
  width?: number;
  height?: number;
  pageCount?: number;
  isBookmarkable: boolean;
  bookmarkData: unknown;
  alt?: string;
  titleCaptionTranslation: {
    workTitle: unknown;
    workCaption: unknown;
  };
  createDate: string;
  updateDate: string;
  isUnlisted: boolean;
  isMasked: boolean;
  profileImageUrl: string;
  textCount?: number;
  wordCount?: number;
  readingTime?: number;
  useWordCount?: boolean;
  bookmarkCount?: number;
  isOriginal?: boolean;
  marker: unknown;
  seriesId?: string;
  seriesTitle?: string;
};

export interface Candidates {
  candidates?: CandidatesEntity[] | null;
}
export interface CandidatesEntity {
  tag_name: string;
  access_count: string;
  type: string;
}

export type WatchWork = {
  readonly id: string;
  displayName: string;
  workData: WorkData[];
  url: string;
  category: 'tag' | 'user';
};

export type WatchWorks = {
  [id: string]: WatchWork;
};

export type viewedWorks = { [key: string]: string[] };

type SearchTargetPath = 'artworks' | 'illustrations' | 'manga' | 'novel';
type SearchTargetParameter =
  | 'all'
  | 'illust_and_ugoira'
  | 'illust'
  | 'manga'
  | 'ugoira';
type SearchMethodParameter = 's_tag' | 's_tag_full' | 's_tc';
type TargetAgeParameter = 'all' | 'safe' | 'r18';
type parameterKey = 'type' | 's_mode' | 'mode';

interface SearchQuery {
  searchWord: string;
  searchTarget: [SearchTargetPath, SearchTargetParameter];
  searchMethod: SearchMethodParameter;
  targetAge: TargetAgeParameter;
}
