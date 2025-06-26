import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Kaavya Radhakrishnan
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">Computer Science Student & Software Engineer</p>
            <p className="text-lg text-gray-600 max-w-2xl mb-8">
              University of Maryland student passionate about full-stack development, data analytics, and creating
              impactful technology solutions.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button variant="outline" asChild className="border-purple-300 text-purple-600 hover:bg-purple-50">
                <a href="#projects">View My Work</a>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start space-x-6">
              <a href="mailto:kaavyakri@gmail.com" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Mail size={24} />
              </a>
              <a href="tel:703-586-0032" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Phone size={24} />
              </a>
              <a
                href="https://linkedin.com/in/kaavyaradhakrishnan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/kaavyar9705"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Github size={24} />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-2xl opacity-30 scale-110"></div>
              <img
                src="/images/headshot.jpg"
                alt="Kaavya Radhakrishnan"
                className="relative w-80 h-80 object-cover rounded-full shadow-2xl border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
