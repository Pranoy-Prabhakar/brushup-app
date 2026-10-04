import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, Command, FileText, Moon, Search, Sun } from 'lucide-react';
import { categories, getLesson, topics, type Topic } from './content/catalog';
import { refresher, handyApis } from './content/refresher';

function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('python-brush-up-theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('python-brush-up-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return { dark, toggle: () => setDark((value) => !value) };
}

function SearchBox() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return topics.map((topic) => ({ topic, score: `${topic.title} ${topic.category} ${topic.summary} ${topic.keywords} ${topic.slug} ${getLesson(topic.slug)?.markdown ?? ''}`.toLowerCase().includes(term) ? 1 : 0 }))
      .filter((item) => item.score).slice(0, 7).map((item) => item.topic);
  }, [query]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); inputRef.current?.focus(); setOpen(true);
      }
      if (event.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  function openResult(topic: Topic) {
    navigate(`/topics/${topic.slug}`); setQuery(''); setOpen(false); inputRef.current?.blur();
  }
  return <div className="relative w-full max-w-[330px]">
    <div className={`flex items-center gap-2 rounded-lg border bg-background px-3 h-10 transition-colors ${open ? 'border-primary/60' : 'border-border'}`}>
      <Search size={15} className="shrink-0 text-muted-foreground" />
      <input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setOpen(true); }} onFocus={() => setOpen(true)}
        onKeyDown={(event) => { if (event.key === 'Enter' && results[0]) openResult(results[0]); }}
        placeholder="Search lessons or APIs..." aria-label="Search lessons and APIs" className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/75" />
      {!query && <kbd className="hidden sm:flex items-center gap-1 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"><Command size={10} /> K</kbd>}
      {query && <button onClick={() => { setQuery(''); setOpen(false); }} className="text-[11px] text-muted-foreground hover:text-foreground" aria-label="Clear search">Clear</button>}
    </div>
    {open && query.trim() && <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-foreground/10">
      {results.length ? <div className="p-1.5">{results.map((topic) => <button key={topic.slug} onClick={() => openResult(topic)} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left hover:bg-secondary focus-ring">
        <span><span className="block text-sm font-medium">{topic.title}</span><span className="mt-0.5 block text-[11px] text-muted-foreground">{topic.category} · {topic.summary}</span></span><ArrowRight size={14} className="text-muted-foreground" />
      </button>)}</div> : <div className="px-4 py-5 text-center text-sm text-muted-foreground">No lessons found for “{query}”.</div>}
      <div className="border-t border-border px-3 py-2 text-[10px] text-muted-foreground">Search titles, keywords, and concepts</div>
    </div>}
  </div>;
}

