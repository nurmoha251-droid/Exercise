import { useForm } from 'react-hook-form';

const StudentRegistration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form submitted:', data);

    alert('Registration successful!\n' + JSON.stringify(data, null, 2));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Student Registration</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
     
        <div>
          <label className="block text-sm font-medium mb-1">
            Student Name
          </label>
          <input
            {...register('studentName', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.studentName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.studentName.message}
            </p>
          )}
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format'
              }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Grade Level
          </label>
          <select
            {...register('gradeLevel', {
              required: 'Please select a grade'
            })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Grade</option>
            <option value="9">Form1</option>
            <option value="10">Form2</option>
            <option value="11">Form3</option>
            <option value="12">Form4</option>
          </select>
          {errors.gradeLevel && (
            <p className="text-red-500 text-sm mt-1">
              {errors.gradeLevel.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Subjects Interest
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('subjects', {
                  required: 'Select at least one subject'
                })}
                value="somali"
                className="mr-2"
              />
              Somali
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('subjects')}
                value="Arts"
                className="mr-2"
              />
              Arts
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('subjects')}
                value="english"
                className="mr-2"
              />
              English
            </label>
          </div>
          {errors.subjects && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subjects.message}
            </p>
          )}
        </div>

  
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-rose-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;