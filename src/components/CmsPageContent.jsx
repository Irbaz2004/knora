import { CMS_PAGES, useCmsPage } from "@/lib/cms";

export default function CmsPageContent({ path }) {
  const page = CMS_PAGES.find((item) => item.path === path);
  const { data } = useCmsPage(page?.id);
  if (!page || !data.enabled) return null;

  return (
    <section
      className="cms-public-section"
      aria-label={`${page.label} managed content`}
    >
      <div className="cms-public-copy">
        {data.eyebrow && <span>{data.eyebrow}</span>}
        {data.title && <h1>{data.title}</h1>}
        {data.subtitle && <h2>{data.subtitle}</h2>}
        {data.body && <p>{data.body}</p>}
      </div>
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.imageAlt || data.title || page.label}
        />
      )}
      {!!data.items?.length && (
        <div className="cms-public-items">
          {data.items.map((item, index) => (
            <article key={item.id || index}>
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title || ""} />
              )}
              <h3>{item.title}</h3>
              {item.meta && <small>{item.meta}</small>}
              {item.description && <p>{item.description}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
