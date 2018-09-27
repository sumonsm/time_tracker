export const trackedTimeService = {
    fetchItems,
    createItem
};

const fakeFetchData = {
  "data": {
    "data": [{
      "id": "1",
      "type": "tracked-times",
      "attributes": {
        "user-id": 1,
        "started": "2018-09-20T02:40:06.947Z",
        "stopped": "2018-09-20T02:43:06.947Z"
      }
    }, {
      "id": "2",
      "type": "tracked-times",
      "attributes": {
        "user-id": 1,
        "started": "2018-09-20T04:08:06.968Z",
        "stopped": "2018-09-20T04:10:06.968Z"
      }
    }]
  }
};

const fakeCreateData = {};

async function fetchItems() {
  return await new Promise(resolve => {
    resolve(fakeFetchData);
  });
};

async function createItem() {
  return await new Promise(resolve => {
    resolve(fakeCreateData);
  });
};
