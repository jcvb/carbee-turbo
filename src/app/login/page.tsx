"use client";

import { useEffect, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import Logo from "../components/Logo";

export default function Page() {
  const [username, setUsername] = useState("candidate@curbee.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(true);

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [router, status]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
    })
      .then((response) => {
        setLoading(false);
        if (response?.error) {
          console.error("Error signing in:", response.error);
        } else {
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error signing in:", error);
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Row
            xs={10}
            sm={8}
            md={2}
            lg={3}
            className="justify-content-md-center"
          >
            <Card className="bg-brand-secondary text-white p-5 mt-5 shadow">
              <div className="m-auto"><Logo /></div>
              <h4 className="my-4 text-center">Log In</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email or username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>
                <div className="d-grid mt-4">
                  <Button variant="brand-primary" type="submit">
                    <span className="bold text-white">Log In</span>
                  </Button>
                </div>
              </Form>
            </Card>
          </Row>
        </Container>
      )}
    </>
  );
}
