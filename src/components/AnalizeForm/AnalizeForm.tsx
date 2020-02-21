import React, { useState } from 'react';
import { Button, Form, Select, Spin } from 'antd';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { IAnalizeFormProps } from './Types';

import { ANALIZE, BASE_URL } from '../../constants/API';
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

const AnalizeForm: React.FC<IAnalizeFormProps> = ({
  data: chartData,
  link,
  setData,
  setTypeResult,
  type,
}): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { errors, handleSubmit, setFieldValue, values } = useFormik({
    initialValues: {
      analizeType: '',
    },
    validateOnChange: false,
    validationSchema,
    onSubmit(values, { resetForm }) {
      setLoading(true);
      const data = {
        Link: link,
        task: values.analizeType,
        sensor: type,
      };
      fetch(`${BASE_URL}${ANALIZE}`, {
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
          setLoading(false);
          const res = JSON.parse(result);
          setTypeResult(res.type_result);

          const data = res.mean_signs[0].reduce((acc, item) => {
            const column = {
              name: item[0],
              Норма: item[1],
              Патологія: item[2],
            };
            acc.push(column);
            return acc;
          }, []);
          setData(data);
        })
        .catch(err => {
          setLoading(false);
          console.error(err);
        });
      resetForm();
    },
  });

  const { analizeType } = values;
  return (
    <>
      {isLoading ? (
        <Spin style={{ marginTop: 10 }} />
      ) : (
        <>
          {!chartData?.length && (
            <Form {...formItemLayout} onSubmit={handleSubmit}>
              <Form.Item
                label="Аналіз"
                validateStatus={errors.analizeType ? 'error' : ''}
                help={errors.analizeType ? errors.analizeType : ''}
              >
                <Select
                  onChange={value => setFieldValue('analizeType', value.toString())}
                  id="sensorType"
                  value={analizeType}
                >
                  {ANALIZE_TYPES.map(({ name, type }) => (
                    <Option key={type} value={type}>
                      {name}
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
          )}
        </>
      )}
    </>
  );
};

export default AnalizeForm;
