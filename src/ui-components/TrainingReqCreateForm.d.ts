/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TrainingReqCreateFormInputValues = {
    empID?: string;
    MRNo?: string;
    medicalName?: string;
    medicalExpiry?: string;
    medicalAppointDate?: string;
    medicalReport?: string[];
    courseCode?: string[];
    courseName?: string[];
    company?: string[];
    traineeSD?: string;
    traineeED?: string;
    traineeStatus?: string;
    traineeCourseFee?: string;
    mediRequired?: boolean;
};
export declare type TrainingReqCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    MRNo?: ValidationFunction<string>;
    medicalName?: ValidationFunction<string>;
    medicalExpiry?: ValidationFunction<string>;
    medicalAppointDate?: ValidationFunction<string>;
    medicalReport?: ValidationFunction<string>;
    courseCode?: ValidationFunction<string>;
    courseName?: ValidationFunction<string>;
    company?: ValidationFunction<string>;
    traineeSD?: ValidationFunction<string>;
    traineeED?: ValidationFunction<string>;
    traineeStatus?: ValidationFunction<string>;
    traineeCourseFee?: ValidationFunction<string>;
    mediRequired?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TrainingReqCreateFormOverridesProps = {
    TrainingReqCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    MRNo?: PrimitiveOverrideProps<TextFieldProps>;
    medicalName?: PrimitiveOverrideProps<TextFieldProps>;
    medicalExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    medicalAppointDate?: PrimitiveOverrideProps<TextFieldProps>;
    medicalReport?: PrimitiveOverrideProps<TextAreaFieldProps>;
    courseCode?: PrimitiveOverrideProps<TextFieldProps>;
    courseName?: PrimitiveOverrideProps<TextFieldProps>;
    company?: PrimitiveOverrideProps<TextFieldProps>;
    traineeSD?: PrimitiveOverrideProps<TextFieldProps>;
    traineeED?: PrimitiveOverrideProps<TextFieldProps>;
    traineeStatus?: PrimitiveOverrideProps<TextFieldProps>;
    traineeCourseFee?: PrimitiveOverrideProps<TextFieldProps>;
    mediRequired?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type TrainingReqCreateFormProps = React.PropsWithChildren<{
    overrides?: TrainingReqCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TrainingReqCreateFormInputValues) => TrainingReqCreateFormInputValues;
    onSuccess?: (fields: TrainingReqCreateFormInputValues) => void;
    onError?: (fields: TrainingReqCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TrainingReqCreateFormInputValues) => TrainingReqCreateFormInputValues;
    onValidate?: TrainingReqCreateFormValidationValues;
} & React.CSSProperties>;
export default function TrainingReqCreateForm(props: TrainingReqCreateFormProps): React.ReactElement;
