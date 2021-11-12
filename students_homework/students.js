const SELECTOR = Object.freeze ({
  TEMPLATE: '#studentsListTemplate',
  STUDENTS_LIST: '#students-list',
  STUDENT_WRAP: 'student',
  WRAP_INPUTS: 'student-marks',
  ADD_INPUT: '#add-input',
  DEL_BTN: 'del-btn',
  ADD_BTN: 'add-btn',
})

const template = document.querySelector(SELECTOR.TEMPLATE).innerHTML;
const studentsList = document.querySelector(SELECTOR.STUDENTS_LIST);
const addInput = document.querySelector(SELECTOR.ADD_INPUT);
const addBth = document.querySelector('.' + SELECTOR.ADD_BTN);
const marksArr = [];
const student = {
  name: '',
  // marks: [0,0,0,0,0,0,0,0,0,0],
}

studentsList.addEventListener('click', onStudentsListClick);
addBth.addEventListener('click', onAddBtnClick)

init();

function init() {
  StudentsAPI
    .getList()
    .then((students) => {
      addStudentsList(students);
      getStudentsMarks(students);
    })
}

function addStudentsList(students) {
  const htmlStudents = students.map(student => getHtmlStudent(student)).join('');

  studentsList.innerHTML = htmlStudents;
}

function getHtmlStudent(student) {
  return template
    .replace('{{studentName}}', student.name)
    .replace('{{student-id}}', student.id)
}

function getStudentsMarks(students) {
  const wrapInput = document.querySelectorAll('.' + SELECTOR.WRAP_INPUTS);

  students.map(student => marksArr.push(student.marks));

  Object.keys(marksArr).forEach((wrapKey) => { 
    for(i = 0; i <= wrapInput.length; i++) {
      if(i === +wrapKey) {
        for(j = 0; j < marksArr[i].length; j++) {
          wrapInput[i].children[j].value = marksArr[i][j];
        }
      }
    }
  });
}

function onStudentsListClick(e) {
  const classList = e.target.classList;
  const studentInfo = getStudentInfoElement(e.target);

  if(classList.contains(SELECTOR.DEL_BTN)) {
    return removeStudent(studentInfo);
  };
}

function getStudentInfoElement(target) {
  return target.closest('.' + SELECTOR.STUDENT_WRAP);
}

function removeStudent(el) {
  el.remove();

  StudentsAPI
    .delete(+el.dataset.id)
}

function onAddBtnClick(e) {
  if(addInput.value === '' || addInput.value.length < 3) {
    resetInput();
    throw new Error('Add student, please');
  }
  student.name = addInput.value;
  resetInput();
  addStudent(student)
  
  StudentsAPI
    .create(student);
}

function addStudent(student) {
  const newStudent = template.replace('{{studentName}}', student.name);
  console.log(newStudent)

  studentsList.insertAdjacentHTML('beforeend', newStudent);
}

function resetInput() {
  return addInput.value = '';
}

// function XXX(students, id) {
//   const studentsHtmlColl = studentsList.children;
//   for(i = 0; i <= students.length; i++) {
//     const studentHtmlId = studentsHtmlColl[i].getAttribute('data-id');
//     console.log(studentsHtmlColl[i].childNodes)
//     if(studentHtmlId === id) {
//       console.log(studentHtmlId)
//       return console.log('hi')
//     }
//   }
// }

// function setMarks(student) {
//   for(i=0; i<=student.marks.length; i++) {
//     for(let input of inputs) {
//       return input.value = student.marks[i]
//     }
//   }
// }


// function getMarks() {
//   const marks = [];
  
//     for(let input of inputs) {
//       marks[input.name] = input.value;
//     };
  
//     return marks;
//   }
