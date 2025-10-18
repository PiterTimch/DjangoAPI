export interface FormFieldRule {
    rule: string;
    value?: any;
    message: string;
}

type ValidatorFn = (value: string, ruleValue?: any) => boolean;

const validators: Record<string, ValidatorFn> = {
    required: (value) => !value,
    regexp: (value, ruleValue) => !new RegExp(ruleValue).test(value),
    min: (value, ruleValue) => value?.length < ruleValue,
    max: (value, ruleValue) => value?.length > ruleValue,
    equals: (value, ruleValue) => value !== ruleValue,
};

export const validate = (
    value: string,
    rules: FormFieldRule[] | undefined
): string | undefined => {
    if (!rules) return undefined;

    for (const rule of rules) {
        const validator = validators[rule.rule];
        if (!validator) continue;

        const error = validator(value, rule.value);
        if (error) return rule.message;
    }

    return undefined;
};
