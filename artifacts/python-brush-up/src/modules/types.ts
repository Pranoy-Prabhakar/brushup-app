export type ModuleStatus = 'live' | 'planned';

export type Topic = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  keywords: string;
};

export type RefresherItem = {
  name: string;
  slug: string;
  summary: string;
  code: string;
};

export type HandyApi = {
  name: string;
  description: string;
  example: string;
};

export type LessonContent = {
  topic: Topic;
  markdown: string;
};

export type LearningModule = {
  id: string;
  title: string;
  description: string;
  status: ModuleStatus;
  topics: Topic[];
  categories: string[];
  refresher: RefresherItem[];
  handyApis: HandyApi[];
  getLesson: (slug: string) => LessonContent | undefined;
};
