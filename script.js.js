function calculateScore() {
    // Dapatkan nilai dari setiap dropdown
    const organizingA4 = parseFloat(document.getElementById('organizingA4').value) || 0;
    const positiveBehaviorKMI3 = parseFloat(document.getElementById('positiveBehaviorKMI3').value) || 0;
    const organizingA4Comm = parseFloat(document.getElementById('organizingA4Comm').value) || 0;
    const nonVerbalCommKMK12 = parseFloat(document.getElementById('nonVerbalCommKMK12').value) || 0;
    const mechanismP4 = parseFloat(document.getElementById('mechanismP4').value) || 0;
    const valueAppreciationA5 = parseFloat(document.getElementById('valueAppreciationA5').value) || 0;
    const responsibilityKAT10 = parseFloat(document.getElementById('responsibilityKAT10').value) || 0;

    // Kira markah untuk setiap bahagian berdasarkan pemberat
    // Amali 1 (60%)
    const scoreHP4 = ((organizingA4 + positiveBehaviorKMI3) / 30) * 30; // 30% dari 60%
    const scoreHP5 = ((organizingA4Comm + nonVerbalCommKMK12) / 30) * 30; // 30% dari 60%

    // Amali 2 (30%)
    const scoreHP3 = (mechanismP4 / 15) * 15; // 15% dari 30%
    const scoreHP8 = ((valueAppreciationA5 + responsibilityKAT10) / 30) * 15; // 15% dari 30%

    // Kira jumlah markah
    const totalScore = scoreHP4 + scoreHP5 + scoreHP3 + scoreHP8;

    // Tentukan gred berdasarkan jumlah markah (90 adalah markah penuh)
    let grade = 'Tidak Sah';
    if (totalScore >= 81) {
        grade = 'A (Amat Cemerlang)';
    } else if (totalScore >= 75) {
        grade = 'A- (Cemerlang)';
    } else if (totalScore >= 68) {
        grade = 'B+ (Kepujian)';
    } else if (totalScore >= 61) {
        grade = 'B (Sederhana)';
    } else {
        grade = 'C (Lemah)';
    }

    // Paparkan keputusan
    document.getElementById('scoreHP4').textContent = scoreHP4.toFixed(2);
    document.getElementById('scoreHP5').textContent = scoreHP5.toFixed(2);
    document.getElementById('scoreAmali2').textContent = (scoreHP3 + scoreHP8).toFixed(2); // Gabungan HP3 & HP8
    document.getElementById('totalScore').textContent = totalScore.toFixed(2);
    document.getElementById('grade').textContent = grade;

    // Tunjukkan bahagian keputusan
    document.getElementById('result').style.display = 'block';
}

// Pilihan: Kira markah secara automatik apabila pilihan berubah
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', calculateScore);
});
// Jika anda ingin kira automatik, anda boleh tambah event listener untuk setiap select.
// Contoh di atas akan cuba kira setiap kali pilihan berubah (anda mungkin perlu pastikan semua pilihan dibuat dulu).