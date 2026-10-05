import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, ChevronRight, Clock3, Command, FileText, Moon, Search, Sun } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';
import { getModule, getModuleFromPath, modulePath, modules } from './modules/registry';
import type { LearningModule, Topic } from './modules/types';

const liveModules = modules.filter((module) => module.status === 'live');

function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('brushup-theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('brushup-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return { dark, toggle: () => setDark((value) => !value) };
}

type SearchResult = { module: LearningModule; topic: Topic; score: number; moduleOrder: number };

function scoreTopic(topic: Topic, markdown: string, query: string) {
  const title = topic.title.toLowerCase();
  const keywords = topic.keywords.toLowerCase();
  const summary = topic.summary.toLowerCase();
  const body = markdown.toLowerCase();
  if (title === query) return 100;
  if (title.startsWith(query)) return 80;
  if (title.includes(query)) return 60;
  if (keywords.includes(query)) return 40;
  if (summary.includes(query)) return 20;
  if (body.includes(query)) return 10;
  return 0;
}

function SearchBox() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const results = useMemo(() => {
    const term = query.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!term) return [];
    return liveModules.flatMap((module, moduleOrder) => module.topics
      .map((topic) => ({
        module,
        topic,
        moduleOrder,
        score: scoreTopic(topic, module.getLesson(topic.slug)?.markdown ?? '', term),
      }))
      .filter((result) => result.score > 0))
      .sort((left, right) => right.score - left.score || left.moduleOrder - right.moduleOrder || left.topic.order - right.topic.order)
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
        setSelectedIndex(-1);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, []);

  function openResult(result: SearchResult) {
    navigate(`${modulePath(result.module.id)}/topics/${result.topic.slug}`);
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!results.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setSelectedIndex((index) => (index + 1 + results.length) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      setSelectedIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      openResult(results[selectedIndex] ?? results[0]);
    }
  }

  return <div ref={wrapperRef} className="relative w-full min-w-0">
    <div className={`flex h-10 items-center gap-2 rounded-lg border bg-background px-3 transition-colors ${open ? 'border-primary/60' : 'border-border'}`}>
      <Search size={15} className="shrink-0 text-muted-foreground" />
      <input
        ref={inputRef}
        value={query}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open && !!query.trim()}
        aria-controls="global-search-results"
        aria-activedescendant={open && results.length && selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
        onChange={(event) => { setQuery(event.target.value); setSelectedIndex(-1); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search all live modules..."
        aria-label="Search all live modules"
        data-testid="input-global-search"
        className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/75"
      />
      {!query && <kbd className="hidden items-center gap-1 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:flex"><Command size={10} /> K</kbd>}
      {query && <button onClick={() => { setQuery(''); setOpen(false); }} className="text-[11px] text-muted-foreground hover:text-foreground" aria-label="Clear search">Clear</button>}
    </div>
    {open && query.trim() && <div id="global-search-results" role="listbox" aria-label="Search results" className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-foreground/10">
      {results.length ? <div className="p-1.5">{results.map((result, index) => <button
        id={`search-result-${index}`}
        key={`${result.module.id}-${result.topic.slug}`}
        role="option"
        aria-selected={selectedIndex === index}
        data-testid={`search-result-${result.module.id}-${result.topic.slug}`}
        onMouseEnter={() => setSelectedIndex(index)}
        onClick={() => openResult(result)}
        className={`focus-ring flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left ${selectedIndex === index ? 'bg-secondary' : 'hover:bg-secondary'}`}
      >
        <span><span className="block text-sm font-medium">{result.topic.title}</span><span className="mt-0.5 block text-[11px] text-muted-foreground">{result.module.title} · {result.topic.category}</span></span>
        <ArrowRight size={14} className="text-muted-foreground" />
      </button>)}</div> : <div className="px-4 py-5 text-center text-sm text-muted-foreground">No lessons found for “{query}”.</div>}
      <div className="border-t border-border px-3 py-2 text-[10px] text-muted-foreground">Ranked by title, keywords, summary, and lesson content</div>
    </div>}
  </div>;
}

function ModuleSelector({ activeModule }: { activeModule?: LearningModule }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return <div ref={wrapperRef} className="relative col-start-2 row-start-1 md:order-2">
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls="module-selector-menu"
      data-testid="button-module-selector"
      onClick={() => setOpen((value) => !value)}
      className="focus-ring inline-flex max-w-[150px] items-center gap-1 rounded-md px-2.5 py-2 text-[12px] font-medium hover:bg-secondary sm:max-w-[190px]"
    >
      <span className="truncate">{activeModule?.title ?? 'All modules'}</span><ChevronDown size={13} className="shrink-0 text-muted-foreground" />
    </button>
    {open && <div id="module-selector-menu" role="menu" aria-label="Choose a module" className="absolute left-0 top-[calc(100%+8px)] z-50 w-64 overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-xl shadow-foreground/10">
      <Link role="menuitem" to="/" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm hover:bg-secondary">All modules</Link>
      <div className="my-1 border-t border-border" />
      {modules.map((module) => <Link
        role="menuitem"
        aria-current={activeModule?.id === module.id ? 'page' : undefined}
        key={module.id}
        to={modulePath(module.id)}
        onClick={() => setOpen(false)}
        data-testid={`module-option-${module.id}`}
        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
      >
        <span>{module.title}</span><span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{module.status}</span>
      </Link>)}
    </div>}
  </div>;
}

function Header({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const location = useLocation();
  const activeModule = getModuleFromPath(location.pathname);
  const topicMatch = location.pathname.match(/^\/([^/]+)\/topics\/([^/]+)$/);
  const topic = topicMatch ? getModule(topicMatch[1])?.getLesson(topicMatch[2])?.topic : undefined;
  const suffix = activeModule ? location.pathname.slice(modulePath(activeModule.id).length).replace(/^\/+/, '') : '';
  const title = !activeModule
    ? 'Brushup — a quick field guide'
    : topic
      ? `${topic.title}: ${activeModule.title} guide · Brushup`
      : suffix === 'topics'
        ? `${activeModule.title} topics · Brushup`
        : suffix === 'quick-refresher'
          ? `${activeModule.title} Quick Refresher · Brushup`
          : `${activeModule.title} · Brushup`;
  const description = !activeModule
    ? 'Choose a module and refresh the concepts you use in your work.'
    : topic
      ? `${topic.summary} Read a plain-language explanation, short examples, common mistakes, and a table of related APIs.`
      : suffix === 'topics'
        ? `Browse the ${activeModule.title} topic collection. ${activeModule.description}`
        : suffix === 'quick-refresher'
          ? `Review useful ${activeModule.title} concepts and APIs with short examples.`
          : activeModule.description;

  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
  }, [description, title]);

  return <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
    <div className="mx-auto grid max-w-[1180px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 px-5 py-2 sm:gap-x-4 sm:px-8 md:flex md:h-[68px] md:gap-4 md:py-0">
      <Link to="/" data-testid="link-home" className="focus-ring col-start-1 row-start-1 flex shrink-0 items-center gap-2.5 rounded-md md:order-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-[13px] font-medium text-primary-foreground">b.</span>
        <span className="text-[14px] font-semibold tracking-tight">Brushup</span>
      </Link>
      <ModuleSelector activeModule={activeModule} />
      {activeModule?.status === 'live' && <nav aria-label={`${activeModule.title} sections`} className="col-span-3 row-start-2 flex items-center gap-1 border-t border-border/70 pt-1 md:order-3 md:col-span-1 md:row-start-auto md:border-l md:border-t-0 md:pl-2 md:pt-0">
        <NavLink to={`${modulePath(activeModule.id)}/topics`} data-testid="link-module-topics" className={({ isActive }) => `rounded-md px-2.5 py-2 text-[12px] ${isActive ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'}`}>Topics</NavLink>
        <NavLink to={`${modulePath(activeModule.id)}/quick-refresher`} data-testid="link-module-refresher" className={({ isActive }) => `rounded-md px-2.5 py-2 text-[12px] ${isActive ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'}`}>Quick Refresher</NavLink>
      </nav>}
      <div className="col-span-3 row-start-3 min-w-0 md:order-4 md:ml-auto md:w-full md:max-w-[330px]">
        <SearchBox />
      </div>
      <button onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} data-testid="button-toggle-theme" className="focus-ring col-start-3 row-start-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground md:order-5">
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    </div>
  </header>;
}

