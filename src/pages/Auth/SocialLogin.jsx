import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa';
import {
  LoginSocialGoogle,
  LoginSocialLinkedin,
  LoginSocialTwitter,
} from 'reactjs-social-login';

const SocialLogin = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (provider) => (response) => {
    console.log(`${provider} login response:`, response);
    setUser(response.data);
    // Send the response data to your backend for further processing
  };

  return (
    <div>
      <div className="text-center mb-2">Or login with</div>
      <Row className="mb-3 text-center">
        <Col>
          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onResolve={handleLogin('Google')}
            onReject={(err) => console.error('Google login error:', err)}
          >
            <Button variant="outline-danger" className="w-100 mb-2">
              <FaGoogle className="me-2" /> Google
            </Button>
          </LoginSocialGoogle>
        </Col>
        <Col>
          <LoginSocialLinkedin
            client_id={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
            redirect_uri={process.env.REACT_APP_LINKEDIN_REDIRECT_URI}
            onResolve={handleLogin('LinkedIn')}
            onReject={(err) => console.error('LinkedIn login error:', err)}
          >
            <Button variant="outline-primary" className="w-100 mb-2">
              <FaLinkedin className="me-2" /> LinkedIn
            </Button>
          </LoginSocialLinkedin>
        </Col>
        <Col>
          <LoginSocialTwitter
            client_id={process.env.REACT_APP_TWITTER_CLIENT_ID}
            redirect_uri={process.env.REACT_APP_TWITTER_REDIRECT_URI}
            onResolve={handleLogin('Twitter')}
            onReject={(err) => console.error('Twitter login error:', err)}
          >
            <Button variant="outline-info" className="w-100">
              <FaTwitter className="me-2" /> Twitter
            </Button>
          </LoginSocialTwitter>
        </Col>
      </Row>

      {user && (
        <div>
          <h3>Welcome, {user.name}</h3>
          <p>Email: {user.email}</p>
          {/* Display other user information as needed */}
        </div>
      )}
    </div>
  );
};

export default SocialLogin;
