// 게시글 불러오기
async function getPosts() {
  try {
    // 게시글 헤더
    const response1 = await fetch("../post-data.json");
    const posts = await response1.json();

    // 게시글 저자
    const response2 = await fetch("../data.json");
    const users = await response2.json();

    // 모든 게시물 정보 가져오기
    const postList = posts.map((post) => {
      const user = users[post.author];
      return {
        title: post.title,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        viewCount: post.viewCount,
        createdAt: post.createdAt,
        author: user.nickname,
        profile: "../" + user.profilePicture,
      };
    });
    // DOM 업데이트
    updateDom(postList);

    // 응답 생성
    const response = {
      ok: true,
      status: 200,
      json: async () => ({
        message: "get_posts",
        data: postList,
      }),
    };
    return response;
  } catch (error) {
    console.error("게시물 로드 오류:", error);
    const response = {
      ok: false,
      status: 404,
      json: async () => ({
        message: "not_found",
        data: null,
      }),
    };
    return response;
  }
}


// DOM 업데이트
const updateDom = (postList)=>{
       const container = document.querySelector(".posts");
       container.innerHTML = "";
       postList.forEach((post) => {
         const postElement = document.createElement("article");
         // 클릭 시 이동
         postElement.addEventListener("click", () => {
           location.href = "./post.html";
         });
         // 게시물 하나씩 그리기
         postElement.classList.add("post");
         postElement.innerHTML = `
           <div class="post-header">
               <div class="post-info">
                   <div class="post-title" id="title">${post.title}</div>
                   <div class="post-info-wrap">
                       <div class="info">좋아요<p id="likeCount">${post.likeCount}</p></div>
                       <div class="info">댓글<p id="commentCount">${post.commentCount}</p></div>
                       <div class="info">조회수<p id="viewCount">${post.viewCount}</p></div>
                   </div>
               </div>
               <div id="post-time">${post.createdAt}</div>
           </div>
           <div class="writer-wrap">
               <div class="profile">
                   <img id="profile-img" src="${post.profile}" alt="프로필 가기" style="border-radius: 20px;">
               </div>
               <div id="writer">${post.author}</div>
           </div>
         `;
         container.appendChild(postElement);
       });
}


// 이벤트 핸들러
document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    const response = await getPosts();
    if (response.ok) {
      const result = await response.json();
      console.log("게시물 조회 성공", result);
    } else {
      console.error("게시물 조회 실패");
    }
});