function Footer() {
  const topicCount = liveModules.reduce((total, module) => total + module.topics.length, 0);
  return <footer className="mt-20 border-t border-border">
    <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <span>Brushup <span className="mx-1 text-border">/</span> A field guide for the bits you almost remember.</span>
      <span className="font-mono">{modules.length} modules · {liveModules.length} live · {topicCount} published topics</span>
    </div>
  </footer>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-muted-foreground"><span className="h-px w-4 bg-accent" />{children}</div>;
}

function ModuleCard({ module }: { module: LearningModule }) {
  const live = module.status === 'live';
  return <Link to={modulePath(module.id)} className={`focus-ring group flex items-center gap-4 rounded-xl border p-4 transition-colors ${live ? 'border-primary/40 bg-primary/5 hover:bg-primary/10' : 'border-border bg-card hover:border-primary/40'}`}>
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${live ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{live ? <BookOpen size={18} /> : <Clock3 size={18} />}</span>
    <span className="min-w-0 flex-1">
      <span className={`block font-mono text-[10px] uppercase tracking-[.14em] ${live ? 'text-primary' : 'text-muted-foreground'}`}>{live ? 'LIVE MODULE' : 'PLANNED'}</span>
      <span className="mt-1 block font-serif text-xl">{module.title}</span>
      <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{module.description}</span>
    </span>
    <ArrowRight size={16} className={`shrink-0 transition-transform group-hover:translate-x-1 ${live ? 'text-primary' : 'text-muted-foreground'}`} />
  </Link>;
}

function HomePage() {
  return <main className="mx-auto min-h-[70vh] max-w-[1180px] px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
    <div className="max-w-2xl">
      <SectionLabel>A QUICK FIELD GUIDE</SectionLabel>
      <h1 className="font-serif text-5xl tracking-tight sm:text-6xl">Brushup</h1>
      <p className="mt-5 text-base leading-7 text-muted-foreground">Choose a module to revisit useful concepts, examples, and reference notes.</p>
    </div>
    <section className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Learning modules">
      {modules.map((module) => <ModuleCard key={module.id} module={module} />)}
    </section>
  </main>;
}

function ModuleHomePage() {
  const { moduleId = '' } = useParams();
  const module = getModule(moduleId);
  if (!module) return <NotFoundPage />;
  if (module.status === 'planned') return <PlannedModulePage module={module} />;

  const base = modulePath(module.id);
  return <main className="mx-auto max-w-[1180px] px-5 pb-14 pt-11 sm:px-8 sm:pt-16">
    <section className="relative grid gap-10 overflow-hidden rounded-2xl border border-border bg-card px-6 py-8 sm:grid-cols-[1fr_290px] sm:px-10 sm:py-11">
      <div className="absolute right-0 top-0 h-full w-1 bg-primary" />
      <div className="max-w-[650px]">
        <SectionLabel>LIVE MODULE</SectionLabel>
        <h1 className="font-serif text-[2.7rem] leading-[1.02] tracking-[-.035em] sm:text-[3.65rem]">{module.title}, in plain language.</h1>
        <p className="mt-5 max-w-lg text-[15px] leading-7 text-muted-foreground">{module.description}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link to={`${base}/topics`} className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-[13px] font-semibold text-primary-foreground hover:opacity-90">Browse topics <ArrowRight size={15} /></Link>
          <Link to={`${base}/quick-refresher`} className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-4 text-[13px] font-medium hover:bg-secondary">Quick Refresher</Link>
        </div>
      </div>
      <aside className="flex flex-col justify-center border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
        <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">A small reminder</span>
        <p className="mt-3 font-serif text-[1.35rem] leading-snug">“The best way to remember is to keep moving.”</p>
        <span className="mt-4 font-mono text-[11px] text-primary">REVISIT, THEN RETURN</span>
      </aside>
    </section>

    <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
      <section>
        <div className="mb-5 flex items-end justify-between"><div><SectionLabel>START HERE</SectionLabel><h2 className="font-serif text-2xl">A quick way back in</h2></div><span className="font-mono text-[11px] text-muted-foreground">{String(module.topics.length).padStart(2, '0')} NOTES</span></div>
        <div className="divide-y divide-border border-y border-border">
          {module.topics.slice(0, 4).map((topic, index) => <TopicRow key={topic.slug} module={module} topic={topic} index={String(index + 1).padStart(2, '0')} />)}
        </div>
        <Link to={`${base}/topics`} className="focus-ring mt-5 inline-flex items-center gap-2 rounded text-sm font-medium text-primary">All {module.topics.length} lessons <ArrowRight size={14} /></Link>
      </section>
      <aside>
        <SectionLabel>SHORT ON TIME?</SectionLabel>
        <Link to={`${base}/quick-refresher`} className="focus-ring group block rounded-xl border border-border bg-card p-5 hover:border-primary/50">
          <span className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-muted-foreground"><span>{module.refresher.length} essentials</span><ArrowRight size={14} className="text-primary transition-transform group-hover:translate-x-0.5" /></span>
          <h3 className="mt-4 font-serif text-2xl leading-tight">The quick<br />refresher</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Short reminders for useful concepts. Get oriented and move on.</p>
          <div className="mt-5 flex gap-1">{Array.from({ length: Math.min(module.refresher.length, 11) }, (_, index) => <span key={index} className="h-1 flex-1 rounded-full bg-primary/70" />)}</div>
        </Link>
      </aside>
    </div>
    <section className="mt-14 border-t border-border pt-7">
      <div className="flex flex-wrap items-center justify-between gap-3"><SectionLabel>THE NOTEBOOK</SectionLabel><Link to={`${base}/topics`} className="text-xs font-medium text-primary hover:underline">Explore by category <ArrowRight size={12} className="ml-1 inline" /></Link></div>
      <div className="mt-2 grid gap-x-9 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {module.categories.map((category) => {
          const entries = module.topics.filter((topic) => topic.category === category);
          return <div key={category}><h3 className="mb-2 text-[13px] font-semibold">{category}<span className="ml-2 font-mono text-[10px] font-normal text-muted-foreground">{String(entries.length).padStart(2, '0')}</span></h3>
            {entries.slice(0, 3).map((topic) => <Link key={topic.slug} to={`${base}/topics/${topic.slug}`} className="focus-ring block rounded py-1 text-[12px] text-muted-foreground hover:text-primary">{topic.title}</Link>)}
          </div>;
        })}
      </div>
    </section>
  </main>;
}

function PlannedModulePage({ module, section }: { module: LearningModule; section?: 'topics' | 'quick-refresher' }) {
  const index = String(modules.findIndex((item) => item.id === module.id) + 1).padStart(2, '0');
  return <main className="mx-auto min-h-[70vh] max-w-[1180px] px-5 pb-16 pt-12 sm:px-8">
    <div className="max-w-3xl">
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Brushup</Link><ChevronRight size={12} /><span className="text-foreground">{module.title}</span></div>
      <SectionLabel>MODULE {index} · PLANNED</SectionLabel>
      <h1 className="font-serif text-5xl tracking-tight sm:text-6xl">{module.title}, in plain language.</h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{module.description} This module is planned, not published yet. Its lesson content will be added when it is ready.</p>
      <div className="mt-9 divide-y divide-border border-y border-border">
        {(['topics', 'quick-refresher'] as const).map((feature, itemIndex) => {
          const title = feature === 'topics' ? 'Topics' : 'Quick Refresher';
          const selected = section === feature;
          return <div key={feature} aria-current={selected ? 'page' : undefined} className={`flex items-center gap-4 py-5 ${selected ? 'text-primary' : ''}`}>
            <span className="font-mono text-xs">{String(itemIndex + 1).padStart(2, '0')}</span>
            {feature === 'topics' ? <BookOpen size={17} /> : <Clock3 size={17} />}
            <div className="flex-1"><h2 className="font-serif text-2xl">{title}</h2><p className="mt-1 text-sm text-muted-foreground">Planned · content will be added later.</p></div>
            <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground">COMING LATER</span>
          </div>;
        })}
      </div>
      <Link to="/" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><ArrowLeft size={15} /> All modules</Link>
    </div>
  </main>;
}