function Header({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const location = useLocation();
  useEffect(() => {
    const topicSlug = location.pathname.match(/^\/topics\/([^/]+)$/)?.[1];
    const topic = topicSlug ? getLesson(topicSlug)?.topic : undefined;
    const title = location.pathname === '/'
      ? 'Brushup — a quick field guide'
      : location.pathname === '/quick-refresher'
        ? 'Quick Python refresher · Brushup'
        : location.pathname === '/topics'
          ? 'Python topics · Brushup'
          : topic
            ? `${topic.title}: Python guide · Brushup`
            : 'Brushup';
    const description = location.pathname === '/'
      ? 'Refresh what you know with plain-language notes, short examples, and useful reference tables. Brushup starts with Python and can grow with more topics.'
      : location.pathname === '/quick-refresher'
        ? 'Review 11 core Python ideas and handy built-ins, methods, and standard-library helpers with short examples.'
        : location.pathname === '/topics'
          ? 'Browse 26 short Python lessons about variables, collections, functions, classes, errors, files, and more.'
          : topic
            ? `${topic.summary} Read a plain-language explanation, short examples, common mistakes, and a table of related Python APIs.`
            : 'Refresh coding concepts with plain-language lessons, short examples, and useful API tables.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
  }, [location.pathname]);
  return <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
    <div className="mx-auto flex h-[68px] max-w-[1180px] items-center gap-3 px-5 sm:gap-5 sm:px-8">
      <Link to="/" className="focus-ring flex shrink-0 items-center gap-2.5 rounded-md">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-[13px] font-medium text-primary-foreground">b.</span>
        <span className="text-[14px] font-semibold tracking-tight">Brushup</span>
      </Link>
      <nav className="hidden items-center gap-1 md:flex">
        <NavLink to="/topics" className={({ isActive }) => `rounded-md px-3 py-2 text-[13px] ${isActive ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Topics</NavLink>
        <NavLink to="/quick-refresher" className={({ isActive }) => `rounded-md px-3 py-2 text-[13px] ${isActive ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>Quick refresher</NavLink>
      </nav>
      <div className="ml-auto w-full max-w-[300px] sm:max-w-[320px]"><SearchBox /></div>
      <button onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    </div>
    <nav className="mx-auto flex max-w-[1180px] items-center gap-1 border-t border-border/70 px-5 py-1.5 md:hidden sm:px-8">
      <NavLink to="/topics" className={({ isActive }) => `rounded px-2.5 py-1 text-[11px] ${isActive ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground'}`}>Topics</NavLink>
      <NavLink to="/quick-refresher" className={({ isActive }) => `rounded px-2.5 py-1 text-[11px] ${isActive ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground'}`}>Quick refresher</NavLink>
    </nav>
  </header>;
}

function Footer() {
  return <footer className="mt-20 border-t border-border">
    <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <span>Brushup <span className="mx-1 text-border">/</span> A field guide for the bits you almost remember.</span>
      <span className="font-mono">26 lessons · no rabbit holes</span>
    </div>
  </footer>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-muted-foreground"><span className="h-px w-4 bg-accent" />{children}</div>;
}

function HomePage() {
  return <main className="mx-auto max-w-[1180px] px-5 pb-14 pt-11 sm:px-8 sm:pt-16">
    <section className="relative grid gap-10 overflow-hidden rounded-2xl border border-border bg-card px-6 py-8 sm:grid-cols-[1fr_290px] sm:px-10 sm:py-11">
      <div className="absolute right-0 top-0 h-full w-1 bg-primary" />
      <div className="max-w-[650px]">
        <SectionLabel>A QUICK FIELD GUIDE</SectionLabel>
        <h1 className="max-w-xl font-serif text-[2.7rem] leading-[1.02] tracking-[-.035em] sm:text-[3.65rem]"><span className="whitespace-nowrap text-primary">Brushup</span></h1>
        <p className="mt-5 max-w-lg text-[15px] leading-7 text-muted-foreground">Quickly refresh what you know. Start with Python, find what you need, and keep going.</p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link to="/topics" className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-[13px] font-semibold text-primary-foreground hover:opacity-90">Browse all topics <ArrowRight size={15} /></Link>
          <Link to="/quick-refresher" className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-4 text-[13px] font-medium hover:bg-secondary">Start Quick Refresher</Link>
        </div>
      </div>
      <aside className="flex flex-col justify-center border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
        <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">A small reminder</span>
        <p className="mt-3 font-serif text-[1.35rem] leading-snug">“The best way to remember is to keep moving.”</p>
        <span className="mt-4 font-mono text-[11px] text-primary">01 — REVISIT, THEN RETURN</span>
      </aside>
    </section>

    <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
      <section>
        <div className="mb-5 flex items-end justify-between"><div><SectionLabel>START HERE</SectionLabel><h2 className="font-serif text-2xl">A quick way back in</h2></div><span className="font-mono text-[11px] text-muted-foreground">01—04</span></div>
        <div className="divide-y divide-border border-y border-border">
          {topics.slice(0, 4).map((topic, index) => <TopicRow key={topic.slug} topic={topic} index={String(index + 1).padStart(2, '0')} />)}
        </div>
        <Link to="/topics" className="focus-ring mt-5 inline-flex items-center gap-2 rounded text-sm font-medium text-primary">All 26 lessons <ArrowRight size={14} /></Link>
      </section>
      <aside>
        <SectionLabel>SHORT ON TIME?</SectionLabel>
        <Link to="/quick-refresher" className="focus-ring group block rounded-xl border border-border bg-card p-5 hover:border-primary/50">
          <span className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-muted-foreground"><span>11 essentials</span><ArrowRight size={14} className="text-primary transition-transform group-hover:translate-x-0.5" /></span>
          <h3 className="mt-4 font-serif text-2xl leading-tight">The quick<br />refresher</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Eleven useful ideas. One screenful each. Get oriented and move on.</p>
          <div className="mt-5 flex gap-1">{Array.from({ length: 11 }, (_, i) => <span key={i} className={`h-1 flex-1 rounded-full ${i < 7 ? 'bg-primary/70' : 'bg-secondary'}`} />)}</div>
        </Link>
      </aside>
    </div>
    <section className="mt-14 border-t border-border pt-7">
      <div className="flex flex-wrap items-center justify-between gap-3"><SectionLabel>THE NOTEBOOK</SectionLabel><Link to="/topics" className="text-xs font-medium text-primary hover:underline">Explore by category <ArrowRight size={12} className="ml-1 inline" /></Link></div>
      <div className="mt-2 grid gap-x-9 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const entries = topics.filter((topic) => topic.category === category);
          return <div key={category}><h3 className="mb-2 text-[13px] font-semibold">{category}<span className="ml-2 font-mono text-[10px] font-normal text-muted-foreground">{String(entries.length).padStart(2, '0')}</span></h3>
            {entries.slice(0, 3).map((topic) => <Link key={topic.slug} to={`/topics/${topic.slug}`} className="focus-ring block rounded py-1 text-[12px] text-muted-foreground hover:text-primary">{topic.title}</Link>)}
          </div>;
        })}
      </div>
    </section>
  </main>;
}

