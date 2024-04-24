import { ObjectId } from "mongodb"
import { DataProvider } from "./DataProvider.js"
import { FilterPayload, PaginationPayload, SortPayload } from "./DataProviderTypes.js"

let dataProvider: DataProvider

beforeAll(async () => {
    dataProvider = new DataProvider([{ name: 'test' }])
    await dataProvider.waitReady()
  })
  
  afterAll(async () => {
    dataProvider.close()
  })

test('DataProvider create', async () => {
    dataProvider.dbs['test'].deleteMany({})
    await new Promise((res): NodeJS.Timeout => setTimeout(res, 1000))
    const result = await dataProvider.create('test', { data: { name: 'record 1', some: 'thing' }})
    await dataProvider.create('test', { data: { name: 'record 2', some: 'thing' }})
    expect(result?.data).toBeDefined()
    expect(typeof result.data.id === 'string').toBeTruthy()
    expect(result.data.id.length).toBe(24)
    expect(result.data.some).toBe('thing')
})

test('DataProvider getList', async () => {
  const pagination: PaginationPayload = {
    page: 1,
    perPage: 1,
  }
  const filter: FilterPayload = {
    name: 'record 1',
  }
  const sort: SortPayload = {
    field: 'name',
    order: 'ASC'
  }
  const result = await dataProvider.getList('test', { pagination, filter, sort })
  expect(result).toBeDefined()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...dataWithoutId } = result.data[0]
  expect(JSON.stringify(dataWithoutId)).toBe(JSON.stringify({ name: 'record 1', some: 'thing' }))
})

test('DataProvider getOne', async () => {
    const result = await dataProvider.getOne('test', { id: (new ObjectId()).toHexString() })
    expect(result).toBeDefined()
    expect(result.data).toBeUndefined()
})