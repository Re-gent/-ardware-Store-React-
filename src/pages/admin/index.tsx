import { Button, Form, Input, message, Select } from "antd";
import { ProductType } from "../../types";
import { useAppDispatch } from "../../reduxHooks";
import { createProduct } from "../product/slices";

export const Admin = () => {
  const dispath = useAppDispatch();
  const [form] = Form.useForm();

  const handleFinish = (values: ProductType) => {
    dispath(createProduct(values));
    message.success("Товар добавлен");
    form.resetFields();
  };

  return (
    <div style={{ marginLeft: 45 }}>
      <h1>Создание карточки товара</h1>

      <Form
        form={form}
        onFinish={handleFinish}
        wrapperCol={{ span: 8 }}
        layout="vertical"
      >
        <Form.Item
          name="brand"
          label="Бренд"
          rules={[
            {
              required: true,
              min: 2,
              message: "должно содержать не менее 2 символов",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Имя товара"
          rules={[
            {
              required: true,
              min: 2,
              message: "должно содержать не менее 2 символов",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="описание"
          rules={[
            {
              required: true,
              min: 2,
              message: "должно содержать не менее 10 символов",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="price"
          label="цена"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="категория товара"
          rules={[
            {
              required: true,
              min: 2,
              message: "должно содержать не менее 2 символов",
            },
          ]}
        >
          <Select
            options={[
              { value: "laptop", label: "ноутбук" },
              { value: "phone", label: "телефон" },
              { value: "monitor", label: "монитор" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="img"
          label="изображение товара (ссылка)"
          rules={[
            {
              required: true,
              min: 2,
              message: "укажите ссылку на товар",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="rating" label="рейтинг" initialValue={1}>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="quantity" initialValue={1}>
          <Input type="hidden" />
        </Form.Item>

        <Button htmlType="submit">добавить товар</Button>
      </Form>
    </div>
  );
};
