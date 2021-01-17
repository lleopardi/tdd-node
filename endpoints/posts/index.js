module.exports = ({axios}) => ({
    post: async (req, res) => {
        const { data: users} = await axios.get('https://jsonplaceholder.typicode.com/users');
        const existUser = users.find( user => user.id === req.body.userId);

        if(existUser){
            const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', req.body);
            return res.status(201).send(data)    
        }

        res.sendStatus(400);
    }
})