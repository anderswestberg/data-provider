import { SocketIoServer, RpcServerConnection } from '@anderswestberg/ts-rpc'
import { DataProvider } from '../../src/DataProvider/DataProvider.js'

let port = 3000
if (process.argv[2])
    port = parseInt(process.argv[2])

const main = async () => {

    const name = 'rpcServer1'
    for (; ;) {
        try {
            const transport = new SocketIoServer(name, undefined, port, false, [])
            const rpcServerConnection = new RpcServerConnection(name, [transport])
            const dataProvider = new DataProvider([{ name: 'test' }])
            rpcServerConnection.rpcServer.manageRpc.exposeClassInstance(dataProvider, 'dataProvider')
            for (; ;) {
                await new Promise(res => setTimeout(res, 5000))
            }
        } catch (e) {
            console.log(e)
        }
        await new Promise(res => setTimeout(res, 5000))
    }
}

main()
