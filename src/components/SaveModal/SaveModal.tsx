import React from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useRootData } from '../../hooks/useRootData';

import { ISaveModalProps } from './Types';

import { BASE_URL, IMAGE, STATIC } from '../../constants/API';
import { FORM_ERRORS } from '../../constants/FormErrors';
import { SENSORS } from '../../constants/Sensors';

const { maxError, minError, requiredError } = FORM_ERRORS;
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
  name: Yup.string()
    .min(2, minError)
    .max(32, maxError)
    .required(requiredError),
  sensorType: Yup.string().required(requiredError),
});

const validate = values => {
  const errors = {};
  if (values.name === 'test') {
    errors['name'] = 'dublicate';
  }
  return errors;
};

const SaveModal: React.FC<ISaveModalProps> = ({
  id,
  link,
  title,
  visible,
  onCancel,
  openModal,
  setLink,
  setSrc,
  setType,
}): JSX.Element => {
  const { images, setImages } = useRootData(({ images, setImages }) => ({
    images: images.get(),
    setImages,
  }));

  const { errors, handleChange, handleSubmit, setFieldValue, values } = useFormik({
    initialValues: {
      name: '',
      sensorType: '',
    },
    validateOnChange: false,
    validationSchema,
    validate,
    onSubmit(values, { resetForm }) {
      resetForm();
      openModal(false);
      const data = {
        PatientID: id,
        Name: `${values.name}.png`,
        Type: values.sensorType,
        Link: link.substr(link.indexOf(',') + 1),
      };

      fetch(`${BASE_URL}${IMAGE}`, {
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
          setLink(result.Link);
          setSrc(`${BASE_URL}${STATIC}${result.Name}`);
          setType(result.Type);
          if (images) {
            setImages([...images, result]);
          } else {
            setImages([result]);
          }
        })
        .catch(err => console.error(err));
    },
  });

  const { name, sensorType } = values;
  return (
    <Modal onCancel={onCancel} okButtonProps={{ style: { display: 'none' } }} title={title} visible={visible}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Назва" validateStatus={errors.name ? 'error' : ''} help={errors.name ? errors.name : ''}>
          <Input placeholder="Назва" onChange={handleChange} id="name" value={name} />
        </Form.Item>
        <Form.Item
          label="Cенсор"
          validateStatus={errors.sensorType ? 'error' : ''}
          help={errors.sensorType ? errors.sensorType : ''}
        >
          <Select onChange={value => setFieldValue('sensorType', value.toString())} id="sensorType" value={sensorType}>
            {SENSORS.map(({ name, type }) => (
              <Option key={type} value={type}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Зберегти
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SaveModal;
