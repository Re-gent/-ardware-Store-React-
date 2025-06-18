import "./index.scss";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
//import { createComment, loadComments } from "../slices";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { useAddCommentMutation, useGetCommentsQuery } from "../../../querys/commentsApi";

type CommentForm ={
  userName: string
  text:string
}

export const ProductComments = ({ productID }:{productID:number}) => {
  const dispatch = useAppDispatch();

  //const { comments } = useAppSelector((state) => state.product);
	const [form] = Form.useForm()

  const {data:comments} = useGetCommentsQuery(productID)
  const [addComment] = useAddCommentMutation()

  const handleFinish = (values:CommentForm) => {
    const date = new Date().toLocaleDateString();

    //dispatch(createComment({ ...values, productID, date }));
    addComment({ ...values, productID, date })
		/* очистка инпутов */
		form.resetFields()
  };
 /*  useEffect(() => {

    dispatch(loadComments(productID));
  }, [productID]); */

  return (
    <div className="productPageComments">
      <h1>Комментарии</h1>

      <Form form={form} onFinish={handleFinish}>
        <Form.Item name="userName">
          <Input placeholder="Укажите имя" />
        </Form.Item>
        <Form.Item name="text">
          <TextArea rows={4} placeholder="Комментарий" maxLength={1000} />
        </Form.Item>
        {/* данная кнопка собирает все импуты при помощи htmlType="submit". То есть импуты в форме реагируют на нажатие кнопки и значения всех импутов приходит в onFinish, которя прокидывает их в функцию handleFinish*/}
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form>
      <div>
        {comments?.map((comment) => (
          <div key={comment.id} className="productCommentsBlock">
						<span>{comment.userName}</span>
						<span>{comment.date}</span>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
