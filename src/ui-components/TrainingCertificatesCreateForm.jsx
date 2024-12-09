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
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createTrainingCertificates } from "../graphql/mutations";
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
export default function TrainingCertificatesCreateForm(props) {
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
    certifiExpiry: [],
    eCertifiDate: [],
    trainingUpCertifi: [],
    orgiCertifiDate: [],
    poNo: [],
    addDescretion: [],
  };
  const [empID, setEmpID] = React.useState(initialValues.empID);
  const [certifiExpiry, setCertifiExpiry] = React.useState(
    initialValues.certifiExpiry
  );
  const [eCertifiDate, setECertifiDate] = React.useState(
    initialValues.eCertifiDate
  );
  const [trainingUpCertifi, setTrainingUpCertifi] = React.useState(
    initialValues.trainingUpCertifi
  );
  const [orgiCertifiDate, setOrgiCertifiDate] = React.useState(
    initialValues.orgiCertifiDate
  );
  const [poNo, setPoNo] = React.useState(initialValues.poNo);
  const [addDescretion, setAddDescretion] = React.useState(
    initialValues.addDescretion
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmpID(initialValues.empID);
    setCertifiExpiry(initialValues.certifiExpiry);
    setCurrentCertifiExpiryValue("");
    setECertifiDate(initialValues.eCertifiDate);
    setCurrentECertifiDateValue("");
    setTrainingUpCertifi(initialValues.trainingUpCertifi);
    setCurrentTrainingUpCertifiValue("");
    setOrgiCertifiDate(initialValues.orgiCertifiDate);
    setCurrentOrgiCertifiDateValue("");
    setPoNo(initialValues.poNo);
    setCurrentPoNoValue("");
    setAddDescretion(initialValues.addDescretion);
    setCurrentAddDescretionValue("");
    setErrors({});
  };
  const [currentCertifiExpiryValue, setCurrentCertifiExpiryValue] =
    React.useState("");
  const certifiExpiryRef = React.createRef();
  const [currentECertifiDateValue, setCurrentECertifiDateValue] =
    React.useState("");
  const eCertifiDateRef = React.createRef();
  const [currentTrainingUpCertifiValue, setCurrentTrainingUpCertifiValue] =
    React.useState("");
  const trainingUpCertifiRef = React.createRef();
  const [currentOrgiCertifiDateValue, setCurrentOrgiCertifiDateValue] =
    React.useState("");
  const orgiCertifiDateRef = React.createRef();
  const [currentPoNoValue, setCurrentPoNoValue] = React.useState("");
  const poNoRef = React.createRef();
  const [currentAddDescretionValue, setCurrentAddDescretionValue] =
    React.useState("");
  const addDescretionRef = React.createRef();
  const validations = {
    empID: [{ type: "Required" }],
    certifiExpiry: [],
    eCertifiDate: [],
    trainingUpCertifi: [{ type: "JSON" }],
    orgiCertifiDate: [],
    poNo: [],
    addDescretion: [],
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
          certifiExpiry,
          eCertifiDate,
          trainingUpCertifi,
          orgiCertifiDate,
          poNo,
          addDescretion,
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
            query: createTrainingCertificates.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "TrainingCertificatesCreateForm")}
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
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate,
              poNo,
              addDescretion,
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
              certifiExpiry: values,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate,
              poNo,
              addDescretion,
            };
            const result = onChange(modelFields);
            values = result?.certifiExpiry ?? values;
          }
          setCertifiExpiry(values);
          setCurrentCertifiExpiryValue("");
        }}
        currentFieldValue={currentCertifiExpiryValue}
        label={"Certifi expiry"}
        items={certifiExpiry}
        hasError={errors?.certifiExpiry?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("certifiExpiry", currentCertifiExpiryValue)
        }
        errorMessage={errors?.certifiExpiry?.errorMessage}
        setFieldValue={setCurrentCertifiExpiryValue}
        inputFieldRef={certifiExpiryRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Certifi expiry"
          isRequired={false}
          isReadOnly={false}
          value={currentCertifiExpiryValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.certifiExpiry?.hasError) {
              runValidationTasks("certifiExpiry", value);
            }
            setCurrentCertifiExpiryValue(value);
          }}
          onBlur={() =>
            runValidationTasks("certifiExpiry", currentCertifiExpiryValue)
          }
          errorMessage={errors.certifiExpiry?.errorMessage}
          hasError={errors.certifiExpiry?.hasError}
          ref={certifiExpiryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "certifiExpiry")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              certifiExpiry,
              eCertifiDate: values,
              trainingUpCertifi,
              orgiCertifiDate,
              poNo,
              addDescretion,
            };
            const result = onChange(modelFields);
            values = result?.eCertifiDate ?? values;
          }
          setECertifiDate(values);
          setCurrentECertifiDateValue("");
        }}
        currentFieldValue={currentECertifiDateValue}
        label={"E certifi date"}
        items={eCertifiDate}
        hasError={errors?.eCertifiDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("eCertifiDate", currentECertifiDateValue)
        }
        errorMessage={errors?.eCertifiDate?.errorMessage}
        setFieldValue={setCurrentECertifiDateValue}
        inputFieldRef={eCertifiDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="E certifi date"
          isRequired={false}
          isReadOnly={false}
          value={currentECertifiDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.eCertifiDate?.hasError) {
              runValidationTasks("eCertifiDate", value);
            }
            setCurrentECertifiDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("eCertifiDate", currentECertifiDateValue)
          }
          errorMessage={errors.eCertifiDate?.errorMessage}
          hasError={errors.eCertifiDate?.hasError}
          ref={eCertifiDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "eCertifiDate")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi: values,
              orgiCertifiDate,
              poNo,
              addDescretion,
            };
            const result = onChange(modelFields);
            values = result?.trainingUpCertifi ?? values;
          }
          setTrainingUpCertifi(values);
          setCurrentTrainingUpCertifiValue("");
        }}
        currentFieldValue={currentTrainingUpCertifiValue}
        label={"Training up certifi"}
        items={trainingUpCertifi}
        hasError={errors?.trainingUpCertifi?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "trainingUpCertifi",
            currentTrainingUpCertifiValue
          )
        }
        errorMessage={errors?.trainingUpCertifi?.errorMessage}
        setFieldValue={setCurrentTrainingUpCertifiValue}
        inputFieldRef={trainingUpCertifiRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Training up certifi"
          isRequired={false}
          isReadOnly={false}
          value={currentTrainingUpCertifiValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.trainingUpCertifi?.hasError) {
              runValidationTasks("trainingUpCertifi", value);
            }
            setCurrentTrainingUpCertifiValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "trainingUpCertifi",
              currentTrainingUpCertifiValue
            )
          }
          errorMessage={errors.trainingUpCertifi?.errorMessage}
          hasError={errors.trainingUpCertifi?.hasError}
          ref={trainingUpCertifiRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "trainingUpCertifi")}
        ></TextAreaField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate: values,
              poNo,
              addDescretion,
            };
            const result = onChange(modelFields);
            values = result?.orgiCertifiDate ?? values;
          }
          setOrgiCertifiDate(values);
          setCurrentOrgiCertifiDateValue("");
        }}
        currentFieldValue={currentOrgiCertifiDateValue}
        label={"Orgi certifi date"}
        items={orgiCertifiDate}
        hasError={errors?.orgiCertifiDate?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "orgiCertifiDate",
            currentOrgiCertifiDateValue
          )
        }
        errorMessage={errors?.orgiCertifiDate?.errorMessage}
        setFieldValue={setCurrentOrgiCertifiDateValue}
        inputFieldRef={orgiCertifiDateRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Orgi certifi date"
          isRequired={false}
          isReadOnly={false}
          value={currentOrgiCertifiDateValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.orgiCertifiDate?.hasError) {
              runValidationTasks("orgiCertifiDate", value);
            }
            setCurrentOrgiCertifiDateValue(value);
          }}
          onBlur={() =>
            runValidationTasks("orgiCertifiDate", currentOrgiCertifiDateValue)
          }
          errorMessage={errors.orgiCertifiDate?.errorMessage}
          hasError={errors.orgiCertifiDate?.hasError}
          ref={orgiCertifiDateRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "orgiCertifiDate")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate,
              poNo: values,
              addDescretion,
            };
            const result = onChange(modelFields);
            values = result?.poNo ?? values;
          }
          setPoNo(values);
          setCurrentPoNoValue("");
        }}
        currentFieldValue={currentPoNoValue}
        label={"Po no"}
        items={poNo}
        hasError={errors?.poNo?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("poNo", currentPoNoValue)
        }
        errorMessage={errors?.poNo?.errorMessage}
        setFieldValue={setCurrentPoNoValue}
        inputFieldRef={poNoRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Po no"
          isRequired={false}
          isReadOnly={false}
          value={currentPoNoValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.poNo?.hasError) {
              runValidationTasks("poNo", value);
            }
            setCurrentPoNoValue(value);
          }}
          onBlur={() => runValidationTasks("poNo", currentPoNoValue)}
          errorMessage={errors.poNo?.errorMessage}
          hasError={errors.poNo?.hasError}
          ref={poNoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "poNo")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              empID,
              certifiExpiry,
              eCertifiDate,
              trainingUpCertifi,
              orgiCertifiDate,
              poNo,
              addDescretion: values,
            };
            const result = onChange(modelFields);
            values = result?.addDescretion ?? values;
          }
          setAddDescretion(values);
          setCurrentAddDescretionValue("");
        }}
        currentFieldValue={currentAddDescretionValue}
        label={"Add descretion"}
        items={addDescretion}
        hasError={errors?.addDescretion?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("addDescretion", currentAddDescretionValue)
        }
        errorMessage={errors?.addDescretion?.errorMessage}
        setFieldValue={setCurrentAddDescretionValue}
        inputFieldRef={addDescretionRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Add descretion"
          isRequired={false}
          isReadOnly={false}
          value={currentAddDescretionValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.addDescretion?.hasError) {
              runValidationTasks("addDescretion", value);
            }
            setCurrentAddDescretionValue(value);
          }}
          onBlur={() =>
            runValidationTasks("addDescretion", currentAddDescretionValue)
          }
          errorMessage={errors.addDescretion?.errorMessage}
          hasError={errors.addDescretion?.hasError}
          ref={addDescretionRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "addDescretion")}
        ></TextField>
      </ArrayField>
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
