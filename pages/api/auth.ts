const login = async (email: string, password: string) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const { accessToken, message, status } = data;

            if (status === 'error') {
                alert(message);
                return;
            }

            document.cookie = `accessToken=${accessToken}`;
            alert(message);
            window.location.href = '/';
        } else {
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