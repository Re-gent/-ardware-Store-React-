import { Button, Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { login, registration } from "./slices";
import { Link } from "react-router-dom";

type UserFormType = {
  name: string;
  login: string;
  phone: string;
  password: string;
};

export const Login = () => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const { user, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (error === "пользователь уже зарегистрирован") {
      setOpenRegistration(false);
      form.resetFields();
    }
  }, [error]);

  /* useEffect(() => {
    if (user) {
      closeModal()
    }
  }, [user]); */

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const handleFinish = async (values: UserFormType) => {
    if (values.phone) {
      dispatch(registration(values));
      return;
    }

    dispatch(login(values));
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ marginBottom: 20, color: "red" }}>{error}</h3>
      {user ? (
        <>
        <h3 style={{ marginBottom: 20, color: "green" }}>Квааа, {user.name}</h3>
          <Link to='/admin'>перейти на страницу Админа</Link>
        </>
      ) : (
        <>
          <Form form={form} onFinish={handleFinish}>
            <Form.Item
              name="login"
              rules={[
                {
                  required: true,
                  min: 5,
                  message: "логин должен содержать не менее 5 символов",
                },
              ]}
            >
              <Input placeholder="Введите логин" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                  required: true,
                  min: 5,
                  message:
                    "Пароль должен содержать: заглавные и строчные буквы, цифры, спецсимволы (!@#$%^&*) и быть не короче 8 символов. Пример:Pa$$w0rd",
                },
              ]}
            >
              <Input placeholder="Введите пароль" />
            </Form.Item>
            {openRegistration && (
              <>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      min: 5,
                      message: "должно быть мин 3 символа",
                    },
                  ]}
                >
                  <Input placeholder="Укажите имя" />
                </Form.Item>
                <Form.Item name="phone">
                  <Input placeholder="Укажите телефон" />
                </Form.Item>
              </>
            )}

            <Button htmlType="submit">
              {" "}
              {openRegistration ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Form>
          {!openRegistration && (
            <Button
              style={{ marginTop: 20 }}
              type="primary"
              onClick={() => setOpenRegistration(true)}
            >
              Зарегистрироваться
            </Button>
          )}
        </>
      )}
    </div>
  );
};
