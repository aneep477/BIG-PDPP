// script.js

// Fungsi untuk memuatkan senarai pelajar ke dalam dropdown
function loadStudents() {
    const studentSelect = document.getElementById('studentSelect');
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id; // Gunakan ID sebagai nilai
        option.textContent = `${student.name} (${student.a_giliran})`; // Papar nama dan no giliran
        studentSelect.appendChild(option);
    });
}

// Fungsi untuk menangani perubahan pemilihan pelajar
function onStudentSelectChange() {
    const studentSelect = document.getElementById('studentSelect');
    const selectedStudentId = parseInt(studentSelect.value);
    const studentInfoDiv = document.getElementById('studentInfo');
    const rubricForm = document.getElementById('rubricForm');
    const resultDiv = document.getElementById('result');

    if (selectedStudentId) {
        const selectedStudent = students.find(student => student.id === selectedStudentId);
        if (selectedStudent) {
            document.getElementById('selectedStudentName').textContent = selectedStudent.name;
            document.getElementById('selectedStudentIC').textContent = selectedStudent.ic;
            document.getElementById('selectedStudentAGiliran').textContent = selectedStudent.a_giliran;
            studentInfoDiv.style.display = 'block';
            rubricForm.style.display = 'block'; // Paparkan borang rubrik
            resetForm(); // Reset borang setiap kali pelajar baru dipilih
            resultDiv.style.display = 'none'; // Sembunyikan keputusan sebelumnya
        }
    } else {
        studentInfoDiv.style.display = 'none';
        rubricForm.style.display = 'none';
        resultDiv.style.display = 'none';
    }
}

// Fungsi untuk mereset borang rubrik
function resetForm() {
    document.getElementById('rubricForm').reset();
    // Reset nilai paparan keputusan
    document.getElementById('scoreHP4').textContent = '0.00';
    document.getElementById('scoreHP5').textContent = '0.00';
    document.getElementById('scoreAmali2').textContent = '0.00';
    document.getElementById('scoreExam').textContent = '0.00';
    document.getElementById('totalScore').textContent = '0.00';
    document.getElementById('grade').textContent = '-';
}

// Fungsi untuk mengira markah berdasarkan pemberat
function calculateWeightedScore(rawScore, maxRawScore, weightPercentage) {
    if (isNaN(rawScore) || rawScore < 0) return 0;
    const cappedScore = Math.min(rawScore, maxRawScore); // Pastikan markah tidak melebihi maksimum
    return (cappedScore / maxRawScore) * weightPercentage;
}

function calculateScore() {
    // Dapatkan ID pelajar yang dipilih
    const studentSelect = document.getElementById('studentSelect');
    const selectedStudentId = parseInt(studentSelect.value);
    if (!selectedStudentId) {
        alert("Sila pilih seorang pelajar dahulu.");
        return;
    }
    const selectedStudent = students.find(student => student.id === selectedStudentId);
    if (!selectedStudent) {
        alert("Ralat: Maklumat pelajar tidak dijumpai.");
        return;
    }

    // Dapatkan nilai dari setiap input markah
    // Parse ke Float dan gunakan 0 jika input kosong atau tidak sah
    const organizingA4 = parseFloat(document.getElementById('organizingA4').value) || 0;
    const positiveBehaviorKMI3 = parseFloat(document.getElementById('positiveBehaviorKMI3').value) || 0;
    const organizingA4Comm = parseFloat(document.getElementById('organizingA4Comm').value) || 0;
    const nonVerbalCommKMK12 = parseFloat(document.getElementById('nonVerbalCommKMK12').value) || 0;
    const mechanismP4 = parseFloat(document.getElementById('mechanismP4').value) || 0;
    const valueAppreciationA5 = parseFloat(document.getElementById('valueAppreciationA5').value) || 0;
    const responsibilityKAT10 = parseFloat(document.getElementById('responsibilityKAT10').value) || 0;
    const examScore = parseFloat(document.getElementById('examScore').value) || 0;

    // Kira markah berdasarkan pemberat
    // Amali 1 (60%)
    const scoreHP4 = calculateWeightedScore((organizingA4 + positiveBehaviorKMI3), 30, 30); // Max 30, Weight 30%
    const scoreHP5 = calculateWeightedScore((organizingA4Comm + nonVerbalCommKMK12), 30, 30); // Max 30, Weight 30%

    // Amali 2 (30%)
    const scoreAmali2HP3 = calculateWeightedScore(mechanismP4, 15, 15); // Max 15, Weight 15%
    const scoreAmali2HP8 = calculateWeightedScore((valueAppreciationA5 + responsibilityKAT10), 30, 15); // Max 30, Weight 15%
    const scoreAmali2 = scoreAmali2HP3 + scoreAmali2HP8;

    // Ujian (10%)
    const scoreExam = calculateWeightedScore(examScore, 10, 10); // Max 10, Weight 10%

    // Kira jumlah markah keseluruhan (maksimum 100)
    const totalScore = scoreHP4 + scoreHP5 + scoreAmali2 + scoreExam;

    // Tentukan gred berdasarkan jumlah markah (100 adalah markah penuh)
    let grade = 'Tidak Sah';
    if (totalScore >= 81) {
        grade = 'A (Amat Cemerlang)';
    } else if (totalScore >= 75) {
        grade = 'A- (Cemerlang)';
    } else if (totalScore >= 68) {
        grade = 'B+ (Kepujian)';
    } else if (totalScore >= 61) {
        grade = 'B (Sederhana)';
    } else if (totalScore > 0) { // Tambah syarat > 0 untuk elak gred C jika markah 0
        grade = 'C (Lemah)';
    } else {
        grade = 'Tidak Hadir / Tiada Markah'; // Untuk kes markah 0 atau negatif
    }


    // Paparkan keputusan dengan 2 tempat perpuluhan
    document.getElementById('resultStudentName').textContent = selectedStudent.name;
    document.getElementById('scoreHP4').textContent = scoreHP4.toFixed(2);
    document.getElementById('scoreHP5').textContent = scoreHP5.toFixed(2);
    document.getElementById('scoreAmali2').textContent = scoreAmali2.toFixed(2);
    document.getElementById('scoreExam').textContent = scoreExam.toFixed(2);
    document.getElementById('totalScore').textContent = totalScore.toFixed(2);
    document.getElementById('grade').textContent = grade;

    // Tunjukkan bahagian keputusan
    document.getElementById('result').style.display = 'block';
}


// Muatkan senarai pelajar apabila halaman dimuatkan
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
    // Tambah event listener untuk pemilih pelajar
    document.getElementById('studentSelect').addEventListener('change', onStudentSelectChange);
});
