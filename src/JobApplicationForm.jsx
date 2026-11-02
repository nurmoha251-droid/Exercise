
import { useState, useEffect } from "react";

const AVAILABLE_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Product Manager",
];

const AVAILABLE_SKILLS = [
  "React",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "UI Design",
  "API Development",
];

const STORAGE_KEY = "job_app_form_data";

const initialFormState = {
  fullName: "",
  email: "",
  role: "",
  experience: "",
  skills: [],
  terms: false,
  notifications: false,
};


const getSavedFormData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return initialFormState;

    const parsed = JSON.parse(saved);

    return {
      ...initialFormState,
      ...parsed,
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
    };
  } catch (error) {
    console.error("Error loading saved data:", error);
    return initialFormState;
  }
};

const JobApplicationForm = () => {
  const [formData, setFormData] = useState(getSavedFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

 
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, [formData]);

  
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full name is required.";
        } else if (
          !/^[\p{L}][\p{L}\s'-]{0,48}[\p{L}]$|^[\p{L}]$/u.test(value.trim())
        ) {
          error = "Please enter a valid name.";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email address is required.";
        } else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ) {
          error = "Please enter a valid email address.";
        }
        break;

      case "role":
        if (!value) {
          error = "Please select a targeted job role.";
        }
        break;

      case "experience":
        if (value === "") {
          error = "Years of experience is required.";
        } else if (
          !Number.isFinite(Number(value)) ||
          Number(value) < 0 ||
          Number(value) > 50
        ) {
          error = "Experience must be between 0 and 50.";
        }
        break;

      case "skills":
        if (!value || value.length === 0) {
          error = "Please select at least one core skill.";
        }
        break;

      case "terms":
        if (!value) {
          error = "You must accept the terms and conditions.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "skills") {
      setFormData((prev) => {
        const updatedSkills = checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value);

        if (touched.skills) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            skills: validateField("skills", updatedSkills),
          }));
        }

        return {
          ...prev,
          skills: updatedSkills,
        };
      });

      return;
    }

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (touched[name] || name === "terms") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, newValue),
      }));
    }
  };


  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  };

 
 


  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const targetFields = [
      "fullName",
      "email",
      "role",
      "experience",
      "skills",
      "terms",
    ];

    const newErrors = {};
    const newTouched = {};

    targetFields.forEach((field) => {
      newTouched[field] = true;

      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed:", newErrors);
      return;
    }

    setIsSubmitting(true);

    const application = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    console.log("Application submitted:", application);

    handleReset();
    setIsSubmitting(false);
  };

  // Input styles
  const getInputStyles = (fieldName) => {
    const defaultClasses =
      "w-full px-4 py-2.5 bg-white border-2 rounded-lg text-slate-700 outline-none transition-all duration-200 box-border";

    if (touched[fieldName] && errors[fieldName]) {
      return `${defaultClasses} border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-100`;
    }

    if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      return `${defaultClasses} border-emerald-500 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-100`;
    }

    return `${defaultClasses} border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

        {/* Header */}
        <div className="bg-indigo-600 px-8 py-6 text-white text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Career Application
          </h2>

          <p className="mt-2 text-sm text-indigo-100">
            Join our engineering department. Please fill out the form carefully.
          </p>
        </div>

        <div className="px-6 py-6 sm:px-8">

          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
                Full Name *
              </label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=""
                className={getInputStyles("fullName")}
                aria-invalid={!!errors.fullName}
              />

              {touched.fullName && errors.fullName && (
                <p className="text-xs font-medium text-red-500">
                  {errors.fullName}
                </p>
              )}
            </div>

         
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                Email Address *
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=""
                className={getInputStyles("email")}
                aria-invalid={!!errors.email}
              />

              {touched.email && errors.email && (
                <p className="text-xs font-medium text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex flex-col gap-1.5">
                <label htmlFor="role" className="text-sm font-semibold text-slate-700">
                  Targeted Role *
                </label>

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputStyles("role")}
                  aria-invalid={!!errors.role}
                >
                  <option value="">Select targeted role</option>

                  {AVAILABLE_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>

                {touched.role && errors.role && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.role}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="experience" className="text-sm font-semibold text-slate-700">
                  Years of Experience *
                </label>

                <input
                  id="experience"
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="3"
                  min="0"
                  max="50"
                  step="any"
                  className={getInputStyles("experience")}
                  aria-invalid={!!errors.experience}
                />

                {touched.experience && errors.experience && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>

           
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Core Technical Competencies *
                </p>

                <p className="text-xs text-slate-500">
                  Choose at least one skill.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AVAILABLE_SKILLS.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="skills"
                      value={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={handleChange}
                      className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />

                    {skill}
                  </label>
                ))}
              </div>

              {errors.skills && (
                <p className="text-xs font-medium text-red-500">
                  {errors.skills}
                </p>
              )}
            </div>

          
            <div className="space-y-3">
              <div>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />

                  I accept the terms and conditions *
                </label>

                {errors.terms && (
                  <p className="text-xs font-medium text-red-500 mt-1">
                    {errors.terms}
                  </p>
                )}
              </div>

             
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />

                Send me optional notification updates
              </label>
            </div>

            
            <div className="flex flex-col-reverse sm:flex-row gap-3">

          

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-60 transition-colors"
              >
                {isSubmitting ? "Processing..." : "Submit Application"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
