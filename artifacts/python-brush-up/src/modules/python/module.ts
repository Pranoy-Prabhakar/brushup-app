import { refresher, handyApis } from './refresher';
import type { LearningModule, Topic } from '../types';
import { categories, topics } from './topics';

export type { Topic } from '../types';

const markdownFiles = import.meta.glob('./topics/**/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const categoryFolder: Record<string, string> = {
  Basics: 'basics', Collections: 'collections', Functions: 'functions', 'Pythonic Python': 'pythonic-python',
  OOP: 'oop', Errors: 'errors', 'Useful Python': 'useful-python',
};

function getLesson(slug: string) {
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) return undefined;
  const path = `./topics/${categoryFolder[topic.category]}/${slug}.md`;
  const markdown = markdownFiles[path];
  return markdown ? { topic, markdown } : undefined;
}

export const pythonModule: LearningModule = {
  id: 'python',
  title: 'Python',
  description: 'Refresh Python with short, plain-language lessons and practical API references.',
  status: 'live',
  topics,
  categories,
  refresher,
  handyApis,
  getLesson,
};
