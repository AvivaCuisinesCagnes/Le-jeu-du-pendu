document.addEventListener("DOMContentLoaded", function() {
    const googleReviewModal = document.getElementById("googleReviewModal");
    const gameContainer = document.getElementById("gameContainer");
    const reviewBtn = document.getElementById("reviewBtn");

    if (localStorage.getItem('reviewed') === 'true') {
        googleReviewModal.style.display = 'none';
        gameContainer.style.display = 'block'; 
    } else {
        googleReviewModal.style.display = 'flex';
        gameContainer.style.display = 'none'; 
    }

   
    reviewBtn.addEventListener("click", function() {
        
        window.open('https://g.page/r/CYjQMZTs0SgXEBM/review', '_blank');

       
        localStorage.setItem('reviewed', 'true');

       
        googleReviewModal.style.display = 'none';
        gameContainer.style.display = 'block';
    });
});
