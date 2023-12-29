const login = async (email: string, password: string) => {
    try {
        const response = await fetch('http://13.209.129.44:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const { accessToken } = data;
            document.cookie = `accessToken=${accessToken}`;
            console.log('accessToken:', accessToken);
            console.log(document.cookie);

            console.log('로그인 성공:', data);
            alert('로그인 성공');
            window.location.href = '/';
        } else {
            console.error('로그인 실패');
            alert('로그인 실패');
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