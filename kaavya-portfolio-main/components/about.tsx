import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm a passionate Computer Science student at the University of Maryland with a focus on full-stack
            development, data analytics, and creating meaningful technology solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">Academic Excellence</h3>
              <p className="text-gray-600 mb-4">
                Presidential Scholarship recipient and University Honors student at UMD, pursuing a Computer Science
                major with double minors in Business and Data Science.
              </p>
              <p className="text-gray-600">Expected graduation: December 2026</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">Professional Impact</h3>
              <p className="text-gray-600 mb-4">
                Currently working as an Operations Excellence Intern at SES Space and Defense and Data Analytics Intern at Mindsprint,
                building solutions that impact thousands of users globally.
              </p>
              <p className="text-gray-600">
                Published researcher with experience in machine learning and data analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
