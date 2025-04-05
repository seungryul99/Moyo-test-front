import React, { useState } from 'react';

function LoginPage() {

    // local
    // const loginRequestUrl = 'http://localhost:8080/auth/login/github';
    // const testUrl = 'http://localhost:8080/auth/only/test';
    // const reissueTokenUrl = 'http://localhost:8080/auth/reissue/token';
    // const permitAllTestUrl = 'http://localhost:8080/permit/all/test';

    // test Server
    const loginRequestUrl = 'https://api.cafehub.site/auth/login/github';
    const testUrl = 'https://api.cafehub.site/auth/only/test';
    const reissueTokenUrl = 'https://api.cafehub.site/auth/reissue/token';
    const permitAllTestUrl = 'https://api.cafehub.site/permit/all/test';


    const [jwtRefreshToken, setJwtRefreshToken] = useState('');

    const handleLogin = () => {
        window.location.href = loginRequestUrl;
    };

    const handleTestRequest = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('액세스 토큰이 존재하지 않습니다.');
                return;
            }

            const response = await fetch(testUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('테스트 요청 실패');
            }
        } catch (error) {
            console.error('요청 중 에러 발생:', error);
        }
    };

    const handleReissueTokens = async () => {
        try {
            const response = await fetch(reissueTokenUrl, {
                method: 'POST',
                credentials: 'include'
            });
    
            if (response.ok) {
                // 헤더에서 액세스 토큰을 가져옵니다.
                const accessToken = response.headers.get('Authorization'); // 헤더에서 Authorization 값을 가져옵니다.
                console.log(accessToken)

                if (accessToken) {
                    // 'Bearer ' 제거하고 토큰만 저장
                    const token = accessToken.replace('Bearer ', '');
                    // 액세스 토큰을 로컬 스토리지에 저장
                    localStorage.setItem('accessToken', token);
                    console.log('토큰 재발급 성공');
                }
            } else {
                console.error('토큰 재발급 실패');
            }
        } catch (error) {
            console.error('요청 중 에러 발생:', error);
        }
    };

    const handlePermitAllTestRequest = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await fetch(permitAllTestUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.text();
                console.log('Permit All Test Response:', data);
            } else {
                console.error('Permit All Test 요청 실패');
            }
        } catch (error) {
            console.error('요청 중 에러 발생:', error);
        }
    };





    return (
        <div>
            <h1>로그인 페이지</h1>
            <button onClick={handleLogin}>깃허브로 로그인하기</button>
            <br />
            <button onClick={handleTestRequest}>/auth/test 요청 보내기</button>
            <br />
            <button onClick={handleReissueTokens}>/reissue/token 요청 보내기</button>
            <br />
            <button onClick={handlePermitAllTestRequest}>/permit/all/test 요청 보내기</button>
        </div>
    );
}

export default LoginPage;
