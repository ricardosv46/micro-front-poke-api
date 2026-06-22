import { lazy, Suspense } from "react";
import { RemoteErrorBoundary } from "../../../../core/components/RemoteErrorBoundary";

const History = lazy(async () => import("mfHistory/History"));

const HistoryPage = () => (
  <RemoteErrorBoundary remoteName="el historial">
    <Suspense fallback={<p className="p-4 text-center text-on-surface-variant">Cargando...</p>}>
      <History />
    </Suspense>
  </RemoteErrorBoundary>
);

export default HistoryPage;
