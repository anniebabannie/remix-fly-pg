import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs } from "react-router";
import { createUser } from "~/utils/fly-postgres.server";

export default function NewUser() {
  const { error } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>New User</h1>
      {error && <p className="text-red-500">There was an error creating the user</p>}
      <Form method="post">
        <label>
          Name: <input type="text" name="name" />
        </label>
        <label>
          Email: <input type="email" name="email" />
        </label>
        <button type="submit">Create User</button>
      </Form>
    </div>
  );
}

export function loader({ request }: LoaderFunctionArgs) {
  let { searchParams } = new URL(request.url);
  let error = searchParams.get('error');
  return json({ error });
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const name = body.get('name') as string;
  const email = body.get('email') as string;
  const user = await createUser(name, email);
  if (!user) return redirect('/users/new&error=1');
  return redirect(`/users/${user.id}`)
}