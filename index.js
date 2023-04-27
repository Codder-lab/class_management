const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
const db =  require("./db/db")
const User = require("./models/adminDB")
const Student = require('./models/studentDB')
const Teacher = require('./models/teacherDB')
const Timetable = require('./models/timetableDB')
const Exam = require('./models/examDB')
const bodyParser = require('body-parser');
const path = require('path')

// view engines
app.set('view engine', 'ejs');
app.set('./views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/images'))

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs
// the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

// set up body-parser to parse JSON request bodies
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

// Post argument for the admin login
app.post('/adminlogin', (req, res) => {
    console.log("Login request received");
    const { username1, password1 } = req.body;

  // Check if the username and password are correct
  if (username1 === 'admin' && password1 === 'admin123') {
    console.log('Admin Login successful');
    res.redirect('/AdminHome');
  } else {
    res.status(401).send('Invalid username or password');
  }
})

// Create student account in the database
app.post('/signup', async (req, res) => {
    
  const { username2, password2, studentid, firstname, middlename, lastname, dob, std, batch, contact } = req.body;
  
  try {
    // Create new student
    const student = new Student({ username2, password2, studentid, firstname, middlename, lastname, dob, std, batch, contact });
    
    // Save the student to the database
    await student.save();
    
    console.log('Student saved to database:', student);
    res.send('Student saved to database');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving student to database');
    }
});

