const register = async (
    email: string,
    password: string,
    username: string,
    stNum: string,
    phoneNum: string,
) => {
    fetch('http://13.209.129.44:3001/users/signup', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            username,
            stNum,
            phoneNum,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 에러');
            }
            return response.json();
        })
        .then(data => {
            console.log('회원가입 성공:', data);
            alert('회원가입 성공');
            window.location.href = '/';
        })
        .catch(error => {
            console.error('회원가입 에러', error);
            console.error(error.message);
            alert('회원가입 에러');
        });
};

export default {
    register,
};