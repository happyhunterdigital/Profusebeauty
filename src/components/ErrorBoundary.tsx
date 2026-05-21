// File: src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: ''
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Critical error captured by Root Boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-6 bg-zinc-950 p-8 border border-amber-500/20">
            <span className="text-4xl">✨</span>
            <h1 className="text-2xl font-serif text-[#fbbf24] uppercase tracking-wider">Aesthetic Recovery</h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We encountered a slight application interface error during your beauty session. No data was lost.
            </p>
            <div className="p-3 bg-zinc-900 border border-white/5 rounded text-left">
              <span className="text-[9px] font-mono text-zinc-500 block uppercase">Error details</span>
              <p className="text-[10px] font-mono text-rose-400 break-words mt-1">{this.state.errorMessage}</p>
            </div>
            <button
              onClick={() => { window.location.href = '/'; }}
              className="w-full py-3 bg-[#fbbf24] text-black font-black uppercase text-xs tracking-widest"
            >
              Refresh Application Interface
            </button>
          </div>
        </div>
      );
    }

    // Restores DOM mounting by resolving the correct React props context
    return this.props.children;
  }
}
