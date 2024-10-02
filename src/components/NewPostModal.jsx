import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { savePost } from "../features/posts/postsSlice";

export default function NewPostModal({ show, handleClose }) {
  const [postContent, setPostContent] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(savePost(postContent));
    handleClose();
    setPostContent("");
    // //Get stored JWT Token
    // const token = localStorage.getItem("authToken");

    // //Decode the token to fetch user id
    // const decode = jwtDecode(token);
    // const userId = decode.id; // May change depending on how the server encode the token
    // const username = decode.username;

    // //Prepare data to be sent
    // const data = {
    //   title: "Post Title", //Add functionality to set this properly
    //   content: postContent,
    //   user_id: userId,
    //   author: username,
    // };

    // console.log("data");
    // console.log(data);

    // //Make your API call here
    // axios
    //   .post(
    //     "https://683007d0-4082-4b69-804b-4e091b6d5de1-00-mq64xjq353xd.sisko.replit.dev/posts",
    //     data
    //   )
    //   .then((response) => {
    //     console.log("Success:", response.data);
    //     handleClose();
    //   })
    //   .catch((error) => {
    //     console.error("Error", error);
    //   });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="postContent">
              <Form.Control
                placeholder="What is happening?!"
                as="textarea"
                rows={3}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={handleSave}
          >
            Tweet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
