/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createEmpLeaveDetails } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function EmpLeaveDetailsCreateForm(props) {
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
    empID: "",
    annualLeave: [],
    annualLeaveDate: [],
    compasLeave: "",
    destinateLeavePass: [],
    durLeavePass: [],
    dateLeavePass: [],
    leavePass: [],
    materLeave: "",
    mrageLeave: "",
    paterLeave: "",
    sickLeave: "",
    sickLeaveDate: "",
    hospLeave: "",
    remainingAnualLeave: "",
    remainingSickLeave: "",
    remainingMateLeave: "",
    remainingMrageLeave: "",
    remainingPaternityLeave: "",
    remainingHosLeave: "",
    remainingCompasLeave: "",
    unPaidAuthorize: "",
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [annualLeave, setAnnualLeave] = React.useState(
    initialValues.annualLeave
  );
  const [annualLeaveDate, setAnnualLeaveDate] = React.useState(
    initialValues.annualLeaveDate
  );
  const [compasLeave, setCompasLeave] = React.useState(
    initialValues.compasLeave
  );
  const [destinateLeavePass, setDestinateLeavePass] = React.useState(
    initialValues.destinateLeavePass
  );
  const [durLeavePass, setDurLeavePass] = React.useState(
    initialValues.durLeavePass
  );
  const [dateLeavePass, setDateLeavePass] = React.useState(
    initialValues.dateLeavePass
  );
  const [leavePass, setLeavePass] = React.useState(initialValues.leavePass);
  const [materLeave, setMaterLeave] = React.useState(initialValues.materLeave);
  const [mrageLeave, setMrageLeave] = React.useState(initialValues.mrageLeave);
  const [paterLeave, setPaterLeave] = React.useState(initialValues.paterLeave);
  const [sickLeave, setSickLeave] = React.useState(initialValues.sickLeave);
  const [sickLeaveDate, setSickLeaveDate] = React.useState(
    initialValues.sickLeaveDate
  );
  const [hospLeave, setHospLeave] = React.useState(initialValues.hospLeave);
  const [remainingAnualLeave, setRemainingAnualLeave] = React.useState(
    initialValues.remainingAnualLeave
  );
  const [remainingSickLeave, setRemainingSickLeave] = React.useState(
    initialValues.remainingSickLeave
  );
  const [remainingMateLeave, setRemainingMateLeave] = React.useState(
    initialValues.remainingMateLeave
  );
  const [remainingMrageLeave, setRemainingMrageLeave] = React.useState(
    initialValues.remainingMrageLeave
  );
  const [remainingPaternityLeave, setRemainingPaternityLeave] = React.useState(
    initialValues.remainingPaternityLeave
  );
  const [remainingHosLeave, setRemainingHosLeave] = React.useState(
    initialValues.remainingHosLeave
  );
  const [remainingCompasLeave, setRemainingCompasLeave] = React.useState(
    initialValues.remainingCompasLeave
  );
  const [unPaidAuthorize, setUnPaidAuthorize] = React.useState(
    initialValues.unPaidAuthorize
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setAnnualLeave(initialValues.annualLeave);
    setCurrentAnnualLeaveValue("");
    setAnnualLeaveDate(initialValues.annualLeaveDate);
    setCurrentAnnualLeaveDateValue("");
    setCompasLeave(initialValues.compasLeave);
    setDestinateLeavePass(initialValues.destinateLeavePass);
    setCurrentDestinateLeavePassValue("");
    setDurLeavePass(initialValues.durLeavePass);
    setCurrentDurLeavePassValue("");
    setDateLeavePass(initialValues.dateLeavePass);
    setCurrentDateLeavePassValue("");
    setLeavePass(initialValues.leavePass);
    setCurrentLeavePassValue("");
    setMaterLeave(initialValues.materLeave);
    setMrageLeave(initialValues.mrageLeave);
    setPaterLeave(initialValues.paterLeave);
    setSickLeave(initialValues.sickLeave);
    setSickLeaveDate(initialValues.sickLeaveDate);
    setHospLeave(initialValues.hospLeave);
    setRemainingAnualLeave(initialValues.remainingAnualLeave);
    setRemainingSickLeave(initialValues.remainingSickLeave);
    setRemainingMateLeave(initialValues.remainingMateLeave);
    setRemainingMrageLeave(initialValues.remainingMrageLeave);
    setRemainingPaternityLeave(initialValues.remainingPaternityLeave);
    setRemainingHosLeave(initialValues.remainingHosLeave);
    setRemainingCompasLeave(initialValues.remainingCompasLeave);
    setUnPaidAuthorize(initialValues.unPaidAuthorize);
    setErrors({});
  };
  const [currentAnnualLeaveValue, setCurrentAnnualLeaveValue] =
    React.useState("");
  const annualLeaveRef = React.createRef();
  const [currentAnnualLeaveDateValue, setCurrentAnnualLeaveDateValue] =
    React.useState("");
  const annualLeaveDateRef = React.createRef();
  const [currentDestinateLeavePassValue, setCurrentDestinateLeavePassValue] =
    React.useState("");
  const destinateLeavePassRef = React.createRef();
  const [currentDurLeavePassValue, setCurrentDurLeavePassValue] =
    React.useState("");
  const durLeavePassRef = React.createRef();
  const [currentDateLeavePassValue, setCurrentDateLeavePassValue] =
    React.useState("");
  const dateLeavePassRef = React.createRef();
  const [currentLeavePassValue, setCurrentLeavePassValue] = React.useState("");
  const leavePassRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    annualLeave: [],
    annualLeaveDate: [],
    compasLeave: [],
    destinateLeavePass: [],
    durLeavePass: [],
    dateLeavePass: [],
    leavePass: [],
    materLeave: [],
    mrageLeave: [],
    paterLeave: [],
    sickLeave: [],
    sickLeaveDate: [],
    hospLeave: [],
    remainingAnualLeave: [],
    remainingSickLeave: [],
    remainingMateLeave: [],
    remainingMrageLeave: [],
    remainingPaternityLeave: [],
    remainingHosLeave: [],
    remainingCompasLeave: [],
    unPaidAuthorize: [],
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
          empID,
          annualLeave,
          annualLeaveDate,
          compasLeave,
          destinateLeavePass,
          durLeavePass,
          dateLeavePass,
          leavePass,
          materLeave,
          mrageLeave,
          paterLeave,
          sickLeave,
          sickLeaveDate,
          hospLeave,
          remainingAnualLeave,
          remainingSickLeave,
          remainingMateLeave,
          remainingMrageLeave,
          remainingPaternityLeave,
          remainingHosLeave,
          remainingCompasLeave,
          unPaidAuthorize,
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
            query: createEmpLeaveDetails.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "EmpLeaveDetailsCreateForm")}
      {...rest}
    >
      <TextField
        label="Emp id"
        isRequired={true}
        isReadOnly={false}
        value={empID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID: value,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.empID ?? value;
          }
          if (errors.empID?.hasError) {
            runValidationTasks("empID", value);
          }
          setEmpID(value);
        }}
        onBlur={() => runValidationTasks("empID", empID)}
        errorMessage={errors.empID?.errorMessage}
        hasError={errors.empID?.hasError}
        {...getOverrideProps(overrides, "empID")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave: values,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            values = result?.annualLeave ?? values;
          }
          setAnnualLeave(values);
          setCurrentAnnualLeaveValue("");
        }}
        currentFieldValue={currentAnnualLeaveValue}
        label={"Annual leave"}
        items={annualLeave}
        hasError={errors?.annualLeave?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("annualLeave", currentAnnualLeaveValue)
        }
        errorMessage={errors?.annualLeave?.errorMessage}
        setFieldValue={setCurrentAnnualLeaveValue}
        inputFieldRef={annualLeaveRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Annual leave"
          isRequired={false}
          isReadOnly={false}
          value={currentAnnualLeaveValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.annualLeave?.hasError) {
              runValidationTasks("annualLeave", value);
            }
            setCurrentAnnualLeaveValue(value);
          }}
          onBlur={() =>
            runValidationTasks("annualLeave", currentAnnualLeaveValue)
          }
          errorMessage={errors.annualLeave?.errorMessage}
          hasError={errors.annualLeave?.hasError}
          ref={annualLeaveRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "annualLeave")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate: values,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            values = result?.annualLeaveDate ?? values;
          }
          setAnnualLeaveDate(values);
          setCurrentAnnualLeaveDateValue("");
        }}
        currentFieldValue={currentAnnualLeaveDateValue}
        label={"Annual leave date"}
        items={annualLeaveDate}
        hasError={errors?.annualLeaveDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "annualLeaveDate",
            currentAnnualLeaveDateValue
          )
        }
        errorMessage={errors?.annualLeaveDate?.errorMessage}
        setFieldValue={setCurrentAnnualLeaveDateValue}
        inputFieldRef={annualLeaveDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Annual leave date"
          isRequired={false}
          isReadOnly={false}
          value={currentAnnualLeaveDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.annualLeaveDate?.hasError) {
              runValidationTasks("annualLeaveDate", value);
            }
            setCurrentAnnualLeaveDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("annualLeaveDate", currentAnnualLeaveDateValue)
          }
          errorMessage={errors.annualLeaveDate?.errorMessage}
          hasError={errors.annualLeaveDate?.hasError}
          ref={annualLeaveDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "annualLeaveDate")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Compas leave"
        isRequired={false}
        isReadOnly={false}
        value={compasLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave: value,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.compasLeave ?? value;
          }
          if (errors.compasLeave?.hasError) {
            runValidationTasks("compasLeave", value);
          }
          setCompasLeave(value);
        }}
        onBlur={() => runValidationTasks("compasLeave", compasLeave)}
        errorMessage={errors.compasLeave?.errorMessage}
        hasError={errors.compasLeave?.hasError}
        {...getOverrideProps(overrides, "compasLeave")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass: values,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            values = result?.destinateLeavePass ?? values;
          }
          setDestinateLeavePass(values);
          setCurrentDestinateLeavePassValue("");
        }}
        currentFieldValue={currentDestinateLeavePassValue}
        label={"Destinate leave pass"}
        items={destinateLeavePass}
        hasError={errors?.destinateLeavePass?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "destinateLeavePass",
            currentDestinateLeavePassValue
          )
        }
        errorMessage={errors?.destinateLeavePass?.errorMessage}
        setFieldValue={setCurrentDestinateLeavePassValue}
        inputFieldRef={destinateLeavePassRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Destinate leave pass"
          isRequired={false}
          isReadOnly={false}
          value={currentDestinateLeavePassValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.destinateLeavePass?.hasError) {
              runValidationTasks("destinateLeavePass", value);
            }
            setCurrentDestinateLeavePassValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "destinateLeavePass",
              currentDestinateLeavePassValue
            )
          }
          errorMessage={errors.destinateLeavePass?.errorMessage}
          hasError={errors.destinateLeavePass?.hasError}
          ref={destinateLeavePassRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "destinateLeavePass")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass: values,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            values = result?.durLeavePass ?? values;
          }
          setDurLeavePass(values);
          setCurrentDurLeavePassValue("");
        }}
        currentFieldValue={currentDurLeavePassValue}
        label={"Dur leave pass"}
        items={durLeavePass}
        hasError={errors?.durLeavePass?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("durLeavePass", currentDurLeavePassValue)
        }
        errorMessage={errors?.durLeavePass?.errorMessage}
        setFieldValue={setCurrentDurLeavePassValue}
        inputFieldRef={durLeavePassRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Dur leave pass"
          isRequired={false}
          isReadOnly={false}
          value={currentDurLeavePassValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.durLeavePass?.hasError) {
              runValidationTasks("durLeavePass", value);
            }
            setCurrentDurLeavePassValue(value);
          }}
          onBlur={() =>
            runValidationTasks("durLeavePass", currentDurLeavePassValue)
          }
          errorMessage={errors.durLeavePass?.errorMessage}
          hasError={errors.durLeavePass?.hasError}
          ref={durLeavePassRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "durLeavePass")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass: values,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            values = result?.dateLeavePass ?? values;
          }
          setDateLeavePass(values);
          setCurrentDateLeavePassValue("");
        }}
        currentFieldValue={currentDateLeavePassValue}
        label={"Date leave pass"}
        items={dateLeavePass}
        hasError={errors?.dateLeavePass?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("dateLeavePass", currentDateLeavePassValue)
        }
        errorMessage={errors?.dateLeavePass?.errorMessage}
        setFieldValue={setCurrentDateLeavePassValue}
        inputFieldRef={dateLeavePassRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Date leave pass"
          isRequired={false}
          isReadOnly={false}
          value={currentDateLeavePassValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.dateLeavePass?.hasError) {
              runValidationTasks("dateLeavePass", value);
            }
            setCurrentDateLeavePassValue(value);
          }}
          onBlur={() =>
            runValidationTasks("dateLeavePass", currentDateLeavePassValue)
          }
          errorMessage={errors.dateLeavePass?.errorMessage}
          hasError={errors.dateLeavePass?.hasError}
          ref={dateLeavePassRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "dateLeavePass")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass: values,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            values = result?.leavePass ?? values;
          }
          setLeavePass(values);
          setCurrentLeavePassValue("");
        }}
        currentFieldValue={currentLeavePassValue}
        label={"Leave pass"}
        items={leavePass}
        hasError={errors?.leavePass?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("leavePass", currentLeavePassValue)
        }
        errorMessage={errors?.leavePass?.errorMessage}
        setFieldValue={setCurrentLeavePassValue}
        inputFieldRef={leavePassRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Leave pass"
          isRequired={false}
          isReadOnly={false}
          value={currentLeavePassValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.leavePass?.hasError) {
              runValidationTasks("leavePass", value);
            }
            setCurrentLeavePassValue(value);
          }}
          onBlur={() => runValidationTasks("leavePass", currentLeavePassValue)}
          errorMessage={errors.leavePass?.errorMessage}
          hasError={errors.leavePass?.hasError}
          ref={leavePassRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "leavePass")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Mater leave"
        isRequired={false}
        isReadOnly={false}
        value={materLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave: value,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.materLeave ?? value;
          }
          if (errors.materLeave?.hasError) {
            runValidationTasks("materLeave", value);
          }
          setMaterLeave(value);
        }}
        onBlur={() => runValidationTasks("materLeave", materLeave)}
        errorMessage={errors.materLeave?.errorMessage}
        hasError={errors.materLeave?.hasError}
        {...getOverrideProps(overrides, "materLeave")}
      ></TextField>
      <TextField
        label="Mrage leave"
        isRequired={false}
        isReadOnly={false}
        value={mrageLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave: value,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.mrageLeave ?? value;
          }
          if (errors.mrageLeave?.hasError) {
            runValidationTasks("mrageLeave", value);
          }
          setMrageLeave(value);
        }}
        onBlur={() => runValidationTasks("mrageLeave", mrageLeave)}
        errorMessage={errors.mrageLeave?.errorMessage}
        hasError={errors.mrageLeave?.hasError}
        {...getOverrideProps(overrides, "mrageLeave")}
      ></TextField>
      <TextField
        label="Pater leave"
        isRequired={false}
        isReadOnly={false}
        value={paterLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave: value,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.paterLeave ?? value;
          }
          if (errors.paterLeave?.hasError) {
            runValidationTasks("paterLeave", value);
          }
          setPaterLeave(value);
        }}
        onBlur={() => runValidationTasks("paterLeave", paterLeave)}
        errorMessage={errors.paterLeave?.errorMessage}
        hasError={errors.paterLeave?.hasError}
        {...getOverrideProps(overrides, "paterLeave")}
      ></TextField>
      <TextField
        label="Sick leave"
        isRequired={false}
        isReadOnly={false}
        value={sickLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave: value,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.sickLeave ?? value;
          }
          if (errors.sickLeave?.hasError) {
            runValidationTasks("sickLeave", value);
          }
          setSickLeave(value);
        }}
        onBlur={() => runValidationTasks("sickLeave", sickLeave)}
        errorMessage={errors.sickLeave?.errorMessage}
        hasError={errors.sickLeave?.hasError}
        {...getOverrideProps(overrides, "sickLeave")}
      ></TextField>
      <TextField
        label="Sick leave date"
        isRequired={false}
        isReadOnly={false}
        value={sickLeaveDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate: value,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.sickLeaveDate ?? value;
          }
          if (errors.sickLeaveDate?.hasError) {
            runValidationTasks("sickLeaveDate", value);
          }
          setSickLeaveDate(value);
        }}
        onBlur={() => runValidationTasks("sickLeaveDate", sickLeaveDate)}
        errorMessage={errors.sickLeaveDate?.errorMessage}
        hasError={errors.sickLeaveDate?.hasError}
        {...getOverrideProps(overrides, "sickLeaveDate")}
      ></TextField>
      <TextField
        label="Hosp leave"
        isRequired={false}
        isReadOnly={false}
        value={hospLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave: value,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.hospLeave ?? value;
          }
          if (errors.hospLeave?.hasError) {
            runValidationTasks("hospLeave", value);
          }
          setHospLeave(value);
        }}
        onBlur={() => runValidationTasks("hospLeave", hospLeave)}
        errorMessage={errors.hospLeave?.errorMessage}
        hasError={errors.hospLeave?.hasError}
        {...getOverrideProps(overrides, "hospLeave")}
      ></TextField>
      <TextField
        label="Remaining anual leave"
        isRequired={false}
        isReadOnly={false}
        value={remainingAnualLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave: value,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.remainingAnualLeave ?? value;
          }
          if (errors.remainingAnualLeave?.hasError) {
            runValidationTasks("remainingAnualLeave", value);
          }
          setRemainingAnualLeave(value);
        }}
        onBlur={() =>
          runValidationTasks("remainingAnualLeave", remainingAnualLeave)
        }
        errorMessage={errors.remainingAnualLeave?.errorMessage}
        hasError={errors.remainingAnualLeave?.hasError}
        {...getOverrideProps(overrides, "remainingAnualLeave")}
      ></TextField>
      <TextField
        label="Remaining sick leave"
        isRequired={false}
        isReadOnly={false}
        value={remainingSickLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave: value,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.remainingSickLeave ?? value;
          }
          if (errors.remainingSickLeave?.hasError) {
            runValidationTasks("remainingSickLeave", value);
          }
          setRemainingSickLeave(value);
        }}
        onBlur={() =>
          runValidationTasks("remainingSickLeave", remainingSickLeave)
        }
        errorMessage={errors.remainingSickLeave?.errorMessage}
        hasError={errors.remainingSickLeave?.hasError}
        {...getOverrideProps(overrides, "remainingSickLeave")}
      ></TextField>
      <TextField
        label="Remaining mate leave"
        isRequired={false}
        isReadOnly={false}
        value={remainingMateLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave: value,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.remainingMateLeave ?? value;
          }
          if (errors.remainingMateLeave?.hasError) {
            runValidationTasks("remainingMateLeave", value);
          }
          setRemainingMateLeave(value);
        }}
        onBlur={() =>
          runValidationTasks("remainingMateLeave", remainingMateLeave)
        }
        errorMessage={errors.remainingMateLeave?.errorMessage}
        hasError={errors.remainingMateLeave?.hasError}
        {...getOverrideProps(overrides, "remainingMateLeave")}
      ></TextField>
      <TextField
        label="Remaining mrage leave"
        isRequired={false}
        isReadOnly={false}
        value={remainingMrageLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave: value,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.remainingMrageLeave ?? value;
          }
          if (errors.remainingMrageLeave?.hasError) {
            runValidationTasks("remainingMrageLeave", value);
          }
          setRemainingMrageLeave(value);
        }}
        onBlur={() =>
          runValidationTasks("remainingMrageLeave", remainingMrageLeave)
        }
        errorMessage={errors.remainingMrageLeave?.errorMessage}
        hasError={errors.remainingMrageLeave?.hasError}
        {...getOverrideProps(overrides, "remainingMrageLeave")}
      ></TextField>
      <TextField
        label="Remaining paternity leave"
        isRequired={false}
        isReadOnly={false}
        value={remainingPaternityLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave: value,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.remainingPaternityLeave ?? value;
          }
          if (errors.remainingPaternityLeave?.hasError) {
            runValidationTasks("remainingPaternityLeave", value);
          }
          setRemainingPaternityLeave(value);
        }}
        onBlur={() =>
          runValidationTasks("remainingPaternityLeave", remainingPaternityLeave)
        }
        errorMessage={errors.remainingPaternityLeave?.errorMessage}
        hasError={errors.remainingPaternityLeave?.hasError}
        {...getOverrideProps(overrides, "remainingPaternityLeave")}
      ></TextField>
      <TextField
        label="Remaining hos leave"
        isRequired={false}
        isReadOnly={false}
        value={remainingHosLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave: value,
              remainingCompasLeave,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.remainingHosLeave ?? value;
          }
          if (errors.remainingHosLeave?.hasError) {
            runValidationTasks("remainingHosLeave", value);
          }
          setRemainingHosLeave(value);
        }}
        onBlur={() =>
          runValidationTasks("remainingHosLeave", remainingHosLeave)
        }
        errorMessage={errors.remainingHosLeave?.errorMessage}
        hasError={errors.remainingHosLeave?.hasError}
        {...getOverrideProps(overrides, "remainingHosLeave")}
      ></TextField>
      <TextField
        label="Remaining compas leave"
        isRequired={false}
        isReadOnly={false}
        value={remainingCompasLeave}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave: value,
              unPaidAuthorize,
            };
            const result = onChange(modelFields);
            value = result?.remainingCompasLeave ?? value;
          }
          if (errors.remainingCompasLeave?.hasError) {
            runValidationTasks("remainingCompasLeave", value);
          }
          setRemainingCompasLeave(value);
        }}
        onBlur={() =>
          runValidationTasks("remainingCompasLeave", remainingCompasLeave)
        }
        errorMessage={errors.remainingCompasLeave?.errorMessage}
        hasError={errors.remainingCompasLeave?.hasError}
        {...getOverrideProps(overrides, "remainingCompasLeave")}
      ></TextField>
      <TextField
        label="Un paid authorize"
        isRequired={false}
        isReadOnly={false}
        value={unPaidAuthorize}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              empID,
              annualLeave,
              annualLeaveDate,
              compasLeave,
              destinateLeavePass,
              durLeavePass,
              dateLeavePass,
              leavePass,
              materLeave,
              mrageLeave,
              paterLeave,
              sickLeave,
              sickLeaveDate,
              hospLeave,
              remainingAnualLeave,
              remainingSickLeave,
              remainingMateLeave,
              remainingMrageLeave,
              remainingPaternityLeave,
              remainingHosLeave,
              remainingCompasLeave,
              unPaidAuthorize: value,
            };
            const result = onChange(modelFields);
            value = result?.unPaidAuthorize ?? value;
          }
          if (errors.unPaidAuthorize?.hasError) {
            runValidationTasks("unPaidAuthorize", value);
          }
          setUnPaidAuthorize(value);
        }}
        onBlur={() => runValidationTasks("unPaidAuthorize", unPaidAuthorize)}
        errorMessage={errors.unPaidAuthorize?.errorMessage}
        hasError={errors.unPaidAuthorize?.hasError}
        {...getOverrideProps(overrides, "unPaidAuthorize")}
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