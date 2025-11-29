import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
const DetailPost = () => {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  const [fileUrl, setFileUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          //api request
          const response = await axios.get(`/posts/${postId}`);
          const data = response.data.data;
          setPost(data.post);
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: "top-right",
            autoClose: true,
          });
        }
      };
      getPost();
    }
  }, [postId]);

  useEffect(() => {
    if (post && post?.file) {
      const getFile = async () => {
        try {
          //api request
          const response = await axios.get(
            `/file/signed-url?key=${post.file.public_id}`
          );
          const data = response.data.data;

          setFileUrl(data.url);
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: "top-right",
            autoClose: true,
          });
        }
      };
      getFile();
    }
  }, [post]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/posts/${postId}`);

      setShowModal(false);

      const data = response.data;
      toast.success(data.message, {
        position: "top-right",
        autoClose: true,
      });

      navigate("/posts");
    } catch (error) {
      setShowModal(false);
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: "top-right",
        autoClose: true,
      });
    }
  };
  return (
    <div className="main-container">
      <div className="  gx-3 ">
        <button className="button button-block  " onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button
        className="button button-block "
        onClick={() => navigate(`/posts/update-post/${postId}`)}
      >
        update post
      </button>
      <button
        className="button delete-post  button-block "
        onClick={() => setShowModal(true)}
      >
        Delete Post
      </button>
      </div>
      <div className="detail-container">
        <h2 className="post-title">{post?.title}</h2>
        <h5 className="post-category">category: {post?.category?.title}</h5>
        <h5 className="post-category">
          created at: {moment(post?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <h5 className="post-category">
          updated at: {moment(post?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <p className="post-desc">{post?.desc}</p>
        <img src={fileUrl} alt="post" className="detail-img" />
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <div style={{ margin: "0 auto" }}>
            <Button
              className="no-button"
              onClick={() => {
                setShowModal(false);
              }}
            >
              No
            </Button>
            <Button className="yes-button" onClick={handleDelete}>
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailPost;