function TopicRow({ module, topic, index }: { module: LearningModule; topic: Topic; index?: string }) {
  return <Link to={`${modulePath(module.id)}/topics/${topic.slug}`} className="focus-ring group flex items-center gap-4 py-4">
    <span className="w-7 font-mono text-[11px] text-muted-foreground">{index ?? '—'}</span>
    <span className="min-w-0 flex-1"><span className="block text-[14px] font-semibold group-hover:text-primary">{topic.title}</span><span className="mt-0.5 block truncate text-[12px] text-muted-foreground">{topic.summary}</span></span>
    <span className="hidden font-mono text-[10px] text-muted-foreground sm:block">{topic.category}</span><ChevronRight size={15} className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
  </Link>;
}

function TopicsPage() {
  const { moduleId = '' } = useParams();
  const module = getModule(moduleId);
  if (!module) return <NotFoundPage />;
  if (module.status === 'planned') return <PlannedModulePage module={module} section="topics" />;
  const base = modulePath(module.id);
  return <main className="mx-auto min-h-[70vh] max-w-[1180px] px-5 pb-16 pt-10 sm:px-8">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div><SectionLabel>THE REFERENCE SHELF</SectionLabel><h1 className="font-serif text-4xl tracking-tight">{module.title} topics</h1><p className="mt-2 text-sm text-muted-foreground">Short lessons, organized by the shape of the idea.</p></div>
      <span className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground">{module.topics.length} notes</span>
    </div>
    <div className="grid gap-9 md:grid-cols-2 xl:grid-cols-3">
      {module.categories.map((category, categoryIndex) => {
        const entries = module.topics.filter((topic) => topic.category === category);
        return <section key={category} className="min-w-0">
          <div className="mb-2 flex items-baseline justify-between border-b border-border pb-2"><h2 className="font-serif text-[21px]">{category}</h2><span className="font-mono text-[10px] text-muted-foreground">{String(categoryIndex + 1).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}</span></div>
          {entries.map((topic, index) => <TopicRow key={topic.slug} module={module} topic={topic} index={String(index + 1).padStart(2, '0')} />)}
        </section>;
      })}
    </div>
    <Link to={`${base}/quick-refresher`} className="focus-ring mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary">Open the Quick Refresher <ArrowRight size={14} /></Link>
  </main>;
}

