import { parse as parseYaml } from 'yaml';
import { refresher, handyApis } from './refresher';
import type { LearningModule, LessonContent, Topic } from '../types';

export type { Topic } from '../types';

const markdownFiles = import.meta.glob('./topics/**/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

function parseLesson(path: string, source: string): LessonContent {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`Missing YAML frontmatter in ${path}`);

  const value: unknown = parseYaml(match[1]);
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Invalid YAML frontmatter in ${path}`);
  }
  const data = value as Record<string, unknown>;
  const requiredString = (key: string) => {
    const field = data[key];
    if (typeof field !== 'string' || !field.trim()) throw new Error(`Missing "${key}" in ${path}`);
    return field;
  };
  const order = data.order;
  const related = data.related;
  if (typeof order !== 'number' || !Number.isFinite(order)) throw new Error(`Invalid "order" in ${path}`);
  if (!Array.isArray(related) || related.some((slug) => typeof slug !== 'string')) {
    throw new Error(`Invalid "related" list in ${path}`);
  }

  const topic: Topic = {
    title: requiredString('title'),
    slug: requiredString('slug'),
    category: requiredString('category'),
    summary: requiredString('summary'),
    keywords: requiredString('keywords'),
    order,
    related,
  };
  return { topic, markdown: source.slice(match[0].length).trimStart() };
}

const lessons = Object.entries(markdownFiles).map(([path, source]) => parseLesson(path, source));
const lessonSlugs = lessons.map(({ topic }) => topic.slug);
if (new Set(lessonSlugs).size !== lessonSlugs.length) throw new Error('Python topic slugs must be unique.');
const topicOrders = lessons.map(({ topic }) => topic.order);
if (new Set(topicOrders).size !== topicOrders.length) throw new Error('Python topic order values must be unique.');
const knownSlugs = new Set(lessonSlugs);
for (const { topic } of lessons) {
  const missingRelated = topic.related.filter((slug) => !knownSlugs.has(slug));
  if (missingRelated.length) throw new Error(`Unknown related topic slug(s) in "${topic.slug}": ${missingRelated.join(', ')}`);
}

const orderedLessons = lessons.sort((left, right) => left.topic.order - right.topic.order);
export const topics = orderedLessons.map(({ topic }) => topic);
export const categories = [...new Set(topics.map((topic) => topic.category))];
const lessonBySlug = new Map(orderedLessons.map((lesson) => [lesson.topic.slug, lesson]));
const getLesson = (slug: string) => lessonBySlug.get(slug);

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
