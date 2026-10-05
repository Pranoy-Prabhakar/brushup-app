import { categories, topics } from './topics';
import { handyApis, refresher } from './refresher';
import type { LearningModule } from '../types';

export const sqlModule: LearningModule = {
  id: 'sql',
  title: 'SQL',
  description: 'Learn to query, combine, and update structured data.',
  status: 'planned',
  topics,
  categories,
  refresher,
  handyApis,
  getLesson: () => undefined,
};