function Markdown({ markdown }: { markdown: string }) {
  return <div className="doc-prose">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        table: ({ node: _node, children, ...props }) => <div className="doc-table-wrap" role="region" aria-label="Lesson reference table" tabIndex={0}><table {...props}>{children}</table></div>,
      }}
    >{markdown}</ReactMarkdown>
  </div>;
}

type LessonHeading = { text: string; id: string; depth: number };

function extractMarkdownHeadings(markdown: string): LessonHeading[] {
  const slugger = new GithubSlugger();
  const headings: LessonHeading[] = [];
  let fence: string | undefined;

  for (const line of markdown.split(/\r?\n/)) {
    const fenceMatch = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      if (!fence) fence = marker;
      else if (fence === marker) fence = undefined;
      continue;
    }
    if (fence) continue;

    const match = line.match(/^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2]
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/<[^>]+>/g, '')
      .replace(/\*\*|__|~~|\*|_/g, '')
      .trim();
    const id = slugger.slug(text);
    if (depth > 1 && text) headings.push({ text, id, depth });
  }
  return headings;
}

function TableOfContents({ headings }: { headings: LessonHeading[] }) {
  if (!headings.length) return null;
  return <nav aria-label="In this note" className="border-l border-border pl-4">
    <span className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">IN THIS NOTE</span>
    {headings.map((heading) => <a
      key={`${heading.id}-${heading.depth}`}
      href={`#${heading.id}`}
      className={`block py-1.5 text-[12px] leading-5 text-muted-foreground hover:text-primary ${heading.depth > 2 ? 'pl-3' : ''}`}
    >{heading.text}</a>)}
  </nav>;
}

