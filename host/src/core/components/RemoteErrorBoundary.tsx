import { Component, type ReactNode } from "react";

interface RemoteErrorBoundaryProps {
  children: ReactNode;
  remoteName: string;
}

interface RemoteErrorBoundaryState {
  hasError: boolean;
}

export class RemoteErrorBoundary extends Component<
  RemoteErrorBoundaryProps,
  RemoteErrorBoundaryState
> {
  state: RemoteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): RemoteErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="p-4 text-center text-error">
          No se pudo cargar {this.props.remoteName}. Verifica que esté en ejecución.
        </p>
      );
    }

    return this.props.children;
  }
}
