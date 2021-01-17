const urlBase = "https://jsonplaceholder.typicode.com/users";

const handlers = ({ axios }) => ({
  get: async (req, res) => {
    const { data } = await axios.get(`${urlBase}`);
    res.status(200).send(data);
  },
  post: async (req, res) => {
    const { body } = req;
    const { data } = await axios.post(`${urlBase}`, body);
    res.status(201).send(data);
  },
  put: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    await axios.put(`${urlBase}/${id}`, body);
    res.sendStatus(204);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await axios.delete(`${urlBase}/${id}`);
    res.sendStatus(204);
  },
});

module.exports = handlers;
