import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Error info:', errorInfo);

    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary rounded-lg border border-red-200 bg-red-50 p-4">
          <h2 className="mb-2 font-semibold text-red-800">
            Something went wrong! 😅
          </h2>
          <details className="text-sm text-red-700">
            <summary className="mb-2 cursor-pointer">
              Click to see error details
            </summary>
            <pre className="overflow-auto rounded bg-red-100 p-2 text-xs">
              {this.state.error?.toString()}
            </pre>
            {this.state.errorInfo && (
              <pre className="mt-2 overflow-auto rounded bg-red-100 p-2 text-xs">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
