import { useState } from 'react';

const UserForm = () => {
  // 1. Single state object to manage all form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    agreeToTerms: false,
  });

  // State to hold the data after a successful submission
  const [submittedData, setSubmittedData] = useState(null);

  // 2. Generic change handler for inputs, select dropdowns, and checkboxes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 3. Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData); // Save state snapshot to display it
  };

  return (
    <div className="max-w-[450px] mx-auto my-[50px] font-sans">
      {/* Form Container */}
      <div className="p-[30px] bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#e2e8f0]">
        <h2 className="text-[#2d3748] mt-0 mb-6 text-[28px] font-bold text-center">Registration</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              required
              className="w-full px-4 py-2.5 border-2 border-[#e2e8f0] rounded-[8px] outline-none focus:border-[#4f46e5] transition-colors box-border"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full px-4 py-2.5 border-2 border-[#e2e8f0] rounded-[8px] outline-none focus:border-[#4f46e5] transition-colors box-border"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 border-2 border-[#e2e8f0] rounded-[8px] outline-none focus:border-[#4f46e5] transition-colors box-border"
            />
          </div>

          {/* Select Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#334155]">Account Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border-2 border-[#e2e8f0] rounded-[8px] bg-white outline-none focus:border-[#4f46e5] transition-colors box-border"
            >
              <option value="" disabled>Select your role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Project Manager</option>
            </select>
          </div>

          {/* Checkbox Input */}
          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="w-5 h-5 accent-[#4f46e5] cursor-pointer"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-[#334155] select-none cursor-pointer">
              I agree to the Terms and Conditions
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-[#4f46e5] border-2 border-[#4f46e5] text-white font-semibold rounded-[8px] hover:bg-[#4338ca] hover:border-[#4338ca] transition-all cursor-pointer box-border"
          >
            Submit Registration
          </button>
        </form>
      </div>

      {/* 4. Display entered data dynamically upon submission */}
      {submittedData && (
        <div className="mt-6 p-[24px] bg-[#f8fafc] rounded-[12px] border border-[#e2e8f0] shadow-sm animate-fade-in">
          <h3 className="text-[#2d3748] mt-0 mb-4 text-[20px] font-bold border-b border-[#e2e8f0] pb-2">
            Submitted Data Summary
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-[#334155]">
            <li><strong className="text-slate-800">Username:</strong> {submittedData.username}</li>
            <li><strong className="text-slate-800">Email:</strong> {submittedData.email}</li>
            <li><strong className="text-slate-800">Password:</strong> <span className="font-mono text-xs">•••••••• (Hidden)</span></li>
            <li><strong className="text-slate-800">Role:</strong> <span className="capitalize">{submittedData.role}</span></li>
            <li><strong className="text-slate-800">Terms Accepted:</strong> {submittedData.agreeToTerms ? '✅ Yes' : '❌ No'}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserForm;
