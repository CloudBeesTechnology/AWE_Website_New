/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ServiceRecordUpdateFormInputValues = {
    empID?: string;
    depEmpDate?: string[];
    depEmp?: string[];
    positionRev?: string[];
    positionRevDate?: string[];
    revSalary?: string[];
    revSalaryDate?: string[];
    revLeavePass?: string[];
    revLeaveDate?: string[];
    revAnnualLeave?: string[];
    revALD?: string[];
    remarkWI?: string;
    uploadPR?: string[];
    uploadSP?: string[];
    uploadLP?: string[];
    uploadAL?: string[];
    uploadDep?: string[];
};
export declare type ServiceRecordUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    depEmpDate?: ValidationFunction<string>;
    depEmp?: ValidationFunction<string>;
    positionRev?: ValidationFunction<string>;
    positionRevDate?: ValidationFunction<string>;
    revSalary?: ValidationFunction<string>;
    revSalaryDate?: ValidationFunction<string>;
    revLeavePass?: ValidationFunction<string>;
    revLeaveDate?: ValidationFunction<string>;
    revAnnualLeave?: ValidationFunction<string>;
    revALD?: ValidationFunction<string>;
    remarkWI?: ValidationFunction<string>;
    uploadPR?: ValidationFunction<string>;
    uploadSP?: ValidationFunction<string>;
    uploadLP?: ValidationFunction<string>;
    uploadAL?: ValidationFunction<string>;
    uploadDep?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ServiceRecordUpdateFormOverridesProps = {
    ServiceRecordUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    depEmpDate?: PrimitiveOverrideProps<TextFieldProps>;
    depEmp?: PrimitiveOverrideProps<TextFieldProps>;
    positionRev?: PrimitiveOverrideProps<TextFieldProps>;
    positionRevDate?: PrimitiveOverrideProps<TextFieldProps>;
    revSalary?: PrimitiveOverrideProps<TextFieldProps>;
    revSalaryDate?: PrimitiveOverrideProps<TextFieldProps>;
    revLeavePass?: PrimitiveOverrideProps<TextFieldProps>;
    revLeaveDate?: PrimitiveOverrideProps<TextFieldProps>;
    revAnnualLeave?: PrimitiveOverrideProps<TextFieldProps>;
    revALD?: PrimitiveOverrideProps<TextFieldProps>;
    remarkWI?: PrimitiveOverrideProps<TextFieldProps>;
    uploadPR?: PrimitiveOverrideProps<TextAreaFieldProps>;
    uploadSP?: PrimitiveOverrideProps<TextAreaFieldProps>;
    uploadLP?: PrimitiveOverrideProps<TextAreaFieldProps>;
    uploadAL?: PrimitiveOverrideProps<TextAreaFieldProps>;
    uploadDep?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ServiceRecordUpdateFormProps = React.PropsWithChildren<{
    overrides?: ServiceRecordUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    serviceRecord?: any;
    onSubmit?: (fields: ServiceRecordUpdateFormInputValues) => ServiceRecordUpdateFormInputValues;
    onSuccess?: (fields: ServiceRecordUpdateFormInputValues) => void;
    onError?: (fields: ServiceRecordUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ServiceRecordUpdateFormInputValues) => ServiceRecordUpdateFormInputValues;
    onValidate?: ServiceRecordUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ServiceRecordUpdateForm(props: ServiceRecordUpdateFormProps): React.ReactElement;