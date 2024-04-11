const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.lqyj2wm.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const Employee = require("./models/employee");
const Attendance = require("./models/attendance");
const User = require("./models/user");
const Feedback = require("./models/feedback");

//endpoint to register a employee
app.post("/addEmployee", async (req, res) => {
  try {
    const {
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;

    //create a new Employee
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });

    await newEmployee.save();

    res
      .status(201)
      .json({ message: "Employee saved successfully", employee: newEmployee });
  } catch (error) {
    console.log("Error creating employee", error);
    res.status(500).json({ message: "Failed to add an employee" });
  }
});

//endpoint to fetch all the employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    console.log("Emp", res);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the employees" });
  }
});

app.post("/attendance", async (req, res) => {
  try {
    const { employeeId, employeeName, date, status } = req.body;

    const existingAttendance = await Attendance.findOne({ employeeId, date });

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } else {
      const newAttendance = new Attendance({
        employeeId,
        employeeName,
        date,
        status,
      });
      await newAttendance.save();
      res.status(200).json(newAttendance);
    }
  } catch (error) {
    res.status(500).json({ message: "Error submitting attendance" });
  }
});

app.get("/attendance", async (req, res) => {
  try {
    const { date } = req.query;

    // Find attendance records for the specified date
    const attendanceData = await Attendance.find({ date: date });

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data" });
  }
});

app.get("/attendance-report-all-employees", async (req, res) => {
  try {
    const { month, year } = req.query;

    console.log("Query parameters:", month, year);
    // Calculate the start and end dates for the selected month and year
    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
      .startOf("month")
      .toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Aggregate attendance data for all employees and date range
    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $month: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.month),
                ],
              },
              {
                $eq: [
                  { $year: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.year),
                ],
              },
            ],
          },
        },
      },

      {
        $group: {
          _id: "$employeeId",
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $lookup: {
          from: "employees", // Name of the employee collection
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDetails",
        },
      },
      {
        $unwind: "$employeeDetails", // Unwind the employeeDetails array
      },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          name: "$employeeDetails.employeeName",
          designation: "$employeeDetails.designation",
          salary: "$employeeDetails.salary",
          employeeId: "$employeeDetails.employeeId",
        },
      },
    ]);

    res.status(200).json({ report });
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ message: "Error generating the report" });
  }
});

//endpoint to register a user
app.post("/addUser", async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      gender,
      designation,
      dateOfBirth,
      salary,
      phoneNumber,
      address,
      isadmin,
    } = req.body;

    //create a new Employee
    const newUser = new User({
      userName,
      email,
      password,
      gender,
      designation,
      dateOfBirth,
      salary,
      phoneNumber,
      address,
      isadmin
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    console.log("Error creating user", error);
    res.status(500).json({ message: "Failed to add an user" });
  }
});

//endpoint to fetch all the users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the users" });
  }
});

//endpoint to fetch current the users
app.get("/users/:id", async (req, res) => {
  try {
    console.log("Request coming to Userid", req.params.id);
    const users = await User.findById(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the users" });
  }
});

//endpoint to update  the users
app.patch("/userupdate/:id", async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to update the user" });
  }
});

//endpoint to delete  the users
app.delete("/deleteuser/:id", async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id)
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("Request come to login");
    const { email, password } = req.body;
    const user = await User.findOne({ email, password })
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Invalid Credentials" });
  }
});

//endpoint to store feedback of a user
app.post("/addFeedback", async (req, res) => {
  try {
    const {
      user,
      uid,
      userName,
      feedback,
      rating,
    } = req.body;

    //create a new Employee
    const newFeedback = new Feedback({
      user,
      uid,
      userName,
      feedback,
      rating,
    });

    await newFeedback.save();

    res
      .status(201)
      .json({ message: "Feedback saved successfully", feedback: newFeedback });
  } catch (error) {
    console.log("Error creating feedback", error);
    res.status(500).json({ message: "Failed to add feedback to db" });
  }
});

//endpoint to fetch all the feedbacks
app.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the feedbacks" });
  }
});

//endpoint to delete  the feedback
app.delete("/deletefeedback/:id", async (req, res) => {
  try {
    const response = await Feedback.findByIdAndDelete(req.params.id)
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the feedback" });
  }
});