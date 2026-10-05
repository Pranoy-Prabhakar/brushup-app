import { pythonModule } from './python/module';
import { sqlModule } from './sql/module';
import { pysparkModule } from './pyspark/module';
import { systemDesignModule } from './system-design/module';
import type { LearningModule } from './types';

export const modules: LearningModule[] = [
  pythonModule,
  sqlModule,
  pysparkModule,
  systemDesignModule,
];

const modulesById = new Map(modules.map((module) => [module.id, module]));

export function getModule(id: string | undefined) {
  return id ? modulesById.get(id) : undefined;
}

export function getModuleFromPath(pathname: string) {
  const [moduleId] = pathname.split('/').filter(Boolean);
  return getModule(moduleId);
}

export function modulePath(moduleId: string) {
  return `/${moduleId}`;
}
