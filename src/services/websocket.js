class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(matchCode, playerId) {
    let wsUrl = `${import.meta.env.VITE_BACKEND_URL?.replace('http', 'ws') || 'ws://localhost:8000'}`;
    wsUrl += `/ws/match/${matchCode}/${playerId}`;

    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.emit('connected', { status: 'connected' });
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        if (data && typeof data.error === 'string') {
          this.emit('error', { error: data.error });
        } else {
          this.emit('message', data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        this.emit('error', { error: 'Failed to parse message' });
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.emit('disconnected', { status: 'disconnected' });
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', { error: 'WebSocket connection error' });
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  // Event listener system
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  isConnected() {
    return this.socket && this.socket.readyState === WebSocket.OPEN;
  }
}

export default new WebSocketService();
