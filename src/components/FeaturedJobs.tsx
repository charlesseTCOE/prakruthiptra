import { jobPostings } from "@/lib/job-postings";

/** Manually curated external opportunities; no Drive connection is required. */
export default function FeaturedJobs() {
  const postings = jobPostings.filter(post => post.active && post.url.startsWith("https://"));
  return <section className="section shell featured-jobs" id="job-postings" aria-labelledby="job-postings-title">
    <div className="section-heading"><div><p className="eyebrow">OPPORTUNITIES SHARED WITH OUR COMMUNITY</p><h2 id="job-postings-title">Job postings.</h2></div><p className="section-description">Explore the original announcement and apply through the employer’s instructions.</p></div>
    <div className="job-postings-list">{postings.map((post, index) => <article className="featured-job-card" key={post.id}>
      <div className="job-monogram" aria-hidden="true">{String(index + 1).padStart(2, "0")}<span>JOB</span></div>
      <div className="featured-job-copy"><span className="tag">{post.category}</span><h3>{post.title}</h3><p className="job-source">{post.source}</p><p>{post.description}</p><p className="job-disclaimer">External opportunity · Applications are handled by the employer.</p></div>
      <div className="featured-job-action"><a className="button" href={post.url} target="_blank" rel="noopener noreferrer">{post.buttonLabel} <span aria-hidden="true">↗</span></a><p>Opens the original posting in a new tab.<br/>Sign-in may be required.</p></div>
    </article>)}</div>
    {!postings.length && <p>New opportunities will be shared here when available.</p>}
  </section>;
}
