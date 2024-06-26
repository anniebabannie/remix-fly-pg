import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getAllsUsers } from "~/utils/fly-postgres.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const users = await getAllsUsers();
  console.log(users)
  return json({ users });
}

export default function Index() {
  // @ts-ignore
  const { users } = useLoaderData();

  if (!users) return "No users";
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <Link to="/users/new">+ New User</Link>
      <ul>
        {
          users.map((user: any) => {
            return <li><a href={`/users/${user.id}`}>{user.name}</a></li>
          })
        }
      </ul>
    </div>
  );
}
