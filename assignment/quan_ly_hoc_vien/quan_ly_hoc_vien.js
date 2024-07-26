document.addEventListener('DOMContentLoaded', function() {
    const studentForm = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');
    const messageDiv = document.getElementById('message');

    // Lấy dữ liệu từ LocalStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Hiển thị danh sách học viên
    function displayStudents() {
        studentList.innerHTML = '';
        students.forEach((student, index) => {
            const li = document.createElement('li');
            li.textContent = `Tên: ${student.name}, Tuổi: ${student.age}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Xóa';
            deleteButton.onclick = () => {
                deleteStudent(index);
            };
            li.appendChild(deleteButton);
            studentList.appendChild(li);
        });
    }

    // Hiển thị thông báo
    function showMessage(message) {
        messageDiv.textContent = message;
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 3000);
    }

    // Thêm học viên
    studentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;

        if (name && age) {
            const student = { name, age };
            students.push(student);
            localStorage.setItem('students', JSON.stringify(students));
            displayStudents();
            showMessage('Đã thêm học viên thành công!');

            studentForm.reset();
        } else {
            showMessage('Vui lòng điền đầy đủ thông tin.');
        }
    });

    // Xóa học viên
    function deleteStudent(index) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        showMessage('Đã xóa học viên thành công!');
    }

    // Hiển thị học viên khi trang được tải
    displayStudents();
});