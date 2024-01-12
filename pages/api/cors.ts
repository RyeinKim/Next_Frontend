import NextCors from 'nextjs-cors';

export default async function handler(req: any, res: any) {
    await NextCors(req, res, {
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        origin: '*', // 또는 특정 출처만 허용하려면 URL 설정
        optionsSuccessStatus: 200,
    });

    // 나머지 API 로직
    res.json({ message: 'Hello Next.js!' });
}