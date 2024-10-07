import { Button, Col, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import UpdatePostModal from "./UpdatePostModal";
export default function ProfilePostCard({ post, postId }) {
  const { content, imageUrl } = post;
  const [likes, setLikes] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  console.log(imageUrl);

  const pic =
    "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

  const BASE_URL =
    "https://683007d0-4082-4b69-804b-4e091b6d5de1-00-mq64xjq353xd.sisko.replit.dev";

  // useEffect(() => {
  //   fetch(`${BASE_URL}/likes/post/${postId}`)
  //     .then((response) => response.json())
  //     .then((data) => setLikes(data))
  //     .catch((error) => console.error("Error:", error));
  // }, [postId]);

  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  return (
    <Row
      className="p-3"
      style={{
        borderTop: "1px solid #D3D3D3",
        borderBottom: "1px solid #D3D3D3",
      }}
    >
      <Col sm={1}>
        <Image src={pic} fluid roundedCircle />
      </Col>

      <Col>
        <strong>Haris</strong>
        <span> @haris.samingan · Apr 16</span>
        <p>{content}</p>
        <img src={imageUrl} style={{ width: 150 }}></img>
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-heart"> {likes.length ? likes.length : 0}</i>
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-upload"></i>
          </Button>
          <Button variant="light">
            <i
              className="bi bi-pencil-square"
              onClick={handleShowUpdateModal}
            ></i>
          </Button>

          <UpdatePostModal
            show={showUpdateModal}
            handleClose={handleCloseUpdateModal}
            postId={postId}
            originalPostContent={content}
          />
        </div>
      </Col>
    </Row>
  );
}
