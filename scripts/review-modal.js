document.addEventListener("DOMContentLoaded", function() {
    const googleReviewModal = document.getElementById("googleReviewModal");
    const gameContainer = document.getElementById("gameContainer");
    const reviewBtn = document.getElementById("reviewBtn");

    if (localStorage.getItem('reviewed') === 'true') {
        googleReviewModal.style.display = 'none';
        gameContainer.style.display = 'block'; // Affiche le jeu
    } else {
        googleReviewModal.style.display = 'flex';
        gameContainer.style.display = 'none'; // Cache le jeu
    }

    // Quand l'utilisateur clique sur le bouton "Laisser un avis"
    reviewBtn.addEventListener("click", function() {
        // Rediriger vers la page d'avis Google
        window.open('https://g.page/r/CYjQMZTs0SgXEBM/review', '_blank');

        // Simuler que l'utilisateur a laissé un avis (stocke l'info dans localStorage)
        localStorage.setItem('reviewed', 'true');

        // Ferme la modale et affiche le jeu
        googleReviewModal.style.display = 'none';
        gameContainer.style.display = 'block';
    });
});
