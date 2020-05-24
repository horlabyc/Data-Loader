const axios = require('axios').default;
const faker = require('faker');
 
const IDEA_GENERATOR_URL = "http://appideagenerator.com/call.php";
const IDEA_API = "http://localhost:4000";

const randomNumber = () => Math.floor(Math.random() * 10);

const generateIdea = async () => {
    const { data } = await axios.get(IDEA_GENERATOR_URL);
    return (data.replace(/\n/g, ''));
}

const generateUser = async () => {
    const { data } = await axios.post(`${IDEA_API}/register`, {
        username: faker.internet.userName(),
        password: 'password'
    })
    return data.token;
}

const postIdea = async token => {
    const idea = await generateIdea();
    const { data } = await axios.post(`${IDEA_API}/api/ideas`, {
        idea,
        description: faker.lorem.paragraph()
    }, {
        headers: { authorization: `Bearer ${token}`}
    });
    console.log(data);
    return idea;
}

(async () => {
    const numberOfRandomUsers = randomNumber();
    const numberOfRandomeIdeas = randomNumber()
    for(let i = 0; i < numberOfRandomUsers; i++){
        const token = await generateUser();
        for(let j = 0; j < numberOfRandomeIdeas; j++){
            const idea = await postIdea(token);
        }
    }
})();