// Search for students in the database
// Fetch list of students
app.get('/StudentSearch', async (req, res) => {
  const { search } = req.query;

  try {
    let students;
    if (search) {
      // Search for students based on the query string
      students = await Student.find({ $or: [
        { firstname: { $regex: search, $options: 'i' } },
        { middlename: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
      ]}).lean();
    } else {
      // Fetch all students from the database
      students = await Student.find().lean();
    }

    console.log('Found students:', students);
    res.render('students', { students });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching students from database');
  }
});

// Search for teachers in the database
// Fetch list of teachers
app.get('/TeacherSearch', async (req, res) => {
  const { search } = req.query;

  try {
    let teachers;
    if (search) {
      // Search for teachers based on the query string
      teachers = await Teacher.find({ $or: [
        { teachercode: { $regex: search, $options: 'i' } },
        { fullname: { $regex: search, $options: 'i' } },
        { subname: { $regex: search, $options: 'i' } },
      ]}).lean();
    } else {
      // Fetch all teachers from the database
      teachers = await Teacher.find().lean();
    }

    console.log('Found teachers:', teachers);
    res.render('teachers', { teachers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching teachers from database');
  }
});

// Search for exam details in the database
// Fetch list of all the exam details
app.get('/ExamSearch', async (req, res) => {
  const { search } = req.query;

  try {
    let exams;
    if (search) {
      // Search for exams based on the query string
      exams = await Exam.find({ $or: [
        { subname: { $regex: search, $options: 'i' } },
        { date: { $regex: search, $options: 'i' } },
      ]}).lean();
    } else {
      // Fetch all exam details from the database
      exams = await Exam.find().lean();
    }

    console.log('Found exam details:', exams);
    res.render('exam', { exams });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching exam details from database');
  }
});

// Search for exam details in the database
// Fetch list of all the exam details
app.get('/ExamSearch', async (req, res) => {
  const { search } = req.query;

  try {
    let exams;
    if (search) {
      // Search for exams based on the query string
      exams = await Exam.find({ $or: [
        { subname: { $regex: search, $options: 'i' } },
        { date: { $regex: search, $options: 'i' } },
      ]}).lean();
    } else {
      // Fetch all exam details from the database
      exams = await Exam.find().lean();
    }

    console.log('Found exam details:', exams);
    res.render('exam', { exams });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching exam details from database');
  }
});

// Search for timetable details in the database
// Fetch list of all the timetable details
app.get('/TimetableSearch', async (req, res) => {
  const { search } = req.query;

  try {
    let timetables;
    if (search) {
      // Search for timetable based on the query string
      timetables = await Timetable.find({ $or: [
        { subname: { $regex: search, $options: 'i' } },
        { date: { $regex: search, $options: 'i' } },
      ]}).lean();
    } else {
      // Fetch all exam details from the database
      timetables = await Timetable.find().lean();
    }

    console.log('Found timetable details:', timetables);
    res.render('timetable', { timetables });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching timetable details from database');
  }
});

app.post('/studentlogin', async (req, res) => {
  const { username2, password2 } = req.body;
  
  try {
    // Find the student with the given username and password
    const student = await Student.findOne({ username2, password2 });
    
    if (!student) {
      // If no student is found, return an error message
      res.status(401).send('Invalid username or password');
    } else {
      // If a student is found, return a success message
      console.log(`Welcome, ${student.firstname} ${student.lastname}!`);
      res.redirect('/StudentHome')
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

// To open the signin page for students
app.get('/signin', function(req, res) {
    res.sendFile(__dirname + '/components/SignIn/signin.html');
});

app.use(express.static(__dirname + '/components/SignIn'));

// To open Home Page
app.get('/AdminHome', (req, res) => {
    res.sendFile(__dirname + '/components/Home/adminHome.html');
});

app.get('/StudentHome', (req, res) => {
    res.sendFile(__dirname + '/components/Home/studentHome.html');
});

app.use(express.static(__dirname + '/components/Home'));

// To open Timetable Page
app.get('/Timetable', (req, res) => {
    res.sendFile(__dirname + '/components/Timetable/addTimetable.html');
});

app.use(express.static(__dirname + '/components/Timetable'));

// Database to add the timetable details

app.post('/timetable', async(req, res) => {
  const { batch, subname, teachercode, date, fromtime, totime } = req.body;
  
  try {
    // Create new student
    const timetable = new Timetable({ batch, subname, teachercode, date, fromtime, totime });
    
    // Save the student to the database
    await timetable.save();
    
    console.log('Timetable saved to database:', timetable);
    res.send('Timetable saved to database')
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving timetable to database');
  }
})

// View database information of the timetbale
app.get('/ViewTimetable', async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.render('timetable', { timetables });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving timetable details from database');
  }
});


// To open Exam Schedule Page
app.get('/ExamSchedule', (req, res) => {
    res.sendFile(__dirname + '/components/Exam Schedule/addExamSchedule.html');
});

app.use(express.static(__dirname + '/components/Exam Schedule'));

// Database to  add exam schedule details
app.post('/examschedule', async(req, res) => {
  const { batch, subname, date, fromtime, totime } = req.body;
  
  try {
    // Create new student
    const exam = new Exam({ batch, subname, date, fromtime, totime });
    
    // Save the student to the database
    await exam.save();
    
    console.log('Exam Schedule saved to database:', exam);
    res.send('Exam Schedule saved to database')
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving exam schedule to database');
  }
})

// View database information of the exam schedule
app.get('/ViewExamSchedule', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.render('exam', { exams });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving exam details from database');
  }
});

// To open Student Information Page on Admin
app.get('/StudentInformation', (req, res) => {
    res.sendFile(__dirname + '/components/Student Information/addStudentInformation.html');
});

app.use(express.static(__dirname + '/components/Student Information'));

// To open Student Information Page on Student
app.get('/ViewStudentInforamation', (req, res) => {
    res.sendFile(__dirname + './views/students.ejs');
})

app.get('/ViewStudentInformation', async (req, res) => {
  try {
    const students = await Student.find();
    res.render('students', { students });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving students from database');
  }
});

// To open Teacher Information Page on Admin
app.get('/TeacherInformation', (req, res) => {
    res.sendFile(__dirname + '/components/Teacher Information/teacherInformation.html');
});

app.use(express.static(__dirname + '/components/Teacher Information'));

// Add Teacher Information in the database
app.post('/teacherinformation', async (req, res) => {
    
  const { teachercode, fullname, subname, contact } = req.body;
  
  try {
    // Create new student
    const teacher = new Teacher({ teachercode, fullname, subname, contact });
    
    // Save the student to the database
    await teacher.save();
    
    console.log('Teacher saved to database:', teacher);
    res.send('Teacher saved to database')
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving teacher to database');
    }
});

// To open Teacher Information on Student
app.get('/ViewTeacherInformation', async(req, res) => {
  try {
    const teachers = await Teacher.find();
    res.render('teachers', { teachers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving teachers from database');
  }
});

app.use(express.static(__dirname + '/components/Teacher Information'));

app.get('ViewTeacherInformation', (req, res) => {
  res.sendFile(__dirname + './views/teachers.ejs');
})

// Connecting the port
app.listen(port, () => {            //server starts listening for any attempts from a 
    //client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});