function RelatedTopics({ module, topics }: { module: LearningModule; topics: Topic[] }) {
  if (!topics.length) return null;
  return <section className="border-t border-border pt-5">
    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">RELATED TOPICS</span>
    {topics.map((item) => <Link key={item.slug} to={`${modulePath(module.id)}/topics/${item.slug}`} className="mt-3 block text-[12px] hover:text-primary">{item.title} <ArrowRight size={11} className="inline text-muted-foreground" /></Link>)}
  </section>;
}

function LessonPage() {
  const { moduleId = '', slug = '' } = useParams();
  const module = getModule(moduleId);
  if (!module) return <NotFoundPage />;
  if (module.status === 'planned') return <PlannedModulePage module={module} section="topics" />;
  const found = module.getLesson(slug);
  if (!found?.markdown) return <main className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="font-serif text-3xl">Lesson not found</h1><p className="mt-3 text-muted-foreground">This page may have moved. Try the topic index.</p><Link to={`${modulePath(module.id)}/topics`} className="mt-5 inline-block text-primary">Browse topics</Link></main>;
  const { topic, markdown } = found;
  const headings = extractMarkdownHeadings(markdown);
  const related = topic.related.flatMap((relatedSlug) => {
    const relatedTopic = module.topics.find((entry) => entry.slug === relatedSlug);
    return relatedTopic ? [relatedTopic] : [];
  });
  const topicIndex = module.topics.findIndex((entry) => entry.slug === topic.slug);
  const previous = module.topics[topicIndex - 1];
  const next = module.topics[topicIndex + 1];
  const base = modulePath(module.id);
  return <main className="mx-auto max-w-[1180px] px-5 pb-16 pt-7 sm:px-8">
    <div className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Brushup</Link><ChevronRight size={12} /><Link to={base} className="hover:text-primary">{module.title}</Link><ChevronRight size={12} /><Link to={`${base}/topics`} className="hover:text-primary">Topics</Link><ChevronRight size={12} /><span>{topic.category}</span><ChevronRight size={12} /><span className="text-foreground">{topic.title}</span></div>
    <div className="grid gap-12 lg:grid-cols-[minmax(0,720px)_240px]">
      <article>
        <div className="mb-7 border-b border-border pb-6"><span className="font-mono text-[10px] uppercase tracking-[.15em] text-primary">{topic.category} · QUICK NOTE</span><h1 className="mt-2 font-serif text-[2.65rem] leading-tight tracking-tight sm:text-5xl">{topic.title}</h1><p className="mt-3 max-w-xl text-[15px] leading-7 text-muted-foreground">{topic.summary}</p></div>
        <div className="mb-7 lg:hidden"><TableOfContents headings={headings} /></div>
        <Markdown markdown={markdown} />
        <div className="mt-8 lg:hidden"><RelatedTopics module={module} topics={related} /></div>
        <nav aria-label="Topic navigation" className="mt-10 grid grid-cols-2 gap-3 border-t border-border pt-5">
          {previous ? <Link to={`${base}/topics/${previous.slug}`} data-testid="link-previous-topic" className="focus-ring rounded-lg p-2 text-left hover:bg-secondary">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><ArrowLeft size={12} /> Previous</span>
            <span className="mt-1 block text-sm font-medium">{previous.title}</span>
          </Link> : <span aria-hidden="true" />}
          {next ? <Link to={`${base}/topics/${next.slug}`} data-testid="link-next-topic" className="focus-ring rounded-lg p-2 text-right hover:bg-secondary">
            <span className="flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Next <ArrowRight size={12} /></span>
            <span className="mt-1 block text-sm font-medium">{next.title}</span>
          </Link> : <span aria-hidden="true" />}
        </nav>
        <div className="mt-4 text-center">
          <span className="font-mono text-[10px] text-muted-foreground">{topicIndex + 1} / {module.topics.length}</span>
        </div>
      </article>
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-7">
          <TableOfContents headings={headings} />
          <RelatedTopics module={module} topics={related} />
        </div>
      </aside>
    </div>
  </main>;
}

