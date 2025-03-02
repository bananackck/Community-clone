// src 폴더 기준으로 경로 수정
const routes = {
    // "/": "pages/Log_in.html",  // 초기 페이지
    "/login": "pages/Log_in.html"  // 로그인 페이지
};

function navigate(event, path) {
    event.preventDefault(); // 기본 링크 이동 방지
    history.pushState({}, "", path); // URL 변경
    loadPage(path);
}

function loadPage(path) {
    const page = routes[path] || "src/pages/404.html"; // 없는 페이지는 404.html로 처리
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

window.addEventListener("popstate", () => {
    loadPage(location.pathname);
});

// 처음에 로그인 페이지 로드
loadPage("/login");