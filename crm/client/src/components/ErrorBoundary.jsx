import { Component } from 'react';
import Icon from './Icon.jsx';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Erro não tratado na aplicação:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'sans-serif' }}>
          <div style={{ maxWidth: 480, textAlign: 'center' }}>
            <div style={{ marginBottom: 12, color: '#E1425B' }}><Icon name="alert-triangle" size={32} /></div>
            <h1 style={{ fontSize: 18, marginBottom: 8 }}>Algo deu errado</h1>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 16 }}>{String(this.state.error?.message || this.state.error)}</p>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '10px 18px', borderRadius: 8, background: '#2F6FED', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
