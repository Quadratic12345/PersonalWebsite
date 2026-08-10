interface NotFoundProps {
  path: string;
  onHome: () => void;
}

export function NotFound({ path, onHome }: NotFoundProps) {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>
      <p className="not-found__message">
        nothing at <span className="not-found__path">/{path}</span>
      </p>
      <button className="nav-chip" onClick={onHome}>
        back home
      </button>
    </section>
  );
}