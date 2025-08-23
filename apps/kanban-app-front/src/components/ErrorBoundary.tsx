import React from "react";

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
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Error info:", errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-red-800 font-semibold mb-2">
            Something went wrong! 😅
          </h2>
          <details className="text-sm text-red-700">
            <summary className="cursor-pointer mb-2">
              Click to see error details
            </summary>
            <pre className="bg-red-100 p-2 rounded text-xs overflow-auto">
              {this.state.error?.toString()}
            </pre>
            {this.state.errorInfo && (
              <pre className="bg-red-100 p-2 rounded text-xs overflow-auto mt-2">
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