import { categories, topics } from './topics';
import { handyApis, refresher } from './refresher';
import type { LearningModule } from '../types';

export const systemDesignModule: LearningModule = {
  id: 'system-design',
  title: 'System Design',
  description: 'Review the decisions behind reliable, scalable software systems.',
  status: 'planned',
  topics,
  categories,
  refresher,
  handyApis,
  getLesson: () => undefined,
};
