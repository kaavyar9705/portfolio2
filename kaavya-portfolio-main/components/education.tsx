import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, BookOpen } from "lucide-react"

export default function Education() {
  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Education
          </h2>
          <p className="text-xl text-gray-600">Academic achievements and coursework</p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <GraduationCap className="text-purple-600" size={32} />
              <div>
                <CardTitle className="text-2xl text-purple-600">University of Maryland, College Park</CardTitle>
                <p className="text-gray-600">Expected Graduation: December 2026</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Degree Program</h3>
              <p className="text-gray-600">
                Bachelor of Arts in Computer Science Major, Business and Data Science double minor
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="text-blue-500" size={20} />
                  <h3 className="text-xl font-semibold">Honors & Awards</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Presidential Scholarship recipient</li>
                  <li>• University Honors student</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <BookOpen className="text-purple-500" size={20} />
                  <h3 className="text-xl font-semibold">Relevant Coursework</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Java Object Oriented Programming</li>
                  <li>• C Programming</li>
                  <li>• Discrete Mathematics</li>
                  <li>• Linear Algebra</li>
                  <li>• Data Science</li>
                  <li>• Algorithms</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
