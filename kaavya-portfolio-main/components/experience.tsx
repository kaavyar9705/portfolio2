import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "Data Analytics & AI Intern",
    company: "Mindsprint",
    period: "May 2025 - Present",
    location: "Remote",
    description: [
      "Building a full-stack Snowflake analytics dashboard (React + Flask) to visualize credit usage, user activity, and query performance",
      "Designed a UI for configuring data masking policies with dynamic schema, table, and role selection",
      "Integrated backend APIs with Snowflake to apply and summarize masking rules in real time",
      "Implemented Gemini API-powered suggestions to enhance data security workflows",
    ],
    skills: ["React", "Flask", "Snowflake", "API Integration", "Data Analytics"],
  },
  {
    title: "Software Solutions and Operational Excellence Intern",
    company: "SES Space & Defense",
    period: "June - August 2025",
    location: "Reston, VA",
    description: [
      "Supporting automation and internal tooling efforts impacting 100+ internal users across strategic ops functions",
      "Developed and maintained Salesforce-based dashboards and utilities to streamline business operations",
      "Used advanced Excel to analyze datasets and automate reporting tasks",
      "Collaborated cross-functionally with technical and non-technical teams to enhance decision-making pipelines",
    ],
    skills: ["Salesforce", "Excel", "Automation", "Data Analysis"],
  },
  {
    title: "Software Engineer",
    company: "Hack4Impact",
    period: "September 2024 – Present",
    location: "University of Maryland",
    description: [
      "Software engineer on the Winrock International client team, building a React/Firebase web app to streamline data collection and project tracking for a global nonprofit",
      "Developing dynamic front-end components, integrating with Firebase backend, and working in agile sprints with designers and backend engineers",
      "Previously completed 12-week Hack4Impact bootcamp covering full-stack web development (MERN stack) and built a capstone project using React.js and Firebase",
    ],
    skills: ["React", "Firebase", "MERN Stack", "Agile Development"],
  },
  {
    title: "Instructional Design Assistant",
    company: "University of Maryland",
    period: "May 2024 – Present",
    location: "College Park, MD",
    description: [
      "Worked with the Office of Digital Learning (ODL) team to help innovate instruction at Smith Business School, refining digital learning resources used by over 2,000 students",
      "Used HTML and CSS as well as Canvas interface to implement digital accessibility guidelines",
      "Assessed digital assets such as Canvas sites, Excel Documents, Word Documents, videos, and PDFs for conformance against accessibility guidelines",
    ],
    skills: ["HTML", "CSS", "Canvas", "Digital Accessibility"],
  },
]

// Add new volunteer experiences array
const volunteerExperiences = [
  {
    title: "Outreach Organizer",
    company: "Technica",
    period: "April 2025 - Present",
    location: "University of Maryland",
    description: [
      "Leading outreach to 50+ universities, high schools, and organizations to help recruit 1,500+ participants for Technica 2025",
      "Manage communications, build partnerships, and engage new communities to expand access to the world's largest all-women and nonbinary hackathon",
      "Coordinate with marketing and logistics teams to ensure successful event execution",
    ],
    skills: ["Community Outreach", "Partnership Development", "Event Management"],
  },
  {
    title: "Director of Community Outreach & Java Mentor",
    company: "Codefy",
    period: "March 2020 – Present",
    location: "McLean, VA",
    description: [
      "Leading community outreach for 501(c)(3) nonprofit organization dedicated to providing free computer science education",
      "Earned the Gold Presidential Volunteer Service Award for exceptional community service",
      "Supervised 10+ volunteers and led efforts to recruit over 2,300 students nationwide",
      "Mentored students in Java programming, helping them develop foundational coding skills",
    ],
    skills: ["Nonprofit Leadership", "Java", "Volunteer Management", "Educational Outreach"],
  },
  {
    title: "Logistics Chair",
    company: "Maryland Dhoom",
    period: "Present",
    location: "University of Maryland",
    description: [
      "Leading logistics coordination for Maryland's premier Bollywood-fusion dance team",
      "Managing event planning, scheduling, and operational coordination for performances and competitions",
      "Coordinating with team members to ensure smooth execution of rehearsals and showcases",
      "Overseeing equipment, venue logistics, and performance preparation for campus and external events",
    ],
    skills: ["Event Planning", "Team Leadership", "Logistics Management", "Performance Coordination"],
  },
]

// Add teaching experience array
const teachingExperiences = [
  {
    title: "Math Instructor",
    company: "Mathnasium",
    period: "January 2023 – Present",
    location: "Sterling, VA",
    description: [
      "Taught 30+ students, providing individualized instruction in a group setting",
      "Utilized digital educational tools to assess progress and deliver Mathnasium Method™",
      "Collaborated with team members to create engaging and tailored learning experiences",
      "Adapted teaching methods to accommodate different learning styles and skill levels",
    ],
    skills: ["Mathematics", "Educational Technology", "Individualized Instruction", "Student Assessment"],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600">My journey in technology and software development</p>
        </div>

        {/* Professional Experience */}
        <div className="space-y-8 mb-16">
          {experiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl text-purple-600">{exp.title}</CardTitle>
                    <p className="text-lg font-semibold text-gray-900">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar size={16} className="mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600">
                      • {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Volunteer Work Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Volunteer Work & Leadership
          </h3>
          <p className="text-lg text-gray-600">Community involvement and nonprofit leadership</p>
        </div>

        <div className="space-y-8 mb-16">
          {volunteerExperiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl text-indigo-600">{exp.title}</CardTitle>
                    <p className="text-lg font-semibold text-gray-900">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar size={16} className="mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600">
                      • {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="border-indigo-200 text-indigo-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Teaching Experience Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Teaching Experience
          </h3>
          <p className="text-lg text-gray-600">Educational instruction and mentorship</p>
        </div>

        <div className="space-y-8">
          {teachingExperiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl text-green-600">{exp.title}</CardTitle>
                    <p className="text-lg font-semibold text-gray-900">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar size={16} className="mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600">
                      • {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="border-green-200 text-green-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
