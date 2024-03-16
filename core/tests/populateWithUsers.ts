import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:3001';

interface User {
    email: string;
    username: string;
    password: string;
}

const usersData: User[] = [
    { email: 'john.doe@example.com', username: 'johnDoe', password: 'senha123' },
    { email: 'jane.smith@example.com', username: 'janeSmith', password: 'senha123' },
    { email: 'william.johnson@example.com', username: 'willJohnson', password: 'senha123' },
    { email: 'sarah.brown@example.com', username: 'sarahBrown', password: 'senha123' },
    { email: 'michael.davis@example.com', username: 'mikeDavis', password: 'senha123' },
    { email: 'emily.wilson@example.com', username: 'emilyWilson', password: 'senha123' },
    { email: 'david.martinez@example.com', username: 'daveMartinez', password: 'senha123' },
    { email: 'jessica.taylor@example.com', username: 'jessTaylor', password: 'senha123' },
    { email: 'james.thomas@example.com', username: 'jamesThomas', password: 'senha123' },
    { email: 'linda.anderson@example.com', username: 'lindaAnderson', password: 'senha123' },
    { email: 'charles.lee@example.com', username: 'charlieLee', password: 'senha1234' },
    { email: 'angela.white@example.com', username: 'angelaWhite', password: 'senha1234' },
    { email: 'george.harris@example.com', username: 'georgeHarris', password: 'senha1234' },
    { email: 'karen.clark@example.com', username: 'karenClark', password: 'senha1234' },
    { email: 'steven.lewis@example.com', username: 'steveLewis', password: 'senha1234' },
    { email: 'donna.robinson@example.com', username: 'donnaRobinson', password: 'senha1234' },
    { email: 'brian.walker@example.com', username: 'brianWalker', password: 'senha1234' },
    { email: 'nancy.allen@example.com', username: 'nancyAllen', password: 'senha1234' },
    { email: 'gary.young@example.com', username: 'garyYoung', password: 'senha1234' },
    { email: 'susan.hall@example.com', username: 'susanHall', password: 'senha1234' },
    { email: 'elizabeth.moore@example.com', username: 'lizMoore', password: 'senha1234' },
    { email: 'daniel.king@example.com', username: 'danielKing', password: 'senha1234' },
    { email: 'patricia.wright@example.com', username: 'patriciaWright', password: 'senha1234' },
    { email: 'mark.miller@example.com', username: 'markMiller', password: 'senha1234' },
    { email: 'jennifer.lopez@example.com', username: 'jenniferLopez', password: 'senha1234' },
    { email: 'matthew.hill@example.com', username: 'matthewHill', password: 'senha1234' },
    { email: 'sandra.scott@example.com', username: 'sandraScott', password: 'senha1234' },
    { email: 'christopher.green@example.com', username: 'chrisGreen', password: 'senha1234' },
    { email: 'melissa.lewis@example.com', username: 'melissaLewis', password: 'senha1234' },
    { email: 'joshua.walker@example.com', username: 'joshWalker', password: 'senha1234' },
    { email: 'ashley.hall@example.com', username: 'ashleyHall', password: 'senha1234' },
    { email: 'kevin.wright@example.com', username: 'kevinWright', password: 'senha1234' },
    { email: 'megan.clark@example.com', username: 'meganClark', password: 'senha1234' },
    { email: 'brian.martinez@example.com', username: 'brianMartinez', password: 'senha1234' },
    { email: 'sophia.anderson@example.com', username: 'sophiaAnderson', password: 'senha1234' },
    { email: 'jason.thomas@example.com', username: 'jasonThomas', password: 'senha1234' },
    { email: 'amanda.jackson@example.com', username: 'amandaJackson', password: 'senha1234' },
    { email: 'ryan.white@example.com', username: 'ryanWhite', password: 'senha1234' },
    { email: 'justin.harris@example.com', username: 'justinHarris', password: 'senha1234' },
    { email: 'nicole.brown@example.com', username: 'nicoleBrown', password: 'senha1234' }
];

async function createUser(user: User) {
    try {
        const response = await axios.post(`${API_BASE_URL}/login/createUser`, user);
        console.log('Usuário criado com sucesso:', response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Agora TypeScript sabe que é um AxiosError e que `error.response` está disponível
            console.error('Erro ao criar usuário:', error.response?.data);
        }
    }
}

async function sendUserData() {
    for (const user of usersData) {
        await createUser(user);
    }
}

sendUserData();
