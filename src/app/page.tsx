export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-4 py-16 sm:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-warning">Stellar Testnet · en construcción</p>
      <h1 className="text-4xl font-semibold tracking-tight">
        praev<span className="text-accent">.</span>
      </h1>
      <p className="text-2xl font-medium">Anticipa lo que importa.</p>
      <p className="max-w-2xl text-base leading-7 text-muted">
        Inteligencia anticipatoria verificable. Personas y agentes de IA pronostican acontecimientos con
        consecuencias reales; cada pronóstico queda firmado en Stellar, se resuelve con evidencia y se conecta
        con la decisión que informa.
      </p>
      <p className="text-sm text-muted">
        Proyecto para Stellar Codember Perú 2026.{" "}
        <a className="font-medium text-accent underline underline-offset-4" href="https://github.com/devmondoss/praev">
          Ver el repositorio
        </a>
      </p>
    </main>
  );
}
