import { describe, expect, it } from 'vitest';

import { arrangeListInBlocks } from './ArticlesList';

describe('arrangeListInBlocks', () => {
  it('splits every 5 articles into 2 + 3', () => {
    expect(arrangeListInBlocks([1, 2, 3, 4, 5, 6, 7])).toEqual([
      [1, 2],
      [3, 4, 5],
      [6, 7],
    ]);
  });

  it('drops empty blocks', () => {
    expect(arrangeListInBlocks([1, 2])).toEqual([[1, 2]]);
  });
});
