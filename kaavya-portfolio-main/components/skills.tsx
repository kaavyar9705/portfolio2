import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Globe, BarChart } from "lucide-react"

const skillCategories = [
  {
    title: "Backend Development",
    icon: <Code className="text-purple-600" size={24} />,
    skills: ["Java", "Python", "C", "Flask", "Firebase", "Node.js"],
  },
  {
    title: "Frontend Development",
    icon: <Globe className="text-blue-600" size={24} />,
    skills: ["JavaScript", "TypeScript", "React", "HTML", "CSS", "Flutter", "Figma"],
  },
  {
    title: "Data & Analytics",
    icon: <BarChart className="text-indigo-600" size={24} />,
    skills: ["SQL", "MATLAB", "Snowflake", "Pandas", "Jupyter Notebook", "Data Science"],
  },
  {
    title: "Tools & Platforms",
    icon: <Database className="text-purple-500" size={24} />,
    skills: ["Git", "Salesforce", "Microsoft Office", "Canvas", "Firebase"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600">Technologies and tools I work with</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {category.icon}
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
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
