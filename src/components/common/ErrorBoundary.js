"use client";
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Можно логировать ошибку
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-red-600">Something went wrong.</div>;
    }
    return this.props.children;
  }
}