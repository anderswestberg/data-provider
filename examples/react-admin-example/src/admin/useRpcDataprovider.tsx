/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { IDataProvider } from "../../../../src/DataProvider/DataProviderTypes.js"
import { RpcClientConnection, SocketIoTransport } from "@anderswestberg/ts-rpc"

/*
export class LocalDataProvider {
    constructor(public remoteDataProvider: IDataProvider) {
    }
    async getList(
        resource: string,
        params: any
    ): Promise<any> {
        const result = await this.remoteDataProvider.getList(resource, params)
        return result
    }

    async getOne(
        resource: string,
        params: any
    ): Promise<any> {
        return
        const result = await this.remoteDataProvider.getOne(resource, params)
        return result
    }

    async getMany(
        resource: string,
        params: any
    ): Promise<any> {
        return
        const result = await this.remoteDataProvider.getMany(resource, params)
        return result
    }

    async getManyReference(
        resource: string,
        params: any
    ): Promise<any> {
        return
        const result = await this.remoteDataProvider.getManyReference(resource, params)
        return result
    }

    async update(
        resource: string,
        params: any
    ): Promise<any> {
        return
        const result = await this.remoteDataProvider.update(resource, params)
        return result
    }

    async updateMany(
        resource: string,
        params: any
    ): Promise<any> {
        return
        const result = await this.remoteDataProvider.updateMany(resource, params)
        return result
    }

    async create(
        resource: string,
        params: any
    ): Promise<any> {
        return
        const result = await this.remoteDataProvider.create(resource, params)
        return result
    }

    async delete(
        resource: string,
        params: any
    ): Promise<any> {
        return
        const result = await this.remoteDataProvider.delete(resource, params)
        return result
    }

    async deleteMany(
        resource: string,
        params: any
    ): Promise<any> {
        return
        const result = await this.remoteDataProvider.deleteMany(resource, params)
        return result
    }
    async subscribe(topic: string, subscriptionCallback: any): Promise<any> {
        return
        const result = await this.remoteDataProvider.subscribe(topic, subscriptionCallback)
        return result
    }

    async unsubscribe(topic: string, subscriptionCallback: any): Promise<any> {
        return
        const result = await this.remoteDataProvider.unsubscribe(topic, subscriptionCallback)
        return result
    }

    async publish(topic: string, event: any): Promise<any> {
        return
        const result = await this.remoteDataProvider.publish(topic, event)
        return result
    }
    async lock(resource: string, { id, identity, meta }: any): Promise<any> {
        return
        const result = await this.remoteDataProvider.lock(resource, { id, identity, meta })
        return result
    }
    async unlock(resource: string, { id, identity, meta }: any): Promise<any> {
        return
        const result = await this.remoteDataProvider.unlock(resource, { id, identity, meta })
        return result
    }
    async getLock(resource: string, { id, meta }: any): Promise<any> {
        return
        const result = await this.remoteDataProvider.getLock(resource, { id, meta })
        return result
    }
    async getLocks(resource: string, { meta }: any): Promise<any> {
        return
        const result = await this.remoteDataProvider.getLock(resource, { meta })
        return result
    }
}
*/

export const useRpcDataProvider = (url: string = 'http://localhost:3000') => {
    const [dataProvider, setDataProvider] = useState<IDataProvider | null>()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        setIsLoading(true)
        setDataProvider(null)
        setError(null);
        (async () => {
            const transport = new SocketIoTransport(url)
            const rpcConn = new RpcClientConnection('app.test', transport, 'rpcServer1')
            await rpcConn.ready()
            const api = (await rpcConn.api('dataProvider'))
            const remoteDataProvider = api.proxy as IDataProvider
            //const localDataProvider = new LocalDataProvider(remoteDataProvider)
            const localDataProvider = remoteDataProvider
            setDataProvider(localDataProvider)
        })()
        return () => {
        }
    }, [url])
    return { dataProvider, isLoading, error }
}
