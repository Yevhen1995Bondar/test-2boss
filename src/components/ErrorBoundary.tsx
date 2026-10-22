import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Applet ErrorBoundary caught an error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-6 text-zinc-900 font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-zinc-200 shadow-xl text-center space-y-4">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-200">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-black text-zinc-950">Kurze Unterbrechung</h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Beim Laden dieses Bereichs ist ein unerwarteter Fehler aufgetreten.
              </p>
            </div>

            {this.state.error && (
              <div className="text-[11px] font-mono text-zinc-600 bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-left overflow-x-auto max-h-24">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full py-3.5 px-4 bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Seite neu laden</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
