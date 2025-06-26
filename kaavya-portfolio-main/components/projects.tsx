import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

const projects = [
  {
    title: "Lunari - Women's Wellness App",
    period: "November 2024 - Present",
    description:
      "Co-developed Lunari, a personalized women's wellness app that leverages machine learning to provide tailored health insights based on menstrual cycle data. Awarded 'Best Active-Wellness/Health Hack' at Technica 2024.",
    technologies: ["Flutter", "Figma", "Machine Learning", "Forest Regression"],
    award: "Best Active-Wellness/Health Hack - Technica 2024",
    type: "Mobile App",
  },
  {
    title: "Snowflake Analytics Dashboard",
    period: "May 2025 - Present",
    description:
      "Building a full-stack analytics dashboard to visualize credit usage, user activity, and query performance. Features dynamic data masking policy configuration and Gemini API-powered suggestions.",
    technologies: ["React", "Flask", "Snowflake", "Gemini API"],
    type: "Web Application",
  },
  {
    title: "Winrock International Web App",
    period: "September 2024 - Present",
    description:
      "Building a React/Firebase web application to streamline data collection and project tracking for a global nonprofit organization, impacting operations worldwide.",
    technologies: ["React", "Firebase", "JavaScript"],
    type: "Web Application",
  },
  {
    title: "YouTube Collaboration Networks Research",
    period: "July - August 2022",
    description:
      "Worked with a team to write code for data retrieval and construct machine learning models to sanitize data using Python and R. Published in George Mason academic journals and iConference journal.",
    technologies: ["Python", "R", "Machine Learning", "Data Analysis"],
    publication: "iConference 2023, Barcelona, Spain",
    type: "Research Project",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600">Some of my notable work and contributions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-purple-600 mb-2">{project.title}</CardTitle>
                    <p className="text-sm text-gray-500">{project.period}</p>
                    <Badge variant="outline" className="mt-2">
                      {project.type}
                    </Badge>
                  </div>
                </div>
                {project.award && (
                  <div className="flex items-center space-x-2 mt-3 p-2 bg-purple-50 rounded-lg">
                    <Award className="text-purple-600" size={16} />
                    <span className="text-sm font-medium text-purple-800">{project.award}</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-gray-600 mb-4 flex-1">{project.description}</p>

                {project.publication && (
                  <p className="text-sm text-green-600 font-medium mb-4">Published: {project.publication}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {tech}
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
