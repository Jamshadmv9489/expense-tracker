import { useState } from "react";

export function useForm({ initialValues ={},
   validate } ={}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues(v => ({ ...v, [name]: value }));

    setErrors(err => {
      if (!err[name]) return err;
      const { [name]: _, ...rest } = err;
      return rest;
    });
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    const validationErrors = validate?.(values) || {};
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsSubmitting(true);
        await callback(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  };
}