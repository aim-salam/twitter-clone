import { useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import ProfileMidBody from "../components/ProfileMidBody";
import ProfileSideBar from "../components/ProfileSideBar";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";

export default function ProfilePage() {
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  // const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  const navigate = useNavigate();

  // Check for authToken immediately upon component mount and whenever authToken changes
  // useEffect(() => {
  //   if (!authToken) {
  //     navigate("/login"); // Redirect to login if no auth token is present
  //   }
  // }, [authToken, navigate]);

  if (!currentUser) {
    navigate("/login");
  }

  const handleLogout = () => {
    // setAuthToken(""); // Clear token from localStorage
    auth.signOut();
  };

  return (
    <>
      <Container>
        <Row>
          <ProfileSideBar handleLogout={handleLogout} />
          <ProfileMidBody />
        </Row>
      </Container>
    </>
  );
}
