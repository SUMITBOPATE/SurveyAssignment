// FormField.jsx
import React from 'react';

function FormField({ name, label, value, onChange, error ,type,options,isFileInput }) {
  const isSelect = type === 'select';
  const field = isSelect ? (
    <select
      className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
     ) : (
      isFileInput ? (
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={onChange}
        />
  ) : (
    <input
      className="shadow appearance-none border rounded w-full py-4 px-3 font-medium text-gray-900 bg-neutral-300 leading-tight focus:outline-none focus:shadow-outline"
      type={type}
      name={name}
      value={value}
      placeholder={label}
      onChange={onChange}
    />
  )
     );
  return (
    <>
      <div className="mb-4">
        {field}
        {error && <div className="text-red-500 text-xs italic">{error}</div>}
      </div>
  </>
  );
}

export default FormField;