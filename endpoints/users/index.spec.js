const handlers = require("./index");

describe("endpoints", () => {
  describe("users", () => {
    describe("get", () => {
      it("return to user json", async () => {
        const axios = {
          get: jest.fn().mockResolvedValue({ data: 1 }), // jest.fn()crea una funcion mock (espia)
        };

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
        // inyecta dependencia
        await handlers({ axios }).get({}, res);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[1]]);
        // console.log(res.status.mock.calls);
      });
    });

    describe("Post", () => {
      it("must create a resource", async () => {
        const axios = {
          post: jest.fn().mockResolvedValue({ data: 1 }), // jest.fn()crea una funcion mock (espia)
        };

        const req = {
          body: "request body",
        };

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        await handlers({ axios }).post(req, res);
        expect(res.status.mock.calls).toEqual([[201]]);
        expect(res.send.mock.calls).toEqual([[1]]);
        expect(axios.post.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users", "request body"],
        ]);
      });
    });

    describe("Put", () => {
      it("Update a resource", async () => {
        const axios = {
          put: jest.fn().mockResolvedValue({ data: 1 }), // jest.fn()crea una funcion mock (espia)
        };

        const id = 12;
        const body = "request body";
        const req = {
          body,
          params: {
            id
          },
        };

        const res = {
          sendStatus: jest.fn(),
        };

        await handlers({ axios }).put(req, res);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
        expect(axios.put.mock.calls).toEqual([["https://jsonplaceholder.typicode.com/users/12", "request body" ]]);
      });
    });

    describe('Delete', () => {
      it('must delete a resource', async() => {
        const axios = {
          delete: jest.fn().mockResolvedValue({ data: 1 }), // jest.fn()crea una funcion mock (espia)
        };

        const req = {
          params: {
            id: 13
          }
        };

        const res = {
          sendStatus: jest.fn()
        }

        await handlers({axios}).delete(req, res);
        expect(axios.delete.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users/13']]);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);



      });
    });
  });
});
