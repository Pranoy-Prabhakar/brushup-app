import { categories, topics } from './topics';
import { handyApis, refresher } from './refresher';
import type { LearningModule } from '../types';

export const pysparkModule: LearningModule = {
  id: 'pyspark',
  title: 'PySpark',
  description: 'Explore distributed data processing with Python and Spark.',
  status: 'planned',
  topics,
  categories,
  refresher,
  handyApis,
  getLesson: () => undefined,
};
