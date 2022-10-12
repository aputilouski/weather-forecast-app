import React from 'react';
import { Alert } from 'flowbite-react';

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? (
      <Alert color="failure" withBorderAccent>
        Something went wrong...
      </Alert>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
