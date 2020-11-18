import NativeMessage from './nativemessage';
import IPC from './ipc';

const args = process.argv.slice(2);

// Proxy is a lightweight application which provides bi-directional communication
// between the browser extension and a running desktop application.
//
// Browser extension <-[native messaging]-> proxy <-[ipc]-> desktop
class Proxy {
    private ipc: IPC;
    private nativeMessage: NativeMessage;

    constructor() {
        this.ipc = new IPC();
        this.nativeMessage = new NativeMessage(this.ipc);
    }

    run() {
        this.ipc.connect();
        this.nativeMessage.listen();
        
        this.ipc.onMessage = this.nativeMessage.send;
    }
}

const proxy = new Proxy();
proxy.run();