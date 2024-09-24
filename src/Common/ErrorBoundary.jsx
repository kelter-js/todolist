import { Component } from "react";
import Fallback from "./Fallback";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(e) {
    return {
      hasError: true,
    };
  }

  render() {
    return this.state.hasError ? <Fallback /> : this.props.children;
  }
}

export default ErrorBoundary;
