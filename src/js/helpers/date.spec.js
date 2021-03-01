import { it } from 'date-fns/locale';
import { formatDate } from './date.js';

describe('formatDate', () => {
  test('check format', () => {
    expect(formatDate(1577014368252, 'yyyy')).toBe('2019');
  });
});