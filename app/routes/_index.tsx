import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getUsers } from "~/utils/fly-postgres.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const users = await getUsers();
  console.log(users)
  return json({ users });
}

export default function Index() {
  // @ts-ignore
  const { users } = useLoaderData();
  console.log(users);
  if (!users) return "No users";
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {users.map((user: any) => {
          return <li><a href={`/users/${user.id}`}>{user.name}</a></li>
        })}
      </ul>
    </div>
  );
}
