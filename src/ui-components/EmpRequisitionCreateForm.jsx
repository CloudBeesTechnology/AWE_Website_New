/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createEmpRequisition } from "../graphql/mutations";
const client = generateClient();
export default function EmpRequisitionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    department: "",
    justification: "",
    project: "",
    position: "",
    quantity: "",
    qualification: "",
    reasonForReq: "",
    replacementFor: "",
    tentativeDate: "",
    status: "",
    remarkReq: "",
    reqName: "",
    requestorID: "",
    approverID: "",
  };
  const [department, setDepartment] = React.useState(initialValues.department);
  const [justification, setJustification] = React.useState(
    initialValues.justification
  );
  const [project, setProject] = React.useState(initialValues.project);
  const [position, setPosition] = React.useState(initialValues.position);
  const [quantity, setQuantity] = React.useState(initialValues.quantity);
  const [qualification, setQualification] = React.useState(
    initialValues.qualification
  );
  const [reasonForReq, setReasonForReq] = React.useState(
    initialValues.reasonForReq
  );
  const [replacementFor, setReplacementFor] = React.useState(
    initialValues.replacementFor
  );
  const [tentativeDate, setTentativeDate] = React.useState(
    initialValues.tentativeDate
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [remarkReq, setRemarkReq] = React.useState(initialValues.remarkReq);
  const [reqName, setReqName] = React.useState(initialValues.reqName);
  const [requestorID, setRequestorID] = React.useState(
    initialValues.requestorID
  );
  const [approverID, setApproverID] = React.useState(initialValues.approverID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDepartment(initialValues.department);
    setJustification(initialValues.justification);
    setProject(initialValues.project);
    setPosition(initialValues.position);
    setQuantity(initialValues.quantity);
    setQualification(initialValues.qualification);
    setReasonForReq(initialValues.reasonForReq);
    setReplacementFor(initialValues.replacementFor);
    setTentativeDate(initialValues.tentativeDate);
    setStatus(initialValues.status);
    setRemarkReq(initialValues.remarkReq);
    setReqName(initialValues.reqName);
    setRequestorID(initialValues.requestorID);
    setApproverID(initialValues.approverID);
    setErrors({});
  };
  const validations = {
    department: [],
    justification: [],
    project: [],
    position: [],
    quantity: [],
    qualification: [],
    reasonForReq: [],
    replacementFor: [],
    tentativeDate: [],
    status: [],
    remarkReq: [],
    reqName: [],
    requestorID: [],
    approverID: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          department,
          justification,
          project,
          position,
          quantity,
          qualification,
          reasonForReq,
          replacementFor,
          tentativeDate,
          status,
          remarkReq,
          reqName,
          requestorID,
          approverID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createEmpRequisition.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "EmpRequisitionCreateForm")}
      {...rest}
    >
      <TextField
        label="Department"
        isRequired={false}
        isReadOnly={false}
        value={department}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department: value,
              justification,
              project,
              position,
              quantity,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status,
              remarkReq,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.department ?? value;
          }
          if (errors.department?.hasError) {
            runValidationTasks("department", value);
          }
          setDepartment(value);
        }}
        onBlur={() => runValidationTasks("department", department)}
        errorMessage={errors.department?.errorMessage}
        hasError={errors.department?.hasError}
        {...getOverrideProps(overrides, "department")}
      ></TextField>
      <TextField
        label="Justification"
        isRequired={false}
        isReadOnly={false}
        value={justification}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification: value,
              project,
              position,
              quantity,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status,
              remarkReq,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.justification ?? value;
          }
          if (errors.justification?.hasError) {
            runValidationTasks("justification", value);
          }
          setJustification(value);
        }}
        onBlur={() => runValidationTasks("justification", justification)}
        errorMessage={errors.justification?.errorMessage}
        hasError={errors.justification?.hasError}
        {...getOverrideProps(overrides, "justification")}
      ></TextField>
      <TextField
        label="Project"
        isRequired={false}
        isReadOnly={false}
        value={project}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project: value,
              position,
              quantity,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status,
              remarkReq,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.project ?? value;
          }
          if (errors.project?.hasError) {
            runValidationTasks("project", value);
          }
          setProject(value);
        }}
        onBlur={() => runValidationTasks("project", project)}
        errorMessage={errors.project?.errorMessage}
        hasError={errors.project?.hasError}
        {...getOverrideProps(overrides, "project")}
      ></TextField>
      <TextField
        label="Position"
        isRequired={false}
        isReadOnly={false}
        value={position}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position: value,
              quantity,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status,
              remarkReq,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.position ?? value;
          }
          if (errors.position?.hasError) {
            runValidationTasks("position", value);
          }
          setPosition(value);
        }}
        onBlur={() => runValidationTasks("position", position)}
        errorMessage={errors.position?.errorMessage}
        hasError={errors.position?.hasError}
        {...getOverrideProps(overrides, "position")}
      ></TextField>
      <TextField
        label="Quantity"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={quantity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position,
              quantity: value,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status,
              remarkReq,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.quantity ?? value;
          }
          if (errors.quantity?.hasError) {
            runValidationTasks("quantity", value);
          }
          setQuantity(value);
        }}
        onBlur={() => runValidationTasks("quantity", quantity)}
        errorMessage={errors.quantity?.errorMessage}
        hasError={errors.quantity?.hasError}
        {...getOverrideProps(overrides, "quantity")}
      ></TextField>
      <TextField
        label="Qualification"
        isRequired={false}
        isReadOnly={false}
        value={qualification}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position,
              quantity,
              qualification: value,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status,
              remarkReq,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.qualification ?? value;
          }
          if (errors.qualification?.hasError) {
            runValidationTasks("qualification", value);
          }
          setQualification(value);
        }}
        onBlur={() => runValidationTasks("qualification", qualification)}
        errorMessage={errors.qualification?.errorMessage}
        hasError={errors.qualification?.hasError}
        {...getOverrideProps(overrides, "qualification")}
      ></TextField>
      <TextField
        label="Reason for req"
        isRequired={false}
        isReadOnly={false}
        value={reasonForReq}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position,
              quantity,
              qualification,
              reasonForReq: value,
              replacementFor,
              tentativeDate,
              status,
              remarkReq,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.reasonForReq ?? value;
          }
          if (errors.reasonForReq?.hasError) {
            runValidationTasks("reasonForReq", value);
          }
          setReasonForReq(value);
        }}
        onBlur={() => runValidationTasks("reasonForReq", reasonForReq)}
        errorMessage={errors.reasonForReq?.errorMessage}
        hasError={errors.reasonForReq?.hasError}
        {...getOverrideProps(overrides, "reasonForReq")}
      ></TextField>
      <TextField
        label="Replacement for"
        isRequired={false}
        isReadOnly={false}
        value={replacementFor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position,
              quantity,
              qualification,
              reasonForReq,
              replacementFor: value,
              tentativeDate,
              status,
              remarkReq,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.replacementFor ?? value;
          }
          if (errors.replacementFor?.hasError) {
            runValidationTasks("replacementFor", value);
          }
          setReplacementFor(value);
        }}
        onBlur={() => runValidationTasks("replacementFor", replacementFor)}
        errorMessage={errors.replacementFor?.errorMessage}
        hasError={errors.replacementFor?.hasError}
        {...getOverrideProps(overrides, "replacementFor")}
      ></TextField>
      <TextField
        label="Tentative date"
        isRequired={false}
        isReadOnly={false}
        value={tentativeDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position,
              quantity,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate: value,
              status,
              remarkReq,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.tentativeDate ?? value;
          }
          if (errors.tentativeDate?.hasError) {
            runValidationTasks("tentativeDate", value);
          }
          setTentativeDate(value);
        }}
        onBlur={() => runValidationTasks("tentativeDate", tentativeDate)}
        errorMessage={errors.tentativeDate?.errorMessage}
        hasError={errors.tentativeDate?.hasError}
        {...getOverrideProps(overrides, "tentativeDate")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position,
              quantity,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status: value,
              remarkReq,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Remark req"
        isRequired={false}
        isReadOnly={false}
        value={remarkReq}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position,
              quantity,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status,
              remarkReq: value,
              reqName,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.remarkReq ?? value;
          }
          if (errors.remarkReq?.hasError) {
            runValidationTasks("remarkReq", value);
          }
          setRemarkReq(value);
        }}
        onBlur={() => runValidationTasks("remarkReq", remarkReq)}
        errorMessage={errors.remarkReq?.errorMessage}
        hasError={errors.remarkReq?.hasError}
        {...getOverrideProps(overrides, "remarkReq")}
      ></TextField>
      <TextField
        label="Req name"
        isRequired={false}
        isReadOnly={false}
        value={reqName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position,
              quantity,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status,
              remarkReq,
              reqName: value,
              requestorID,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.reqName ?? value;
          }
          if (errors.reqName?.hasError) {
            runValidationTasks("reqName", value);
          }
          setReqName(value);
        }}
        onBlur={() => runValidationTasks("reqName", reqName)}
        errorMessage={errors.reqName?.errorMessage}
        hasError={errors.reqName?.hasError}
        {...getOverrideProps(overrides, "reqName")}
      ></TextField>
      <TextField
        label="Requestor id"
        isRequired={false}
        isReadOnly={false}
        value={requestorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position,
              quantity,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status,
              remarkReq,
              reqName,
              requestorID: value,
              approverID,
            };
            const result = onChange(modelFields);
            value = result?.requestorID ?? value;
          }
          if (errors.requestorID?.hasError) {
            runValidationTasks("requestorID", value);
          }
          setRequestorID(value);
        }}
        onBlur={() => runValidationTasks("requestorID", requestorID)}
        errorMessage={errors.requestorID?.errorMessage}
        hasError={errors.requestorID?.hasError}
        {...getOverrideProps(overrides, "requestorID")}
      ></TextField>
      <TextField
        label="Approver id"
        isRequired={false}
        isReadOnly={false}
        value={approverID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              department,
              justification,
              project,
              position,
              quantity,
              qualification,
              reasonForReq,
              replacementFor,
              tentativeDate,
              status,
              remarkReq,
              reqName,
              requestorID,
              approverID: value,
            };
            const result = onChange(modelFields);
            value = result?.approverID ?? value;
          }
          if (errors.approverID?.hasError) {
            runValidationTasks("approverID", value);
          }
          setApproverID(value);
        }}
        onBlur={() => runValidationTasks("approverID", approverID)}
        errorMessage={errors.approverID?.errorMessage}
        hasError={errors.approverID?.hasError}
        {...getOverrideProps(overrides, "approverID")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
