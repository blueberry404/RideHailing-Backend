export const validateRequest = <T,>(request: T, schema: any) => {
    const { error } = schema.validate(request);
    return error ?? null;
};
