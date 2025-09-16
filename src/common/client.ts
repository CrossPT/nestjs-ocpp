import { OcppVersion } from '../interfaces/ocpp.version';
import { OcppConnection } from './connection';
import { WebSocket } from 'ws';

export class OcppClient {
  private connection!: OcppConnection;
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  setConnection(connection: OcppConnection) {
    this.connection = connection;
  }

  close(reason?: string) {
    if (this.connection.socket.readyState === WebSocket.OPEN) {
      this.connection.socket.close(1000, reason || 'Normal closure');
    }
  }

  getIdentifier(): string {
    return this.id;
  }

  getVersion(): OcppVersion {
    return this.connection.version;
  }

  isAlive(): boolean {
    return this.connection.socket.readyState === WebSocket.OPEN;
  }
}
