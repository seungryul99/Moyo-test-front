import React, { useState } from 'react';

function LoginPage() {

    // local
    const loginRequestUrl = 'http://localhost:8080/auth/login/github';
    const testUrl = 'http://localhost:8080/auth/only/test';
    const reissueTokenUrl = 'http://localhost:8080/api/v1/auth/reissue/token';
    const permitAllTestUrl = 'http://localhost:8080/permit/all/test';

    // test Server
    // const loginRequestUrl = 'https://api.cafehub.site/auth/login/github';
    // const testUrl = 'https://api.cafehub.site/auth/only/test';
    // const reissueTokenUrl = 'https://api.cafehub.site/auth/reissue/token';
    // const permitAllTestUrl = 'https://api.cafehub.site/permit/all/test';


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
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const json = await response.json();
                const accessToken = json.data?.accessToken;

                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                    console.log('토큰 재발급 성공');
                } else {
                    console.error('accessToken이 응답에 없습니다.');
                }
            } else {
                console.error('토큰 재발급 실패:', response.status);
            }
        } catch (error) {
            console.error('요청 중 에러 발생:', error);
        }
    };


    const handlePermitAllTestRequest = async () => {
        try {

            const response = await fetch(permitAllTestUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
