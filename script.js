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
    // Anda juga boleh reset nilai paparan keputusan di sini jika perlu
    document.getElementById('scoreHP4').textContent = '0';
    document.getElementById('scoreHP5').textContent = '0';
    document.getElementById('scoreAmali2').textContent = '0';
    document.getElementById('totalScore').textContent = '0';
    document.getElementById('grade').textContent = '-';
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
    document.getElementById('resultStudentName').textContent = selectedStudent.name;
    document.getElementById('scoreHP4').textContent = scoreHP4.toFixed(2);
    document.getElementById('scoreHP5').textContent = scoreHP5.toFixed(2);
    document.getElementById('scoreAmali2').textContent = (scoreHP3 + scoreHP8).toFixed(2); // Gabungan HP3 & HP8
    document.getElementById('totalScore').textContent = totalScore.toFixed(2);
    document.getElementById('grade').textContent = grade;

    // Tunjukkan bahagian keputusan
    document.getElementById('result').style.display = 'block';
}

// Pilihan: Kira markah secara automatik apabila pilihan berubah
// document.querySelectorAll('select').forEach(select => {
//     select.addEventListener('change', calculateScore);
// });

// Muatkan senarai pelajar apabila halaman dimuatkan
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
    // Tambah event listener untuk pemilih pelajar
    document.getElementById('studentSelect').addEventListener('change', onStudentSelectChange);
});