function TopicRow({ topic, index }: { topic: Topic; index?: string }) {
  return <Link to={`/topics/${topic.slug}`} className="focus-ring group flex items-center gap-4 py-4">
    <span className="w-7 font-mono text-[11px] text-muted-foreground">{index ?? '—'}</span>
    <span className="min-w-0 flex-1"><span className="block text-[14px] font-semibold group-hover:text-primary">{topic.title}</span><span className="mt-0.5 block truncate text-[12px] text-muted-foreground">{topic.summary}</span></span>
    <span className="hidden font-mono text-[10px] text-muted-foreground sm:block">{topic.category}</span><ChevronRight size={15} className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
  </Link>;
}

function TopicsPage() {
  return <main className="mx-auto min-h-[70vh] max-w-[1180px] px-5 pb-16 pt-10 sm:px-8">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div><SectionLabel>THE REFERENCE SHELF</SectionLabel><h1 className="font-serif text-4xl tracking-tight">All topics</h1><p className="mt-2 text-sm text-muted-foreground">Short lessons, organized by the shape of the idea.</p></div>
      <span className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground">26 notes</span>
    </div>
    <div className="grid gap-9 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category, catIndex) => {
        const entries = topics.filter((topic) => topic.category === category);
        return <section key={category} className="min-w-0">
          <div className="mb-2 flex items-baseline justify-between border-b border-border pb-2"><h2 className="font-serif text-[21px]">{category}</h2><span className="font-mono text-[10px] text-muted-foreground">{String(catIndex + 1).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}</span></div>
          {entries.map((topic, index) => <TopicRow key={topic.slug} topic={topic} index={String(index + 1).padStart(2, '0')} />)}
        </section>;
      })}
    </div>
  </main>;
}

function InlineText({ text }: { text: string }) {
  const pieces = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return <>{pieces.map((part, index) => part.startsWith('`') ? <code key={index}>{part.slice(1, -1)}</code> : part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part)}</>;
}

function Markdown({ markdown }: { markdown: string }) {
  const lines = markdown.trim().split('\n');
  const blocks: React.ReactNode[] = [];
  let code: string[] = [];
  let inCode = false;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.startsWith('```')) {
      if (inCode) { blocks.push(<pre key={`code-${i}`}><code>{code.join('\n')}</code></pre>); code = []; }
      inCode = !inCode; continue;
    }
    if (inCode) { code.push(line); continue; }
    if (line.trim().startsWith('|') && lines[i + 1]?.trim().startsWith('|')) {
      const cells = (row: string) => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
      const header = cells(line);
      const bodyRows: string[] = [];
      i += 1;
      if (/^\|?\s*:?-{3,}/.test(lines[i].trim())) i += 1;
      while (i < lines.length && lines[i].trim().startsWith('|')) bodyRows.push(lines[i++]);
      i -= 1;
      blocks.push(<div className="doc-table-wrap" key={`table-${i}`} role="region" aria-label={`${header[0]} reference table`} tabIndex={0}>
        <table><thead><tr>{header.map((cell, index) => <th key={index}><InlineText text={cell} /></th>)}</tr></thead>
          <tbody>{bodyRows.map((row, rowIndex) => <tr key={rowIndex}>{cells(row).map((cell, cellIndex) => <td key={cellIndex}><InlineText text={cell} /></td>)}</tr>)}</tbody>
        </table>
      </div>);
      continue;
    }
    if (line.startsWith('## ')) blocks.push(<h2 key={i}>{line.slice(3)}</h2>);
    else if (line.trim()) blocks.push(<p key={i}><InlineText text={line} /></p>);
  }
  if (code.length) blocks.push(<pre key="final-code"><code>{code.join('\n')}</code></pre>);
  return <div className="doc-prose">{blocks}</div>;
}

