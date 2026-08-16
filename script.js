const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");

const nameInput = document.getElementById("name");
const rollNoInput = document.getElementById("rollNo");
const departmentInput = document.getElementById("department");
const emailInput = document.getElementById("email");

const studentIdInput = document.getElementById("studentId");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const searchInput = document.getElementById("searchInput");


// Get students
let students = JSON.parse(localStorage.getItem("students")) || [];


// Display students
function displayStudents() {

    studentTableBody.innerHTML = "";

    students.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>${student.department}</td>
            <td>${student.email}</td>

            <td>
                <button 
                    class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button 
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}


// ADD or UPDATE
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = studentIdInput.value;

    // UPDATE STUDENT
    if (id !== "") {

        const student = students.find(
            student => student.id == id
        );

        if (student) {

            student.name = nameInput.value;
            student.rollNo = rollNoInput.value;
            student.department = departmentInput.value;
            student.email = emailInput.value;

            alert("Student updated successfully!");
        }

    }

    // ADD STUDENT
    else {

        const newStudent = {

            id: Date.now(),

            name: nameInput.value,

            rollNo: rollNoInput.value,

            department: departmentInput.value,

            email: emailInput.value
        };

        students.push(newStudent);

        alert("Student added successfully!");
    }


    // Save
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    // Clear form
    studentForm.reset();

    studentIdInput.value = "";

    submitBtn.textContent = "Add Student";


    // Show table
    displayStudents();

});


// EDIT STUDENT
function editStudent(id) {

    const student = students.find(
        student => student.id == id
    );

    if (!student) {
        return;
    }


    // Put data into form
    nameInput.value = student.name;

    rollNoInput.value = student.rollNo;

    departmentInput.value = student.department;

    emailInput.value = student.email;


    // Store ID
    studentIdInput.value = student.id;


    // Change button
    submitBtn.textContent = "Update Student";


    // Go to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// DELETE STUDENT
function deleteStudent(id) {

    students = students.filter(
        student => student.id != id
    );

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();

    alert("Student deleted successfully!");
}


// CANCEL
cancelBtn.addEventListener("click", function() {

    studentForm.reset();

    studentIdInput.value = "";

    submitBtn.textContent = "Add Student";

});


// SEARCH
searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(student =>

        student.name.toLowerCase().includes(searchText) ||

        student.rollNo.toLowerCase().includes(searchText) ||

        student.department.toLowerCase().includes(searchText) ||

        student.email.toLowerCase().includes(searchText)
    );


    studentTableBody.innerHTML = "";

    filteredStudents.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>${student.department}</td>
            <td>${student.email}</td>
            <td>
                <button 
                    class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button 
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });

});


// Display when page opens
displayStudents();