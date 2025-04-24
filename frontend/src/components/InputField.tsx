import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  register: ReturnType<any>;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', placeholder, error, register }) => {
    return (
      
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
