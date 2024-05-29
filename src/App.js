import React, { useEffect, useState } from "react";

import { Button, Checkbox, Form, Input } from "antd";

const App = ({ user }) => {
  const [todoData, settodoData] = useState([]);
  const [reRender, setreRender] = useState(false);
  const [finalValue, setfinalValue] = useState([...user]);

  const currentValue = user?.[user.length - 1];

  useEffect(() => {
    if (currentValue?.userNo == 1) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
          settodoData(json);
        });
    }
  }, []);

  const onFinish = (values) => {
    if (currentValue?.userNo >= 5) {
      return false;
    }
    setfinalValue((e) => [
      ...e,
      {
        userNo: currentValue?.userNo + 1,
        name: values.username,
      },
    ]);

    setreRender(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {!reRender && currentValue?.userNo < 5 ? (
        <>
          <h1>{currentValue?.userNo == 5 && "Final form"}</h1>
          <h1>DEKSTOP APP</h1>
          <h3>
            {currentValue?.userNo} {currentValue?.name}
          </h3>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              username: `${currentValue?.name} ${currentValue?.userNo}`,
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        currentValue?.userNo < 5 && <App user={finalValue} />
      )}
      {currentValue?.userNo >= 5 && <b>thank You Result Data :-</b>}{" "}
      {currentValue?.userNo >= 5 && (
        <>
          {user.map((item, index) => (
            <div>{item?.name}</div>
          ))}
          =======================
        </>
      )}
      {currentValue?.userNo <= 5 &&
        todoData?.map((item, index) => <div>{item?.name}</div>)}
    </div>
  );
};

export default App;
