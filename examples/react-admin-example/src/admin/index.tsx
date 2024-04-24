import { Admin, Resource, ListGuesser } from "react-admin";
import { MyLayout } from './MyLayout.js'
import { useRpcDataProvider } from "./useRpcDataprovider.js";

const App = () => {
    const rpcDataProvider = useRpcDataProvider()
    return (!rpcDataProvider.isLoading && rpcDataProvider.dataProvider) ? <Admin dataProvider={rpcDataProvider.dataProvider} layout={MyLayout}>
        <Resource name="posts" list={ListGuesser} />
        <Resource name="comments" list={ListGuesser} />
    </Admin> : <></>
}

export default App;