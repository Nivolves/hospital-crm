import React from 'react';
import { Button, Form, Select } from 'antd';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { ANALIZE_TYPES } from '../../constants/AnalizeTypes';
import { FORM_ERRORS } from '../../constants/FormErrors';

const { requiredError } = FORM_ERRORS;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
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
  analizeType: Yup.string().required(requiredError),
});

const AnalizeForm: React.FC = (): JSX.Element => {
  const { errors, handleSubmit, setFieldValue, values } = useFormik({
    initialValues: {
      analizeType: '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit(values, { resetForm }) {
      console.log(values);
      resetForm();
    },
  });

  const { analizeType } = values;
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item
        label="Аналіз"
        validateStatus={errors.analizeType ? 'error' : ''}
        help={errors.analizeType ? errors.analizeType : ''}
      >
        <Select onChange={value => setFieldValue('analizeType', value.toString())} id="sensorType" value={analizeType}>
          {ANALIZE_TYPES.map(type => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Аналіз
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AnalizeForm;
