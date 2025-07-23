import Component from "../../onboarding-wizard"
import { ThemeToggle } from "../components/theme-toggle"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <ThemeToggle />
      <Component />
    </div>
  )
}