function QuickRefresherPage() {
  const { moduleId = '' } = useParams();
  const module = getModule(moduleId);
  if (!module) return <NotFoundPage />;
  if (module.status === 'planned') return <PlannedModulePage module={module} section="quick-refresher" />;
  const base = modulePath(module.id);
  return <main className="mx-auto max-w-[1180px] px-5 pb-16 pt-9 sm:px-8">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div><SectionLabel>{module.title.toUpperCase()} · THE SHORT VERSION</SectionLabel><h1 className="font-serif text-4xl tracking-tight">Quick Refresher</h1><p className="mt-2 text-sm text-muted-foreground">Scan useful concepts, remember the essentials, and carry on.</p></div>
      <span className="font-mono text-[11px] text-muted-foreground">~ 2 MIN READ</span>
    </div>
    <div className="grid gap-x-8 md:grid-cols-2">
      {module.refresher.map((item, index) => <article key={item.slug} className="border-b border-border py-5">
        <div className="flex items-baseline gap-3"><span className="font-mono text-[10px] text-primary">{String(index + 1).padStart(2, '0')}</span><h2 className="font-serif text-[22px]">{item.name}</h2></div>
        <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{item.summary}</p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-card px-3.5 py-3 font-mono text-[11px] leading-[1.65] text-foreground"><code>{item.code.replace(/\\n/g, '\n')}</code></pre>
        <Link to={`${base}/topics/${item.slug}`} className="focus-ring mt-3 inline-flex items-center gap-1 rounded text-[11px] font-medium text-primary">Read the full note <ArrowRight size={12} /></Link>
      </article>)}
    </div>
    {module.handyApis.length > 0 && <section className="mt-12">
      <div className="mb-4 border-b border-border pb-4"><SectionLabel>KEEP THESE CLOSE</SectionLabel><h2 className="font-serif text-2xl">Handy APIs</h2><p className="mt-1 text-sm text-muted-foreground">Small tools you will reach for often.</p></div>
      <div className="doc-table-wrap" role="region" aria-label={`Handy ${module.title} APIs`} tabIndex={0}><table><thead><tr><th>API or method</th><th>What it does</th><th>Short example</th></tr></thead><tbody>
        {module.handyApis.map((api) => <tr key={api.name}><td><code>{api.name}</code></td><td>{api.description}</td><td><code>{api.example}</code></td></tr>)}
      </tbody></table></div>
    </section>}
  </main>;
}

function NotFoundPage() {
  return <main className="mx-auto max-w-3xl px-5 py-24 text-center"><FileText className="mx-auto text-primary" /><h1 className="mt-4 font-serif text-3xl">Page not found</h1><p className="mt-3 text-sm text-muted-foreground">That page is not part of a registered module.</p><Link to="/" className="mt-4 inline-block text-sm text-primary">Back to Brushup</Link></main>;
}

function AppContent() {
  const theme = useTheme();
  return <div className="min-h-[100dvh] bg-background text-foreground">
    <Header dark={theme.dark} toggle={theme.toggle} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/topics" element={<Navigate replace to="/python/topics" />} />
      <Route path="/topics/:slug" element={<LegacyTopicRedirect />} />
      <Route path="/quick-refresher" element={<Navigate replace to="/python/quick-refresher" />} />
      <Route path="/:moduleId/topics/:slug" element={<LessonPage />} />
      <Route path="/:moduleId/topics" element={<TopicsPage />} />
      <Route path="/:moduleId/quick-refresher" element={<QuickRefresherPage />} />
      <Route path="/:moduleId" element={<ModuleHomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
  </div>;
}

function LegacyTopicRedirect() {
  const { slug = '' } = useParams();
  return <Navigate replace to={`/python/topics/${slug}`} />;
}

function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}

export default App;
