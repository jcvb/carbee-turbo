"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import { Button, Stack } from "react-bootstrap";

export default function Home() {
  return (
    <main>
      <Stack direction="horizontal" gap={2}>
        <Button variant="brand-primary">Button as link</Button>
        <Button variant="brand-primary-300">Button as link</Button>
        <Button variant="brand-tertiary">Button as link</Button>
        <Button variant="gray-300">Button as link</Button>
        <Button variant="brand-secondary">Button as link</Button>
      </Stack>
      ;
    </main>
  );
}
