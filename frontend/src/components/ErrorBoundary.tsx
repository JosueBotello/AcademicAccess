import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Typography, Container } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // Initialize state
  public state: State = {
    hasError: false
  };

  // Static method to update state when an error occurs
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // Lifecycle method to log error information
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  // Render method
  public render() {
    // If there's an error, render error message
    if (this.state.hasError) {
      return (
        <Container>
          <Typography variant="h5" component="h1" gutterBottom>
            Oops, there was an error!
          </Typography>
          <Typography variant="body1">
            Something went wrong. Please try refreshing the page or contact support if the problem persists.
          </Typography>
        </Container>
      );
    }

    // If no error, render children components
    return this.props.children;
  }
}

export default ErrorBoundary;