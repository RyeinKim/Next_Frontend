const login = async (email: string, password: string) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const { accessToken } = data;
            document.cookie = `accessToken=${accessToken}`;
            console.log('로그인 성공:', data);
            alert(data.message);
            window.location.href = '/';
        } else {
            console.error('로그인 실패');
            alert(`로그인 실패`);
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('로그인 요청 중 오류 발생', error);
        throw error; // 오류를 상위 호출자에게 전파
    }
};

export default {
    login,
};