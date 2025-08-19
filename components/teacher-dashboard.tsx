"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, FileText, BarChart3, Clock, CheckCircle, AlertCircle, Plus, Edit, Send } from "lucide-react"
import { LeaveManagement } from "./leave-management"
import { TimetableManagement } from "./timetable-management"

// Mock data for teacher dashboard
const mockTeacherStats = {
  totalClasses: 6,
  totalStudents: 180,
  todayClasses: 4,
  pendingGrades: 23,
  attendanceRate: 91.5,
  upcomingDeadlines: 3,
}

const mockClasses = [
  { id: 1, name: "Mathematics 10-A", students: 32, time: "09:00 AM", room: "Room 101", attendance: 94 },
  { id: 2, name: "Mathematics 10-B", students: 28, time: "10:30 AM", room: "Room 101", attendance: 89 },
  { id: 3, name: "Advanced Math 11-A", students: 25, time: "01:00 PM", room: "Room 102", attendance: 96 },
  { id: 4, name: "Calculus 12-A", students: 22, time: "02:30 PM", room: "Room 102", attendance: 92 },
]

const mockStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    class: "10-A",
    grade: "A",
    attendance: 96,
    lastAssignment: "Algebra Quiz",
    score: 92,
  },
  { id: 2, name: "Bob Smith", class: "10-A", grade: "B+", attendance: 89, lastAssignment: "Algebra Quiz", score: 85 },
  {
    id: 3,
    name: "Carol Davis",
    class: "10-B",
    grade: "A-",
    attendance: 92,
    lastAssignment: "Geometry Test",
    score: 88,
  },
  { id: 4, name: "David Wilson", class: "11-A", grade: "B", attendance: 87, lastAssignment: "Trigonometry", score: 78 },
]

const mockAssignments = [
  {
    id: 1,
    title: "Quadratic Equations Test",
    class: "10-A",
    dueDate: "2024-01-15",
    submitted: 28,
    total: 32,
    status: "active",
  },
  {
    id: 2,
    title: "Geometry Homework",
    class: "10-B",
    dueDate: "2024-01-12",
    submitted: 25,
    total: 28,
    status: "grading",
  },
  {
    id: 3,
    title: "Calculus Project",
    class: "12-A",
    dueDate: "2024-01-20",
    submitted: 18,
    total: 22,
    status: "active",
  },
]

const mockSchedule = [
  { time: "09:00 AM", class: "Mathematics 10-A", room: "Room 101", duration: "50 min" },
  { time: "10:30 AM", class: "Mathematics 10-B", room: "Room 101", duration: "50 min" },
  { time: "01:00 PM", class: "Advanced Math 11-A", room: "Room 102", duration: "50 min" },
  { time: "02:30 PM", class: "Calculus 12-A", room: "Room 102", duration: "50 min" },
]

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeacherStats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">{mockTeacherStats.todayClasses} classes today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeacherStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeacherStats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">Average across classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeacherStats.pendingGrades}</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="classes">My Classes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="leave">Leave Requests</TabsTrigger>
          <TabsTrigger value="timetable">My Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Clock className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">{item.class}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.room} • {item.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common teaching tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <CheckCircle className="h-6 w-6 mb-2" />
                    Take Attendance
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Plus className="h-6 w-6 mb-2" />
                    New Assignment
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Edit className="h-6 w-6 mb-2" />
                    Grade Papers
                  </Button>
                  <Button variant="outline" className="h-20 flex-col bg-transparent">
                    <Send className="h-6 w-6 mb-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">My Classes</h3>
              <p className="text-sm text-muted-foreground">Manage your assigned classes</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Assignment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockClasses.map((classItem) => (
              <Card key={classItem.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{classItem.name}</CardTitle>
                      <CardDescription>
                        {classItem.students} students • {classItem.room}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{classItem.time}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Attendance Rate</span>
                      <span>{classItem.attendance}%</span>
                    </div>
                    <Progress value={classItem.attendance} className="h-2" />
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Attendance
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <FileText className="h-4 w-4 mr-1" />
                      Grades
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">My Students</h3>
            <p className="text-sm text-muted-foreground">View and manage student performance</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>Overview of student grades and attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder-ca5j7.png?key=student-${student.id}&height=40&width=40&query=student-portrait`}
                        />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">Class {student.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-medium">Grade</p>
                        <Badge variant="outline">{student.grade}</Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Attendance</p>
                        <p className="text-sm text-muted-foreground">{student.attendance}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Last Score</p>
                        <p className="text-sm text-muted-foreground">{student.score}%</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Assignments</h3>
              <p className="text-sm text-muted-foreground">Manage assignments and grading</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </div>

          <div className="space-y-4">
            {mockAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <CardDescription>
                        Class: {assignment.class} • Due: {assignment.dueDate}
                      </CardDescription>
                    </div>
                    <Badge variant={assignment.status === "active" ? "default" : "secondary"}>
                      {assignment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium">Submissions</p>
                        <p className="text-sm text-muted-foreground">
                          {assignment.submitted} of {assignment.total} students
                        </p>
                      </div>
                      <div className="w-32">
                        <Progress value={(assignment.submitted / assignment.total) * 100} className="h-2" />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Grade
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leave" className="space-y-4">
          <LeaveManagement userRole="teacher" />
        </TabsContent>

        <TabsContent value="timetable" className="space-y-4">
          <TimetableManagement userRole="teacher" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
