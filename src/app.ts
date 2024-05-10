import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, it is will be our chat!')
})

app.post('/signup', (req: Request, res: Response) => {
    
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})