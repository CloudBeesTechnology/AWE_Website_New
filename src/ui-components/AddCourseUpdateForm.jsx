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
import { getAddCourse } from "../graphql/queries";
import { updateAddCourse } from "../graphql/mutations";
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
export default function AddCourseUpdateForm(props) {
  const {
    id: idProp,
    addCourse: addCourseModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    courseSelect: "",
    courseName: [],
    company: [],
  };
  const [courseSelect, setCourseSelect] = React.useState(
    initialValues.courseSelect
  );
  const [courseName, setCourseName] = React.useState(initialValues.courseName);
  const [company, setCompany] = React.useState(initialValues.company);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = addCourseRecord
      ? { ...initialValues, ...addCourseRecord }
      : initialValues;
    setCourseSelect(cleanValues.courseSelect);
    setCourseName(cleanValues.courseName ?? []);
    setCurrentCourseNameValue("");
    setCompany(cleanValues.company ?? []);
    setCurrentCompanyValue("");
    setErrors({});
  };
  const [addCourseRecord, setAddCourseRecord] =
    React.useState(addCourseModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getAddCourse.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getAddCourse
        : addCourseModelProp;
      setAddCourseRecord(record);
    };
    queryData();
  }, [idProp, addCourseModelProp]);
  React.useEffect(resetStateValues, [addCourseRecord]);
  const [currentCourseNameValue, setCurrentCourseNameValue] =
    React.useState("");
  const courseNameRef = React.createRef();
  const [currentCompanyValue, setCurrentCompanyValue] = React.useState("");
  const companyRef = React.createRef();
  const validations = {
    courseSelect: [],
    courseName: [],
    company: [],
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
          courseSelect: courseSelect ?? null,
          courseName: courseName ?? null,
          company: company ?? null,
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
            query: updateAddCourse.replaceAll("__typename", ""),
            variables: {
              input: {
                id: addCourseRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "AddCourseUpdateForm")}
      {...rest}
    >
      <TextField
        label="Course select"
        isRequired={false}
        isReadOnly={false}
        value={courseSelect}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              courseSelect: value,
              courseName,
              company,
            };
            const result = onChange(modelFields);
            value = result?.courseSelect ?? value;
          }
          if (errors.courseSelect?.hasError) {
            runValidationTasks("courseSelect", value);
          }
          setCourseSelect(value);
        }}
        onBlur={() => runValidationTasks("courseSelect", courseSelect)}
        errorMessage={errors.courseSelect?.errorMessage}
        hasError={errors.courseSelect?.hasError}
        {...getOverrideProps(overrides, "courseSelect")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              courseSelect,
              courseName: values,
              company,
            };
            const result = onChange(modelFields);
            values = result?.courseName ?? values;
          }
          setCourseName(values);
          setCurrentCourseNameValue("");
        }}
        currentFieldValue={currentCourseNameValue}
        label={"Course name"}
        items={courseName}
        hasError={errors?.courseName?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("courseName", currentCourseNameValue)
        }
        errorMessage={errors?.courseName?.errorMessage}
        setFieldValue={setCurrentCourseNameValue}
        inputFieldRef={courseNameRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Course name"
          isRequired={false}
          isReadOnly={false}
          value={currentCourseNameValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.courseName?.hasError) {
              runValidationTasks("courseName", value);
            }
            setCurrentCourseNameValue(value);
          }}
          onBlur={() =>
            runValidationTasks("courseName", currentCourseNameValue)
          }
          errorMessage={errors.courseName?.errorMessage}
          hasError={errors.courseName?.hasError}
          ref={courseNameRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "courseName")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              courseSelect,
              courseName,
              company: values,
            };
            const result = onChange(modelFields);
            values = result?.company ?? values;
          }
          setCompany(values);
          setCurrentCompanyValue("");
        }}
        currentFieldValue={currentCompanyValue}
        label={"Company"}
        items={company}
        hasError={errors?.company?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("company", currentCompanyValue)
        }
        errorMessage={errors?.company?.errorMessage}
        setFieldValue={setCurrentCompanyValue}
        inputFieldRef={companyRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Company"
          isRequired={false}
          isReadOnly={false}
          value={currentCompanyValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.company?.hasError) {
              runValidationTasks("company", value);
            }
            setCurrentCompanyValue(value);
          }}
          onBlur={() => runValidationTasks("company", currentCompanyValue)}
          errorMessage={errors.company?.errorMessage}
          hasError={errors.company?.hasError}
          ref={companyRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "company")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || addCourseModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || addCourseModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}