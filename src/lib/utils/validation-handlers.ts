export function handleBackendValidations(error: any) {
  const { message, errors } = error?.data ?? {};

  // If validation errors are found, set errors.
  const validatedErrors = Object.fromEntries(
    Object.entries(errors ?? {}).map(([key, values]) => [key, values?.[0]])
  );

  return validatedErrors;
}

export function handleFrontendValidations(schema: any, formData: any) {
  try {
    schema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    const errorsObj = error.inner.reduce((acc, curr) => {
      acc[curr.path] = curr.message;
      return acc;
    }, {});

    return errorsObj;
  }
}
