// 상대 경로 사용
const routes = {
    "": "src/pages/Log_in.html",  // 홈 페이지
    "login": "src/pages/Log_in.html",  // 로그인 페이지
    "signin": "src/pages/Sign_in.html",    //회원가입 페이지
    "posts": "src/pages/Posts.html",    //게시글 목록 페이지
    "post": "src/pages/Post.html",    //게시글 상세 페이지
    "makePost": "src/pages/Make_post.html",    //게시글 작성(추가) 페이지
    "editPassword": "src/pages/Edit_password.html",    //비밀번호 변경 페이지
    "editProfile": "src/pages/Edit_profile.html",    //프로필 변경 페이지
};

function navigate(event, path) {
    event.preventDefault(); // 기본 링크 이동 방지
    const fullPath = window.location.origin + "/" + path; // 현재 URL을 기준으로 상대 경로 생성
    history.pushState({}, "", fullPath); // URL 변경
    loadPage(path);
}

function loadPage(path) {
    // 현재 `window.location.pathname`에서 기본 경로 제거
    let relativePath = window.location.pathname.replace(/^\//, ""); // 첫 번째 `/` 제거

    if (relativePath === "") {
        relativePath = "";
    }
    
    const page = routes[relativePath] || "src/pages/404.html"; // 없는 페이지는 404.html로 처리
    fetch(page)
        .then(response => {
            if (!response.ok) throw new Error("페이지를 찾을 수 없음");
            return response.text();
        })
        .then(html => {
            document.getElementById("app").innerHTML = html;
        })
        .catch(() => {
            document.getElementById("app").innerHTML = "<h1>페이지를 불러오는 데 실패했습니다.</h1>";
        });
}

// 🚀 header.html을 동적으로 불러와 삽입하는 함수
function loadHeader() {
    fetch("src/components/Header.html")
        .then(response => {
            if (!response.ok) throw new Error("헤더를 불러오는 데 실패했습니다.");
            return response.text();
        })
        .then(html => {
            document.getElementById("header-placeholder").innerHTML = html;
        })
        .catch(error => {console.error("헤더 로딩 오류:", error);
            console.log(error)
        });
}
