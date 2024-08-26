import {createFileRoute} from '@tanstack/react-router'
import {RegisterPage} from "../../pages/register.page.tsx";

export const Route = createFileRoute('/(guest)/register')({
  component: RegisterPage,
})