function LessonPage() {
  const { slug = '' } = useParams();
  const found = getLesson(slug);
  if (!found?.markdown) return <main className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="font-serif text-3xl">Lesson not found</h1><p className="mt-3 text-muted-foreground">This page may have moved. Try the topic index.</p><Link to="/topics" className="mt-5 inline-block text-primary">Browse topics</Link></main>;
  const { topic, markdown } = found;
  const related = topics.filter((entry) => entry.category === topic.category && entry.slug !== topic.slug).slice(0, 3);
  return <main className="mx-auto max-w-[1180px] px-5 pb-16 pt-7 sm:px-8">
    <div className="mb-8 flex items-center gap-2 text-xs text-muted-foreground"><Link to="/topics" className="hover:text-primary">Topics</Link><ChevronRight size={12} /><span>{topic.category}</span><ChevronRight size={12} /><span className="text-foreground">{topic.title}</span></div>
    <div className="grid gap-12 lg:grid-cols-[minmax(0,720px)_240px]">
      <article>
        <div className="mb-7 border-b border-border pb-6"><span className="font-mono text-[10px] uppercase tracking-[.15em] text-primary">{topic.category} · QUICK NOTE</span><h1 className="mt-2 font-serif text-[2.65rem] leading-tight tracking-tight sm:text-5xl">{topic.title}</h1><p className="mt-3 max-w-xl text-[15px] leading-7 text-muted-foreground">{topic.summary}</p></div>
        <Markdown markdown={markdown} />
        <div className="mt-10 flex items-center justify-between border-t border-border pt-5">
          <Link to="/topics" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={14} /> Topic index</Link>
          <Link to="/quick-refresher" className="inline-flex items-center gap-2 text-sm font-medium text-primary">Quick refresher <ArrowRight size={14} /></Link>
        </div>
      </article>
      <aside className="hidden lg:block">
        <div className="sticky top-24 border-l border-border pl-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">IN THIS NOTE</span>
          {['What is it?', 'Syntax', 'Example', 'When to use', 'Common mistake', 'Tip', 'Remember'].map((item) => <div key={item} className="py-2 text-[12px] text-muted-foreground">{item}</div>)}
          {!!related.length && <div className="mt-7 border-t border-border pt-5"><span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">NEARBY TOPICS</span>{related.map((item) => <Link key={item.slug} to={`/topics/${item.slug}`} className="mt-3 block text-[12px] hover:text-primary">{item.title} <ArrowRight size={11} className="inline text-muted-foreground" /></Link>)}</div>}
        </div>
      </aside>
    </div>
  </main>;
}

function QuickRefresherPage() {
  return <main className="mx-auto max-w-[1180px] px-5 pb-16 pt-9 sm:px-8">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div><SectionLabel>THE SHORT VERSION</SectionLabel><h1 className="font-serif text-4xl tracking-tight">Quick Refresher</h1><p className="mt-2 text-sm text-muted-foreground">Eleven concepts to get your bearings. Scan, remember, carry on.</p></div>
      <span className="font-mono text-[11px] text-muted-foreground">~ 2 MIN READ</span>
    </div>
    <div className="grid gap-x-8 md:grid-cols-2">
      {refresher.map((item, index) => <article key={item.slug} className="border-b border-border py-5">
        <div className="flex items-baseline gap-3"><span className="font-mono text-[10px] text-primary">{String(index + 1).padStart(2, '0')}</span><h2 className="font-serif text-[22px]">{item.name}</h2></div>
        <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{item.summary}</p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-card px-3.5 py-3 font-mono text-[11px] leading-[1.65] text-foreground"><code>{item.code.replace(/\\n/g, '\n')}</code></pre>
        <Link to={`/topics/${item.slug}`} className="focus-ring mt-3 inline-flex items-center gap-1 rounded text-[11px] font-medium text-primary">Read the full note <ArrowRight size={12} /></Link>
      </article>)}
    </div>
    <section className="mt-12">
      <div className="mb-4 border-b border-border pb-4"><SectionLabel>KEEP THESE CLOSE</SectionLabel><h2 className="font-serif text-2xl">Handy APIs</h2><p className="mt-1 text-sm text-muted-foreground">Small tools you will reach for often.</p></div>
      <div className="doc-table-wrap" role="region" aria-label="Handy Python APIs" tabIndex={0}><table><thead><tr><th>API or method</th><th>What it does</th><th>Short example</th></tr></thead><tbody>
        {handyApis.map((api) => <tr key={api.name}><td><code>{api.name}</code></td><td>{api.description}</td><td><code>{api.example}</code></td></tr>)}
      </tbody></table></div>
    </section>
  </main>;
}

function AppContent() {
  const theme = useTheme();
  return <div className="min-h-[100dvh] bg-background text-foreground">
    <Header dark={theme.dark} toggle={theme.toggle} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/topics" element={<TopicsPage />} />
      <Route path="/topics/:slug" element={<LessonPage />} />
      <Route path="/quick-refresher" element={<QuickRefresherPage />} />
      <Route path="*" element={<main className="mx-auto max-w-3xl px-5 py-24 text-center"><FileText className="mx-auto text-primary" /><h1 className="mt-4 font-serif text-3xl">Page not found</h1><Link to="/" className="mt-4 inline-block text-sm text-primary">Back to the notebook</Link></main>} />
    </Routes>
    <Footer />
  </div>;
}

function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}

export default App;