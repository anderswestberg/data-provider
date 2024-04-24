import { Admin, Resource, Datagrid, List, TextField } from "react-admin";
import { MyLayout } from './MyLayout.js'
import { useRpcDataProvider } from "./useRpcDataprovider.js";

const PostList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
)

const CommentList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
)

const App = () => {
    const rpcDataProvider = useRpcDataProvider()
    return (!rpcDataProvider.isLoading && rpcDataProvider.dataProvider) ? <Admin dataProvider={rpcDataProvider.dataProvider} layout={MyLayout}>
        <Resource name="posts" list={PostList} />
        <Resource name="comments" list={CommentList} />
    </Admin> : <></>
}

export default App;