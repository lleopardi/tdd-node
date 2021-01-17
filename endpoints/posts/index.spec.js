const postHandler = require("./index");

describe("endpoints", () => {
  describe("Post", () => {
    it("must create a resource", async () => {
      const mockUsers = [{ id: 1 }, { id: 2 }];
      const post = {
        userId: 1,
        title: "title",
        body: "body",
      };

      const req = {
        body: post,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
      };

      await postHandler({ axios }).post(req, res);

      expect(res.status.mock.calls).toEqual([[201]]);
      expect(res.send.mock.calls).toEqual([[{ id: 1000 }]]);

      expect(axios.get.mock.calls).toEqual([
        ["https://jsonplaceholder.typicode.com/users"],
      ]);

      expect(axios.post.mock.calls).toEqual([
        ["https://jsonplaceholder.typicode.com/posts", post],
      ]);
    });

    it('should not create a post if userid does not exist', async () => {

      const mockUsers = [{ id: 1 }, { id: 2 }];
      const post = {
        userId: 3,
        title: "title",
        body: "body",
      };

      const req = {
        body: post,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        sendStatus: jest.fn()
      };

      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
      };

      await postHandler({ axios }).post(req, res);
      expect(axios.post).not.toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(400);
      
    });



  });
});
