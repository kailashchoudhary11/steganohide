import axios from "axios";
import { Form, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const res = await axios.post("http://127.0.0.1:8000/api/hide/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export default function Hide() {
  const actionData = useActionData();
  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <input type="text" name="msg" />
        <input type="text" name="key" />
        <input
          type="file"
          alt="image"
          name="img"
          accept="image/png, image/gif, image/jpeg"
        />
        <button type="submit">Submit</button>
      </Form>
      <div>
        Processed Image is as below:
        <img src={actionData?.img} alt="Processed" />
      </div>
    </>
  );
}
