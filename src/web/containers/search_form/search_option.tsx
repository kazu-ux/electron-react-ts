import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import {
  SelectChangeEvent,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import { useAtom } from 'jotai';
import { searchQueryAtom } from '../../atoms/atom';
import {
  SearchTargetPath,
  SearchTargetParameter,
  SearchMethodParameter,
  TargetAgeParameter,
} from '../../types/type';

interface SearchTarget {
  key: string;
  parameters: [SearchTargetPath, SearchTargetParameter];
}

interface SearchMethod {
  key: string;
  parameter: SearchMethodParameter;
}

interface TargetAge {
  key: string;
  parameter: TargetAgeParameter;
}

const urlPath: SearchTargetPath[] = [
  'artworks',
  'illustrations',
  'manga',
  'novel',
];

const searchTargets: SearchTarget[] = [
  {
    key: 'イラスト・マンガ・うごイラ',
    parameters: [urlPath[0], 'all'],
  },
  {
    key: 'イラスト・うごイラ',
    parameters: [urlPath[1], 'illust_and_ugoira'],
  },
  {
    key: 'イラスト',
    parameters: [urlPath[1], 'illust'],
  },
  {
    key: 'マンガ',
    parameters: [urlPath[2], 'manga'],
  },
  {
    key: 'うごイラ',
    parameters: [urlPath[1], 'ugoira'],
  },
];

const searchMethods: SearchMethod[] = [
  { key: 'タグ（部分一致）', parameter: 's_tag' },
  { key: 'タグ（完全一致）', parameter: 's_tag_full' },
  { key: 'タイトル・キャプション', parameter: 's_tc' },
];

const targetAges: TargetAge[] = [
  { key: 'すべて', parameter: 'all' },
  { key: '全年齢', parameter: 'safe' },
  { key: 'R-18', parameter: 'r18' },
];

export default function BasicSelect() {
  const [searchTarget, setSearchTarget] = useState<string>('0');
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  const handleSearchTargetChange = (event: SelectChangeEvent) => {
    setSearchQuery({
      ...searchQuery,
      searchTarget: searchTargets[Number(event.target.value)].parameters,
    });
    setSearchTarget(event.target.value);
  };

  const handleSearchMethodChange = (event: SelectChangeEvent) => {
    setSearchQuery({
      ...searchQuery,
      searchMethod: event.target.value as SearchMethodParameter,
    });
  };

  const handleTargetAgeChange = (event: SelectChangeEvent) => {
    setSearchQuery({
      ...searchQuery,
      targetAge: event.target.value as TargetAgeParameter,
    });
  };

  return (
    <Stack direction={'row'} justifyContent={'center'} spacing={'0.5rem'}>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>検索対象</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={searchTarget}
            label='searchTarget'
            onChange={handleSearchTargetChange}
          >
            {searchTargets.map((searchTarget, index) => {
              return (
                <MenuItem key={index} value={index}>
                  {searchTarget.key}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>検索方法</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={searchQuery.searchMethod}
            label='SearchMethod'
            onChange={handleSearchMethodChange}
          >
            {searchMethods.map((searchMethod, index) => {
              return (
                <MenuItem key={index} value={searchMethod.parameter}>
                  {searchMethod.key}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>対象年齢</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={searchQuery.targetAge}
            label='targetAge'
            onChange={handleTargetAgeChange}
          >
            {targetAges.map((targetAge, index) => {
              return (
                <MenuItem key={index} value={targetAge.parameter}>
                  {targetAge.key}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
}
