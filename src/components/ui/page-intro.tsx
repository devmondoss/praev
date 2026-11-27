/** Cabecera de página sobria: título, bajada y estado opcional, sin hero. */
export function PageIntro({
  title,
  lead,
  status,
}: {
  title: string;
  lead?: string;
  status?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-[24px] font-semibold tracking-tight md:text-[32px]">{title}</h1>
      {lead ? <p className="max-w-3xl text-base leading-7 text-muted">{lead}</p> : null}
      {status ? (
        <p className="w-fit rounded-lg border border-border bg-surface px-3 py-2 text-[13px] text-muted">
          {status}
        </p>
      ) : null}
    </div>
  );
}
