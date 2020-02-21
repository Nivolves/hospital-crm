import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Button, Form, Input, InputNumber } from 'antd';

import { useRootData } from '../../hooks/useRootData';

import { IPatientFormProps } from './Types';

import { BASE_URL, PATIENT } from '../../constants/API';
import { FORM_ERRORS } from '../../constants/FormErrors';

const { maxError, minError, requiredError } = FORM_ERRORS;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 2,
    },
  },
};

const validationSchema = Yup.object({
  age: Yup.number().required(requiredError),
  fathersName: Yup.string()
    .min(2, minError)
    .max(32, maxError)
    .required(requiredError),
  firstName: Yup.string()
    .min(2, minError)
    .max(32, maxError)
    .required(requiredError),
  lastName: Yup.string()
    .min(2, minError)
    .max(32, maxError)
    .required(requiredError),
  weight: Yup.number().required(requiredError),
  height: Yup.number().required(requiredError),
});

const PatientForm: React.FC<IPatientFormProps> = ({ id }): JSX.Element => {
  const { patients, setPatients } = useRootData(({ patients, setPatients }) => ({
    patients: patients.get(),
    setPatients,
  }));

  const history = useHistory();

  const { errors, handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues: {
      age: 0,
      fathersName: '',
      firstName: '',
      height: 50,
      lastName: '',
      weight: 3,
    },
    validateOnChange: false,
    validationSchema,
    onSubmit({ age, fathersName, firstName, height, lastName, weight }) {
      const data = {
        Age: age,
        DoctorID: 2,
        Height: height,
        Weight: weight,
        FirstName: firstName,
        LastName: lastName,
        FathersName: fathersName,
        Diagnosis: '',
      };
      if (id) {
        console.log(id);
      } else {
        fetch(`${BASE_URL}${PATIENT}`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(result => {
            if (patients) {
              setPatients([result, ...patients]);
            } else {
              setPatients([result]);
            }
            history.push(`/doctor/patient/${result.PatientID}`);
          })
          .catch(err => console.error(err));
      }
    },
  });

  useEffect(() => {
    if (id) {
      const patient = patients.find(({ PatientID }) => PatientID === id);
      setFieldValue('age', patient?.Age);
      setFieldValue('fathersName', patient?.FathersName);
      setFieldValue('firstName', patient?.FirstName);
      setFieldValue('height', patient?.Height);
      setFieldValue('lastName', patient?.LastName);
      setFieldValue('weight', patient?.Weight);
    }
  }, [id, patients, setFieldValue]);

  const { age, fathersName, firstName, height, lastName, weight } = values;

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item
        label="Ім'я"
        validateStatus={errors.firstName ? 'error' : ''}
        help={errors.firstName ? errors.firstName : ''}
      >
        <Input placeholder="Ім'я" onChange={handleChange} id="firstName" value={firstName} />
      </Form.Item>
      <Form.Item
        label="Прізвище"
        validateStatus={errors.lastName ? 'error' : ''}
        help={errors.lastName ? errors.lastName : ''}
      >
        <Input placeholder="Прізвище" onChange={handleChange} id="lastName" value={lastName} />
      </Form.Item>
      <Form.Item
        label="По батькові"
        validateStatus={errors.fathersName ? 'error' : ''}
        help={errors.fathersName ? errors.fathersName : ''}
      >
        <Input placeholder="По батькові" onChange={handleChange} id="fathersName" value={fathersName} />
      </Form.Item>
      <Form.Item label="Вік" validateStatus={errors.age ? 'error' : ''} help={errors.age ? errors.age : ''}>
        <InputNumber
          min={0}
          value={age}
          defaultValue={0}
          onChange={value => {
            setFieldValue('age', value);
          }}
          id="age"
        />
      </Form.Item>
      <Form.Item label="Вага" validateStatus={errors.weight ? 'error' : ''} help={errors.weight ? errors.weight : ''}>
        <InputNumber
          min={3}
          value={weight}
          defaultValue={3}
          onChange={value => {
            setFieldValue('weight', value);
          }}
          id="weight"
        />
      </Form.Item>
      <Form.Item label="Зріст" validateStatus={errors.height ? 'error' : ''} help={errors.height ? errors.height : ''}>
        <InputNumber
          min={50}
          value={height}
          defaultValue={50}
          onChange={value => {
            setFieldValue('height', value);
          }}
          id="height"
        />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Зберегти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatientForm;