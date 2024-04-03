import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { createClient } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createClient(request);
  const { data: notes } = await supabase.from("notes").select();
  return json({ notes });
}

export default function Index() {
  // @ts-ignore
  const { notes } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {notes.map((note: any) => {
          return <li><a href={`/notes/${note.id}`}>{note.title}</a></li>
        })}
      </ul>
    </div>
  );
}
