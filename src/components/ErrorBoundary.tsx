import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#05070c] text-white flex flex-col items-center justify-center p-6 text-center" dir="rtl">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl mb-4 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            🧼
          </div>
          <h1 className="text-xl font-bold text-white mb-2">مغسلة آر إم ستار | RM.STAR</h1>
          <p className="text-sm text-slate-400 mb-6 max-w-xs">
            حدث خطأ غير متوقع أثناء تحميل الصفحة. يمكنك إعادة المحاولة الآن.
          </p>
          <div className="flex flex-col gap-2.5 w-full max-w-xs">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
            >
              🔄 إعادة تحديث الصفحة
            </button>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                } catch (e) {}
                window.location.reload();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-medium text-xs transition-colors"
            >
              مسح الذاكرة المؤقتة وتحديث
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
