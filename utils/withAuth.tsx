import { GetServerSideProps } from 'next';

export function withAuth(gssp: GetServerSideProps): GetServerSideProps {
    return async (context) => {
        const { req } = context;
        const { cookies } = req;

        const token = cookies.accessToken || '';

        // 토큰이 없다면 메인 페이지로 리다이렉트합니다.
        if (!token) {
            return {
                redirect: {
                    destination: '/?loginRequired=true', // 리다이렉트할 경로
                    permanent: false,
                },
            };
        }

        // 여기에 추가적인 토큰 검증 로직을 넣을 수 있습니다.

        // getServerSideProps를 호출합니다 (페이지의 원래 getServerSideProps).
        return await gssp(context);
    };
}