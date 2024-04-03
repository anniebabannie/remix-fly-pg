import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "~/utils/fly-postgres.server";

export default function User() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{user.name}</h1>
      <a href="">{user.email}</a>
      <p>Here is the user with id: {user.id}</p>
    </div>
  );
}

type User = {
  id: string;
  name: string;
  email: string;
}

export async function loader({params}: LoaderFunctionArgs) {
  if (!params.id) return json({error: "No user id provided"}, {status: 400});
  const user = await getUser(params.id);
  console.log(user); 
  return json({user});
}