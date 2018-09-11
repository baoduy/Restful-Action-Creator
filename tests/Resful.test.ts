import RestfulCreator from '../src';

const restApi = RestfulCreator('https://jsonplaceholder.typicode.com');

describe('Test Controller', () => {
  const todoApi = restApi.create('todos');

  test('get by path param todo 1', async () => {
    const item = await todoApi.get({ pathParams: '1' });
    expect(item.data).toHaveProperty('id');
  });

  test('get todo 1', async () => {
    const item = await todoApi.get({ params: { id: 1 } });
    expect(item.data).toHaveLength(1);
  });

  test('get todo', async () => {
    const item = await todoApi.get();
    expect(item.data.length).toBeGreaterThanOrEqual(10);
  });

  //--------------------------------
  test('create, update todo', async () => {
    //Create
    let item = await todoApi.post({
      params: {
        userId: 1,
        title: 'Duy Hoang params',
        completed: false
      },
      data: {
        userId: 1,
        title: 'Duy Hoang data',
        completed: false
      }
    });

    expect(item.data.title).toBe('Duy Hoang data');

    //Update
    item = await todoApi.put({
      pathParams: [1],
      data: {
        ...item.data,
        title: 'Duy Hoang 10'
      }
    });

    expect(item.data.title).toBe('Duy Hoang 10');
  });

  //--------------------------------
  test('PATCH todo', async () => {
    let item = await todoApi.patch({
      pathParams: [1],
      params: { completed: true },
      data: { completed: false }
    });

    expect(item.data.completed).toBe(true);
  });

  test('DELETE todo', async () => {
    let item = await todoApi.delete({
      pathParams: { id: 1 }
    });

    expect(item.data).toBeDefined();
  });

  test('Request DELETE todo', async () => {
    let item = await todoApi.request({
      url: 'https://jsonplaceholder.typicode.com/todos/100',
      method: 'DELETE'
    });

    expect(item.data).toBeDefined();
  });

  test('custom PUT todo', async () => {
    let item = await todoApi.request({
      url: 'https://jsonplaceholder.typicode.com/todos/100',
      method: 'PUT',
      data: {
        id: 100,
        title: 'Duy Hoang 10'
      }
    });

    expect(item.data).toHaveProperty('id');
  });

  test('Test Head todo', async () => {
    let item = await todoApi.head();
    expect(item.data).toBeDefined();
  });
});
