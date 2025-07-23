"use client"

import { useState } from "react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Input } from "./input"
import { Label } from "./label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Checkbox } from "./checkbox"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Progress } from "./progress"
import { Badge } from "./badge"
import { CheckCircle, ArrowLeft, ArrowRight, User, Building, Target, Settings } from "lucide-react"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Company Information
  companyName: string
  companySize: string
  industry: string
  role: string

  // Goals & Use Case
  primaryGoal: string
  useCase: string[]
  monthlyBudget: string

  // Preferences
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  newsletter: boolean
  dataProcessing: boolean
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  companySize: "",
  industry: "",
  role: "",
  primaryGoal: "",
  useCase: [],
  monthlyBudget: "",
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
  newsletter: true,
  dataProcessing: false,
}

const steps = [
  {
    id: 1,
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: User,
  },
  {
    id: 2,
    title: "Company Details",
    description: "Information about your organization",
    icon: Building,
  },
  {
    id: 3,
    title: "Goals & Use Case",
    description: "How will you use our platform?",
    icon: Target,
  },
  {
    id: 4,
    title: "Preferences",
    description: "Customize your experience",
    icon: Settings,
  },
]

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof FormData] as any),
        [field]: value,
      },
    }))
  }

  const handleUseCaseChange = (useCase: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      useCase: checked ? [...prev.useCase, useCase] : prev.useCase.filter((item) => item !== useCase),
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsComplete(true)
  }

  const progress = (currentStep / steps.length) * 100

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome aboard!</h2>
            <p className="text-muted-foreground mb-6">
              Your account has been set up successfully. You can now start using our platform.
            </p>
            <Button className="w-full">Get Started</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-200"}`} />
                  )}
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          )}

          {/* Step 2: Company Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                  placeholder="Acme Inc."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-1000">201-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ceo">CEO/Founder</SelectItem>
                    <SelectItem value="cto">CTO</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Goals & Use Case */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>What's your primary goal?</Label>
                <RadioGroup
                  value={formData.primaryGoal}
                  onValueChange={(value) => updateFormData("primaryGoal", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="increase-productivity" id="increase-productivity" />
                    <Label htmlFor="increase-productivity">Increase team productivity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reduce-costs" id="reduce-costs" />
                    <Label htmlFor="reduce-costs">Reduce operational costs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="improve-collaboration" id="improve-collaboration" />
                    <Label htmlFor="improve-collaboration">Improve team collaboration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scale-business" id="scale-business" />
                    <Label htmlFor="scale-business">Scale business operations</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Which features are you most interested in? (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Project Management",
                    "Team Collaboration",
                    "Analytics & Reporting",
                    "Automation",
                    "Integration Tools",
                    "Customer Support",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={formData.useCase.includes(feature)}
                        onCheckedChange={(checked) => handleUseCaseChange(feature, checked as boolean)}
                      />
                      <Label htmlFor={feature} className="text-sm">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyBudget">Monthly Budget Range</Label>
                <Select
                  value={formData.monthlyBudget}
                  onValueChange={(value) => updateFormData("monthlyBudget", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50">$0 - $50</SelectItem>
                    <SelectItem value="51-200">$51 - $200</SelectItem>
                    <SelectItem value="201-500">$201 - $500</SelectItem>
                    <SelectItem value="501-1000">$501 - $1,000</SelectItem>
                    <SelectItem value="1000+">$1,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Notification Preferences</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-notifications"
                      checked={formData.notifications.email}
                      onCheckedChange={(checked) => updateNestedFormData("notifications", "email", checked)}
                    />
                    <Label htmlFor="email-notifications">Email notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sms-notifications"
                      checked={formData.notifications.sms}
                      onCheckedChange={(checked) => updateNestedFormData("notifications", "sms", checked)}
                    />
                    <Label htmlFor="sms-notifications">SMS notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="push-notifications"
                      checked={formData.notifications.push}
                      onCheckedChange={(checked) => updateNestedFormData("notifications", "push", checked)}
                    />
                    <Label htmlFor="push-notifications">Push notifications</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => updateFormData("newsletter", checked)}
                  />
                  <Label htmlFor="newsletter">Subscribe to our newsletter for product updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="data-processing"
                    checked={formData.dataProcessing}
                    onCheckedChange={(checked) => updateFormData("dataProcessing", checked)}
                  />
                  <Label htmlFor="data-processing" className="text-sm">
                    I agree to the processing of my personal data for service improvement
                  </Label>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Summary</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <strong>Name:</strong> {formData.firstName} {formData.lastName}
                  </p>
                  <p>
                    <strong>Company:</strong> {formData.companyName}
                  </p>
                  <p>
                    <strong>Role:</strong> {formData.role}
                  </p>
                  <p>
                    <strong>Primary Goal:</strong> {formData.primaryGoal?.replace("-", " ")}
                  </p>
                  {formData.useCase.length > 0 && (
                    <div>
                      <strong>Interested Features:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.useCase.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={nextStep} className="flex items-center gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.dataProcessing}
                className="flex items-center gap-2"
              >
                {isSubmitting ? "Creating Account..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
